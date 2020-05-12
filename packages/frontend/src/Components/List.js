import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Item from "./Item";
import styled from "styled-components";
import Layer from './popup/Layer';
import ListDetail from './detail/ListDetail';
import { fadeInUp } from './Animations';

// 리스트
const ListWrapper = styled.ul`
	padding: 150px 50px 70px;
	display: grid;
	grid-template-columns: repeat(auto-fill, 250px);
	grid-gap: 20px;
	// grid-auto-rows: 300px;
	justify-content: space-around;
	transition: all 0.5s ease; 
	
	& > li {
		grid-column: span 1;
		animation: ${fadeInUp} 1s both;

		&:nth-child(16n+1),:nth-child(16n+2),:nth-child(16n+3),:nth-child(16n+4)> button > div  {
			 border-top: 2px solid #ee9b97;
			  border-radius: 8px;
		}	

		&:nth-child(16n+5),:nth-child(16n+6),:nth-child(16n+7),:nth-child(16n+8) > button > div  {
			 border-top: 1px solid #4A8391;
			 border-radius: 8px;
		}

		&:nth-child(16n+9),:nth-child(16n+10),:nth-child(16n+11),:nth-child(16n+12) > button > div  {
			 border-top: 2px solid #A1CEAB;
			 border-radius: 8px;
		}	

		&:nth-child(16n+13),:nth-child(16n+14),:nth-child(16n+15),:nth-child(16n+16) > button > div  {
			 border-top: 2px solid #d2e5c5;
			 border-radius: 8px;
		}	
	}

	& + div {
		padding: 20px 0;
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
