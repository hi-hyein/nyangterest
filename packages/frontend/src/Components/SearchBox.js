import React, { Component, Fragment } from "react";
import TooltipBox from "./TooltipBox";
import styled from "styled-components";
import SearchItems from "./SearchItems";

// 검색 폼
const SearchDiv = styled.div`
	position: relative;
	min-width: 1280px;
	min-height: 56px;
	margin-top: 3%;
	
`;

class SearchBox extends Component {

	state = {
		isVisible: false,
	}

	toggleHidden = () => {
		this.setState({
			isVisible: !this.state.isVisible
		});
		console.log('toggle show. ..')

	}

	render() {
		return (
			<Fragment>
				<SearchDiv>
					<SearchItems isVisible={this.state.isVisible} />
					<TooltipBox onClick={this.toggleHidden} />
				</SearchDiv>
			</Fragment>
		);
	}
}

export default SearchBox;

