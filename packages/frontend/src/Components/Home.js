import React, { Component, Fragment, Suspense } from "react";
import { observer, inject } from "mobx-react";
import throttle from "lodash.throttle";
import DayPicker from "./search/DayPicker";
import "moment/locale/ko";
import styled from "styled-components";
// import List from "./List";
import Loading from "./Loading";
import FormBox from "./search/FormBox";
import SearchBox from "./search/SearchBox";
import SelectBox from "./search/SelectBox";
import TooltipBox from "./search/TooltipBox";
import BtnTop from "./BtnTop";
import { fadeInDown, fadeOutUp } from "./Animations";
import img from "../img/no_data.gif";

const List = React.lazy(() => import('./List'));

// 검색 폼
const SearchDiv = styled.div`
  position: fixed;
  // position: relative;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1280px;
  // max-height: 110px;
  padding: 1% 5%;
  background: #f5faf6;
  transition: all 0.2s ease;

  @media screen and (max-width: 1024px) {
    // position: relative;
   
  }

  @media screen and (max-width: 960px) {
	  flex-wrap: wrap-reverse;
    // padding: 14% 7%;
  }

  @media screen and (max-width: 700px) {
    // padding-top: 14%;
    // flex-wrap: wrap-reverse;
  }

  @media screen and (max-width: 640px) {
    // padding-top: 20%;
  }

  @media screen and (max-width:639px) and (min-width:376px) {
    // padding-top: 10vh;
  }

  @media screen and (max-width: 360px) {
    // padding-top: 25%;
  }
`;

const Form = styled.form`
  display: flex;
  flex: auto;
  text-align: left;
  // transform: translate(-500%);
  transition: all 0.7s ease-in-out;

  @media screen and (max-width: 960px) {
    flex-wrap: wrap;
  }

  &.slide-in {
    height: 86px;
    transform: translateX(0);

	& + div {
		min-width: 50px;
	}

    @media screen and (max-width: 960px) {
      padding-top: 20%;
      height: auto;
	  transform: none;
      text-align: center;
      opacity: 1;

      + .btn-wrap {
		top: 0;  
		min-width: auto;
      }
    }

    @media screen and (max-width:780px) and (min-width:701px) {

      + .btn-wrap {
		top: -8px;  
      }
    }

    @media screen and (max-width: 700px) {
		padding-top: 17vh;

		+ .btn-wrap {
			top: 2px;  
			
		}
    }
  }

  &.slide-out {
    transform: translateX(-500%);

	@media screen and (max-width: 960px) {
		max-height: 150px;
		transform: translateY(-100%);
		opacity: 0;
    }

    @media screen and (max-width: 700px) {
      margin-top: -100px;
    //   transform: translateY(-100%);
    //   opacity: 0;
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

const Message = styled.div`
	padding-top: 130px;
	color: #ee9b97;

	& > p {
		padding-top: 30px;
		font-weight: 600;
	}
`;

const LastPage = styled.p`
	color: #4A8391;
`;

const Preloader = styled.figure`
	padding-top: 200px;
	color: #5262bc;
	// animation: ${fadeOutUp} 1s both;
	transition: all 2s ease;
	opacity: 1

	// &.on {
	// 	padding-top: 200px;
	// 	animation: ${fadeInDown} 1s both;
	// 	opacity: 1
	// }
`;

@inject("listStore", "searchStore", "btnStore")
@observer
class Home extends Component {

	state = { products: [] }

	componentDidMount() {
		const { handleScroll, loadList } = this.props.listStore;
		// 스크롤링 제어
		this._throttledScroll = throttle(handleScroll, 1000)
		window.addEventListener("scroll", this._throttledScroll);

		console.log("load")
		loadList();
	}

	componentWillUnmount() {
		const { timer } = this.props.btnStore;
		clearTimeout(timer);
		window.removeEventListener("scroll", this._throttledScroll);
	}


	render() {
		const { items, isLoading, loading, hasMore, totalPage } = this.props.listStore;
		const { active, isVisible, toggleHidden, on, handleScrollTop } = this.props.btnStore;
		const { from, to, handleFromChange, handleToChange, selectedCategory, categoryChange, searchChange } = this.props.searchStore;
		const renderLoader = () => < Preloader> <div><Loading /></div></Preloader >


		// 품종 카테고리 셀렉트박스  && 검색어 입력

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

				{!loading && (<Suspense fallback={renderLoader()}><List products={items} /></Suspense>)}

				{!loading && !isLoading && !items.length &&
					<Message>
						<img src={img} alt="" />
						<p>해당 데이터가 없습니다!</p>
					</Message>
				}

				{!loading && (isLoading && hasMore) && (!(totalPage && (totalPage > items.length))) && (
					<div>
						Loading...
						<Loading />
					</div>
				)}

				{totalPage && (!(isLoading && hasMore)) && (items.length > 0) &&
					(<Message><LastPage>마지막 페이지입니다!</LastPage></Message>)
				}

			</Fragment >
		);
	}
}

export default Home;
