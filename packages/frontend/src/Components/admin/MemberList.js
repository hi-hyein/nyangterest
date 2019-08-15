import React, { Component } from "react";
import Member from "./Member";
import { fadeInUp } from "../Animations";
import styled from "styled-components";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const Wrapper = styled.div`
	margin-top: 10%;
	animation: ${fadeInUp} 1s both;
`;

const TableStyle = styled(Table)`
	&& {
		min-width: 1280px;
	}
`;

class MemberList extends Component {
	state = {
		members: []
	};

	componentDidMount() {
		this.getMember();
	}

	getMember = async () => {
		try {
			const url = `/admin/member`;
			const response = await fetch(url);
			const json = await response.json();
			this.setState({ members: json });
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		return (
			<Wrapper>
				<TableStyle>
					<TableHead>
						<TableRow>
							<TableCell>번호</TableCell>
							<TableCell>이름</TableCell>
							<TableCell>이메일</TableCell>
							<TableCell>비밀번호</TableCell>
							<TableCell>가입일자</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.state.members.map(member => (
							<Member key={member.id} {...member} />
						))}
					</TableBody>
				</TableStyle>
			</Wrapper>
		);
	}
}

export default MemberList;
