import React from 'react';
import styled from 'styled-components';

interface Props {
	label: string;
	type?: string;
	id: string;
	value: string;
	error?: string;
	touched?: boolean;
	autoComplete?: 'on' | 'off';
	onChange: (e: React.ChangeEvent<any>) => void;
	onBlur: (e?: React.FocusEvent<any>) => void;
}

const AppInput = ({
	label,
	type = 'text',
	id,
	value,
	error,
	touched,
	autoComplete = 'off',
	onChange,
	onBlur,
}: Props) => {
	return (
		<Container>
			<p className="input-label">{label}</p>
			<input
				value={value}
				type={type}
				id={id}
				autoComplete={autoComplete}
				className={'input-text'}
				onChange={onChange}
				onBlur={onBlur}
			/>
			{touched && <p className="error">{error}</p>}
		</Container>
	);
};

const Container = styled.div`
	position: relative;
	margin: 10px 0;

	.input-label {
		font-size: 18px;
		font-weight: 600;
		letter-spacing: 0.3px;
		text-align: center;
		padding: 10px;
		opacity: 0.7;
	}
	.input-text {
		display: block;
		width: 250px;
		padding: 10px;
		border: 2px solid #e4e4e4bb;
		border-radius: 5px;
		transition: all 0.2s linear;
		font-size: 17px;
		box-shadow: 0.2rem 0.8rem 1.6rem #f3f3f360;

		&:hover {
			border: 2px solid #e4e4e4;
			box-shadow: 0.2rem 0.8rem 1.6rem #ebebeb;
		}
		&:focus {
			outline: none;
			box-shadow: 0.2rem 0.8rem 1.6rem #ebebeb;
			border: 2px solid #03acf6;
		}
	}
	.error {
		color: #d90909;
		margin: 0 2px;
		font-weight: 600;
	}
`;

export default AppInput;
