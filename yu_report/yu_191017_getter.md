## 코드 리팩토링

### Getter

* get을 이용하면 호출시 ()없이 변수처럼 사용할 수 있다는 멘토님의 말씀을 듣고 코드를 정리해보았다.
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/get

* 그런데 수정해야 할 코드가 listStore파일(store)에 있고 Mobx에서는 javascript의 getter에만 사용할 수 있는
데코레이터를 지원하는데 @computed라고 한다. 

* @computed를 사용하면동작에는 큰차이가 없지만 성능적으로는 최적화를 할 수 있다고 한다.  변경되기 전의 값과 비교하여 같은 값이면 리랜더링을 하지 않는다니! 

   
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

* 기존에는 totalPage코드가 listStore파일(store)loadMore()와 Home.js에 중복되어서 들어가 있었다.
  <pre>let paging = Math.ceil(numOfRows * pageNo) >= totalCount;</pre>

```javascript

```
		

   



### 느낀 점
 1. 혼자 고민하다가 개발자 커뮤니티나 지인 개발자분에게 질문을 하려고 보니 내용정리가 필요했고  그 과정중에 이유를 발견할 수 있었다.
   해결이 되지 않을때는 풀리지 않는 문제에 대해서 생각을 정리 해보자. 
 2. 그리고 어느정도의 휴식도 머리를 맑게 해줘서 필요하구나 생각했다.