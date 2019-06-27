import { observable, action } from "mobx";

export default class ListStroe {
	@observable items = [];
	@observable numOfRows = 72;
	@observable pageNo = 1;
	@observable scrolling = false;
	@observable hasMore = true;
	@observable isLoading = false;
	@observable error = false;
}