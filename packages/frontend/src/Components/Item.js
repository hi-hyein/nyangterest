import React from "react";
// import styled from "styled-components";
// import PropTypes from "prop-types";

// const Container = styled.div`
// 	position: relative;
// 	background-image: linear-gradient(rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.7)),
// 		url(${props => props.bgPhoto});
// 	background-size: cover;
// 	border-radius: 8px;
// 	box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.08);
// 	display: flex;
// 	flex-direction: column;
// 	background-position: center center;
// 	align-items: center;
// 	justify-content: space-between;
// 	padding: 20px;
// 	border-bottom: 5px solid ${props => props.borderBottomColor};
// `;

// const Content = styled.div`
// 	width: 100%;
// 	display: flex;
// 	justify-content: space-between;
// 	align-items: flex-end;
// 	color: white;
// 	margin-top: 40px;
// 	margin-bottom: 20px;
// `;

const Item = props => (
	// <Container
	// 	borderBottomColor={props.borderBottomColor}
	// 	bgPhoto={props.bgPhoto}
	// >
	// 	<Content>
	<div className="Item">
		<div>
			<h1>{props.kindCd}</h1>
			<p>{props.happenDt}</p>
			<img src={props.popfile} alt={props.alt} />
			{/* <CatImage popfile={props.popfile} alt={props.kindCd} /> */}
		</div>
	</div>
	// </Content>
	// </Container>
);

// const CatImage = props => {
// 	return <img src={props.popfile} alt={props.alt} className="CatImage" />;
// };

// Item.propTypes = {
// 	kindCd: PropTypes.string,
// 	popfile: PropTypes.string,
// 	happenDt: PropTypes.number
// };

// CatImage.propTypes = {
// 	popfile: PropTypes.string,
// 	alt: PropTypes.string
// };

export default Item;
