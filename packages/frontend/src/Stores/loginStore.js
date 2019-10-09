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
}