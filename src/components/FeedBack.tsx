import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

const FeedBack = () => {
	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		},
	};
	return (
		<Container>
			<ReactModal
				isOpen={true}
				contentLabel="feedback-modal"
				style={customStyles}>
				<div>FeedBack</div>
			</ReactModal>
		</Container>
	);
};

const Container = styled.div`
	.overlay {
		z-index: 99;
		/* background: red; */
	}
`;

export default FeedBack;
