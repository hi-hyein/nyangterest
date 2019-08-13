import React, { Component, Fragment } from 'react';
import Item from "./Item";
import Loading from "./Loading";
import FormBox from "./search/FormBox";
import TooltipBox from "./search/TooltipBox";
import styled from "styled-components";
import { fadeInUp } from "./Animations";
import { observer, inject } from "mobx-react";

// 검색 폼
const SearchDiv = styled.div`
	position: relative;
	z-index: 99;
	display: flex;
	padding: 0 5%; 
	transition: all 0.2s ease;

	@media screen and (max-width: 1024px) {
		padding: 0 7%;
  		align-items: center;
  		justify-content: center;
	}

	@media screen and (max-width: 700px) {
		flex-wrap: wrap-reverse;
	}
	
`;

// 리스트
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
@inject('listStore')
@observer
class Home extends Component {
	state = {
		search: "",
		active: false,
		isVisible: false

	};

	componentDidMount() {
		const { handleScroll, loadList } = this.props.listStore;
		loadList();
		window.addEventListener("scroll", handleScroll);
	}

	componentWillUnmount() {
		const { handleScroll } = this.props.listStore;
		window.removeEventListener("scroll", handleScroll);
	}


	callApi = async () => {
		try {
			const { items, pageNo, numOfRows } = this.state;
			const url = `/search/${numOfRows}/${pageNo}`;

			// const config = {
			// 	method: 'POST',
			// 	headers: {
			// 		'Accept': 'application/json',
			// 		'Content-Type': 'application/json',
			// 	}
			// };
			const response = await fetch(url);
			// const response = await fetch(url, config);
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

	// loadMore = () => {
	// 	this.setState(
	// 		prevState => ({
	// 			pageNo: prevState.pageNo + 1,
	// 			scrolling: true,
	// 			isLoading: true
	// 		}),
	// 		this.callApi
	// 	);
	// };


	handleChange = (e) => {
		console.log(e.target.value)
		this.setState({ search: e.target.value });
	}

	toggleHidden = () => {
		this.setState({
			active: !this.state.active,
			isVisible: !this.state.isVisible,
		});
		console.log('toggle show. ..')
	}

	render() {
		const { listStore } = this.props;
		// const { handleChange, toggleHidden } = this.props.listStore;
		const lowercaseFilter = this.state.search.toLowerCase();
		const filteredItem = listStore.items.filter(item => {
			// console.log(this.state.search.toLowerCase());
			return Object.keys(item).some(key =>
				typeof item[key] === "string" && item[key].toLowerCase().includes(lowercaseFilter)
			)
		});

		return (
			<Fragment>
				<SearchDiv>
					<FormBox isVisible={this.state.isVisible} value={this.state.search} onChange={this.handleChange} />
					<TooltipBox active={this.state.active} onClick={this.toggleHidden} />
				</SearchDiv>
				<ListWrapper className="item-list">
					{listStore.items.length > 0 && filteredItem.map((item, id) => (
						<li key={id}>
							<Item {...item} />
						</li>
					))
					}
				</ListWrapper>

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

export default Home;
