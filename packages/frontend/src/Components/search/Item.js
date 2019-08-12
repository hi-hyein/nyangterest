import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
	position: relative;
	// max-height: 300px;
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

const Info = styled.div`
	width: 100%;

	& > h2 {
		padding-bottom: 0.5rem;
	}

	& > p {
		padding-bottom: 1rem;
	}

	& > a {
		display: flex;
		height: 200px;
		justify-content: center;
		align-items: center;

		& > img {
			max-width: 100%;
			max-height: 100%;
		}
	}

`;
const Item = ({ kindCd, age, happenDt, happenPlace, careNm, colorCd, neuterYn, borderBottomColor = "#5262bc", popfile }) => (
	<Container borderBottomColor={borderBottomColor}>
		<Content>
			<Info>
				<h2>품종: {kindCd}</h2>
				<p>등록일: {happenDt}</p>
				<p>발생장소: {happenPlace}</p>
				<p>보호소: {careNm}</p>
				<p>털색상: {colorCd}</p>
				<p>중성화여부 {neuterYn}</p>
				<p>나이: {age}</p>
				<CatImage popfile={popfile} alt={kindCd} />
			</Info>
		</Content>
	</Container>
);

const CatImage = props => {
	return (

		<img src={props.popfile} alt={props.alt} className="CatImage" />

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
