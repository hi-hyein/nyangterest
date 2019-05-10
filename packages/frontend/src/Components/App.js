import React, { Component } from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyles";
import List from "./List";

// const Container = styled.div`
// 	padding: 50px;
// 	padding-bottom: 100px;
// 	display: grid;
// 	grid-template-columns: repeat(auto-fill, 200px);
// 	grid-gap: 20px;
// 	grid-auto-rows: 300px;
// 	justify-content: space-around;
// 	// grid-template-rows: 260px 400px 400px;
// 	& > div {
// 		grid-column: span 1;
// 		// &:nth-child(5),
// 		// &:nth-child(6) {
// 		// 	grid-column: span 1;
// 		// }
// 		// &:nth-child(8) {
// 		// 	grid-column: span 4;
// 		// }
// 		// &:nth-child(14) {
// 		// 	grid-column: span 4;
// 		// }
// 	}
// 	@media screen and (max-width: 700px) {
// 		grid-template-columns: 1fr;
// 		grid-gap: 50px;
// 		padding: 10px;
// 		& > div {
// 			grid-column: span 1 !important;
// 		}
// 	}
// `;

class App extends Component {
	render() {
		return (
			<div className="App">
				<List />
			</div>
		);
	}
}

export default App;
