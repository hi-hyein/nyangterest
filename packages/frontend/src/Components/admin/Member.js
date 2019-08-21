import React from "react";
import PropTypes from "prop-types";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import styled from "styled-components";

const TableCellStyle = styled(TableCell)`
	&& {
		
	}
`;

const Member = props => {
	return (
		<TableRow>
			<TableCellStyle>{props.id}</TableCellStyle>
			<TableCellStyle>{props.username}</TableCellStyle>
			<TableCellStyle>{props.email}</TableCellStyle>
			<TableCellStyle>{props.password}</TableCellStyle>
			<TableCellStyle>{props.signupDate}</TableCellStyle>
		</TableRow>
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
