import { observable, action, runInAction, } from "mobx";
import debounce from "lodash.debounce";

export default class SearchStore {

	@observable from = new Date(Date.now() + -7 * 24 * 3600 * 1000);
	@observable to = new Date();
	@observable searchField = "keyword";
	@observable selectedCategory = "000116";

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
		const { loadList, resetList } = this.root.listStore;
		console.log(typeof to, to)
		// 	to의 날짜를 선택했을때 최근날짜의 리스트는 리셋해야 한다.
		this.to = to;
		resetList();
		loadList();
	};

	// 품종 카테고리 셀렉트박스
	@action
	categoryChange = (e) => {
		const { loadList, resetList } = this.root.listStore;
		this.selectedCategory = e.value
		resetList();
		loadList();

	};

	// 검색어 입력
	@action
	searchChange = debounce((searchField) => {
		const { loadList, resetList } = this.root.listStore;
		this.searchField = searchField;
		console.log(searchField)
		resetList();
		loadList();
	}, 800);

}


