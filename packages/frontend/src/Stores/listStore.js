import { observable, action, runInAction, computed } from "mobx";
import moment from "moment";

export default class ListStore {

	@observable items = [];
	@observable loading = true;
	@observable timer = null;
	@observable index = [0];
	@observable numOfRows = 100;
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
			// 시작일,종료일,한페이지 결과수,품종,검색어
			const { items, numOfRows, happenFrom, index, happenTo } = this;

			let { selectedCategory, searchField } = this.root.searchStore;

			let url = `/page/${happenFrom}/${happenTo}/${numOfRows}/${selectedCategory}/${searchField}`;

			const response = await fetch(url)

			const json = await response.json();

			runInAction(() => {

				this.setItems([...items, ...(json.items[index] || [])]);

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
		this.loading = false;
		this.isLoading = false;
		this.scrolling = false;
		this.hasMore = true;
	}

	@action
	loadMore = () => {

		const { totalPage } = this;

		let message = observable({
			return: "마지막 페이지입니다.",
			continue: "데이터가 남아있습니다."
		})

		if (totalPage) {
			return console.log(message.return)
		}
		else {
			console.log(message.continue)
			this.isLoading = true;
			this.scrolling = true;
			this.index++;
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
		if (scrolledToBottom || window.innerWidth <= 700) {
			this.loadMore();
		}
	};

	@action
	resetList = () => {
		this.items = [];
		this.index = [0]
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
		const { index, numOfRows, items } = this;
		let paging = Math.ceil(numOfRows * (index + 1)) > items.length
		return paging;
	}

}



