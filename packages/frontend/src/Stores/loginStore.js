import { observable, action } from "mobx";

export default class loginStore {
	@observable userId = "";
	@observable userState = "logout";

	constructor(root) {
		this.root = root;
	}

	@action
	changeUserState = ()=>{
		this.userState = "login"
	}

	@action
	changeUserId = (name)=>{
		this.userId= name
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