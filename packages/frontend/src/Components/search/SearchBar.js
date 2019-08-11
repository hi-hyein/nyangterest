import React, { Component } from 'react';

class SearchBar extends Component {
	state = { apiResponse: " " };

	callApi = async () => {
		try {
			const url = `/search`;
			const config = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}
			};
			const response = await fetch(url, config);
			const data = await response.text();
			// console.log(data);
			this.setState(
				{
					apiResponse: data
				},
				() => console.log(this)
			);
		} catch (err) {
			// console.log(err);
			this.setState({
				error: err.message,
			});
		}
	}

	componentDidMount() {
		this.callApi();
	}

	render() {
		return (
			<div>
				<header className="App-header">
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">{this.state.apiResponse}</p>
			</div>
		);
	}
}

export default SearchBar;
