import React, { Component, Fragment } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MdSearch } from "react-icons/md";
import Calendar2 from './Calendar2';
import styled from 'styled-components';
import { fadeInDown, fadeOut } from "../Animations";

// 셀렉트박스
const Form = styled.form`

	display:flex;
	// margin-top: -150px
	// height: 0
	flex: auto;
	text-align: left;
	transform: translate(-500%);
	transition: all 1s ease-in-out
	
	&.slide-in{
		margin-top: 24px;
		// height: 100%;
		transform: translateX(0);

		@media screen and (max-width: 640px) {
			transform: none;
			// animation: ${fadeInDown} 0.5s both;
			text-align: center;
			opacity: 1;
		}
	}

	&.slide-out{
		transform: translateX(-500%);

		@media screen and (max-width: 640px) {
			margin-top: -468%;
			animation: ${fadeOut} 0.5s both;
			opacity: 0;

		}
	}

	&& {
		& > div {margin-right:2%}
	}


`;

const FormControlDiv = styled(FormControl)`

	&& {
		display: inline-flex;
		position: relative;
		margin: 16px 10px 8px;
		padding: 0;
		min-width: 310px;
		flex-direction: column;
		vertical-align: top;
		transition: all 0.2s ease;
		flex-basis: 20%;

		@media screen and (max-width: 1024px) {
			// margin: 2% 10px;
		}

		@media screen and (max-width: 640px) {
			width: 90%;
		}


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
	:focus-within { border: 2px solid #3f51b5;}

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
const SearchIcon = styled(InputAdornment)`
	position: relative;
	width: 2rem;
	font-size: 2rem;
	color: #ccc;
	
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

class SearchItems extends Component {

	state = {

	}

	componentDidMount() {
	}


	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	render() {

		return (
			<Fragment>
				<Form autoComplete="off" className={this.props.isVisible ? 'slide-in' : 'slide-out'}>
					<FormControlDiv variant="outlined">
						<Fieldset>
							<legend>시작일 &amp; 종료일 </legend>
							<Calendar2 />
						</Fieldset>
					</FormControlDiv>
					<TextFieldDiv
						label="검색어"
						placeholder="시도,시군구,보호소이름,상태,품종,중성화여부 ex) 인천광역시 부평구 코숏 "
						margin="normal"
						variant="outlined"
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
							startAdornment: <SearchIcon position="start"><MdSearch /></SearchIcon>
						}}
					/>
				</Form>
			</Fragment>
		);
	}
}

export default SearchItems;