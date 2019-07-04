import { observable, action } from "mobx";

export default class ListStroe {
	@observable items = [];
	@observable numOfRows = 72;
	@observable pageNo = 1;
	@observable scrolling = false;
	@observable hasMore = true;
	@observable isLoading = false;
	@observable error = false;

	@action
	loadList = async () => {
		try {
			const { items, pageNo, numOfRows } = this;
			const url = `/page/${numOfRows}/${pageNo}`;
			const response = await fetch(url);
			const json = await response.json();

			this.items = [...items, ...json.items.item];
			this.scrolling = false;
			this.numOfRows = json.numOfRows;
			this.isLoading = false;
			console.log(items, numOfRows, pageNo)
			// );
		} catch (err) {
			console.log(err);
			this.isLoading = false;
		}
	};

	@action
	loadMore = () => {
		this.pageNo++;
		this.scrolling = true;
		this.isLoading = true;
	}

}

