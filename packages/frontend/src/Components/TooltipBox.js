import React, { Fragment } from "react";
import { MdPets } from "react-icons/md";
import styled from "styled-components";

// 툴팁

const IconButton = styled.button`
	position: absolute;
	top: 3px;
	right: 2.2rem;
	width: 3.2rem;
	height: 3rem;
	border: none;
	background: none;
	font-size: 2.3rem;
	color: #ccc;
	// transition: all 2s ease;
	transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

		& + div {

			position: absolute;
			top: 48px;
			right: -25px;	
			z-index: 99;
			display: block;
			padding: 11px 15px 10px 13px;
			background-color: #808080;
			border: 1px solid rgba(115, 115, 115, 0.8);
			border-radius: 5px;
			font-size: 14px;
			color: #fff;
			-webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
			box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15)

			& > p {color: #f00}
		}

		& + div:before {

			position: absolute;
			left: 64px;
			top: -6px;
			width: 9px;
			height: 9px;
			border: solid rgba(115, 115, 115, 0.8);
			border-width: 0 1px 1px 0;
			border-radius: 0 0 2px 0;
			background-color: #808080;
			-webkit-transform: rotate(45deg);
			-ms-transform: rotate(45deg);
			transform: rotate(45deg);
			content: '';
		}

		&:hover + div {
			display: block;
		}
`;

const TooltipBox = (props) => {
	return (
		<Fragment>
			<IconButton onClick={props.onClick}><MdPets /></IconButton>
			<div><p>날짜/종류/상태 필터</p></div>
		</Fragment>
	);
};

export default TooltipBox;