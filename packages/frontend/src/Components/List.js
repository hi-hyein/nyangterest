import React, { Component, Fragment } from "react";
import Item from "./Item";
import Loading from "./Loading";
import { observer, inject } from "mobx-react";

@inject('list')
@observer
class List extends Component {

	componentDidMount() {
		this.loadList();
		window.addEventListener("scroll", this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}

	handleScroll = () => {
		const { scrolling, isLoading, hasMore, error } = this.state;

		if (error || isLoading || !hasMore || scrolling) return;
		// if (numOfRows <= pageNo) return;
		const lastLi = document.querySelector("ul.List > li:last-child");
		const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
		const pageOffset = window.pageYOffset + window.innerHeight;
		const bottomOffset = 20;

		if (pageOffset > lastLiOffset - bottomOffset) {
			this.loadMore();
		}
	};

	render() {
		const { isLoading, hasMore } = this.state;
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

				{/* {error && <div style={{ color: "#900" }}>{error}</div>} */}
				{isLoading === true || hasMore === true ? (
					<div>
						Loading...
						<Loading />
					</div>
				) : (
						<div>
							<p>You did it! You reached the end!</p>
						</div>
					)}
			</div>
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
