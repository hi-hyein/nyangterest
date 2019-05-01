import React, { Component } from "react";
import Box02 from "./Box02";

// class App extends Component {
// 	state = { apiResponse: "" };

// 	callAPI() {
// 		fetch("http://localhost:8080")
// 			.then(res => res.text())
// 			.then(res => this.setState({ apiResponse: res }))
// 			.catch(err => err);
// 	}

// 	componentDidMount() {
// 		this.callAPI();
// 	}

// 	render() {
// 		return (
// 			<div className="App">
// 				<header className="App-header">
// 					<h1 className="App-title">Welcome to React</h1>
// 				</header>
// 				<p className="App-intro">{this.state.apiResponse}</p>
// 			</div>
// 		);
// 	}
// }

// json깊이가 길때 어떻게 받아와야 할 지 모르겠음.
class App extends Component {
	state = {};

	componentDidMount() {
		this.getInfo();
	}

	renderInfo = () => {
		const { catsApi } = this.state;
		const cats = catsApi.map((info, index) => {
			return (
				<Box02
					key={index}
					kindCd={info.kindCd}
					popfile={info.popfile}
					happenDt={info.happenDt}
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
		return (
			fetch("http://localhost:8080")
				.then(res => res.json())
				.then(json => json.response)
				// .then(json => console.log(json.response.body.items.item[0].age))
				.catch(err => console.log(err))
		);
	};

	render() {
		const { catsApi } = this.state;
		return (
			<div className="App">{catsApi ? this.renderInfo() : "nothing"}</div>
		);
	}
}

export default App;
