import React, { Component, Fragment } from "react";
import TooltipBox from "./TooltipBox";
import styled from "styled-components";
import SearchItems from "./SearchItems";

// 검색 폼
const SearchDiv = styled.div`
	position: relative;
	display: flex;
	// min-width: 1280px;
	// min-height: 56px;
	margin: 0 3%; 
	
`;

class SearchBox extends Component {

	state = {
		isVisible: false,
		active: false
	}

	toggleHidden = () => {
		this.setState({
			active: !this.state.active,
			isVisible: !this.state.isVisible
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

