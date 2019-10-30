## 코드 리팩토링

### Getter

* get을 이용하면 호출시 ()없이 변수처럼 사용할 수 있다는 멘토님의 말씀을 듣고 코드를 정리해보았다.
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/get

* 그런데 수정해야 할 코드가 listStore파일(store)에 있고 Mobx에서는 javascript의 getter에만 사용할 수 있는
데코레이터를 지원하는데 @computed라고 한다. 

* @computed를 사용하면 동작에는 큰차이가 없지만 성능적으로는 최적화를 할 수 있다고 한다.  변경되기 전의 값과 비교하여 같은 값이면 리랜더링을 하지 않는다니! 

   
### 함수로 만들 코드를 찾아보자.
	
1. happenFrom과 happenTo 
2. totalPage


###  happenFrom과 happenTo 

* 수정 전 

```javascript

		@action
		loadList = async () => {

			try {
				const { items, pageNo, numOfRows } = this;
				const url = `/page/${happenFrom}/${happenTo}/${numOfRows}/${pageNo}`;
				const { from, to } = this.root.searchStore;
				const happenFrom = moment(from).format("YYYYMMDD")
				const happenTo = moment(to).format("YYYYMMDD")
				// 중략
				}
			};

```
* 수정 후

```javascript

		@action
		loadList = async () => {

			try {
				const { items, pageNo, numOfRows, happenFrom, happenTo } = this;
				const url = `/page/${happenFrom}/${happenTo}/${numOfRows}/${pageNo}`;
				// 중략
				}
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

```

### totalPage

* 기존에는 totalPage코드가 listStore.js(store)의 loadMore()와 Home.js에 중복되어서 들어가 있었다.

// listStore.js
```javascript
	@action
		loadMore = () => {
			const { pageNo, numOfRows, totalCount } = this;
			const { pageNo, items, numOfRows, totalCount } = this;
			let totalPage = Math.ceil(numOfRows * pageNo) >= totalCount;
			// 중략 
			if (totalPage) {
				return console.log(message.return)
			// 중략
			}
		}

```	

// Home.js
```javascript

	render() {

		let totalPage = Math.ceil(numOfRows * pageNo) >= totalCount;

	}

```	

* loadMore()안의 totalPage를 함수로 만들고 Home.js에는 props로 넘기면  중복없이 사용할 수 있을거 같았다. 또 값이 변경되지 않는 값이라 computed를 사용하여 코드를 정리를 해보았다.

// listStore.js
``` javascript
		@computed
		get totalPage() {
			const { pageNo, numOfRows, totalCount } = this;
			let paging = Math.ceil(numOfRows * pageNo) >= totalCount;

			return paging;
		}
```		
// Home.js
``` javascript
		const { items, isLoading, loading, hasMore, totalPage, totalCount } = this.props.listStore;
		
```		

   
### 느낀 점

* @computed의 존재는 알고는 있었으나 정확히 언제 써야 할지 몰라서 사용해 본적이 없었는데 이렇게 적절하게 사용할 수 있어서 뿌듯하다(?) 😊