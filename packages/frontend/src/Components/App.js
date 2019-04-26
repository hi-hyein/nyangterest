import React, { Component } from "react";
// import XMLParser from "react-xml-parser";
import Box02 from "./Box02";

class App extends Component {
	state = {};

	componentDidMount() {
		this.getInfo();
	}

	renderInfo = () => {
		const cats = this.state.cats.map(box02 => {
			console.log(box02);
			return (
				<Box02
					key={box02.id}
					kindCd={box02.kindCd}
					popfile={box02.popfile}
				/>
			);
		});
		return cats;
	};

	getInfo = async () => {
		const cats = await this.callApi();
		this.setState({
			cats
		});
	};

	callApi = () => {
		return fetch(
			"https://s3.ap-northeast-2.amazonaws.com/web1-html-internet-yu/cats-info04.json"
			// "http://d1bj4sto4aozbg.cloudfront.net/cats-info04.json"
			// "https://s3.ap-northeast-2.amazonaws.com/web1-html-internet-yu/cats-info04.json"

		)
			// .then(response => response.text())
			// // .then(xmlText => console.log(xmlText))
			// .then(response => (response.json()))
			.then(response => (response.json()))
			// .then(stringToXml =>
			// 	new XMLParser().parseFromString(stringToXml)
			// )
			.then(json => json.data.cats)
			.catch(err => console.log("error omg!"))
	};

	render() {
		const { cats } = this.state;
		return (
			<div className={cats ? "App" : "App--loading"}>
				{cats ? this.renderInfo() : "Loading"}
			</div>
		);
	}
}

export default App;
