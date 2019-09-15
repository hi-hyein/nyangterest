import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyles";
import Header from "./layout/Header";
import Nav from "./Nav";
import Home from "./Home";
import MemberList from "./admin/MemberList";

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
			userId:undefined
		};
	}

	changeUserState = ()=>{
		this.setState({
			userState: "login"
		})
	}

	changeUserId = (name)=>{
		this.setState({
			userId: name
		})
	}

	render() {
		return (
			<Router>
				<Fragment>
					<div id="wrap">
						{/* 헤더 */}
						<Header
							userState={this.state.userState}
							changeUserState={this.changeUserState}
						/>
						<Wrapper>
							<GlobalStyle />
							<Nav />
							<Route exact path="/" component={Home} />
							<Route path="/admin/member" component={MemberList} />
						</Wrapper>
					</div>
				</Fragment>
			</Router>
		);
	}
}

export default App;
