import React, { Component, Fragment } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import List from "./List";
import Loading from "./Loading";
import DayPicker from "./search/DayPicker";
import FormBox from "./search/FormBox";
import SearchBox from "./search/SearchBox";
import SelectBox from "./search/SelectBox";
import TooltipBox from "./search/TooltipBox";

const Form = styled.form`
	display: flex;
	flex: auto;
	text-align: left;
	// transform: translate(-500%);
	transition: all 0.7s ease-in-out 
	
	@media screen and (max-width:960px) {
		flex-wrap: wrap;
	}

	&.slide-in {
		margin-top: 24px;
		height: 100%;
		transform: translateX(0);

		@media screen and (max-width: 1024px) {
			+ .btn-wrap {
				margin-top: 24px;
				top: unset;
			}
		}

		@media screen and (max-width: 700px) {
			margin-top: 40px;
			transform: none;
			text-align: center;
			opacity: 1;

			+ .btn-wrap {
				margin-top: 15px;
			}
		}
	}

	&.slide-out {
		transform: translateX(-500%);

		@media screen and (max-width: 700px) {
			margin-top: -70px;
			transform: translateY(-100%);
			opacity: 0;
		}
	}

	&& {
		& > div {
			margin-right: 2%;

			@media screen and (max-width: 960px) {
				margin-right: 0;
				min-width: 100%;
			}
		}
	}
`;


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

@inject('listStore', 'searchStore')
@observer
class Home extends Component {

	state = {
		searchField: "",
		selectedCategory: ""
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

	searchChange = e => {
		this.setState({ searchField: e.target.value });
		console.log(this.state);
	};

	// select filter
	categoryChange = e => {
		this.setState({ selectedCategory: e.value });
		console.log(e.value);
	};

	render() {
		const { items, isLoading, hasMore } = this.props.listStore;
		const { active, isVisible, toggleHidden } = this.props.searchStore;
		const { searchField, selectedCategory } = this.state;

		const filteredItems = items.filter(item => {
			return (
				// 셀렉트박스 필터링
				item.kindCd.includes(selectedCategory) &&
				// item.kindCd.includes(searchField)
				// 검색바
				Object.keys(item).some(
					key =>
						typeof item[key] === "string" &&
						item[key].toLowerCase().includes(searchField)
				)
			);
		});

		// 달력을 포함한 코드
		// const filteredDateItem = items.filter(item => item.happenDt > dayPicker.from && item.happenDt < dayPicker.to);
		// const finalfilteredItems = filteredDateItem.filter(item => {
		// 	return Object.keys(item).some(key =>
		// 		typeof item[key] === "string" && item[key].toLowerCase().includes(lowercaseFilter)
		// // 	);
		// const finalfilteredItems = filteredDateItem.filter(item => {
		// 	return (
		// 		item.kindCd.includes(selectedCategory) &&
		// 		Object.keys(item).some(
		// 			key =>
		// 				typeof item[key] === "string" &&
		// 				item[key].toLowerCase().includes(searchField)
		// 		)
		// 	);
		// });

		return (
			< Fragment >
				<SearchDiv>
					<Form
						autoComplete="on"
						className={isVisible ? "slide-in" : "slide-out"}
					>
						<FormBox isVisible={isVisible} value="">
							<DayPicker />
						</FormBox>
						<SelectBox
							defaultValue={this.selectedCategory}
							onChange={this.categoryChange}
						/>
						<SearchBox SearchChange={this.searchChange} />
					</Form>
					<TooltipBox active={active} onClick={toggleHidden} />
				</SearchDiv>
				{items.length > 0 && <List products={filteredItems} />}
				{!items.length && !filteredItems.length && (
					<div>No Guides available</div>
				)}
				{isLoading && hasMore && (
					<div>
						Loading...
						<Loading />
					</div>
				)}
			</Fragment >
		)

	}
}

export default Home;
