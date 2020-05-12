import React, { Component, Fragment } from "react";
import { MdHome } from "react-icons/md";
import { MdAssignment } from "react-icons/md";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavWrapper = styled.div`
	position: fixed;
	width: 100%;
	bottom: 0;
	left: 0;
	z-index: 100;
	background: rgba(255,255,255,0.2);
	border-top: 1px solid #f8f9fa;
		
`

const NavList = styled.ul`
	li {
		width: 20%;
		float: left;
		text-align: center;

			a,
			button {
					width: 100%;
					display: block;
					padding: 6px 0;
					color: #868e96;
					font-size: 2rem;
	
				span {
						display: block;
						font-size: 1rem;
						padding: 5px 0 0 0;
				}

				&.active {
					* {color: #a1ceab;}
				}
			}
	}
		
`

class Nav extends Component {
	render() {
		return (
			<Fragment>
				<NavWrapper>
					<NavList>
						<li>
							<NavLink exact to="/" activeClassName="active">
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
					</NavList>
				</NavWrapper>
			</Fragment>
		);
	}
}
export default Nav;
