import React, { Component } from "react";
import Item from "./Item";

class List extends Component {
	state = {
		items: [],
		pageNo: 1,
		numOfRows: null,
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
		const { scrolling, numOfRows, pageNo } = this.state;
		if (scrolling) return;
		if (numOfRows <= pageNo) return;
		const lastLi = document.querySelector("ul.List > li:last-child");
		const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
		const pageOffset = window.pageYOffset + window.innerHeight;
		const bottomOffset = 20;
		if (pageOffset > lastLiOffset - bottomOffset) {
			this.loadMore();
		}
	};

	loadList = () => {
		const { items, pageNo, numOfRows } = this.state;
		// const url = "/";
		const url = `/page/${pageNo}`;
		fetch(url)
			.then(response => response.json())
			// .then(response => console.log(response))
			.then(json =>
				this.setState(
					{
						items: [...items, ...json.items.item],
						scrolling: false,
						numOfRows: json.numOfRows
					},
					() => console.log(items, numOfRows, pageNo)
				)
			)
			.catch(err => console.log(err));
		// console.log(numOfRows);
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
		return (
			<ul className="List">
				{/* <Item /> */}
				{this.state.items.map(info => (
					<li key={info.id}>
						<Item {...info} />
					</li>
				))}
			</ul>
		);
	}
}

export default List;
