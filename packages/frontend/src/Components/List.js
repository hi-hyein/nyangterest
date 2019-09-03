import React from "react";
import Item from "./Item";
import styled from "styled-components";

// 리스트
const ListWrapper = styled.ul`
	padding: 50px 50px 100px;
	display: grid;
	grid-template-columns: repeat(auto-fill, 250px);
	grid-gap: 20px;
	// grid-auto-rows: 300px;
	justify-content: space-around;
	// grid-template-rows: 260px 400px 400px;
	transition: all 0.5s ease & > li {
		grid-column: span 1;
	}

	@media screen and (max-width: 700px) {
		grid-template-columns: 1fr;
		grid-gap: 50px;
		padding: 10px;
		& > div {
			grid-column: span 1 !important;
		}
	}
`;

const List = ({ products }) => {
	return (
		<ListWrapper className="item-list">
			{products.map((product, id) => {
				return (
					<li key={id}>
						<Item {...product} />
					</li>
				);
			})}
		</ListWrapper>
	);
};

export default List;
