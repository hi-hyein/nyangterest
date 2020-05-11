import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { MdSearch } from "react-icons/md";

const TextFieldDiv = styled(TextField)`
	&& {
		// width: 56%;
		flex-basis: 70%;

		[placeholder] {
			text-overflow: ellipsis;
			padding-left: 12px;
		}

		& label[class*="-focused"] {
			color: #a1ceab;
		}

		& div[class*="-focused"] fieldset {
			border: 2px solid #a1ceab;
		}
	}
`;

// 검색아이콘
const IconButton = styled.button`
	position: relative;
	width: 2rem;
	height: 2rem;
	border: none;
	background: none;
	font-size: 2rem;
	color: #ccc;
	transition: all 2s ease;
	outline: none;
	cursor: none;
`;

let SearchIcon = styled(InputAdornment)`
	// position: relative;
	// width: 2rem;
	// font-size: 2rem;
	// color: #ccc;

	& svg {
		display: inline-block;
		position: absolute;
		top: 50%;
		-webkit-transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		transform: translateY(-50%);
		left: 0;
		right: 0;
		margin: auto;
		text-align: center;
	}
`;

SearchIcon = styled.span``;

const SearchBox = ({ searchField, SearchChange }) => {
	return (
		<TextFieldDiv
			label="검색어"
			placeholder="검색어를 입력하세요"
			margin="normal"
			variant="outlined"
			name="search"
			onChange={SearchChange}
			InputLabelProps={{
				shrink: true
			}}
			InputProps={{
				style: {
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
					overflow: "hidden",
					width: "100%"
				},
				startAdornment: (
					<IconButton>
						<SearchIcon position="start">
							<MdSearch />
						</SearchIcon>
					</IconButton>
				)
			}}
		/>
	);
};

export default SearchBox;
