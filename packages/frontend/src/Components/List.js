import React, { Component, Fragment } from "react";
import Item from "./Item";
import Loading from "./Loading";
import { observer, inject } from "mobx-react";

@inject('listStore')
@observer
class List extends Component {

	// componentDidMount() {
	// 	this.loadList();
	// 	window.addEventListener("scroll", this.handleScroll);
	// }

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}

	handleScroll = () => {
		const { scrolling, isLoading, hasMore, error } = this.props.listStore;

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
		const listStore = this.props.listStore;
		return (
			<div>
				<Fragment>
					<ul className="List">
						{listStore.items.map(info => (
							<li key={info.id}>
								<Item {...info} />
							</li>
						))}
					</ul>
				</Fragment>

				{/* {error && <div style={{ color: "#900" }}>{error}</div>} */}
				{listStore.isLoading === true || listStore.hasMore === true ? (
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
}

export default List;
