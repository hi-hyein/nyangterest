import React, { Component, Fragment } from "react";
import Item from "./Item";
import Loading from "./Loading";
import { observer, inject } from "mobx-react";
import styled from "styled-components";

const ListWrapper = styled.ul`
	  	padding: 50px 50px 100px;
		display: grid;
		grid-template-columns: repeat(auto-fill, 250px);
		grid-gap: 20px;
		// grid-auto-rows: 300px;
		justify-content: space-around;
		// grid-template-rows: 260px 400px 400px;
		& > li {
			animation: fadeInUp 1s both;

			@keyframes fadeInUp {
				from {  transform: translate3d(0,40px,0); opacity: 0; }
				to   { transform: translate3d(0,0,0);opacity: 1; }
			}
			grid-column: span 1;
			// &:nth-child(5),
			// &:nth-child(6) {
			// 	grid-column: span 1;
			// }
			// &:nth-child(8) {
			// 	grid-column: span 4;
			// }
			// &:nth-child(14) {
			// 	grid-column: span 4;
			// }
		}

		@media screen and (max-width: 700px) {
			grid-template-columns: 1fr;
			grid-gap: 50px;
			padding: 10px;
			& > div {
				grid-column: span 1 !important;
			}
		}

`

@inject('listStore')
@observer
class List extends Component {

	componentDidMount() {
		const { handleScroll, loadList } = this.props.listStore;
		loadList();
		window.addEventListener("scroll", handleScroll);
	}

	componentWillUnmount() {
		const { handleScroll } = this.props.listStore;
		window.removeEventListener("scroll", handleScroll);
	}

	render() {
		const { listStore } = this.props;

		return (
			<Fragment>
				<ListWrapper className="item-list">
					{listStore.items.length > 0 && listStore.items.map((info, id) => (
						<li key={id}>
							<Item {...info} />
						</li>
					))}
				</ListWrapper>

				{/* {error && <div style={{ color: "#900" }}>{error}</div>} */}
				{listStore.isLoading && listStore.hasMore && (
					<div>
						Loading...
							<Loading />
					</div>
				)}
			</Fragment>
		);
	}
}

export default List;
