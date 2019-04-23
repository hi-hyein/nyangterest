import React, { Component } from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyles";
import Box02 from "./Box02";

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

const cats = [
	{
		name: "코숏",
		bgPhoto:
			"http://www.animal.go.kr/files/shelter/2019/04/201904231404427.jpg"
	},
	{
		name: "터키시 앙고라",
		bgPhoto:
			"http://www.animal.go.kr/files/shelter/2019/04/201904201604512.jpg"
	},
	{
		name: "페르시안 친칠라",
		bgPhoto:
			"http://www.animal.go.kr/files/shelter/2019/04/201904181504135.jpg"
	},
	{
		name: "코숏",
		bgPhoto:
			"http://www.animal.go.kr/files/shelter/2019/04/201904231404427.jpg"
	},
	{
		name: "터키시 앙고라",
		bgPhoto:
			"http://www.animal.go.kr/files/shelter/2019/04/201904201604512.jpg"
	},
	{
		name: "페르시안 친칠라",
		bgPhoto:
			"http://www.animal.go.kr/files/shelter/2019/04/201904181504135.jpg"
	},
	{
		name: "코숏",
		bgPhoto:
			"http://www.animal.go.kr/files/shelter/2019/04/201904231404427.jpg"
	},
	{
		name: "터키시 앙고라",
		bgPhoto:
			"http://www.animal.go.kr/files/shelter/2019/04/201904201604512.jpg"
	},
	{
		name: "페르시안 친칠라",
		bgPhoto:
			"http://www.animal.go.kr/files/shelter/2019/04/201904181504135.jpg"
	},
	{
		name: "터키시 앙고라",
		bgPhoto:
			"http://www.animal.go.kr/files/shelter/2019/04/201904201604512.jpg"
	},
	{
		name: "페르시안 친칠라",
		bgPhoto:
			"http://www.animal.go.kr/files/shelter/2019/04/201904181504135.jpg"
	},
	{
		name: "코숏",
		bgPhoto:
			"http://www.animal.go.kr/files/shelter/2019/04/201904231404427.jpg"
	},
	{
		name: "터키시 앙고라",
		bgPhoto:
			"http://www.animal.go.kr/files/shelter/2019/04/201904201604512.jpg"
	},
	{
		name: "페르시안 친칠라",
		bgPhoto:
			"http://www.animal.go.kr/files/shelter/2019/04/201904181504135.jpg"
	}
];

class App extends Component {
	render() {
		return (
			<Container>
				{cats.map(box02 => {
					return (
						<Box02
							name={box02.name}
							bgPhoto={box02.bgPhoto}
							// bgPhoto="http://www.animal.go.kr/files/shelter/2019/04/201904231404427.jpg"
						/>
					);
				})}

				<GlobalStyle />
			</Container>
		);
	}
}

export default App;
