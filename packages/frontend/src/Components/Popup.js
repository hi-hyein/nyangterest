import React from "react";
// import PropTypes from "prop-types";

class Popup extends React.Component {
	render() {
		return (
			<div className="Popup" >
				<h2>LOGIN</h2>
				<div>
					<label for="email">이메일 입력</label>
					<input type="text" name="email" id="email">
				</div>
				<div>
					<label for="password">비밀번호 입력</label>
					<input type="text" name="password" id="password">
				</div>
			</div>
		);
	}
}

export default Popup;

