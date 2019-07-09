import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyles";
import Header from "./layout/Header";
import LoginPopup from "./popup/LoginPopup";
import JoinPopup from "./popup/JoinPopup";
import Nav from "./Nav";
import List from "./List";
import MemberList from "./MemberList";

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
			loginPopup: false,
			joinPopup: true
		};
	}

	//매번 닫고열기 함수를 만들어 놓은게 지저분해보임...공통적으로 적용할 방법 생각하기
	// 로그인 팝업 열기
	openLoginPopup = () => {
		this.setState({
			loginPopup: true,
			joinPopup: false
		});
	};

	// 로그인 팝업 닫기
	closeLoginPopup = () => {
		this.setState({
			loginPopup: false
		});
	};

	// 회원가입 팝업 열기
	openJoinPopup = () => {
		this.setState({
			loginPopup: false,
			joinPopup: true
		});
	};

	// 회원가입 팝업 닫기
	closeJoinPopup = () => {
		this.setState({
			joinPopup: false
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
							loginOnClick={this.openLoginPopup}
							joinOnClick={this.openJoinPopup}
						/>
						{/* 로그인 팝업 */}
						{this.state.loginPopup && <LoginPopup onClick={this.closeLoginPopup} />}
						{/* 회원가입 팝업 */}
						{this.state.joinPopup && <JoinPopup onClick={this.closeJoinPopup} />}
						<Wrapper>
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
