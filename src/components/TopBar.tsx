import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';

import logo from '@/assets/logo.png';

interface Props {
	score?: number;
	timer?: string;
	atFeedback?: boolean;
}

const TopBar = ({ timer, score, atFeedback }: Props) => {
	return (
		<Container>
			<Link href={'/'}>
				<Image src={logo} alt="logo" height={25} />
			</Link>

			{timer && (
				<div className="itemCon">
					<span className="item-lbl time-lbl">Time</span>
					<span className="item">{timer}</span>
				</div>
			)}

			<div className="right">
				<div className="itemCon pointsCon">
					<span className="item-lbl">Total Points</span>
					<span className="item">{score}</span>
				</div>

				{!atFeedback && (
					<Link href={'/feedback'}>
						<div className="chat">
							<IoChatbubbleEllipsesOutline />
							<span>Feedback</span>
						</div>
					</Link>
				)}
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
	.right {
		display: flex;
		align-items: center;
		.chat {
			display: flex;
			align-items: center;
			user-select: none;
			cursor: pointer;
			margin-left: 12px;
			color: #848484;
			border: 1px solid #848484;
			padding: 8px;
			border-radius: 8px;
			transition: all 0.1s linear;

			svg {
				transition: all 0.1s linear;
				margin-right: 0;
				font-size: 17px;
			}
			span {
				font-size: 14px;
				letter-spacing: 0.4px;
				width: 0;
				white-space: nowrap;
				overflow: hidden;
				transition: all 0.2s linear;
			}

			&:hover {
				color: #ff0042;
				border: 1px solid #ff0042;
				svg {
					margin-right: 5px;
				}
				span {
					width: auto;
					/* opacity: 1; */
					/* display: block; */
				}
			}
		}
	}
`;

export default TopBar;
