import React, { Component, Fragment } from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyles";
import List from "./List";

const Wrapper = styled.div`
	position: relative;
	max-width: 1280px;
	margin: 0 auto;
`;

class App extends Component {
	render() {
		return (
			<Wrapper>
				<Fragment>
					<List />
					<GlobalStyle />
				</Fragment>
			</Wrapper>
		);
	}
}

export default App;
