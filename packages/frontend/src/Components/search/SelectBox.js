import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import styled from "styled-components";
import { Chip } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

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
`;

const TextFieldDiv = styled(TextField)`
	&& {
		& fieldset + div {
			display: flex;
			padding: 10px 0 10px;

			& div[class$= singleValue] {
				max-width: calc(100% - 60px);
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

const MultiValue = props => {
	return (
		<Chip
			tabIndex={-1}
			label={props.children}
			onDelete={props.removeProps.onClick}
			deleteIcon={<CancelIcon {...props.removeProps} />}
		/>
	);
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

	state = { numOfRows: 1000 }

	getAsyncOptions = async () => {
		const { numOfRows } = this.state;
		const url = `/search/${numOfRows}/`;
		const response = await fetch(url);
		const json = await response.json();
		const data = json.item;
		// const total = Object.keys(data).length
		console.log(data)

		return (
			data
				.map(x => x.kindCd)
				// .reduce((arr, elem) => [...arr, ...elem], []) // flatten nested array 중첩배열
				.filter((elem, index, arr) => arr.indexOf(elem) === index) // get array of unique values 고유키값
				.map(category => ({ value: category, label: category }))
		);
	};

	render() {
		return (
			< Fragment >
				<SelectDiv
					textFieldProps={{
						className: "TextFieldDiv",
						variant: "outlined",
						label: "품종",
						InputLabelProps: {
							htmlFor: "react-select-multiple",
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

MultiValue.propTypes = {
	children: PropTypes.node,
	isFocused: PropTypes.bool.isRequired,
	removeProps: PropTypes.shape({
		onClick: PropTypes.func.isRequired,
		onMouseDown: PropTypes.func.isRequired,
		onTouchEnd: PropTypes.func.isRequired
	}).isRequired,
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
