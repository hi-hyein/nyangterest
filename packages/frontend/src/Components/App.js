import React, { Component, Fragment } from "react";
import GlobalStyle from "./GlobalStyles";
import List from "./List";
import Header from "./Header";
import LoginPopup from "./LoginPopup";

class App extends Component {
	constructor(){
		super()
		this.state = {
			userState: 'login',
			loginPopup: false
		}
	}

	// 로그인 팝업 열기
	openLoginPopup = ()=>{
		this.setState({
			loginPopup: true
		})
	}
	render() {
		return (
			<Fragment>
				<div id="wrap">
					{/* 헤더 */}
					<Header userState={this.state.userState} onClick={this.openLoginPopup}/>
					{/* 로그인 팝업 */}
					{this.state.loginPopup && <LoginPopup/>}
					<List />
					<GlobalStyle />
				</div>
			</Fragment>
		);
	}
}

export default App;
