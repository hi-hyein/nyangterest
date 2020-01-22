import { observable, action, runInAction, computed } from "mobx";
import moment from "moment";

export default class ListStore {
	@observable items = [];
	@observable loading = true;
	@observable timer = null;
	@observable totalCount = 0;
	@observable numOfRows = 72;
	@observable pageNo = 1;
	@observable scrolling = false;
	@observable hasMore = true;
	@observable isLoading = false;
	@observable error = false;

	constructor(root) {
		this.root = root;
	}

	// get방식일때
	@action
	loadList = async () => {
		try {
			const { items, pageNo, numOfRows, happenFrom, happenTo } = this;
			const url = `/page/${happenFrom}/${happenTo}/${numOfRows}/${pageNo}`;
			const response = await fetch(url);
			const json = await response.json();

			runInAction(() => {
				if (Array.isArray(json.items.item)) {
					this.setItems([...items, ...(json.items.item || [])]);
				}
				else {
					// 객체를 배열로 만들어서 기존배열에 추가하여 새배열을 만드는 코드
					this.items = items.concat(json.items.item).slice();
					console.log(typeof items);
					this.loading = false;
					this.hasMore = false;

				}
				this.setCount(json.totalCount);
			});

		} catch (err) {
			runInAction(() => {
				console.log(err);
				this.isLoading = false;
			})
		}
	};

	// post방식일때

	@action
	loadList2 = async () => {
		try {
			const { items, pageNo, totalCount } = this;
			const { from, to } = this.root.searchStore;
			const bgnde = moment(from).format("YYYYMMDD")
			const endde = moment(to).format("YYYYMMDD")
			// this.numOfRows = this.totalCount;
			const url = `/page/`;
			// const url = `/page/${numOfRows}/${pageNo}`;
			const response = await fetch(url, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ bgnde, endde, totalCount, pageNo })

			})
			const json = await response.json();
			runInAction(() => {
				this.setItems([...items, ...json.items.item || []])
				this.setCount(json.totalCount)
			}, console.log(json.totalCount));

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
		this.loading = false;
		this.isLoading = false;
		this.scrolling = false;
		this.hasMore = true;
		console.log(`items의 갯수 : ${items.length}`)
	}

	@action
	setCount = (totalCount) => {
		this.totalCount = totalCount;
		console.log(`totalCount : ${totalCount}`)
	}

	@action
	loadMore = () => {
		const { totalPage, totalCount } = this;
		// let totalPage = Math.max((numOfRows * pageNo), totalCount)

		let message = observable({
			return: "마지막 페이지입니다.",
			continue: "데이터가 남아있습니다."
		})

		console.log(totalPage, totalCount)

		// totalPage의 갯수가 totalCount의 수보다 크거나 같으면 리턴 (올림)
		if (totalPage) {
			return console.log(message.return)
		}
		else {
			console.log(message.continue)
			this.isLoading = true;
			this.scrolling = true;
			this.pageNo++;
			this.loadList();
		}
	}

	// @action
	// loadMore = () => {
	// 	const { totalPage, totalCount } = this;
	// 	// let totalPage = Math.max((numOfRows * pageNo), totalCount)

	// 	let message = observable({
	// 		return: "마지막 페이지입니다.",
	// 		continue: "데이터가 남아있습니다."
	// 	})

	// 	console.log(totalPage, totalCount)

	// 	// totalPage의 갯수가 totalCount의 수보다 크거나 같으면 리턴 (올림)
	// 	if (totalPage) {
	// 		return console.log(message.return)
	// 	}
	// 	else {
	// 		console.log(message.continue)
	// 		this.isLoading = true;
	// 		this.scrolling = true;
	// 		this.pageNo++;
	// 		this.loadList();
	// 	}
	// }

	@action
	handleScroll = () => {
		const { isLoading, hasMore, error } = this;
		if (error || isLoading || !hasMore) return;

		this.loadMore();
		// 스크롤링 후 올라간 만큼의 높이
		const scrollTop =
			(document.documentElement && document.documentElement.scrollTop) ||
			document.body.scrollTop;
		// 보이는 만큼의 높이	
		const clientHeight =
			document.documentElement.clientHeight || window.innerHeight;
		// 스크롤링 없는 전체 높이
		const scrollHeight =
			(document.documentElement && document.documentElement.scrollHeight) ||
			document.body.scrollHeight;
		const scrolledToBottom =
			Math.ceil(scrollTop + clientHeight) >= scrollHeight;
		if (scrolledToBottom) {
			this.loadMore();
		}
	};

	@action
	resetList = () => {
		// this.loading = true;
		this.items = []
		this.pageNo = 1;
		this.isLoading = true;
	};

	@computed
	get happenFrom() {
		const { from } = this.root.searchStore;
		const happenFrom = moment(from).format("YYYYMMDD");
		return happenFrom;
	}

	@computed
	get happenTo() {
		const { to } = this.root.searchStore;
		const happenTo = moment(to).format("YYYYMMDD");
		return happenTo;
	}

	@computed
	get totalPage() {
		const { pageNo, numOfRows, totalCount } = this;
		let paging = Math.ceil(numOfRows * pageNo) >= totalCount;

		return paging;
	}

}

