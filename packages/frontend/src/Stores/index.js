import ListStore from "./listStore";
import SearchStore from "./searchStore";
import loginStore from "./loginStore";

class RootStore {
	constructor() {
		this.listStore = new ListStore(this);
		this.searchStore = new SearchStore(this);
		this.loginStore = new loginStore(this);
	}
}

export default RootStore;