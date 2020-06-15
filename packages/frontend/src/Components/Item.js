import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
	position: relative;
	max-height: 300px;
	min-height: 100%;
	background: rgba(244,229,189,0.2);
	background-size: cover;
	border-radius: 8px;
	box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.08);
	display: flex;
	flex-direction: column;
	background-position: center center;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
	border: 1px solid ${props => props.borderBottomColor};
	border-bottom: 5px solid ${props => props.borderBottomColor};
	border-top: unset;
	
`;

const Content = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	color:#7a7d7b;
`;

const Info = styled.div`
	width: 100%;

	& > figure {
			display: flex;
			height: 180px;
			margin-top: 6px;
			justify-content: center;
			align-items: center;
		
			& > img {
				width: 100%;
				max-width: 100%;
				max-height: 100%;
			object-fit: cover;
			}
		}

`;

const TextDiv = styled.div`
	background: rgba(244,229,189,0.5);

	& h2 {
			padding: 0.5rem;
			font-weight: 600;
	}

	&  p {
		padding-bottom: 0.5rem;
	}

		


`;


const Item = ({ kindCd, happenDt, borderBottomColor = "#d2e5c5", popfile, desertionNo }) => {
	const kind = kindCd.replace("한국 고양이", "코리안숏헤어")
	return (
		<Container borderBottomColor={borderBottomColor} >
			<Content id={desertionNo}>
				<Info>
					<TextDiv>
						<h2>품종: {kind}</h2>
						<p>등록일: {happenDt}</p>
					</TextDiv>
					{/* <p>색상: {colorCd}</p> */}
					<CatImage popfile={popfile} alt={kind} />
				</Info>
			</Content>
		</Container>
	)
}

const CatImage = props => {
	return (
		<figure>
			<img src={props.popfile} alt={props.alt} loading="eager" className="CatImage" />
		</figure>
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
