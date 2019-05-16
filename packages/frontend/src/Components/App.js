import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyles";
import List from "./List";
import Header from "./Header";
import LoginPopup from "./LoginPopup";
import MemberList from "./MemberList";
import Nav from "./Nav";

const Wrapper = styled.div`
	position: relative;
	max-width: 1280px;
	margin: 0 auto;
`;

class App extends Component {
	constructor() {
		super();
		this.state = {
			userState: "login",
			loginPopup: false
		};
	}

	// 로그인 팝업 열기
	openLoginPopup = () => {
		this.setState({
			loginPopup: true
		});
	};
	render() {
		return (
			<Router>
				<Fragment>
					<div id="wrap">
						{/* 헤더 */}
						<Header
							userState={this.state.userState}
							onClick={this.openLoginPopup}
						/>
						{/* 로그인 팝업 */}
						{this.state.loginPopup && <LoginPopup />}
						<Wrapper>{/* <List /> */}</Wrapper>
						<GlobalStyle />
						{/* <MemberList /> */}
						<Nav />
						<Route exact path="/" component={List} />
						<Route path="/admin/member" component={MemberList} />
					</div>
				</Fragment>
			</Router>
		);
	}
}

export default App;
