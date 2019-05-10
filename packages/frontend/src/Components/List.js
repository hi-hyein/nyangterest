import React, { Component } from "react";
import Item from "./Item";

class List extends Component {
	state = {
		items: [],
		pageNo: 1,
		numOfRows: 50,
		totalCount: null,
		scrolling: false
	};

	componentDidMount() {
		this.loadList();
		this.scrollListener = window.addEventListener("scroll", e => {
			this.handleScroll(e);
		});
	}

	handleScroll = () => {
		// const { scrolling } = this.state;
		const { scrolling, totalCount, pageNo } = this.state;
		if (scrolling) return;
		if (totalCount <= pageNo) return;
		const lastLi = document.querySelector("ul.List > li:last-child");
		const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
		const pageOffset = window.pageYOffset + window.innerHeight;
		const bottomOffset = 20;
		if (pageOffset > lastLiOffset - bottomOffset) {
			this.loadMore();
		}
	};

	loadList = () => {
		// const { items } = this.state;
		const { items, pageNo, numOfRows } = this.state;
		// const url = "/";
		const url = `/api?pageNo=${pageNo}&numOfRows=${numOfRows}`;
		fetch(url)
			.then(response => response.json())
			.then(response => console.log(response))
			.then(json =>
				this.setState({
					items: [...items, ...json.items],
					scrolling: false,
					numOfRows: json.numOfRows
				})
			)
			.catch(err => console.log(err));
	};

	loadMore = () => {
		this.setState(
			prevState => ({
				pageNo: prevState.pageNo + 1,
				scrolling: true
			}),
			this.loadList
		);
	};

	render() {
		const { items } = this.state;
		// console.log(items);
		return (
			<ul className="List">
				<Item />
				{/* {items.item.map(info => (
					<li key={info.id}>
						<Item {...info} />
					</li>
				))} */}
			</ul>
		);
	}
}

export default List;
