import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { FiSend } from 'react-icons/fi';
import { HiThumbUp } from 'react-icons/hi';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { writeFeedback } from '../api/firebase_apis';
import { getScore } from '../api/storage';
import AppBtn from '@/components/AppBtn';
import TopBar from '@/components/TopBar';

const FeedBack = () => {
	const [submitted, setSubmitted] = useState(false);

	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			subject: '',
			message: '',
		},
		onSubmit: async (values) => {
			const r = await writeFeedback(values.subject, values.message);
			setSubmitted(true);

			setTimeout(() => {
				router.push('/game');
			}, 3000);
		},
		validationSchema: Yup.object({
			subject: Yup.string().trim().required('Subject is required'),
			message: Yup.string().trim().required('Message is required'),
		}),
	});

	return (
		<>
			<Head>
				<title>Name Game</title>
				<meta
					name="description"
					content="Share Your Feedback to Help Us Improve"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<form onSubmit={formik.handleSubmit}>
				<Container>
					<TopBar atFeedback score={getScore()} />
					<div className="inner">
						<div className="inner-inner">
							<p className="title">FeedBack</p>
							<p className="subtitle">
								Share Your Feedback to Help Us Improve
							</p>
							<input
								id="subject"
								value={formik.values.subject}
								placeholder="Subject"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.subject && (
								<p className="error">{formik.errors.subject}</p>
							)}
							<textarea
								id="message"
								value={formik.values.message}
								placeholder="Share Your Feedback and Suggestions Here"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.message && (
								<p className="error">{formik.errors.message}</p>
							)}
							<AppBtn
								type="submit"
								disabled={submitted}
								className="btn"
								classCon="btn-con">
								<span>
									{submitted
										? 'Thanks For The Feedback'
										: 'Send'}
								</span>
								{submitted ? <HiThumbUp /> : <FiSend />}
							</AppBtn>
						</div>
					</div>
				</Container>
			</form>
		</>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	min-height: 600px;

	.inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		width: 100%;
		padding: 10px;

		.inner-inner {
			display: flex;
			flex-direction: column;
			width: 400px;

			p {
				text-align: center;
			}
			.title {
				font-size: 30px;
				letter-spacing: 0.3px;
				margin-bottom: 10px;
			}
			.subtitle {
				font-weight: 300;
				color: #707070;
				margin-bottom: 25px;
			}
			input,
			textarea {
				margin: 15px 0 5px;
				padding: 13px;
				font-size: 15px;
				border-radius: 6px;
				border: 1px solid #e1e1e1;
				font-weight: 300;
				transition: all 0.1s linear;
				letter-spacing: 0.3px;
			}
			input {
				font-weight: 400;
			}
			textarea {
				resize: vertical;
				min-height: 140px;
			}
			input:hover,
			textarea:hover {
				border: 1px solid #d9090966;
			}

			input:focus,
			textarea:focus {
				border: 1px solid #d90909;
				outline: none;
			}

			input::placeholder,
			textarea::placeholder {
				color: #9e9e9e;
			}
			.btn {
				display: flex;
				align-items: center;
				justify-content: center;
				svg {
					margin-left: 7px;
				}
			}
			.btn-con {
				margin-top: 25px;
			}
			.error {
				color: #d90909;
				text-align: left;
				font-size: 13px;
				/* font-weight: 500; */
				margin: 0 0 0 4px;
				letter-spacing: 0.2px;
			}
		}
	}
`;

export default FeedBack;
