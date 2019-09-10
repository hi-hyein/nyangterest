import React, { Component } from "react";
import Item from "./Item";
import styled from "styled-components";
import Layer from './popup/Layer';
import ListDetail from './detail/ListDetail';

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
    border: 0;
	cursor: zoom-in;
	background: unset;

	& > div {
		grid-column: span 1 !important;
	}
`
class List extends Component {

	state = { isOpen: 0 }

	popupClick = (value) => {
		this.setState({
			isOpen: value,
		})
	}

	popupClose = (value) => {
		this.setState({
			isOpen: 0,
		})
	}

	render() {
		const { products } = this.props;
		return (
			<ListWrapper className="item-list">
				{products.map((product) => {
					return (
						<li key={product.desertionNo}>
							<Button onClick={() => this.popupClick(product.desertionNo)}>
								<Item {...product} />
							</Button>
							{this.state.isOpen === product.desertionNo &&
								<Layer layerTitle={`${product.kindCd}`} onClose={() => this.popupClose(product.desertionNo)}>
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
