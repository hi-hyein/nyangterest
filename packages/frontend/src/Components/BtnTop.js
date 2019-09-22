import React from 'react';
import styled from "styled-components";
import { MdArrowUpward } from "react-icons/md";
import { fadeInUp, fadeInDown } from "./Animations";

const ButtonTop = styled.button`
  position: fixed;
  z-index: 999;
  bottom: 0;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  background: #ccc;
  border: none;
  border-radius: 50%;
  opacity: 0.3;
  transition: all 2s ease;
  animation: ${fadeInDown} 2s both;

  &:hover {
	  opacity: 1;
  }

  &.on {
	  	bottom: unset;
	  	top: 12.5%;
		background: #3f51b5;
		animation: ${fadeInUp} 1s both;
  	}

  & > svg {
    width: 2.2em;
    height: 2em;
    color: #fff;
  }
`;

const BtnTop = (props) => {
	return (
		<ButtonTop className={props.on && "on"} onClick={props.onClick}>
			<MdArrowUpward />
		</ButtonTop>
	);
};

export default BtnTop;