import React from 'react';
import styled from 'styled-components';

// import styles from '@/styles/Home.module.css';
interface Props {
	score: number;
}

const TopBar = ({ score }: Props) => {
	return (
		<Container>
			<span>NameGame</span>
			<span>Total Points: {score}</span>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	/* flex-direction: column; */
	font-size: 20px;
	font-weight: 600;
	padding: 10px 20px;
	letter-spacing: 0.6px;
`;

export default TopBar;
