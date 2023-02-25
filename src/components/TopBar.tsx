import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

import logo from '@/assets/logo.png';
import Link from 'next/link';

interface Props {
	score: number;
	timer?: string;
}

const TopBar = ({ timer, score }: Props) => {
	return (
		<Container>
			<Link href={'/'}>
				<Image src={logo} alt="logo" height={30} />
			</Link>

			<div className="itemCon">
				<span className="item-lbl time-lbl">Time</span>
				<span className="item">{timer}</span>
			</div>

			<div className="itemCon pointsCon">
				<span className="item-lbl">Total Points</span>
				<span className="item">{score}</span>
			</div>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px 25px;

	.itemCon {
		display: flex;
		align-items: center;
		flex-direction: column;

		.item-lbl {
			opacity: 0.5;
			font-size: 13px;
			letter-spacing: 0.2px;
			margin-bottom: 2px;
		}

		.time-lbl {
			color: #483e07;
			opacity: 0.9;
		}
	}
	.pointsCon {
		/* width: 161px;
		background: #483e07;
		align-items: flex-start; */
	}
`;

export default TopBar;
