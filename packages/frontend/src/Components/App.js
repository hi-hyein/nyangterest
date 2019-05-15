import React, { Component, Fragment } from "react";
import GlobalStyle from "./GlobalStyles";
import List from "./List";

class App extends Component {
	render() {
		return (
			<Fragment>
				<List />
				<GlobalStyle />
			</Fragment>
		);
	}
}

export default App;
