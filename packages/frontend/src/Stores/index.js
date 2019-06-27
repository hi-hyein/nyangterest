import ListStore from "./list";

class RootStore {
	constructor() {
		this.list = new ListStore(this);
	}
}

export default RootStore;