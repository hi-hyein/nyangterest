import React, { Component, Fragment } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AsyncSelect from 'react-select/async';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

// import { observer, inject } from "mobx-react";
// import InputAdornment from '@material-ui/core/InputAdornment';
// import { MdSearch } from "react-icons/md";

// import Autocomplete from './Autocomplete';


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
			text-align: center;
		}		
			
	}
	
`;

const SelectDiv = styled(AsyncSelect)`
	&& {
		// width: 56%;
		flex-basis: 70%;

		display: inline-flex;
		position: relative;
		margin: 16px 0 8px;
		padding: 0;
		flex-direction: column;
		vertical-align: top;
		transition: all 0.2s ease;

		[placeholder] {
    		text-overflow:ellipsis;
  		}  

	}
`;

const TypographyDiv = styled(Typography)`
	&& {
		position: absolute;
		font-size: 16px;
	}
`;

const TypographyNo = styled(Typography)`
	&& {
	
		padding: 14px;
		font-size: 16px;
	}
`;

const ValueDiv = styled.div`
		display: flex;
		overflow: hidden;
		flex-wrap: wrap;
		flex:1;
		padding-left: 14px;
		align-items: center;
		font-size: 16px;

		& p {
			font-size: 16px;
		}

`;

const TextFieldDiv = styled(TextField)`
	&& {
		& fieldset + div {

			display: flex;
			padding: 10px 0 10px;
			
		}
	}
		
`;

// 검색아이콘
// const IconButton = styled.button`
// 	position: relative;
// 	width: 2rem;
// 	height: 2rem;
// 	border: none;
// 	background: none;
// 	font-size: 2rem;
// 	color: #ccc;
// 	transition: all 2s ease;
// 	outline: none;

// `;


// let SearchIcon = styled(InputAdornment)`
// 	// position: relative;
// 	// width: 2rem;
// 	// font-size: 2rem;
// 	// color: #ccc;

// 	& svg {
// 		display: inline-block;
// 		position: absolute;
// 		top: 50%;
// 		-webkit-transform: translateY(-50%);
// 		-ms-transform: translateY(-50%);
// 		transform: translateY(-50%);
// 		left: 0;
// 		right: 0;
// 		margin: auto;
// 		text-align: center;
// 	}
// `;

// SearchIcon = styled.span``;

const NoOptionsMessage = (props) => {
	return (
		<TypographyNo color="textSecondary" className="TypographyNo"
			{...props.innerProps}>
			{props.children}
		</TypographyNo>
	)
}

const inputComponent = ({ inputRef, ...props }) => {
	return < div ref={inputRef} {...props} />
}

const Control = (props) => {
	return (
		<TextFieldDiv fullWidth InputProps={{
			inputComponent,
			inputProps: {
				inputRef: props.innerRef,
				children: props.children,
				...props.innerProps,
			},
		}}
			{...props.selectProps.textFieldProps}
		/>
	)
}

const Option = (props) => {
	return (
		<MenuItem
			buttonRef={props.innerRef}
			selected={props.isFocused}
			component="div"
			{...props.innerProps}
		>
			{props.children}
		</MenuItem>
	)
}

const Placeholder = (props) => {
	return (
		<TypographyDiv
			color="textSecondary"
			{...props.innerProps}
		>
			{props.children}
		</TypographyDiv>
	)
}

const SingleValue = (props) => {
	return (
		<Typography className="" {...props.innerProps}>{props.children}</Typography>
	)
}

const ValueContainer = (props) => {
	return <ValueDiv>{props.children}</ValueDiv>
}

const MultiValue = (props) => {
	return (
		<Chip tabIndex={-1}
			label={props.children}
			onDelete={props.removeProps.onClick}
			deleteIcon={<CancelIcon {...props.removeProps} />}
		/>
	)
}

const Menu = (props) => {
	return (
		<Paper square className="" {...props.innerProps}>{props.children}</Paper>
	)
}

const components = {
	Control,
	Menu,
	NoOptionsMessage,
	Option,
	Placeholder,
	SingleValue,
	MultiValue,
	ValueContainer,
};




// @inject('searchStore')
// @observer
class FormBox extends Component {

	state = {
		sidoItem: [],
		single: null,
		multi: null,
		error: false
	}

	// componentDidMount() {
	// 	this.getAsyncOptions();
	// }

	handleChange = label => value => {
		this.setState({
			[label]: value,
		});

	};


	render() {
		const getAsyncOptions = () => {
			const url = `/search/sido`;
			return fetch(url)
				.then(response => response.json())
				.then(json => json.item)
				.then(data => {
					console.log(data.map(item => ({ value: item.orgCd, label: item.orgdownNm })));
					return data.map(item => ({ value: item.orgCd, label: item.orgdownNm }));
				})
				.catch(err => {
					console.log("some error", err.message);
				});
		};

		return (
			<Fragment>
				{/* <Form autoComplete="off" className={this.props.isVisible ? 'slide-in' : 'slide-out'}> */}
				<Form autoComplete="on" className={this.props.isVisible ? 'slide-in' : 'slide-out'}>
					<FormControlDiv variant="outlined">
						<Fieldset>
							<legend>시작일 &amp; 종료일 </legend>
							{this.props.children}
						</Fieldset>
					</FormControlDiv>
					<SelectDiv
						inputId="react-select-multiple"
						textFieldProps={{
							className: "TextFieldDiv",
							variant: "outlined",
							label: '검색어',
							InputLabelProps: {
								htmlFor: 'react-select-multiple',
								shrink: true,
							}
						}}

						loadOptions={getAsyncOptions}
						components={components}
						value={this.state.multi}
						onChange={this.handleChange('multi')}
						// onChange={this.handleChange('single')}
						placeholder="지역을 입력하세요."
						isMulti
						// isClearable
						cacheOptions
						defaultOptions
					/>
					{/* <div className="divider" /> */}

					{/* <TextFieldDiv
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
					/> */}
				</Form>
			</Fragment>
		);
	}
}

NoOptionsMessage.propTypes = {
	/**
	 * The children to be rendered.
	 */
	children: PropTypes.node,
	/**
	 * Props to be passed on to the wrapper.
	 */
	innerProps: PropTypes.object.isRequired,
	selectProps: PropTypes.object.isRequired,
};

inputComponent.propTypes = {
	inputRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({
			current: PropTypes.any.isRequired,
		}),
	]),
};

Control.propTypes = {
	/**
	 * Children to render.
	 */
	children: PropTypes.node,
	/**
	 * The mouse down event and the innerRef to pass down to the controller element.
	 */
	innerProps: PropTypes.shape({
		onMouseDown: PropTypes.func.isRequired,
	}).isRequired,
	innerRef: PropTypes.oneOfType([
		PropTypes.oneOf([null]),
		PropTypes.func,
		PropTypes.shape({
			current: PropTypes.any.isRequired,
		}),
	]).isRequired,
	selectProps: PropTypes.object.isRequired,
};

Option.propTypes = {
	/**
	 * The children to be rendered.
	 */
	children: PropTypes.node,
	/**
	 * props passed to the wrapping element for the group.
	 */
	innerProps: PropTypes.shape({
		id: PropTypes.string.isRequired,
		key: PropTypes.string.isRequired,
		onClick: PropTypes.func.isRequired,
		onMouseMove: PropTypes.func.isRequired,
		onMouseOver: PropTypes.func.isRequired,
		tabIndex: PropTypes.number.isRequired,
	}).isRequired,
	/**
	 * Inner ref to DOM Node
	 */
	innerRef: PropTypes.oneOfType([
		PropTypes.oneOf([null]),
		PropTypes.func,
		PropTypes.shape({
			current: PropTypes.any.isRequired,
		}),
	]).isRequired,
	/**
	 * Whether the option is focused.
	 */
	isFocused: PropTypes.bool.isRequired,
	/**
	 * Whether the option is selected.
	 */
	isSelected: PropTypes.bool.isRequired,
};

Placeholder.propTypes = {
	/**
	 * The children to be rendered.
	 */
	children: PropTypes.node,
	/**
	 * props passed to the wrapping element for the group.
	 */
	innerProps: PropTypes.object,
	selectProps: PropTypes.object.isRequired,
};

SingleValue.propTypes = {
	/**
	 * The children to be rendered.
	 */
	children: PropTypes.node,
	/**
	 * Props passed to the wrapping element for the group.
	 */
	innerProps: PropTypes.any.isRequired,
	selectProps: PropTypes.object.isRequired,
};

ValueContainer.propTypes = {
	/**
	 * The children to be rendered.
	 */
	children: PropTypes.node,
	selectProps: PropTypes.object.isRequired,
};

MultiValue.propTypes = {
	children: PropTypes.node,
	isFocused: PropTypes.bool.isRequired,
	removeProps: PropTypes.shape({
		onClick: PropTypes.func.isRequired,
		onMouseDown: PropTypes.func.isRequired,
		onTouchEnd: PropTypes.func.isRequired,
	}).isRequired,
	selectProps: PropTypes.object.isRequired,
};

Menu.propTypes = {
	/**
	 * The children to be rendered.
	 */
	children: PropTypes.element.isRequired,
	/**
	 * Props to be passed to the menu wrapper.
	 */
	innerProps: PropTypes.object.isRequired,
	selectProps: PropTypes.object.isRequired,
};

export default FormBox;