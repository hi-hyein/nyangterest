import React, { Component, Fragment } from "react";
import Item from "./Item";
import Loading from "./Loading";

class List extends Component {
	state = {
		items: [],
		numOfRows: 36,
		pageNo: 1,
		scrolling: false,
		hasMore: true,
		isLoading: false,
		error: false
	};

	componentDidMount() {
		this.loadList();
		// this.scrollListener = window.addEventListener("scroll", e => {
		// 	this.handleScroll(e);
		// });
		window.addEventListener("scroll", this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}

	handleScroll = () => {
		const {
			scrolling,
			numOfRows,
			pageNo,
			isLoading,
			hasMore,
			error
		} = this.state;
		if (error || isLoading || !hasMore || scrolling) return;
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
					numOfRows: json.numOfRows,
					isLoading: false
					// hasMore: this.state.items.length
				},
				() => console.log(items, numOfRows, pageNo)
			);
		} catch (err) {
			// console.log(err);
			this.setState({
				error: err.message,
				isLoading: false
			});
		}
	};

	loadMore = () => {
		this.setState(
			prevState => ({
				pageNo: prevState.pageNo + 1,
				scrolling: true,
				isLoading: true
			}),
			this.loadList
		);
	};

	// render() {
	// 	return (
	// 		<Fragment>
	// 			<Loading />
	// 			<ul className="List">
	// 				{this.state.items.map(info => (
	// 					<li key={info.id}>
	// 						<Item {...info} />
	// 					</li>
	// 				))}
	// 			</ul>
	// 		</Fragment>
	// 	);
	// }

	render() {
		const { isLoading, hasMore, error } = this.state;
		return (
			<div>
				<Fragment>
					<ul className="List">
						{this.state.items.map(info => (
							<li key={info.id}>
								<Item {...info} />
							</li>
						))}
					</ul>
				</Fragment>
				{error && <div style={{ color: "#900" }}>{error}</div>}
				{isLoading && (
					<div>
						Loading...
						<Loading />
					</div>
				)}
				{hasMore === false && (
					<div>You did it! You reached the end!</div>
				)}
			</div>
		);
	}
}

export default List;
