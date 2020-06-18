import React from 'react';
import styled from "styled-components";

const Projectinfo = styled.p`
	position: absolute;
	width: 100%;
	bottom: -4px;
	padding-right: 3rem;
	font-size: 0.8rem;
	color: #90b999;
	text-align: center;
	line-height: 2rem;
	letter-spacing: 3px;

	 @media screen and (max-width: 640px) {
		display: none;
	}
`;

const Appinfo = (props) => {
	return (
		<Projectinfo>냥터레스트는 유기묘 정보 조회 서비스입니다.</Projectinfo>
	);
};

export default Appinfo;