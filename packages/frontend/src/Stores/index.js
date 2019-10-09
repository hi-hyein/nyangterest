import ListStore from "./listStore";
import SearchStore from "./searchStore";
import BtnStore from "./btnStore";
import loginStore from "./loginStore";
import PopupStore from "./popupStore";

class RootStore {
	constructor() {
		this.listStore = new ListStore(this);
		this.searchStore = new SearchStore(this);
		this.btnStore = new BtnStore(this);
		this.loginStore = new loginStore(this);
		this.popupStore = new PopupStore(this);
	}
}

export default RootStore;