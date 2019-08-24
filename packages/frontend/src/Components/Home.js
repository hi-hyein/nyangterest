import React, { Component, Fragment } from 'react';
import Item from "./Item";
import Loading from "./Loading";
import FormBox from "./search/FormBox";
import DayPicker from './search/DayPicker';
import TooltipBox from "./search/TooltipBox";
import styled from "styled-components";
import { fadeInUp } from "./Animations";
import { observer, inject } from "mobx-react";
import moment from 'moment';

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
@inject('listStore', 'searchStore')
@observer
class Home extends Component {

	state = {
		from: undefined,
		to: undefined,
		// value: ""

	}

	componentDidMount() {
		const { handleScroll, loadList } = this.props.listStore;
		loadList();
		window.addEventListener("scroll", handleScroll);
	}

	componentWillUnmount() {
		const { handleScroll } = this.props.listStore;
		window.removeEventListener("scroll", handleScroll);
	}

	// searchList = async (pageNo) => {

	// 	try {
	// 		const { items, pageNo, numOfRows } = this.props.listStore;
	// 		const { searchKeyword } = this.props.searchStore;
	// 		const url = `/page/${searchKeyword}/${numOfRows}/${pageNo}`;
	// 		const response = await fetch(url);
	// 		const json = await response.json();
	// 		console.log(json);
	// 		if (json.items.length === 0) {
	// 			this.setState(() => {
	// 				return {
	// 					error:
	// 						"검색된 내용이 없습니다."
	// 				};
	// 			});
	// 		} else {
	// 			this.setState(() => {
	// 				return { items: [...items, ...json.items.item], error: "" };
	// 			});
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }


	// handleKeyPress = (e) => {
	// 	if (e.keyCode === 13) {
	// 		// e.preventDefault();
	// 		console.log("key down!");
	// 		this.setState(
	// 			() => {
	// 				const { pageNo, numOfRows } = this.props.listStore;
	// 				const { searchKeyword } = this.props.searchStore;
	// 				const url = `/page/${searchKeyword}/${numOfRows}/${pageNo}`;;
	// 				return { url, search: "" };
	// 			},
	// 			() => {
	// 				this.searchList();
	// 			}
	// 		);
	// 	}
	// }

	// 오늘 날짜 기준으로 일주일치만 고정시켜두는 로직
	handleFromChange = (from) => {
		this.setState({ from });
	}

	handleToChange = (to) => {
		this.setState({ to }, this.showFromMonth, console.log(typeof to))
	}

	showFromMonth = () => {
		const { from, to } = this.state;
		if (!from) {
			return;
		}
		if (moment(to).diff(moment(from), 'months') < 1) {
			this.to.getDayPicker().showMonth(from);
		}
	}

	render() {
		const { handleFromChange, handleToChange } = this;
		const { from, to } = this.state;
		const { items, isLoading, hasMore } = this.props.listStore;
		const { search, active, isVisible, handleChange, toggleHidden } = this.props.searchStore;
		const { handleKeyPress } = this.props;
		// const { search, active, isVisible, handleChange, handleKeyPress, toggleHidden } = this.props.searchStore;

		const searchSplit = search.split(" ");
		console.log(searchSplit)
		const lowercaseFilter = searchSplit.filter(item => {
			return item.split("").reverse().join("") || searchSplit;


		});
		console.log(typeof searchSplit, typeof lowercaseFilter)

		// return searchSplit.reverse().join(" ") === search;

		// console.log(checkSearchKeyword("test"))

		// const lowercaseFilter = search.toLowerCase();
		// const filteredDateItem = items.filter(item => item.happenDt > dayPicker.from && item.happenDt < dayPicker.to);
		// const finalfilteredItems = filteredDateItem.filter(item => {
		// 	return Object.keys(item).some(key =>
		// 		typeof item[key] === "string" && item[key].toLowerCase().includes(lowercaseFilter)
		// 	);

		const filteredItem = items.filter(item => {
			return Object.keys(item).some(key =>
				typeof item[key] === "string" && item[key].toLowerCase().includes(lowercaseFilter)
			)
			// return Object.keys(item).some(key =>
			// 	typeof item[key] === "string" && item[key].toLowerCase().includes(lowercaseFilter)
			// )

		})

		// console.log(JSON.stringify(filteredItem).replace(/,/g, " "))

		return (
			< Fragment >
				<SearchDiv>
					<FormBox isVisible={isVisible} value={search} onChange={handleChange} onKeyPress={handleKeyPress} >
						<DayPicker from={from} to={to} onDayFromChange={handleFromChange} onDayToChange={handleToChange} selectedDays={[from, { from, to }]} />
					</FormBox>

					<TooltipBox active={active} onClick={toggleHidden} />
				</SearchDiv>
				<ListWrapper className="item-list">
					{items.length > 0 && filteredItem.map((item, id) => (
						<li key={id}>
							<Item {...item} />
						</li>

					))}

				</ListWrapper>

				{
					isLoading && hasMore && (
						<div>
							Loading...
						<Loading />
						</div>
					)
				}
			</Fragment >
		)
	}
}

export default Home;
