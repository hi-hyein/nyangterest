import React, { Component } from "react";
// import XMLParser from "react-xml-parser";
import axios from "axios";
import Box02 from "./Box02";

class App extends Component {
	state = {
		fields: [],
		records: []
	};

	componentDidMount() {
		this.getInfo();
	}

	renderInfo = () => {
		const cats = this.state.records.map((box02, key) => {
			console.log(cats);
			return (
				<Box02
					key={key}
					kindCd={box02.kindCd}
					popfile={box02.popfile}
					happenDt={box02.happenDt}
				/>
			);
		});
		return cats;
	};

	getInfo = async () => {
		try {
			const response = await axios.get(
				"http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?serviceKey=P3gvH0LsdoPkxFnZU2Ee98hGDDEwVTJndJFa8NDUhznSLlZG6OOxBopFWLBmiCPOfWXsF8Wz8LFHJguz41qJvA%3D%3D&bgnde=20190401&endde=20190430&upkind=422400&state=notice&pageNo=1&numOfRows=10&neuter_yn=Y"
			);

			// "http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?serviceKey=P3gvH0LsdoPkxFnZU2Ee98hGDDEwVTJndJFa8NDUhznSLlZG6OOxBopFWLBmiCPOfWXsF8Wz8LFHJguz41qJvA%3D%3D&bgnde=20190401&endde=20190430&upkind=422400&state=notice&pageNo=1&numOfRows=10&neuter_yn=Y"

			// "http://d1bj4sto4aozbg.cloudfront.net/cats-info04.json"
			// "https://s3.ap-northeast-2.amazonaws.com/web1-html-internet-yu/cats-info04.json"

			this.setState({ cats: response.text() });
			console.log({ response });
		} catch (error) {
			console.log(error);
		}
	};

	// callApi = () => {
	// 	return axios(

	// 	)
	// 		// .then(response => response.text())
	// 		// // .then(xmlText => console.log(xmlText))
	// 		// .then(response => (response.json()))
	// 		.then(response => (response.json()))
	// 		// .then(stringToXml =>
	// 		// 	new XMLParser().parseFromString(stringToXml)
	// 		// )
	// 		.then(json => json.data.cats)
	// 		.catch(err => console.log("error omg!"))
	// };

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
