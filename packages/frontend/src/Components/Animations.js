import { keyframes } from "styled-components";

export const fadeInUp = keyframes`
		from {  transform: translate3d(0,40px,0); opacity: 0; }
		to   { transform: translate3d(0,0,0);opacity: 1; }
`;

export const fadeInDown = keyframes`
		from {  transform: translate3d(0,0,0); opacity: 0; }
		to   { transform: translate3d(0,40,0);opacity: 1; }
`;

export const fadeOutUp = keyframes`
		from {  transform: translate3d(0,40,0); opacity: 1; }
		to   { transform: translate3d(0,0,0);opacity: 0; }
`;

export const fadeOutDown = keyframes`
		from {  transform: translate3d(0,0,0); opacity: 1; }
		to   { transform: translate3d(0,40,0); opacity: 0; }
`;

export const moveMent = keyframes`
		from {transform:translateY(0px);}
		to {transform: translateY(-5px);}

`
export const fadeInLeft = keyframes`
		from {transform:translateX(-300px); opacity: 0;}
		to {transform:translateX(0); opacity: 1;}

`
export const scaleHead = keyframes`
	0% {
		transform: scale(1.5);
		-webkit-transform: scale(1.5);
		-moz-transform: scale(1.5);
		-ms-transform: scale(1.5);
		-o-transform: scale(1.5);
	}

	50% {
		transform: scale(1.2);
		-webkit-transform: scale(1.2);
		-moz-transform: scale(1.2);
		-ms-transform: scale(1.2);
		-o-transform: scale(1.2);
	}

	100% {
		transform: scale(1.5);
		-webkit-transform: scale(1.5);
		-moz-transform: scale(1.5);
		-ms-transform: scale(1.5);
		-o-transform: scale(1.5);
	}


`
export const rotateHead = keyframes`
	0%{
		transform: rotate(-10deg)	;
		-webkit-transform: rotate(-10deg)	;
		-moz-transform: rotate(-10deg)	;
		-ms-transform: rotate(-10deg)	;
		-o-transform: rotate(-10deg)	;
	}

	50%{
		transform: rotate(0deg)	;
		-webkit-transform: rotate(0deg)	;
		-moz-transform: rotate(0deg)	;
		-ms-transform: rotate(0deg)	;
		-o-transform: rotate(0deg)	;
	}

	100% {
		transform:rotate(10deg);
		-webkit-transform:rotate(10deg);
		-moz-transform:rotate(10deg);
		-ms-transform:rotate(10deg);
		-o-transform:rotate(10deg);
	}


`




