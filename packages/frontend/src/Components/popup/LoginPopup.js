import React from "react";
class LoginPopup extends React.Component {
	render() {
		return (
			<div className="popup">
				<div className="popup_wrap">
					<h2>LOGIN</h2>
					<div>
						<label htmlFor="email">이메일 입력</label>
						<input type="text" name="email" id="email" placeholder="email address"/>
					</div>
					<div>
						<label htmlFor="password">비밀번호 입력</label>
						<input type="password" name="password" id="password" placeholder="password"/>
					</div>
					<div className="button-area">
						<button type="submit">로그인</button>
						<button type="button">회원가입</button>
					</div>
				</div>
				<button type="button" onClick={this.props.onClick}>닫기</button>
			</div>
		);
	}
}

export default LoginPopup;

