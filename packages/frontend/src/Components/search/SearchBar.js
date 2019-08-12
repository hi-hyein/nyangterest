import React, { Component, Fragment } from 'react';
import SearchItems from "./SearchItems";
import Item from "./Item";
import styled from "styled-components";
import { fadeInUp } from "../Animations";

const ListWrapper = styled.ul`
	  	padding: 50px 50px 100px;
		display: grid;
		grid-template-columns: repeat(auto-fill, 250px);
		grid-gap: 20px;
		// grid-auto-rows: 300px;
		justify-content: space-around;
		// grid-template-rows: 260px 400px 400px;
		transition: all 0.5s ease
		
		& > li {
			animation: ${fadeInUp} 1s both;

			grid-column: span 1;
			
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
class SearchBar extends Component {
	state = {
		search: "",
		items: [],
		numOfRows: 72,
		pageNo: 1,
		scrolling: false,
		hasMore: true,
		isLoading: false,
		error: false

	};

	componentDidMount() {
		this.callApi();
		window.addEventListener("scroll", this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}

	handleScroll = () => {
		const { scrolling, isLoading, hasMore, error } = this.state;

		if (error || isLoading || !hasMore || scrolling) return;
		// if (numOfRows <= pageNo) return;
		const lastLi = document.querySelector(".search-list > li:last-child");
		const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
		const pageOffset = window.pageYOffset + window.innerHeight;
		const bottomOffset = 20;

		if (pageOffset > lastLiOffset - bottomOffset) {
			this.loadMore();
		}
	};


	callApi = async () => {
		try {
			const { items } = this.state;
			const url = `/search`;
			const config = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}
			};
			const response = await fetch(url, config);
			const data = await response.json();
			// console.log(data);
			this.setState(
				{
					items: [...items, ...data.items.item],
					scrolling: false,
					numOfRows: data.numOfRows,
					isLoading: false
				},
				() => console.log(this)
			);
		} catch (err) {
			// console.log(err);
			this.setState({
				error: err.message,
				isLoading: false
			});
		}
	}

	loadMore = () => {
		this.setState(
			prevState => ({
				pageNo: prevState.pageNo + 1,
				scrolling: true,
				isLoading: true
			}),
			this.callApi
		);
	};

	handleChange = (e) => {
		// console.log(e.target.value)
		this.setState({ search: e.target.value });
	}

	render() {
		const { isLoading, hasMore } = this.state;
		let filteredItem = this.state.items;

		if (this.state.search) {
			filteredItem = filteredItem.filter(item => {
				console.log(this.state.search.toLowerCase());
				return (
					item.kindCd.toLowerCase().includes(this.state.search.toLowerCase()) ||
					item.age.toString().includes(this.state.search) ||
					item.happenPlace.toString().includes(this.state.search) ||
					item.careNm.toString().includes(this.state.search) ||
					item.colorCd.toString().includes(this.state.search) ||
					item.neuterYn.toLowerCase().includes(this.state.search.toLowerCase()) ||
					item.happenDt.toString().includes(this.state.search) ||
					false
				);
			});
		}

		return (
			<Fragment>
				<SearchItems value={this.state.search} onChange={this.handleChange} />
				<ListWrapper className="search-list">
					{filteredItem.map((item, id) => (
						<li key={id}>
							<Item {...item} />
						</li>

					))
					}
				</ListWrapper>
				{isLoading && hasMore && (
					<div>
						Loading...

					</div>
				)}

			</Fragment>
		);
	}
}

export default SearchBar;
