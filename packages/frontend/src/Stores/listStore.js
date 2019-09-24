import { observable, action, runInAction } from "mobx";

export default class ListStore {
	@observable items = [];
	@observable numOfRows = 360;
	@observable pageNo = 1;
	@observable scrolling = false;
	@observable hasMore = true;
	@observable isLoading = false;
	@observable error = false;


	constructor(root) {
		this.root = root;
	}

	@action
	loadList = async () => {

		try {
			const { items, pageNo, numOfRows } = this;
			const url = `/page/${numOfRows}/${pageNo}`;
			const response = await fetch(url);
			const json = await response.json();

			runInAction(() => {
				// console.log(`${this}, "numOfRows:" ${numOfRows}, "pageNo:" ${pageNo}`);
				this.setItems([...items, ...json.items.item]);

			});

		} catch (err) {
			runInAction(() => {
				console.log(err);
				this.isLoading = false;
			})
		}
	};

	@action
	setItems = (items) => {
		this.items = items;
		this.isLoading = false;
		this.scrolling = false;
	}

	@action
	loadMore = () => {
		this.pageNo++;
		this.isLoading = true;
		this.scrolling = true;
		this.loadList();
	}

	@action
	handleScroll = () => {
		// debugger;
		const { isLoading, hasMore, error } = this;
		if (error || isLoading || !hasMore) return;
		// if (numOfRows <= pageNo) return;
		const lastLi = document.querySelector("ul.item-list > li:last-child");
		const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
		const pageOffset = window.pageYOffset + window.innerHeight;
		const bottomOffset = 20;
		// if (lastLi.scrollHeight - lastLi.scrollTop === lastLi.clientHeight) {
		// 		this.loadMore();

		// }

		if (pageOffset > lastLiOffset - bottomOffset) {
			this.loadMore();

		}
	};

}

