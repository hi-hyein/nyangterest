import { observable, action } from "mobx";
import debounce from "lodash.debounce";

export default class SearchStore {

	@observable from = new Date();
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
	handleToChange = to => {

		const { loadList2, resetList } = this.root.listStore;
		console.log(typeof to, to)
		this.to = to;

		// to의 날짜를 선택했을때 최근날짜의 리스트는 리셋해야 한다.

		resetList();
		// console.log("reset")
		this.numOfRows = this.totalCount;
		loadList2();
		// console.log("load")
	};

	// 품종 카테고리 셀렉트박스
	@action
	categoryChange = e => {
		this.selectedCategory = e.value
	};

	// 검색어 입력
	@action
	searchChange = debounce((searchField) => {
		this.searchField = searchField;
	}, 800);

}





