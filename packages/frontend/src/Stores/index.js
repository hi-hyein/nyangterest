import ListStore from "./listStore";
import SearchStore from "./searchStore";

class RootStore {
	constructor() {
		this.listStore = new ListStore(this);
		this.searchStore = new SearchStore(this);
	}
}

export default RootStore;