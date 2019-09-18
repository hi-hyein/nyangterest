import React, { Component, Fragment } from "react";
import { observer, inject } from "mobx-react";
import throttle from "lodash.throttle";
import debounce from "lodash.debounce";
import DayPickerInput from "react-day-picker/DayPickerInput";
import DayPickerStyle from "./search/DayPickerStyle";
import MomentLocaleUtils, {
	formatDate,
	parseDate
} from "react-day-picker/moment";
import moment from "moment";
import "moment/locale/ko";
import styled from "styled-components";
import List from "./List";
import Loading from "./Loading";
import FormBox from "./search/FormBox";
// import DayPicker from "./search/DayPicker";
import SearchBox from "./search/SearchBox";
import SelectBox from "./search/SelectBox";
import TooltipBox from "./search/TooltipBox";
import BtnTop from "./BtnTop";

// 검색 폼
const SearchDiv = styled.div`
  position: fixed;
  // position: relative;
  z-index: 99;
  display: flex;
  width: 100%;
  max-width: 1280px;
  // max-height: 110px;
  padding: 0 5%;
  background: #fff;
  transition: all 0.2s ease;

  @media screen and (max-width: 1024px) {
    position: relative;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 960px) {
    padding: 0 7%;
  }

  @media screen and (max-width: 700px) {
    padding-top: 14%;
    flex-wrap: wrap-reverse;
  }

  @media screen and (max-width: 640px) {
    padding-top: 20%;
  }
`;

const Form = styled.form`
  display: flex;
  flex: auto;
  text-align: left;
  // transform: translate(-500%);
  transition: all 0.7s ease-in-out;

  @media screen and (max-width: 1024px) {
    flex-wrap: wrap;
  }

  &.slide-in {
    margin-top: 24px;
    height: 86px;
    transform: translateX(0);

    @media screen and (max-width: 1024px) {
      padding-top: 14%;
      height: auto;

      + .btn-wrap {
        margin-top: 24px;
        top: unset;
      }
    }

    @media screen and (max-width: 960px) {
      padding: 14% 0 2%;
      height: 100%;
    }

    @media screen and (max-width: 700px) {
      padding: 2% 0;
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
      margin-top: -100px;
      transform: translateY(-100%);
      opacity: 0;
    }
  }

  && {
    & > div {
      margin-right: 2%;

      @media screen and (max-width: 1024px) {
        margin-right: 0;
        min-width: 100%;
      }
    }
  }
`;

const InputFromDiv = styled.div`
	display: inline-block;

	input {
			max-width:127px; 
			border:none
			// border-bottom: 1px dotted #f00;
			font-size: 1rem;
			line-height: 1.5rem;
			text-align: center;

			&::placeholder {
				color: #ccc;
				// text-align: center;
			}
		}
`;

// 오늘 날짜 기준으로 일주일전
const defaultFrom = new Date(Date.now() + -7 * 24 * 3600 * 1000); //-일/시/60분*60초/밀리세컨
const todayDate = new Date();

@inject("listStore", "searchStore")
@observer
class Home extends Component {
	state = {
		searchField: "",
		selectedCategory: "",
		from: defaultFrom,
		to: todayDate,
		isDisabled: false,
		on: false
		// isOpen: false
	};

	showFromMonth = () => {
		const { from, to } = this.state;
		if (!from) {
			return;
		}
		if (moment(to).diff(moment(from), "months") < 1) {
			this.to.getDayPicker().showMonth(from);
		}
	};

	// handleDayClick(day) {
	// 	const range = DateUtils.addDayToRange(day, this.state);
	// 	this.setState(range);
	// }

	handleFromChange = from => {
		this.setState({ from });
	};

	handleToChange = to => {
		this.setState({ to }, this.showFromMonth);
		// this.setState({ to }, this.showFromMonth, console.log(typeof to))
	};

	componentDidMount() {
		const { handleScroll, loadList } = this.props.listStore;
		this._throttledScroll = throttle(handleScroll, 1000)
		window.addEventListener("scroll", this._throttledScroll);
		loadList();
	}

	componentWillUnmount() {
		// const { handleScroll } = this.props.listStore;
		window.removeEventListener("scroll", this._throttledScroll);

	}

	searchChange = debounce((searchField) => {
		this.setState({ searchField });
		console.log(this.state);
	}, 800);

	// select filter
	categoryChange = e => {
		this.setState({ selectedCategory: e.value });
		// console.log(e.value);
	};

	//   맨위로 이동 버튼
	handleScrollTop = () => {
		this.setState({ on: true });
		window.scrollTo(
			{
				top: 0,
				behavior: "smooth"

				// document.body.scrollTop = 0;
				// document.documentElement.scrollTop = 0;
			},
			setTimeout(() => {
				this.setState({ on: false });
			}, 2000)
		);
	};

	render() {
		const { items, isLoading, hasMore } = this.props.listStore;
		const { active, isVisible, toggleHidden } = this.props.searchStore;
		const { searchField, selectedCategory, on } = this.state;
		const { from, to } = this.state;
		const modifiers = { start: from, end: to };
		const { handleFromChange, handleToChange } = this;
		const { handleScrollTop, categoryChange, searchChange } = this;
    
		const filteredItems = items.filter(item => {
			return (
				// 셀렉트박스 필터링
				item.kindCd
					.replace("한국 고양이", "코리안숏헤어")
					.includes(selectedCategory) &&
				// item.kindCd.includes(searchField)
				// 검색바
				Object.keys(item).some(
					key =>
						typeof item[key] === "string" &&
						item[key]
							.toLowerCase()
							.replace("한국 고양이", "코리안숏헤어")
							.includes(searchField)
				)
			);
		});
		// const filteredItems = items.filter(item => {
		// 	return (
		// 		// 셀렉트박스 필터링

		// 		item.kindCd.includes(selectedCategory) &&
		// 		// item.kindCd.includes(searchField)
		// 		// 검색바
		// 		Object.keys(item).some(
		// 			key =>
		// 				typeof item[key] === "string" &&
		// 				item[key].toLowerCase().includes(searchField)
		// 		)
		// 	);
		// });

		// 달력을 포함한 코드

		const filteredDateItem = items.filter(
			item => item.happenDt >= from || item.happenDt <= to
			// happenDt는 from보다 크고 to보다 작다.
		);

		// console.log(filteredDateItem)

		const finalfilteredItems = filteredDateItem.filter(item => {
			return (
				item.kindCd.replace("한국 고양이", "코리안숏헤어").includes(selectedCategory) &&
				Object.keys(item).some(
					key =>
						typeof item[key] === "string" &&
						item[key].toLowerCase().replace("한국 고양이", "코리안숏헤어").includes(searchField)
				)
			);
		});
		console.log(`finalfilteredItems: ${finalfilteredItems.length}`)

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
			<Fragment>
				<BtnTop
					on={on}
					onClick={handleScrollTop}
					title="맨위로 이동"
				/>

				<SearchDiv>
					<Form
						autoComplete="off"
						className={isVisible ? "slide-in" : "slide-out"}
					>
						<FormBox>
							<div>
								<DayPickerStyle />
								<div className="InputFromTo">
									<InputFromDiv>
										<DayPickerInput
											value={from}
											placeholder={`${formatDate(new Date(), "LL", "ko")}`}
											format={"LL"}
											formatDate={formatDate}
											parseDate={parseDate}
											dayPickerProps={{
												locale: "ko",
												localeUtils: MomentLocaleUtils,
												selectedDays: [from, { from, to }],
												disabledDays: { after: to },
												toMonth: to,
												modifiers,
												numberOfMonths: 1,
												onDayClick: () => this.to.getInput().focus()
											}}
											onDayChange={handleFromChange}
										/>
									</InputFromDiv>{" "}
									-{" "}
									<InputFromDiv className="InputFromTo-to">
										<DayPickerInput
											ref={el => (this.to = el)}
											value={to}
											placeholder={`${formatDate(new Date(), "LL", "ko")}`}
											format={"LL"}
											formatDate={formatDate}
											parseDate={parseDate}
											dayPickerProps={{
												locale: "ko",
												localeUtils: MomentLocaleUtils,
												selectedDays: [from, { from, to }],
												disabledDays: { before: from },
												modifiers,
												month: from,
												fromMonth: from,
												numberOfMonths: 1
											}}
											onDayChange={handleToChange}
										/>
									</InputFromDiv>
								</div>
							</div>
						</FormBox>
						<SelectBox
							defaultValue={selectedCategory}
							onChange={categoryChange}
						/>
						<SearchBox SearchChange={e => searchChange(e.target.value)} />

					</Form>
					<TooltipBox active={active} onClick={toggleHidden} />
				</SearchDiv>
				{items.length > 0 && <List products={filteredItems} />}
				{!items.length || (!filteredItems.length && (
					<div><p>검색결과가 없습니다.</p></div>
				))}

				{isLoading && hasMore && (
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
