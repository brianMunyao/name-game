import React from 'react';
import styled from 'styled-components';

interface Props {
	text: string;
	disabled?: boolean;
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
}

const AppBtn = ({ text, disabled, className, type, onClick }: Props) => {
	return (
		<Btn
			className={className}
			disabled={disabled}
			type={type}
			onClick={onClick}>
			<span className="button-82-shadow"></span>
			<span className="button-82-edge"></span>
			<span className="button-82-front text">{text}</span>
		</Btn>
	);
};

const Btn = styled.button`
	position: relative;
	border: none;
	background: transparent;
	padding: 0;
	cursor: pointer;
	outline-offset: 4px;
	transition: filter 250ms;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	.button-82-shadow {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 12px;
		background: hsl(0deg 0% 0% / 0.25);
		will-change: transform;
		transform: translateY(2px);
		transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
	}
	.button-82-edge {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 12px;
		background: linear-gradient(
			to left,
			hsl(340deg 100% 16%) 0%,
			hsl(340deg 100% 32%) 8%,
			hsl(340deg 100% 32%) 92%,
			hsl(340deg 100% 16%) 100%
		);
	}
	.button-82-front {
		display: block;
		position: relative;
		padding: 8px 25px;
		border-radius: 12px;
		font-size: 1.1rem;
		color: white;
		background: hsl(345deg 100% 47%);
		will-change: transform;
		transform: translateY(-4px);
		transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
	}
	/* @media (min-width: 768px) {
		.button-82-front {
			font-size: 1.25rem;
			padding: 12px 42px;
		}
	} */

	&:hover {
		filter: brightness(110%);
		-webkit-filter: brightness(110%);
	}
	&:hover .button-82-front {
		transform: translateY(-6px);
		transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
	}
	&:hover .button-82-shadow {
		transform: translateY(4px);
		transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
	}
	&:active .button-82-front {
		transform: translateY(-2px);
		transition: transform 34ms;
	}

	&:active .button-82-shadow {
		transform: translateY(1px);
		transition: transform 34ms;
	}
	&:focus:not(:focus-visible) {
		outline: none;
	}

	&:disabled {
		cursor: not-allowed;
	}
	&:disabled .button-82-front {
		transform: translateY(-2px);
		transition: transform 34ms;
		background: #787878;
	}

	&:disabled .button-82-shadow {
		transform: translateY(1px);
		transition: transform 34ms;
		background: linear-gradient(
			to left,
			#292929 0%,
			#515151 8%,
			#515151 92%,
			#292929 100%
		);
		opacity: 0;
	}
`;

export default AppBtn;
