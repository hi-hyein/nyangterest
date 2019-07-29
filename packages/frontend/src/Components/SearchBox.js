import React, { Component, Fragment } from "react";
import TooltipBox from "./TooltipBox";
import SearchItems from "./SearchItems";
import styled from "styled-components";

// 검색 폼
const SearchDiv = styled.div`
	position: relative;
	min-width: 1280px;
	margin-top: 3%;

`;

class SearchBox extends Component {

	render() {
		return (
			<Fragment>
				<SearchDiv>
					<SearchItems />
					<TooltipBox />
				</SearchDiv>
			</Fragment>
		);
	}
}

export default SearchBox;

