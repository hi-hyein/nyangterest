import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
	position: relative;
	max-height: 300px;
	min-height: 100%;
	background-image: linear-gradient(rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.7));
	background-size: cover;
	border-radius: 8px;
	box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.08);
	display: flex;
	flex-direction: column;
	background-position: center center;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
	border-bottom: 5px solid ${props => props.borderBottomColor};
`;

const Content = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	color: white;
`;

const Item = ({ kindCd, happenDt, borderBottomColor = "#087264", popfile }) => (
	<Container borderBottomColor={borderBottomColor}>
		<Content>
			<div className="Item">
				<h2>품종: {kindCd}</h2>
				<p>등록일: {happenDt}</p>
				<CatImage popfile={popfile} alt={kindCd} />
			</div>
		</Content>
	</Container>
);

const CatImage = props => {
	return (
		<a href={"http://naver.com"}>
			<img src={props.popfile} alt={props.alt} className="CatImage" />
		</a>
	);
};

Item.propTypes = {
	kindCd: PropTypes.string,
	popfile: PropTypes.string,
	happenDt: PropTypes.number
};

CatImage.propTypes = {
	popfile: PropTypes.string,
	alt: PropTypes.string
};

export default Item;
