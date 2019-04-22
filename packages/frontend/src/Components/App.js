import React, { Component } from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyles";
import Box01 from "./Box01";

class App extends Component {
	render() {
		const Container = styled.div`
			padding: 50px;
			padding-bottom: 100px;
			display: grid;
			grid-template-columns: repeat(auto-fill, 100px);
			grid-gap: 30px;
			grid-auto-rows: 400px;
			grid-template-rows: 260px 400px 400px;
			& > div {
				grid-column: span 2;
				&:nth-child(5),
				&:nth-child(6) {
					grid-column: span 1;
				}
				&:nth-child(8) {
					grid-column: span 4;
				}
				&:nth-child(14) {
					grid-column: span 4;
				}
			}
			@media screen and (max-width: 700px) {
				grid-template-columns: 1fr;
				grid-gap: 50px;
				padding: 10px;
				& > div {
					grid-column: span 1 !important;
				}
			}
		`;
		return (
			<Container>
				<Box01
					title="Toledo, Spain"
					subtitle="Also know as The Imperial City."
					tag="16"
					iconName="fas fa-heart"
					bgPhoto="http://www.animal.go.kr/files/shelter/2019/04/201904202004710.jpg"
					cta="View Trip"
				/>
				<GlobalStyle />
			</Container>
		);
	}
}

export default App;
