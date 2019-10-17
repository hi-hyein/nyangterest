import { observable, action } from "mobx";

export default class BtnStore {
	@observable isVisible = false;
	@observable active = false;
	@observable on = false;
	@observable timer = null;

	constructor(root) {
		this.root = root;
	}

	// 상단필터 토글버튼
	@action
	toggleHidden = () => {
		this.active = !this.active;
		this.isVisible = !this.isVisible;
		console.log('toggle show. ..')
	}

	// 맨위로 이동 버튼
	@action
	handleScrollTop = () => {

		this.on = true;
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0

		this.timer = setTimeout(() => {
			this.on = false;
		}, 2000);

	};
}