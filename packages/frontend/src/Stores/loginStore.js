import { observable, action } from "mobx";

export default class loginStore {
	@observable userId = "";
	@observable userState = "login";

	constructor(root) {
		this.root = root;
	}

	@action
	changeUserState = ()=>{
		if(this.userState === "logout"){
			this.userState = "login"	
		}else {
			this.userState = "logout"
		}
		
	}

	@action
	changeUserId = (name)=>{
		this.userId= name
	}
}