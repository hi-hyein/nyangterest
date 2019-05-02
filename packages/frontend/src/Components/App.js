import React, { Component } from "react";
import Box02 from "./Box02";

class App extends Component {
	state = {};

	componentDidMount() {
		this.getInfo();
	}

	renderInfo = () => {
		const { catsApi } = this.state;

		//객체 key값을 변수로 어떻게 받아올것인가?
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
				.then(json => json.response.body.items.item)
				.catch(err => console.log(err))
		);
	};

	render() {
		const { catsApi } = this.state;
		console.log(catsApi);
		return (
			<div className="App">{catsApi ? this.renderInfo() : "nothing"}</div>
		);
	}
}

export default App;
