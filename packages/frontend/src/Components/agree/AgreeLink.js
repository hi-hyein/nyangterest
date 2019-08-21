import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AgreeWrapper = styled.span`
	& > a {
			color:inherit;
			font-size: 0.9rem;
			margin-left:0.3em;
			text-decoration:none;
			&:hover, &.active {
				color:#333;
				font-weight: 600
				text-decoration:underline;
			}
	}
`;

const AgreeLink = () => {
	return (
		<Fragment>
			<AgreeWrapper>
				<NavLink to="/agree/service">이용약관</NavLink>
				<NavLink to="/agree/privacy">개인정보 처리방침</NavLink>
			</AgreeWrapper>
		</Fragment>
	);
};

export default AgreeLink;

