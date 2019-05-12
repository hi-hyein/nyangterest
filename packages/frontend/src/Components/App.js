import React, { Component, Fragment } from "react";
import GlobalStyle from "./GlobalStyles";
import List from "./List";
import Header from "./Header";

class App extends Component {
	render() {
		return (
			<Fragment>
				<div id="wrap">
					<Header/>
					<List />
					<GlobalStyle />
				</div>
			</Fragment>
		);
	}
}

export default App;
