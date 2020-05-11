import React, { Fragment } from 'react';
import FormControl from '@material-ui/core/FormControl';
import styled from 'styled-components';

const FormControlDiv = styled(FormControl)`

	&& {
		display: inline-flex;
		position: relative;
		margin: 16px 0 8px;
		padding: 0;
		min-width: 310px;
		flex-direction: column;
		vertical-align: top;
		transition: all 0.2s ease;
		flex-basis: 20%;

	}
`;

const Fieldset = styled.fieldset`
    position: relative;
	z-index: 99;
	top: -6px;
	min-width: 100%;
	height: 62px;
    min-height: 1.1875em;
	// padding: 0 14px;
    border: 1px solid rgba(0, 0, 0, 0.23);
	border-radius: 4px;
	transition: padding-left 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,border-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
	cursor: pointer;

	&:hover {
		border: 1px solid #000
	}


	// 인풋의 부모 폼창에 포커스 효과
	:focus-within { 
		border: 2px solid #a1ceab;

		& legend {
			color: #a1ceab
		}
	}

	& legend {	
				color: rgba(0, 0, 0, 0.54);
				padding: 0;
				font-size: 12px;
				line-height: 1;
				text-align: left;
				transition: width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;

		& + div {
			padding: 12px 0 11px;
			text-align: center;
		}		
			
	}
	
`;

const FormBox = (props) => {
	return (
		<Fragment>
			<FormControlDiv variant="outlined">
				<Fieldset>
					<legend>시작일 &amp; 종료일 </legend>
					{props.children}
				</Fieldset>
			</FormControlDiv>
		</Fragment>
	);
};

export default FormBox;
