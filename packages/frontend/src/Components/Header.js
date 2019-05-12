import React from "react";
// import PropTypes from "prop-types";

class Header extends React.Component {
	render() {
		return (
			<div className="header" >
				<h1>NYANGTEREST</h1>
				<div className="button-area">
					<button type="button">LOGIN</button>
					<button type="button">JOIN</button>
				</div>
			</div>
		);
	}
}

export default Header;

