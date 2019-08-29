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
// 오늘 날짜 기준으로 일주일전
const defaultFrom = new Date(Date.now() + -7 * 24 * 3600 * 1000);    //-일/시/60분*60초/밀리세컨
const todayDate = new Date();

@inject('listStore', 'searchStore')
@observer

class Home extends Component {

	// DayPicker
	state = {
		from: defaultFrom,
		to: todayDate,
	}

	handleFromChange = (from) => {
		this.setState({ from });
	}

	handleToChange = (to) => {

		this.setState({ to }, this.showFromMonth)
		// this.setState({ to }, this.showFromMonth, console.log(typeof to))
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

	componentDidMount() {
		const { handleScroll, loadList } = this.props.listStore;
		loadList();
		window.addEventListener("scroll", handleScroll);
	}

	componentWillUnmount() {
		const { handleScroll } = this.props.listStore;
		window.removeEventListener("scroll", handleScroll);
	}


	render() {
		const { from, to } = this.state;
		const { handleFromChange, handleToChange } = this;
		const { items, isLoading, hasMore } = this.props.listStore;
		const { search, active, isVisible, toggleHidden } = this.props.searchStore;

		// console.log(typeof search)
		const searchSplit = search.split(" ");
		// console.log(typeof searchSplit)

		const lowercaseFilter = searchSplit.filter(item => {
			return item.split("").reverse().join("") || searchSplit;
		}, console.log(searchSplit));
		// console.log(typeof searchSplit, typeof lowercaseFilter)

		const filteredItem = items.filter(item => {
			return Object.keys(item).some(key =>
				typeof item[key] === "string" && item[key].toLowerCase().includes(lowercaseFilter)
			)

		})

		return (
			< Fragment >
				<SearchDiv>
					<FormBox isVisible={isVisible} value={search}>
						<DayPicker
							month={from} from={from} to={to} onDayFromChange={handleFromChange} onDayToChange={handleToChange} selectedDays={[from, { from, to }]} />

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

		// return searchSplit.reverse().join(" ") === search;

		// console.log(checkSearchKeyword("test"))

		// const lowercaseFilter = search.toLowerCase();
		// const filteredDateItem = items.filter(item => item.happenDt > dayPicker.from && item.happenDt < dayPicker.to);
		// const finalfilteredItems = filteredDateItem.filter(item => {
		// 	return Object.keys(item).some(key =>
		// 		typeof item[key] === "string" && item[key].toLowerCase().includes(lowercaseFilter)
		// 	);
	}
}

export default Home;
