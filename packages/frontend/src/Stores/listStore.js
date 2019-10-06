import { observable, action, runInAction } from "mobx";
import moment from "moment";

export default class ListStore {
	@observable items = [];
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

	@action
	loadList = async () => {

		try {
			const { items, pageNo, numOfRows } = this;
			const { from, to } = this.root.searchStore;
			const happenFrom = moment(from).format("YYYYMMDD")
			const happenTo = moment(to).format("YYYYMMDD")
			const url = `/page/${happenFrom}/${happenTo}/${numOfRows}/${pageNo}`;
			// const url = `/page/${numOfRows}/${pageNo}`;
			const response = await fetch(url);
			const json = await response.json();
			runInAction(() => {
				this.setItems([...items, ...json.items.item])
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
		this.isLoading = false;
		this.scrolling = false;
	}

	@action
	setCount = (totalCount) => {
		this.totalCount = totalCount;

	}

	@action
	loadMore = () => {
		const { pageNo, numOfRows, totalCount } = this;
		const totalPage = Math.ceil(numOfRows * pageNo) >= totalCount;
		let message = observable({
			return: "마지막 페이지입니다.",
			continue: "데이터가 남아있습니다."

		})
		console.log(totalPage, totalCount)
		// totalPage의 갯수가 totalCount의 수보다 크거나 같으면 리턴
		if (totalPage) {
			return console.log(message.return)
		}
		else {
			console.log(message.continue)
			this.pageNo++;
			this.isLoading = true;
			this.scrolling = true;
			this.loadList();
		}
	}


	@action
	handleScroll = () => {
		const { isLoading, hasMore, error } = this;
		if (error || isLoading || !hasMore) return;
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
		this.items = []
		this.isLoading = false;
	};



}

