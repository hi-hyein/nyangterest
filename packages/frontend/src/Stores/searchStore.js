import { observable, action } from "mobx";
import debounce from "lodash.debounce";

export default class SearchStore {

	@observable from = new Date(Date.now() + -7 * 24 * 3600 * 1000);
	@observable to = new Date();
	@observable searchField = "";
	@observable selectedCategory = "";

	constructor(root) {
		this.root = root;
	}

	// DayPicker 날짜 선택기
	@action
	handleFromChange = from => {
		console.log(typeof from)
		this.from = from;
	};


	@action
	handleToChange = (to) => {
		const { searchList, resetList } = this.root.listStore;
		console.log(typeof to, to)
		// 	to의 날짜를 선택했을때 최근날짜의 리스트는 리셋해야 한다.
		this.to = to;
		resetList();
		searchList();
	};

	// 품종 카테고리 셀렉트박스
	@action
	categoryChange = (e) => {
		const { searchList, resetList, totalCount, items } = this.root.listStore;
		console.log("라인 47번 :" + items.length, totalCount)
		this.selectedCategory = e.value
		console.log("필터링!!")
		if (items.length !== totalCount) {
			console.log("체인지!!")
			resetList();
			searchList();
		}
	};

	// 검색어 입력
	@action
	searchChange = debounce((searchField) => {
		const { searchList, resetList, totalCount, items } = this.root.listStore;
		this.searchField = searchField;
		if (items.length !== totalCount) {
			console.log("체인지!!")
			resetList();
			searchList();
		}
	}, 800);

}





