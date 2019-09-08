import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
	position: relative;
	max-height:100%;
	min-height: 100%;
	background: #eee;
	background-size: cover;
	border: 1px solid #cac7c0;
	box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.08);
	display: flex;
	flex-direction: column;
	background-position: center center;
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
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
	padding-top: 13px;

	& > h2 {
		padding-bottom: 0.5rem;
		font-size: 2rem;
		color: #303f9f;
		font-weight: 600;
		text-align: center;
	}

	& > p {
		padding: 0 0.5rem;
		font-size: 0.8rem;
		color: #333;
		text-align: right;
	}
	

	& > figure {
		position: relative;
		top:3px;
		display: flex;
		min-height: 350px;
		justify-content: center;
		align-items: center;
		
		& > img {
			position: absolute;
			max-width: 100%;
			max-height: 100%;
			justify-content: center;
			align-items: center;
		}
	}
`;

const ListWrapper = styled.ul`
	padding: 2rem 1rem;

	& > li {
		color: #333;
		padding-bottom: 1rem;
		font-weight: 600;
		text-indent: -14px;
    	padding-left: 14px;
    	line-height: 1.3rem;

		&::before {
			display: inline-block;
			width: 5px;
			height: 5px;
			margin-right: 10px;
			background: #333;
			border-radius: 50%;
			vertical-align: middle;
			content: '';
		}

		&:last-child {
			padding-bottom: 0;
		}
	} 

`
const StatusDiv = styled.div`
	position: absolute;
	z-index:99;
	top:0;
	left: 0;
	min-width: 100px;
	width: auto;
	padding:1rem;
	background: ${props => (props.end ? "#E74C3C" : "#87CEEB")};
	text-align: center;

`
const Item = ({ neuterYn, age, backgroundColor, sexCd, weight, colorCd, processState, kindCd, noticeNo, happenDt, noticeEdt, happenPlace, specialMark, popfile, desertionNo, careNm, careTel, orgNm, officetel }) => (
	<Container>
		<Content id={desertionNo}>
			<Info>
				{/* <h2>{kindCd}</h2> */}
				<p>{colorCd}/{neuterYn}/{age}/{sexCd}/{weight}</p>
				<StatusDiv backgroundColor={backgroundColor}><span className="status">{processState}</span></StatusDiv>
				<CatImage popfile={popfile} alt={kindCd} processState={processState} />
				<ListWrapper>
					<li>공고번호: {noticeNo}</li>
					<li>공고기간: {happenDt} ~ {noticeEdt}</li>
					<li>발견장소: {happenPlace}</li>
					<li>특이사항: {specialMark}</li>
					<li>보호센터: {careNm} {careTel}</li>
					<li>담당기관: {orgNm} {officetel}</li>
				</ListWrapper>
			</Info>
		</Content>
	</Container>
);

const CatImage = props => {
	return (
		<figure>
			<img src={props.popfile} alt={props.alt} className="CatImage" />
		</figure>
	);
};

Item.propTypes = {
	kindCd: PropTypes.string,
	popfile: PropTypes.string,
	neuterYn: PropTypes.string,
	age: PropTypes.string,
	sexCd: PropTypes.string,
	weight: PropTypes.string,
	colorCd: PropTypes.string,
	processState: PropTypes.string,
	happenPlace: PropTypes.string,
	specialMark: PropTypes.string,
	careNm: PropTypes.string,
	orgNm: PropTypes.string,
	noticeNo: PropTypes.string,
	careTel: PropTypes.string,
	officetel: PropTypes.string,
	desertionNo: PropTypes.number,
	noticeEdt: PropTypes.number,
	happenDt: PropTypes.number,

};

CatImage.propTypes = {
	popfile: PropTypes.string,
	alt: PropTypes.string
};

export default Item;
