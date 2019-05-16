import React, { Component } from "react";
import Member from "./Member";

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
			<div className="MemberList">
				{this.state.members.map(member => (
					<Member key={member.id} {...member} />
				))}
			</div>
		);
	}
}

export default MemberList;
