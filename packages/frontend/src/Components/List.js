import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Item from "./Item";
import styled from "styled-components";
import Layer from './popup/Layer';
import ListDetail from './detail/ListDetail';
import { fadeInUp } from './Animations';

// 리스트
const ListWrapper = styled.ul`
	padding: 150px 50px 100px;
	display: grid;
	grid-template-columns: repeat(auto-fill, 250px);
	grid-gap: 20px;
	// grid-auto-rows: 300px;
	justify-content: space-around;
	transition: all 0.5s ease; 
	
	& > li {
		grid-column: span 1;
		animation: ${fadeInUp} 1s both;
	}

	@media screen and (max-width: 1024px) {
		padding: 50px 50px 100px
	}

	@media screen and (max-width: 700px) {
		grid-template-columns: 1fr;
		grid-gap: 50px;
		padding: 10px;
	}
`;

const Button = styled.button`
	width: 100%;
    padding: 0;
	font-size: inherit;
	cursor: zoom-in;
	background: unset;

	& > div {
		grid-column: span 1 !important;
	}
`
@inject("popupStore")
@observer
class List extends Component {

	render() {
		const { products } = this.props;
		const { isOpen, popupOpen, popupClose } = this.props.popupStore;
		return (
			<ListWrapper className="item-list">
				{products.map((product) => {
					return (
						<li key={product.desertionNo}>
							<Button onClick={() => popupOpen(product.desertionNo)}>
								<Item {...product} />
							</Button>
							{isOpen === product.desertionNo &&
								<Layer layerTitle={`${product.kindCd}`.replace("한국 고양이", "코리안숏헤어")} onClose={() => popupClose(product.desertionNo)}>
									<ListDetail {...product} />
								</Layer>}
						</li>
					)
				})}
			</ListWrapper>
		);
	}
}


export default List;
