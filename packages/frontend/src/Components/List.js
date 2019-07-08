import React, { Component, Fragment } from "react";
import Item from "./Item";
import Loading from "./Loading";
import { observer, inject } from "mobx-react";

@inject('listStore')
@observer
class List extends Component {
	componentDidMount() {
		const { handleScroll, loadList } = this.props.listStore
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
				{listStore.isLoading === true || !listStore.hasMore === true ? (
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
