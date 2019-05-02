import React, { Component } from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyles";
import List from "./List";

// eslint-disable-next-line no-unused-vars
const Container = styled.div`
	padding: 50px;
	padding-bottom: 100px;
	display: grid;
	grid-template-columns: repeat(auto-fill, 200px);
	grid-gap: 20px;
	grid-auto-rows: 300px;
	justify-content: space-around;
	// grid-template-rows: 260px 400px 400px;
	& > div {
		grid-column: span 1;
		// &:nth-child(5),
		// &:nth-child(6) {
		// 	grid-column: span 1;
		// }
		// &:nth-child(8) {
		// 	grid-column: span 4;
		// }
		// &:nth-child(14) {
		// 	grid-column: span 4;
		// }
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

class App extends Component {
	state = {};

	componentDidMount() {
		this.getInfo();
	}

	renderInfo = () => {
		const { catsApi } = this.state;
		const cats = catsApi.map((info, index) => {
			return (
				<List
					key={index}
					kindCd={info.kindCd}
					popfile={info.popfile}
					happenDt={info.happenDt}
					bgPhoto={info.bgPhoto}
				/>
			);
		});
		return cats;
	};

	getInfo = async () => {
		const catsApi = await this.callApi();
		this.setState({
			catsApi
		});
	};

	callApi = () => {
		return fetch("http://localhost:8080")
			.then(res => res.json())
			.then(json => json.response.body.items.item)
			.catch(err => console.log(err));
	};

	render() {
		const { catsApi } = this.state;
		console.log(catsApi);
		return (
			<Container>
				{catsApi ? this.renderInfo() : "nothing"}
				<GlobalStyle />
			</Container>
		);
	}
}

export default App;
