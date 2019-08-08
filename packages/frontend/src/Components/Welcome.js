import React, { Component } from "react";
import queryString from 'query-string';

class Welcome extends Component {

	componentWillMount() {
		this.getQuery();
	}

	getQuery = ()=>{
		const querys = queryString.parse(this.props.location.search)
		const querysTojson = JSON.stringify(querys)
		console.log(querysTojson)

		fetch('http://localhost:8080/welcome', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: querysTojson,
		});
	}

	render() {
		return (
			<div>
				냥터레스트에 가입 완료되었습니다.
			</div>
		);
	}
}

export default Welcome;
