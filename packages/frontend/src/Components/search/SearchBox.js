import React, { Component, Fragment } from "react";
import TooltipBox from "./TooltipBox";
import SearchItems from "./SearchItems";
import styled from "styled-components";

// 검색 폼
const SearchDiv = styled.div`
	position: relative;
	z-index: 99;
	display: flex;
	// min-width: 1280px;
	// min-height: 56px;
	padding: 0 5%; 
	transition: all 0.2s ease;


	@media screen and (max-width: 1024px) {
		padding: 0 7%;
  		align-items: center;
  		justify-content: center;
	}

	@media screen and (max-width: 700px) {
		padding: 0 2%;
	}

	@media screen and (max-width: 640px) {
		flex-wrap: wrap-reverse;
	}
	
`;

class SearchBox extends Component {

	state = {
		isVisible: false,
		active: false,
	}

	toggleHidden = () => {
		this.setState({
			active: !this.state.active,
			isVisible: !this.state.isVisible,
		});
		console.log('toggle show. ..')

	}

	render() {
		return (
			<Fragment>
				<SearchDiv>
					<SearchItems isVisible={this.state.isVisible} />
					<TooltipBox active={this.state.active} onClick={this.toggleHidden} />
				</SearchDiv>
			</Fragment>
		);
	}
}

export default SearchBox;

