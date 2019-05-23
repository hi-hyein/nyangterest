import React, { Component, Fragment } from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyles";
import List from "./List";
import Header from "./Header";
import LoginPopup from "./LoginPopup";

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
			<Fragment>
				<div id="wrap">
					{/* 헤더 */}
					<Header
						userState={this.state.userState}
						onClick={this.openLoginPopup}
					/>
					{/* 로그인 팝업 */}
					{this.state.loginPopup && <LoginPopup />}
					<Wrapper>
						<List />
					</Wrapper>
					<GlobalStyle />
				</div>
			</Fragment>
		);
	}
}

export default App;
