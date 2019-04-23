import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
	position: relative;
	background-image: linear-gradient(rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.7)),
		url(${props => props.bgPhoto});
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
	margin-top: 40px;
	margin-bottom: 20px;
`;

const Box02 = ({ name, borderBottomColor = "#087264", bgPhoto }) => (
	<Container borderBottomColor={borderBottomColor} bgPhoto={bgPhoto}>
		<Content>
			<h1>{name}</h1>
		</Content>
	</Container>
);

Box02.propTypes = {
	bgPhoto: PropTypes.string,
	borderBottomColor: PropTypes.string
};

export default Box02;
