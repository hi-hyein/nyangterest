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
		console.log(e.target.value)
		this.search = e.target.value
	}

	@action
	toggleHidden = () => {
		this.active = !this.active;
		this.isVisible = !this.isVisible;
		console.log('toggle show. ..')
	}

}

