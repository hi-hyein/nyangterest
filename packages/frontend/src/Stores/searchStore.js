import { observable, action } from "mobx";

export default class SearchStore {
	@observable search = "";
	@observable isVisible = false;
	@observable active = false;

	constructor(root) {
		this.root = root;
	}

	@action
	handleChange = (e) => {
		this.search = e.target.value;
		console.log(this.search)
	}

	@action
	toggleHidden = () => {
		this.active = !this.active;
		this.isVisible = !this.isVisible;
		console.log('toggle show. ..')
	}

	// @action
	// handleKeyPress = (e) => {
	// 	if (e.key === "Enter") {
	// 		console.log("test!")
	// 		// e.preventDefault();
	// 		const { pageNo, numOfRows, loadList } = this.root.listStore;
	// 		const url = `/search/${numOfRows}/${pageNo}`;

	// 		runInAction(() => {
	// 			return loadList(), this.search = "";
	// 		});
	// 	}

	// }

	// @action
	// handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	const data = new FormData(e.target);

	// 	fetch('/search/submit', {
	// 		method: 'POST',
	// 		body: data,
	// 	});
	// }

}