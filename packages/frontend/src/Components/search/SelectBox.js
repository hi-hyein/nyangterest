import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import styled from "styled-components";

const SelectDiv = styled(AsyncSelect)`
	&& {
		// width: 56%;
		flex-basis: 30%;
		min-width: 190px;
		display: inline-flex;
		position: relative;
		margin: 16px 0 8px;
		padding: 0;
		flex-direction: column;
		vertical-align: top;
		transition: all 0.2s ease;

		[placeholder] {
			text-overflow: ellipsis;
		}

		// @media screen and (max-width: 1280px) {
			flex-basis: 60%;
		// }
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
	flex: 1;
	padding-left: 14px;
	align-items: center;
	font-size: 16px;

	& p {
		font-size: 16px;
	}

	& + div {
		cursor: pointer;
	}

`;

const TextFieldDiv = styled(TextField)`
	&& {

		& label[class*="-focused"] {
			color: #a1ceab;
		}

		& div[class*="-focused"] fieldset {
			border: 2px solid #a1ceab;
		}

		& fieldset + div {
			display: flex;
			padding: 10px 0 10px;

			& div[class$="singleValue"] {
				max-width: calc(100% - 60px);
			}

			& div[class$="-Input"] {
				color: #fff;

				& input{
					color: inherit;
				}
			}
		}
	}	
	 
`;

const NoOptionsMessage = props => {
	return (
		<TypographyNo
			color="textSecondary"
			className="TypographyNo"
			{...props.innerProps}
		>
			{props.children}
		</TypographyNo>
	);
};

const inputComponent = ({ inputRef, ...props }) => {
	return <div ref={inputRef} {...props} />;
};

const Control = props => {
	return (
		<TextFieldDiv
			fullWidth
			InputProps={{
				inputComponent,
				inputProps: {
					inputRef: props.innerRef,
					children: props.children,
					...props.innerProps
				}
			}}
			{...props.selectProps.textFieldProps}
		/>
	);
};

const loadOptions = props => {
	return (
		<MenuItem
			buttonRef={props.innerRef}
			selected={props.isFocused}
			component="div"
			{...props.innerProps}
		>
			{props.children}
		</MenuItem>
	);
};

const Placeholder = props => {
	return (
		<TypographyDiv color="textSecondary" {...props.innerProps}>
			{props.children}
		</TypographyDiv>
	);
};

const SingleValue = props => {
	return (
		<Typography className="" {...props.innerProps}>
			{props.children}
		</Typography>
	);
};

const ValueContainer = props => {
	return <ValueDiv>{props.children}</ValueDiv>;
};


const Menu = props => {
	return (
		<Paper square className="" {...props.innerProps}>
			{props.children}
		</Paper>
	);
};

const components = {
	Control,
	Menu,
	NoOptionsMessage,
	loadOptions,
	Placeholder,
	ValueContainer
};

class SelectBox extends Component {

	getAsyncOptions = async () => {
		const url = `/search/kind/`;
		const response = await fetch(url);
		const json = await response.json();
		const data = json.item;

		// 기타위치에 코리안숏헤어 정보를 넣고 한국고양이위치에 기타정보를 넣음.
		let dataSort = data.splice(1, 1, { KNm: "코리안숏헤어", kindCd: "000200" })
		dataSort = data.splice(32, 1, { KNm: "기타", kindCd: "000201" })
		console.log(dataSort)

		return (
			this.getData(data)
			// data
			// 	.map(x => x.KNm)
			// 	.map(category => ({ value: category, label: category }))
			// .map(x => x.KNm.replace("한국 고양이", "코리안숏헤어")) // 배열재정렬
			// .reduce((arr, elem) => [...arr, ...elem], []) // flatten nested array 중첩배열
			// .filter((elem, index, arr) => arr.indexOf(elem) === index) // get array of unique values 고유키값
		)

	};

	getData = (data) => {
		const dataCategory = data
			.map(category => ({ value: category.kindCd, label: category.KNm }))

		return dataCategory

	}

	render() {
		return (
			< Fragment >
				<SelectDiv
					textFieldProps={{
						className: "TextFieldDiv",
						variant: "outlined",
						label: "품종",
						InputLabelProps: {
							shrink: true
						}
					}}
					defaultValue={this.props.defaultValue}
					onChange={this.props.onChange}
					loadOptions={this.getAsyncOptions}
					components={components}
					placeholder="품종"
					cacheOptions
					defaultOptions
				/>
			</Fragment >
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
	selectProps: PropTypes.object.isRequired
};

inputComponent.propTypes = {
	inputRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({
			current: PropTypes.any.isRequired
		})
	])
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
		onMouseDown: PropTypes.func.isRequired
	}).isRequired,
	innerRef: PropTypes.oneOfType([
		PropTypes.oneOf([null]),
		PropTypes.func,
		PropTypes.shape({
			current: PropTypes.any.isRequired
		})
	]).isRequired,
	selectProps: PropTypes.object.isRequired
};

loadOptions.propTypes = {
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
		tabIndex: PropTypes.number.isRequired
	}).isRequired,
	/**
	 * Inner ref to DOM Node
	 */
	innerRef: PropTypes.oneOfType([
		PropTypes.oneOf([null]),
		PropTypes.func,
		PropTypes.shape({
			current: PropTypes.any.isRequired
		})
	]).isRequired,
	/**
	 * Whether the option is focused.
	 */
	isFocused: PropTypes.bool.isRequired,
	/**
	 * Whether the option is selected.
	 */
	isSelected: PropTypes.bool.isRequired
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
	selectProps: PropTypes.object.isRequired
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
	selectProps: PropTypes.object.isRequired
};

ValueContainer.propTypes = {
	/**
	 * The children to be rendered.
	 */
	children: PropTypes.node,
	selectProps: PropTypes.object.isRequired
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
	selectProps: PropTypes.object.isRequired
};

export default SelectBox;
