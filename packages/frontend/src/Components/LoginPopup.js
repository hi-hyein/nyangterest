import React from "react";

class LoginPopup extends React.Component {
	render() {
		const popupStyle = {
			backgroundColor: '#fff',
		}

		return (
			<div className="popup">
				<div className="popup_wrap" style={popupStyle}>
					<h2>LOGIN</h2>
					<div>
						<label htmlFor="email">이메일 입력</label>
						<input type="text" name="email" id="email"/>
					</div>
					<div>
						<label htmlFor="password">비밀번호 입력</label>
						<input type="text" name="password" id="password"/>
					</div>
					<div className="button-area">
						<button type="submit">로그인</button>
						<button type="button">회원가입</button>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginPopup;

