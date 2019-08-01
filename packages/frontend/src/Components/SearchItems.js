import React, { Component, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { MdSearch } from "react-icons/md";
import styled from 'styled-components';
import Calendar2 from './Calendar2';

// 셀렉트박스
const Form = styled.form`
	display:inline-block;
	margin-top: -150px
	height: 0;
	text-align: left;
	transform: translate(-500%);
	transition: all 0.5s ease-in-out
	
	&.slide-in{
		margin-top: 24px;
		height: 100%;
		transform: translateX(0);
	}

	&.slide-out{
		transform: translateX(-500%);
	}


`;

const FormControlDiv = styled(FormControl)`
	&& {
		min-width: 120px;
		margin: 2% 10px 0;

	}
`;

const Fieldset = styled.fieldset`
    position: relative;
	top: -6px;
	min-width: 265px;
	height: 100%;
    min-height: 1.1875em;
	padding: 11px 14px 10px;
    border: 1px solid rgba(0, 0, 0, 0.23);
	border-radius: 4px;
	transition: padding-left 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,border-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
	cursor: pointer;

	&:hover {
		border: 1px solid #000
	}

	& legend {	
				color: rgba(0, 0, 0, 0.54);
				padding: 0;
				font-size: 12px;
				line-height: 1;
				text-align: left;
				transition: width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
			
			}
	
`;


const OutlinedInputDiv = styled(OutlinedInput)`
	&& {
		display: flex;
	}
`;

const MenuItemDiv = styled(MenuItem)`

	&& {
		display: inline-block;
		width: 19%;
		font-size: 0.8rem;
		text-align: center;

	}
`;

// 검색아이콘
const IconButton = styled.button`
	position: relative;
	top: 25px;
	width: 3rem;
	height: 3rem;
	border: none;
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
		org_cd: "시도",
		upr_cd: "시군구",
		careNm: "보호소이름",
		state: "상태",
		bgAnden: "시작일&amp;종료일",
		kind: "품종",
		age: '',
		neuterYn: '중성화여부',
		labelWidth: 0,
	}

	componentDidMount() {
		this.setState({
			labelWidth: findDOMNode(this.InputLabelRef).offsetWidth,
		});
	}


	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	render() {
		// const { org_cd } = this.state;

		return (
			<Fragment>
				<Form autoComplete="off" className={this.props.isVisible ? 'slide-in' : 'slide-out'}>
					<FormControlDiv className="sido" variant="outlined">
						<InputLabel ref={ref => { this.InputLabelRef = ref; }} htmlFor="outlined-org_cd-simple">
							시도
						</InputLabel>
						<Select
							value={this.state.org_cd}
							onChange={this.handleChange}
							input={<OutlinedInputDiv labelWidth={this.state.labelWidth} name="org_cd" id="outlined-org_cd-simple" />}
						>
							<MenuItemDiv value={1}><em>서울</em></MenuItemDiv>
							<MenuItemDiv value={2}><em>경기</em></MenuItemDiv>
							<MenuItemDiv value={3}><em>인천</em></MenuItemDiv>
							<MenuItemDiv value={4}>서울</MenuItemDiv>
							<MenuItemDiv value={5}>경기</MenuItemDiv>
							<MenuItemDiv value={6}>인천</MenuItemDiv>
							<MenuItemDiv value={7}>서울</MenuItemDiv>
							<MenuItemDiv value={8}>경기</MenuItemDiv>
							<MenuItemDiv value={9}>인천</MenuItemDiv>
							<MenuItemDiv value={10}>서울</MenuItemDiv>
						</Select>
					</FormControlDiv>
					<FormControlDiv variant="outlined">
						<InputLabel ref={ref => { this.InputLabelRef = ref; }} htmlFor="outlined-org_cd-simple">
							시군구
						</InputLabel>
						<Select
							value={this.state.upr_cd}
							onChange={this.handleChange}
							input={<OutlinedInput labelWidth={this.state.labelWidth} name="upr_cd" id="outlined-age-simple" />}

						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControlDiv>
					<FormControlDiv variant="outlined">
						<InputLabel ref={ref => { this.InputLabelRef = ref; }} htmlFor="outlined-org_cd-simple">
							보호소이름
						</InputLabel>
						<Select
							value={this.state.careNm}
							onChange={this.handleChange}
							input={<OutlinedInput labelWidth={this.state.labelWidth} name="careNm" id="outlined-age-simple" />}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={10}>보호소이름이얼마나길려나모르겠다.</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControlDiv>
					<FormControlDiv variant="outlined">
						<InputLabel ref={ref => { this.InputLabelRef = ref; }} htmlFor="outlined-org_cd-simple">
							상태
						</InputLabel>
						<Select
							value={this.state.state}
							onChange={this.handleChange}
							input={<OutlinedInput labelWidth={this.state.labelWidth} name="state" id="outlined-age-simple" />}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControlDiv>
					<FormControlDiv variant="outlined">
						<Fieldset>
							<legend>시작일 &amp; 종료일 </legend>
							<Calendar2 />
						</Fieldset>
						{/* <InputLabel ref={ref => { this.InputLabelRef = ref; }} htmlFor="outlined-org_cd-simple">
							시작일&amp;종료일
						</InputLabel> */}
					</FormControlDiv>
					<FormControlDiv variant="outlined">
						<InputLabel ref={ref => { this.InputLabelRef = ref; }} htmlFor="outlined-org_cd-simple">
							품종
						</InputLabel>
						<Select
							value={this.state.kind}
							onChange={this.handleChange}
							input={<OutlinedInput labelWidth={this.state.labelWidth} name="kind" id="outlined-age-simple" />}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={1}>[고양이] 한국 고양이</MenuItem>
							<MenuItem value={2}>Twenty</MenuItem>
							<MenuItem value={3}>Thirty</MenuItem>
						</Select>
					</FormControlDiv>
					<FormControlDiv variant="outlined">
						<InputLabel ref={ref => { this.InputLabelRef = ref; }} htmlFor="outlined-org_cd-simple">
							나이
						</InputLabel>
						<Select
							value={this.state.age}
							onChange={this.handleChange}
							input={<OutlinedInput labelWidth={this.state.labelWidth} name="age" id="outlined-age-simple" />}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={1}>Ten</MenuItem>
							<MenuItem value={2}>Twenty</MenuItem>
							<MenuItem value={3}>Thirty</MenuItem>
						</Select>
					</FormControlDiv>
					<FormControlDiv variant="outlined">
						<InputLabel ref={ref => { this.InputLabelRef = ref; }} htmlFor="outlined-org_cd-simple">
							중성화여부
						</InputLabel>
						<Select
							value={this.state.neuterYn}
							onChange={this.handleChange}
							input={<OutlinedInput labelWidth={this.state.labelWidth} name="neuterYn" id="outlined-age-simple" />}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={1}>Y</MenuItem>
							<MenuItem value={2}>N</MenuItem>
						</Select>
					</FormControlDiv>
					<IconButton><MdSearch /></IconButton>
				</Form>
			</Fragment>
		);
	}
}

export default SearchItems;