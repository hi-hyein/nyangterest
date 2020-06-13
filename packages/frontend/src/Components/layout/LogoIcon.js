import React from 'react';
import styled from "styled-components";
// import { MdPets } from "react-icons/md";
import { scaleFoot, rotateFoot } from "../Animations";
import img from "./cat_head.png";

const Icon = styled.span`
  position: absolute;
  top: 0.4rem;
  left: -1.1em;
  width: 3rem;
  height: 2rem;
  transition: all 2s ease;
  animation: ${rotateFoot} 2s linear .5s  infinite alternate;
//   animation: ${scaleFoot} 5s linear infinite;
  background-image: url(${img});
  background-size: contain;
  background-repeat: no-repeat;

//   & > img {
//     width: 100%;
//   }
`;

const LogoIcon = (props) => {
	return (
		<Icon />
		// <Icon >
		// 	<MdPets />
		// </Icon>
	);
};

export default LogoIcon;