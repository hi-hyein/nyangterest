import { observable, action, reaction } from "mobx";
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

		const { loadList, resetList } = this.root.listStore;
		console.log(typeof to, to)
		this.to = to;

		// to의 날짜를 선택했을때 최근날짜의 리스트는 리셋해야 한다.

		resetList();
		// console.log("reset")
		loadList();
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

const search = new SearchStore();
// const store = window.store = new SearchStore();

// autorun(() => {
// 	// console.log(search.from)
// 	// console.log(search.to)
// 	// console.log(search.handleFromChange)
// 	// console.log(search.to)
// 	// console.log(search.categoryChange)
// 	// console.log(search.searchChange)
// })

reaction(
	() => search.handleToChange,
	() => { console.log("change!") }
)






