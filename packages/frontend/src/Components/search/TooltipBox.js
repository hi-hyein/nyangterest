import React, { Fragment } from "react";
import CookieConsent from "react-cookie-consent";
import { MdPets } from "react-icons/md";
import styled from "styled-components";
import { fadeOutDown } from "../Animations";

// 툴팁

const TooltipBoxWrapper = styled.div`
	position: relative;
	// top: 42px;
	margin-left: auto;
	min-width: 200px;
	// height: 100px;

	@media screen and (max-width: 960px) {
		position: fixed;
		height: auto;
		padding-top: 130px;
	}
	
	@media screen and (max-width: 700px) {
		top: 0
		height: 0;
	}

`;

const IconButton = styled.button`
	width: 3.2rem;
	height: 3rem;
	background: none;
	font-size: 2.3rem;
	color: #ccc;
	transition: all 2s ease;

		&.active {
			// position: absolute;
			// right: 0;
			color: #a1ceab;


			& + div {
				opacity: 0;
				height: 0;
				// animation: ${fadeOutDown} 0.5s both;

			}
		}

		& + div {

			position: absolute;
			width: 100%;
			min-width: 100%;
			min-height: 60px;
			// bottom: 18%;
			right: 0;	
			z-index: 99;
			opacity: 1;
			padding: 5px 15px 5px 13px;
			background-color: #808080;
			border: 1px solid rgba(115, 115, 115, 0.8);
			border-radius: 5px;
			font-size: 14px;
			text-align: center;
			-webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
			box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);

			> button {
						padding:2px 3px;
						background: #eee;
						font-size: 12px;
					
			}

			&  p {
				color: #fff;line-height: 1.5rem;text-align:left
				span {
					font-size: 0.85rem;
					font-weight: 600;
					display: inline-block;
					line-height: 2rem;
				}
				
			}

		}

		& + div:before {

			position: absolute;
			left: 94px;
			top: -6px;
			width: 9px;
			height: 9px;
			border: solid rgba(115, 115, 115, 0.8);
			border-width: 0 1px 1px 0;
			border-radius: 0 0 2px 0;
			background-color: #808080;
			-webkit-transform: rotate(45deg);
			-ms-transform: rotate(45deg);
			transform: rotate(45deg);
			content: '';
		}

		&:hover + div {
			// display: block;
		}
`;

const TooltipBox = (props) => {
	return (
		<Fragment>
			<TooltipBoxWrapper className="btn-wrap">
				<IconButton className={props.active ? 'active' : ''} onClick={props.onClick} ><MdPets /></IconButton>
				<CookieConsent disableStyles cookieName="TooltipBox" buttonText={"오늘 하루 보이지 않기 X"} location="none" onAccept={() => { alert("24시간 동안 툴팁박스가 보이지 않게 되었습니다! ") }} expires={1} >
					<p>날짜/품종/검색어 <br />[검색어 입력 예시]<br /> 색상: 치즈 <br />성별: 암컷 또는 수컷<br />나이: 2019년생 <br />주소: 인천광역시</p>
				</CookieConsent>
			</TooltipBoxWrapper>
		</Fragment>
	);
};

export default TooltipBox;