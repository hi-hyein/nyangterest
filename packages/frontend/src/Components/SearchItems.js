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
	margin-right: 65px;
	transform: translateX(-1200%);
	transition: all 0.5s ease
	
	&.slide-in{
		transform: translateX(0);
	}

	&.slide-out{
		transform: translateX(-1200%);
	}

`;

const FormControlDiv = styled(FormControl)`
	&& {
		min-width: 120px;
		margin-right: 10px;

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
	top: 3px;
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
							<MenuItem value={10}>Ten</MenuItem>
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
					<FormControlDiv>
						<Calendar2 />
						{/* <InputLabel ref={ref => { this.InputLabelRef = ref; }} htmlFor="outlined-org_cd-simple">
							시작일&amp;종료일
						</InputLabel>
						<Select
							value={this.state.bgAnden}
							onChange={this.handleChange}
							input={<OutlinedInput labelWidth={this.state.labelWidth} name="bgAnden" id="outlined-age-simple" />}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={1}>Ten</MenuItem>
							<MenuItem value={2}>Twenty</MenuItem>
							<MenuItem value={3}>Thirty</MenuItem>
						</Select> */}
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
							<MenuItem value={1}>Ten</MenuItem>
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