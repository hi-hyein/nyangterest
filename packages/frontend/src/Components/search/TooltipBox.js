import React from "react";
import { MdPets } from "react-icons/md";
import styled from "styled-components";

// 툴팁


const TooltipBoxWrapper = styled.div`
	position: relative;
	top: 42px;
	margin-left: auto;
	// min-width: 180px;
	height: 100px;

	@media screen and (max-width: 1024px) {
		top: unset;
		height: auto;
	}

	@media screen and (max-width: 640px) {
		top: 6px
	}

`;

const IconButton = styled.button`
	// position: absolute;
    // top: 0;
	// right: 1rem;
    // transform: translateY(-50%);
	width: 3.2rem;
	height: 3rem;
	border: none;
	background: none;
	font-size: 2.3rem;
	color: #ccc;
	transition: all 2s ease;
	outline: none;
	// transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

		&.active {
			color: #45B3E0;

			
			& + div {
				display: none;
			}
		}

		& + div {

			position: absolute;
			width: 160px;
			// bottom: 18%;
			right: -85%;	
			z-index: 99;
			display: block;
			padding: 11px 15px 10px 13px;
			background-color: #808080;
			border: 1px solid rgba(115, 115, 115, 0.8);
			border-radius: 5px;
			font-size: 14px;
			-webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
			box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
			
			& > p {color: #fff}
		}

		& + div:before {

			position: absolute;
			left: 84px;
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
			// display: block;
		}
`;

const TooltipBox = (props) => {
	return (
		<TooltipBoxWrapper>
			<IconButton className={props.active ? 'active' : ''} onClick={props.onClick} ><MdPets /></IconButton>
			<div><p>날짜/종류/상태 필터</p></div>
		</TooltipBoxWrapper>
	);
};

export default TooltipBox;