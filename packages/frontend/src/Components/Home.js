import React, { Component, Fragment } from "react";
import { observer, inject } from "mobx-react";
import throttle from "lodash.throttle";
import DayPicker from "./search/DayPicker";
import "moment/locale/ko";
import styled from "styled-components";
import List from "./List";
import Loading from "./Loading";
import FormBox from "./search/FormBox";
import SearchBox from "./search/SearchBox";
import SelectBox from "./search/SelectBox";
import TooltipBox from "./search/TooltipBox";
import BtnTop from "./BtnTop";
import { fadeInDown, fadeOutUp } from "./Animations";

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
		min-width: auto;
		margin-left: 10px;
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

const Message = styled.div`
	padding-top: 130px;
	color: #f00;
`;

const Preloader = styled.div`
	padding-top: 0;
	color: #5262bc;
	animation: ${fadeOutUp} 1s both;
	transition: all 2s ease;
	opacity: 0

	&.on {
		padding-top: 200px;
		animation: ${fadeInDown} 1s both;
		opacity: 1
	}
`;

@inject("listStore", "searchStore", "btnStore")
@observer
class Home extends Component {

	componentDidMount() {
		const { handleScroll, loadList } = this.props.listStore;
		// 스크롤링 제어
		this._throttledScroll = throttle(handleScroll, 1000)
		window.addEventListener("scroll", this._throttledScroll);
		loadList();
	}

	componentWillUnmount() {
		const { timer } = this.props.btnStore;
		clearTimeout(timer);
		window.removeEventListener("scroll", this._throttledScroll);
	}

	render() {
		const { items, isLoading, loading, hasMore, totalPage, totalCount } = this.props.listStore;
		const { active, isVisible, toggleHidden, on, handleScrollTop } = this.props.btnStore;
		const { from, to, handleFromChange, handleToChange, searchField, selectedCategory, categoryChange, searchChange } = this.props.searchStore;

		// 품종 카테고리 셀렉트박스  && 검색어 입력

		const filteredItems = items.filter(item => {
			if (typeof item === "object") {
				return (
					item.kindCd.replace("한국 고양이", "코리안숏헤어").includes(selectedCategory) &&
					Object.keys(item).some(
						key =>
							typeof item[key] === "string" &&
							item[key].toLowerCase().replace("한국 고양이", "코리안숏헤어").includes(searchField)
						, console.log(item.kindCd)
					)
				);
			} else {
				return null;
			}

		});

		return (
			<Fragment>
				<BtnTop
					on={on}
					onClick={handleScrollTop}
					title="맨위로 이동"
				/>
				<SearchDiv>
					<Form onSubmit={(e) => { e.preventDefault(); }}
						autoComplete="off"
						className={isVisible ? "slide-in" : "slide-out"}
					>
						<FormBox>
							<DayPicker className="Selectable" from={from} to={to} onFromChange={handleFromChange} onToChange={handleToChange} />
						</FormBox>
						<SelectBox
							defaultValue={selectedCategory}
							onChange={categoryChange}
						/>
						<SearchBox SearchChange={e => searchChange(e.target.value)} />

					</Form>
					<TooltipBox active={active} onClick={toggleHidden} />
				</SearchDiv>

				{loading ? (< Preloader className={loading && "on"}> <div><Loading /></div></Preloader >) : (<List products={filteredItems} />)}


				{!loading && !(isLoading && hasMore) && !(items.length && filteredItems.length) && (
					<Message><p>해당 데이터가 없습니다.</p></Message>
				)}

				{/* {!items.length || (!filteredItems.length && (
					<div><p>검색결과가 없습니다.</p></div>
				))} */}


				{!loading && (isLoading && hasMore) && (!(totalPage && (totalCount === items.length))) && (
					<div>
						Loading...
            			<Loading />
					</div>
				)}

				{totalPage && (items.length === totalCount) && (items.length > 0 && filteredItems.length > 0) &&
					(<Message><p>마지막 페이지입니다!</p></Message>)
				}


			</Fragment >
		);
	}
}

export default Home;
