import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BsCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';

import TopBar from '@/components/TopBar';
import AppInput from '@/components/AppInput';
import { isAnimalValid, isCountryValid } from '../api/apis';
import AppBtn from '@/components/AppBtn';
import { capitalize, formatTime } from '../api/utils';
import { getScore, saveScore } from '../api/storage';
import Link from 'next/link';

const letters = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
];

interface MarkedVal {
	correct: boolean;
	value: string;
}

interface FormValues {
	country: string;
	animal: string;
}

const Game = () => {
	const [letter, setLetter] = useState('Y');
	const [active, setActive] = useState(false);
	const [timer, setTimer] = useState(10);
	const [gameover, setGameover] = useState(false);
	const [timeRanOut, setTimeRanOut] = useState(false);
	const [marked, setMarked] = useState<{ [key: string]: MarkedVal }>({});
	const [currScore, setCurrScore] = useState(0);

	const [overallPoints, setOverallPoints] = useState(0);

	// const [formError, setFormError] = useState('');
	const [submitting, setSubmitting] = useState(false);

	const regex = new RegExp(
		`^[${letter.toLowerCase()}${letter.toUpperCase()}].*`
	);

	// const handleSubmit = (values:FormValues)=>{

	// }

	const formik = useFormik({
		initialValues: {
			country: '',
			animal: '',
		},
		onSubmit: async (values) => {
			setSubmitting(true);
			const _marked: { [key: string]: MarkedVal } = {};
			let _score = 0;

			const resCountry = isCountryValid(values.country.trim());
			_marked['country'] = {
				correct: resCountry.data ? true : false,
				value: resCountry.data || values.country,
			};

			const resAnimal = await isAnimalValid(values.animal.trim());
			_marked['animal'] = {
				correct: resAnimal.data ? true : false,
				value: resAnimal.data || values.animal,
			};

			Object.keys(_marked).forEach((key) => {
				if (_marked[key].correct) _score += 1;
			});

			const _overall = getScore() + _score;
			saveScore(_overall);

			setActive(false);
			setGameover(true);
			setMarked(_marked);
			setCurrScore(_score);
			setOverallPoints(_overall);
			setSubmitting(false);
		},
		validationSchema: Yup.object({
			country: Yup.string()
				.trim()
				.matches(regex, `Must start with ${letter}`),
			animal: Yup.string()
				.trim()
				.matches(regex, `Must start with ${letter}`),
		}),
	});

	const pickLetter = () =>
		letters[Math.floor(Math.random() * letters.length)];

	const randomize = () => {
		setLetter(pickLetter());
		setActive(true);
	};

	const handleTimeRanOut = useCallback(() => {
		setTimeRanOut(true);
		formik.handleSubmit();
	}, [formik]);

	const restartGame = () => {
		setGameover(false);
		setActive(false);
		setTimeRanOut(false);
		setTimer(10);
		formik.resetForm();
	};

	useEffect(() => {
		setOverallPoints(getScore());
		let intervalLetter: NodeJS.Timeout;

		if (!active) {
			intervalLetter = setInterval(() => setLetter(pickLetter()), 200);
		}

		return () => clearInterval(intervalLetter);
	}, [active]);

	useEffect(() => {
		let intervalTimer: NodeJS.Timeout;

		if (active) {
			intervalTimer = setInterval(() => {
				if (timer !== 0) {
					setTimer(timer - 1);
				} else {
					clearInterval(intervalTimer);
					handleTimeRanOut();
				}
			}, 1000);
		}

		return () => clearInterval(intervalTimer);
	}, [active, timer]);

	return (
		<>
			<Head>
				<title>Name Game</title>
				<meta
					name="description"
					content="Come up with words based on generated letter"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Container active={active} gameover={gameover}>
				<TopBar timer={formatTime(timer)} score={overallPoints} />
				<div className="active-gameover">
					<div className="content">
						<div className="letter">{letter}</div>

						<div className="picker">
							<AppBtn
								type="button"
								text="Pick a random letter"
								onClick={randomize}
							/>
						</div>

						<form className="filler" onSubmit={formik.handleSubmit}>
							<i>
								<p className="sub-letter">
									Words beginning with {letter}!
								</p>
							</i>

							<AppInput
								label="Country"
								id="country"
								disabled={submitting}
								value={formik.values.country}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.errors.country}
								touched={formik.touched.country}
							/>

							<AppInput
								label="Animal"
								id="animal"
								disabled={submitting}
								value={formik.values.animal}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.errors.animal}
								touched={formik.touched.animal}
							/>
							<AppBtn
								type="submit"
								text="Submit"
								className="submit-btn"
								disabled={submitting}
							/>
						</form>
					</div>
					<div className="gameover">
						<div className="gameover-inner">
							<p className="oops">⏲️ Oops! Time Ran Out</p>

							<h2 className="go-title">
								You scored {currScore} points!
							</h2>

							<div className="answers">
								{Object.keys(marked).map((val, i) => (
									<div className="answer" key={i}>
										{marked[val].correct ? (
											<BsCheckCircleFill color="#009944" />
										) : (
											<BsFillXCircleFill color="#cf000f" />
										)}

										<span className="answer-lbl">
											{capitalize(val)}:
										</span>
										<span
											className="answer-val"
											style={{
												color: marked[val].correct
													? '#009944'
													: '#cf000f',
											}}>
											{marked[val].value}
										</span>
									</div>
								))}
							</div>

							<AppBtn text="Restart" onClick={restartGame} />
						</div>
					</div>
				</div>

				<footer>
					Designed by{' '}
					<Link
						href="https://github.com/brianMunyao/"
						target="_blank"
						rel="noopener noreferrer">
						brianMunyao
					</Link>
				</footer>
			</Container>
		</>
	);
};

interface StyledProps extends React.HTMLAttributes<HTMLDivElement> {
	active: boolean;
	gameover: boolean;
}

const Container = styled.main<StyledProps>`
	display: flex;
	flex-direction: column;
	height: 100vh;
	min-height: 600px;

	.active-gameover {
		display: flex;
		flex-direction: column;
		flex: 1;
		width: 100%;

		.content,
		.gameover {
			overflow: hidden;
			transition: all 0.2s linear;
			width: 100%;
			display: flex;
			flex-direction: column;
		}

		.content {
			position: ${({ gameover }) => (gameover ? 'absolute' : 'relative')};
			pointer-events: ${({ gameover }) => (gameover ? 'none' : 'all')};
			flex: ${({ gameover }) => (gameover ? 0 : 1)};
			opacity: ${({ gameover }) => (gameover ? 0 : 1)};

			.letter {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: ${({ active }) => (active ? '80px' : '200px')};
				transition: all 0.2s linear;
				font-weight: 600;
				font-size: ${({ active }) => (active ? '50px' : '100px')};
			}
			.filler,
			.picker,
			.gameover {
				display: flex;
				align-items: center;
				flex-direction: column;
				transition: all 0.2s linear;
				overflow: hidden;
			}
			.picker {
				width: 100%;
				justify-content: center;
				/* padding: ${({ active }) => (active ? '0' : '20px')}; */
				flex: ${({ active }) => (active ? 0 : 1)};
				opacity: ${({ active }) => (active ? 0 : 1)};
			}
			.filler {
				width: 100%;

				/* padding: ${({ active }) => (active ? '20px' : '0')}; */
				flex: ${({ active }) => (active ? 1 : 0)};
				opacity: ${({ active }) => (active ? 1 : 0)};

				.sub-letter {
					opacity: 0.7;
					margin-bottom: 5px;
				}
				.submit-btn {
					margin-top: 20px;
				}
			}
		}
		.gameover {
			align-items: center;
			justify-content: center;
			pointer-events: ${({ gameover }) => (gameover ? 'all' : 'none')};
			position: ${({ gameover }) => (gameover ? 'relative' : 'absolute')};
			flex: ${({ gameover }) => (gameover ? 1 : 0)};
			opacity: ${({ gameover }) => (gameover ? 1 : 0)};

			.gameover-inner {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				/* padding: 10px; */

				.oops {
					font-style: italic;
					color: #525252;
					margin-bottom: 10px;
				}

				.answers {
					margin: 30px 0;
					.answer {
						display: flex;
						align-items: center;
						font-size: 21px;
						padding: 10px 0;
						svg {
							margin-right: 10px;
						}
						.answer-lbl {
							margin-right: 5px;
							font-weight: 600;
							color: #525252;
						}
						.answer-val {
							font-style: italic;
						}
					}
				}
			}
		}
	}
	footer {
		display: ${({ gameover }) => (gameover ? 'block' : 'none')};
		text-align: center;
		padding: 5px 0 10px;
		font-weight: 300;
		font-size: 13px;
		letter-spacing: 0.3px;
		/* font-style: italic; */
		a {
			color: dodgerblue;
		}
	}
`;

export default Game;
