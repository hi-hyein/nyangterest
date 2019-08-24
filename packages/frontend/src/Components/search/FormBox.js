import React, { Component, Fragment } from 'react';
// import { observer, inject } from "mobx-react";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MdSearch } from "react-icons/md";
import styled from 'styled-components';

// 셀렉트박스
const Form = styled.form`

	display:flex;
	flex: auto;
	text-align: left;
	// transform: translate(-500%);
	transition: all 0.7s ease-in-out

	@media screen and (max-width: 700px) {
		flex-wrap: wrap;
	}
	
	&.slide-in{
		margin-top: 24px;
		height: 100%;
		transform: translateX(0);

		@media screen and (max-width: 1024px) {

			+ .btn-wrap {
				margin-top:24px;
				top: unset;

			}
		}

		@media screen and (max-width: 700px) {
			margin-top: 40px;
			transform: none;
			text-align: center;
			opacity: 1;

			+ .btn-wrap {
				margin-top: 15px;
				
			}
		}
	}

	&.slide-out{
		transform: translateX(-500%);

		@media screen and (max-width: 700px) {
			margin-top: -70px;
			transform: translateY(-100%);
			opacity: 0;

		}
	}

	&& {
		& > div {
				margin-right:2%;

				@media screen and (max-width: 700px) {
					margin-right: 0;
					min-width: 100%;
				}
		}
	}


`;

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
	height: 100%;
    min-height: 1.1875em;
	padding: 0 14px;
    border: 1px solid rgba(0, 0, 0, 0.23);
	border-radius: 4px;
	transition: padding-left 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,border-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
	cursor: pointer;

	&:hover {
		border: 1px solid #000
	}


	// 인풋의 부모 폼창에 포커스 효과
	:focus-within { 
		border: 2px solid #3f51b5;

		& legend {
			color: #3f51b5
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
		}		
			
	}
	
`;

const TextFieldDiv = styled(TextField)`
	&& {
		// width: 56%;
		flex-basis: 70%;

		[placeholder] {
    		text-overflow:ellipsis;
  		}  

	}
`;



// 검색아이콘
const IconButton = styled.button`
	position: relative;
	width: 2rem;
	height: 2rem;
	border: none;
	background: none;
	font-size: 2rem;
	color: #ccc;
	transition: all 2s ease;
	outline: none;

`;


let SearchIcon = styled(InputAdornment)`
	// position: relative;
	// width: 2rem;
	// font-size: 2rem;
	// color: #ccc;
	
	& svg {
		display: inline-block;
		position: absolute;
		top: 50%;
		-webkit-transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		transform: translateY(-50%);
		left: 0;
		right: 0;
		margin: auto;
		text-align: center;
	}
`;

SearchIcon = styled.span``;
// @inject('searchStore')
// @observer

class FormBox extends Component {

	render() {

		return (
			<Fragment>
				{/* <Form autoComplete="off" className={this.props.isVisible ? 'slide-in' : 'slide-out'}> */}
				<Form autoComplete="off" className={this.props.isVisible ? 'slide-in' : 'slide-out'}>
					<FormControlDiv variant="outlined">
						<Fieldset>
							<legend>시작일 &amp; 종료일 </legend>
							{this.props.children}
						</Fieldset>
					</FormControlDiv>
					<TextFieldDiv
						label="검색어"
						placeholder="시도,시군구,보호소이름,상태,품종,중성화여부 ex) 인천광역시 부평구 한국 고양이 "
						margin="normal"
						variant="outlined"
						name="search"
						value={this.props.value}
						onChange={this.props.onChange}
						InputLabelProps={{
							shrink: true,
						}}
						InputProps={{
							style: {
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								width: '100%',
							},
							startAdornment: <IconButton type="submit" ><SearchIcon position="start"><MdSearch /></SearchIcon></IconButton>
						}}
					/>
				</Form>
			</Fragment>
		);
	}
}

export default FormBox;