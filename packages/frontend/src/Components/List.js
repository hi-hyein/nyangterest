import React, { Component, Fragment } from "react";
import Item from "./Item";

class List extends Component {
	state = {
		items: [],
		numOfRows: 36,
		pageNo: 1,
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

	// async , await으로 변경
	loadList = async () => {
		try {
			const { items, pageNo, numOfRows } = this.state;
			const url = `/page/${numOfRows}/${pageNo}`;
			const response = await fetch(url);
			const json = await response.json();
			this.setState(
				{
					items: [...items, ...json.items.item],
					scrolling: false,
					numOfRows: json.numOfRows
				},
				() => console.log(items, numOfRows, pageNo)
			);
		} catch (err) {
			console.log(err);
		}
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
			<Fragment>
				<ul className="List">
					{this.state.items.map(info => (
						<li key={info.id}>
							<Item {...info} />
						</li>
					))}
				</ul>
			</Fragment>
		);
	}

	// render() {
	// 	const IsLoading = false;
	// 	return (
	// 		<ul className="List">
	// 			{IsLoading === true ? (
	// 				<li>Loading...</li>
	// 			) : (
	// 				this.state.items.map(info => (
	// 					<li key={info.id}>
	// 						<Item {...info} />
	// 					</li>
	// 				))
	// 			)}
	// 		</ul>
	// 	);
	// }
}

export default List;
