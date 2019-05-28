import React from "react";
// import PropTypes from "prop-types";

class Header extends React.Component {
	render() {
		const HeaderStyle = {
			backgroundColor: 'skyblue'
		}

		return (
			<div className="header" style={HeaderStyle}>
				<h1>NYANGTEREST</h1>
					{console.log(this)}
					{/* 로그인 상태 */}
					{this.props.userState === 'logout' &&
						<div className="button-area">
							<button type="button" onClick={this.props.loginOnClick}>LOGIN</button>
							<button type="button" onClick={this.props.joinOnClick}>JOIN</button>
						</div>
					}
					{/* 로그아웃 상태 */}
					{this.props.userState === 'login' &&
						<div className="button-area">
							<button type="button">MENU</button>
						</div>
					}
			</div>
		);
	}
}

export default Header;

