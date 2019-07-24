import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyles";
import Header from "./layout/Header";
import Nav from "./Nav";
import List from "./List";
import MemberList from "./MemberList";
import TooltipBox from "./TooltipBox";


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
							<TooltipBox />
							<GlobalStyle />
							{/* <MemberList /> */}
							<Nav />
							<Route exact path="/" component={List} />
							<Route path="/admin/member" component={MemberList} />
						</Wrapper>
					</div>
				</Fragment>
			</Router>
		);
	}
}

export default App;
