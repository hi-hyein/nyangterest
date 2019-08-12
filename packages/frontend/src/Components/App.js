import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyles";
import Header from "./layout/Header";
import Nav from "./Nav";
import List from "./List";
import MemberList from "./MemberList";
import SearchBar from "./search/SearchBar";
// import SearchBox from "./search/SearchBox";
import Welcome from "./Welcome";

const Wrapper = styled.div`
	position: relative;
	max-width: 1280px;
	margin: 0 auto;
	text-align: center;
`;

class App extends Component {
	constructor() {
		super();
		this.state = {
			userState: "logout",
		};
	}

	render() {
		return (
			<Router>
				<Fragment>
					<div id="wrap">
						{/* 헤더 */}
						<Header
							userState={this.state.userState}
						/>
						<Wrapper>
							{/* <SearchBox /> */}
							<GlobalStyle />
							<SearchBar />
							<Nav />
							{/* <Route exact path="/" component={List} /> */}
							<Route path="/admin/member" component={MemberList} />
							<Route path="/welcome" component={Welcome} />
						</Wrapper>
					</div>
				</Fragment>
			</Router>
		);
	}
}

export default App;
