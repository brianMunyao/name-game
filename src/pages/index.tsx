import AppBtn from '@/components/AppBtn';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

const sentences = [
	'Ready to put your vocabulary to the test?',
	'Embark on a journey of words and fun!',
	'Unleash your word skills today!',
];
export default function Home() {
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

			<Container>
				<div className="inner">
					<h2>Welcome to</h2>
					<h1>NameGame</h1>

					<p className="quote">
						{
							sentences[
								Math.floor(Math.random() * sentences.length)
							]
						}
					</p>

					<Link href={'/game'}>
						<AppBtn type="button" text="LET'S BEGIN" />
					</Link>
				</div>
			</Container>
		</>
	);
}

const Container = styled.main`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 100vh;
	min-height: 400px;

	.inner {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		letter-spacing: 0.3px;
		h2 {
			font-size: 40px;
			color: rgb(135, 135, 135);
		}
		h1 {
			font-size: 70px;
			margin: 10px 0 30px;
			opacity: 0.9;
		}
		.quote {
			margin: 0 0 30px;
			font-style: italic;
			color: grey;
		}
		button {
			font-size: 25px;
			&:hover {
				/* box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.511); */
			}
		}
	}
`;
