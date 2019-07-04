import ListStore from "./listStore";

class RootStore {
	constructor() {
		this.listStore = new ListStore(this);
	}
}

export default RootStore;