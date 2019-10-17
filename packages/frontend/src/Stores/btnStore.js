import { observable, action } from "mobx";

export default class BtnStore {
	@observable isVisible = false;
	@observable active = false;
	@observable on = false;

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
		window.scrollTo(
			{
				top: 0,
				behavior: "smooth"
			},
			setTimeout(() => {
				this.on = false;
			}, 2000)
		)
	};
}