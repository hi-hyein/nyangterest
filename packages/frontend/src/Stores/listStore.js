import { observable, action, runInAction } from "mobx";
import moment from "moment";

export default class ListStore {
	@observable items = [];
	@observable test = [];
	@observable numOfRows = 72;
	@observable pageNo = 1;
	@observable from = undefined;
	@observable to = undefined;
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
			const { items, pageNo, numOfRows, from, to } = this;
			const happenFrom = moment(from).format("YYYYMMDD")
			const happenTo = moment(to).format("YYYYMMDD")
			const url = `/page/${happenFrom}/${happenTo}/${numOfRows}/${pageNo}`;
			// const url = `/page/${numOfRows}/${pageNo}`;
			const response = await fetch(url);
			const json = await response.json();
			runInAction(() => {
				console.log(`${from}, "numOfRows:" ${numOfRows}, "pageNo:" ${pageNo}`);
				this.setItems([...items, ...json.items.item]);
				// if (from === undefined && to === undefined) {

				// 	this.setItems([...items, ...json.items.item]);

				// } else {
				// 	this.intervalID = setTimeout(() => {
				// 		this.items = []
				// 	}, 2000)
				// 	this.setItems([...items, ...json.items.item]);
				// }

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
	handleFromChange = from => {
		this.from = from
		this.loadList();

	};

	@action
	handleToChange = to => {
		this.to = to;
		this.loadList();

	};


	// @action
	// handleReset = () => {
	// 	this.items = []
	// 	// this.isLoading = true;
	// };

	showFromMonth = () => {
		const { from, to } = this;
		if (!from) {
			return;
		}
		if (moment(to).diff(moment(from), "months") < 1) {
			this.to.getDayPicker().showMonth(from);
		}
	};

}

