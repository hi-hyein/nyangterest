import { observable, action } from "mobx";

export default class PopupStore {
	@observable isOpen = 0

	constructor(root) {
		this.root = root;
	}

	// 리스트 팝업 열기,닫기

	@action
	popupOpen = (value) => {
		this.isOpen = value;
	}

	@action
	popupClose = () => {
		this.isOpen = 0
	}
}