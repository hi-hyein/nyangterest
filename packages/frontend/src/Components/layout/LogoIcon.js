import React from 'react';
import styled from "styled-components";
import { rotateFoot } from "../Animations";
import img from "../../img/cat_head.png";

const Icon = styled.span`
  position: absolute;
  top: 0.1rem;
  left: -3rem;
  width: 4rem;
  height: 4rem;
  transition: all 2s ease;
  animation: ${rotateFoot} 2s linear .5s  infinite alternate;
  background-image: url(${img});
  background-size: 70%;
  background-repeat: no-repeat;

  @media screen and (max-width: 640px) {
		top:-1.5rem;
		left: 0;
		background-size: 50%;
	}
`;

const LogoIcon = (props) => {
	return (
		<Icon />
	);
};

export default LogoIcon;