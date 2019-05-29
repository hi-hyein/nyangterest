import React from "react";
import PropTypes from "prop-types";

const Member = props => {
	return (
		<div>
			<span>{props.id}</span>
			<p>{props.username}</p>
			<p>{props.email}</p>
			<p>{props.password}</p>
			<p>{props.signupDate}</p>
		</div>
	);
};

Member.propTypes = {
	id: PropTypes.number,
	username: PropTypes.string,
	email: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	signupDate: PropTypes.number
};

export default Member;
