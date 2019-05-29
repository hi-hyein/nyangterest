import React, { Component, Fragment } from "react";
import { MdHome } from "react-icons/md";
import { MdAssignment } from "react-icons/md";
import { NavLink } from "react-router-dom";

class Nav extends Component {
	render() {
		return (
			<Fragment>
				<nav className="nav">
					<ul className="nav-list">
						<li>
							<NavLink to="/" activeClassName="active">
								<MdHome />
								<span>홈</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/admin/member">
								<MdAssignment />
								<span>멤버리스트</span>
							</NavLink>
						</li>
					</ul>
				</nav>
			</Fragment>
		);
	}
}
export default Nav;
