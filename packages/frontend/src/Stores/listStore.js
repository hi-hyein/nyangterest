import { observable, action, runInAction } from "mobx";

export default class ListStore {
	@observable items = [];
	@observable numOfRows = 72;
	@observable pageNo = 1;
	@observable scrolling = false;
	@observable hasMore = true;
	@observable isLoading = false;
	@observable error = false;

	constructor(root) {
		this.root = root;
	}

	@action
	// 매개변수로 pageNo를 넣어준다.
	loadList = async (pageNo) => {

		try {
			const { items, pageNo, numOfRows } = this;
			const url = `/page/${numOfRows}/${pageNo}`;
			const response = await fetch(url);
			const json = await response.json();

			runInAction(() => {
				// console.log(this)
				// console.log(`${this}, "numOfRows:" ${numOfRows}, "pageNo:" ${pageNo}`);
				this.setItems([...items, ...json.items.item]);
			});


			// 스크롤을 내릴때 리스트 보여줄게 있으면 loadmore함수를 실행해서 다음 페이지를 보여줘라.이걸 어떻게 해야 하나

			// if (pageNo.length !== 0) {
			// 	this.pageNo++;
			// 	this.scrolling = true;
			// 	console.log(this.loadMore = "loadMore 굴러간다잉")
			// }

		} catch (err) {
			runInAction(() => {
				// console.log(err);
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
		const { isLoading, hasMore, error } = this;
		if (error || isLoading || !hasMore) return;
		// if (numOfRows <= pageNo) return;
		const lastLi = document.querySelector("ul.item-list > li:last-child");
		const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
		const pageOffset = window.pageYOffset + window.innerHeight;
		const bottomOffset = 20;

		if (pageOffset > lastLiOffset - bottomOffset) {
			this.loadMore();
		}
	};


}

