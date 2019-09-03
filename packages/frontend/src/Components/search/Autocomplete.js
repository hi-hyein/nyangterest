import React, { Component } from 'react';
import AsyncSelect from "react-select/async"
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
// import { observer, inject } from "mobx-react";

// @inject('searchStore')
// @observer

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

class Autocomplete extends Component {
	state = {
		data: [],
		single: null,
		multi: null,
		error: false
	}

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

export default Autocomplete;