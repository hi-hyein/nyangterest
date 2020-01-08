## 스크롤을 해서 보여지지 않는 데이터들은 왜 필터 기능이 동작하지 않는지에 대한 문제점 찾아보기 

### 문제 분석

* 예상 원인은 백엔드에서 데이터를 제대로 받아오지 않았기 때문이었다.

* 필터링되는 셀렉트박스와 셀렉트바의 코드는 프론트엔드쪽인 React Home.js에 있고 
  
* searchStore.js에 categoryChange함수가 실행되면 품종이나 키워드와 매칭이 되는 데이터를 보여주고 있다.

  // Home.js
  ```javascript

	const filteredItems = items.filter(item => {
			if (typeof item === "object") {
				return (
					item.kindCd.replace("한국 고양이", "코리안숏헤어").includes(selectedCategory) &&
					Object.keys(item).some(
						key =>
							typeof item[key] === "string" &&
							item[key].toLowerCase().replace("한국 고양이", "코리안숏헤어").includes(searchField)
						// , console.log(item.kindCd)
					)
				);
			} else {
				return null;
			}

		})

  ```

  // searchStore.js
  ```javascript

   @action
	categoryChange = (e) => {
		this.selectedCategory = e.value;

	};

	```

* 이때 백엔드와 연결된 부분이 없기때문에 더이상의 데이터를 받아오지 못하는거 같다.

### 해결방법 모색
  	
그래서 백엔드 데이터를 받아올수 있는 방법을 이것저것 시도해 보았다.

#### 1

- 멘토님이 조언하신대로 listStore.js에서 loadList함수안에 slice를 하여 데이터를 일부 삭제해보았다.
백엔드에서는 데이터가 그대로 받아졌지만 화면에서는 삭제를 한 데이터가  출력되었다.

// listStore.js
```javascript

	@action
	loadList = async () => {

		//중략

			runInAction(() => {
				if (Array.isArray(json.items.item)) {
					this.setItems([...items, ...(json.items.item.slice(2) || [])]);
				}

		// 중략
```

![slice ok](https://yoonucho.github.io/post_img/slice_ok.jpg)

- push를 넣어 데이터를 추가하고자 하였을때는 마찬가지로 백엔드에서 데이터는 그대로 받아졌지만  화면에서는 데이터가 없음이 표시되고

  콘솔창에서는 에러메시지가 나왔다.

// listStore.js
```javascript

	@action
	loadList = async () => {

		//중략

			runInAction(() => {
				if (Array.isArray(json.items.item)) {
					this.setItems([...items, ...(json.items.item.push(json.items.item) || [])]);
				}

		// 중략
```

![push error](https://yoonucho.github.io/post_img/push_error.jpg)

#### 2

- Home.js에서 render함수안에 필터링 전에 loadMore()를 넣으면
검색한 데이터를 전부 받아오는 것을 확인 하였다.

//Home.js
```javascript

const {loadMore} = this.props.listStore;
loadMore();
const filteredItems = items.filter(item => {
			// 중략 

```		

![loadMore](https://yoonucho.github.io/post_img/load_more.gif)

- 하지만 데이터가 쏟아지듯 한꺼번에 받아지기 때문에 속도가 너무 빨라서 누락되는 데이터가 많았고 이는 검색을 필요로 하지 않고 기존 스크롤로 데이터를 보여지는 방식도 영향을  끼쳐서 역시나 방법은 아닌거 같다. 😔


#### 3

- searchStore.js에  categoryChange함수에 loadMore함수를 넣어봤다.
하지만 카테고리를 변경후 백엔드데이터가 1 페이지정도만 받아지고는 더이상 데이터가 받아지지 않았다.

//searchStore.js
```javascript

   @action
	categoryChange = (e) => {
		const {loadMore} = this.root.listStore;
		this.selectedCategory = e.value;
		loadMore();

	};	

```	

- 그래도 categoryChange함수를 실행했을때  즉 품종을 변경했을 때  해당 데이터를 불러오는 방법이 맞을거 같은데 생각대도 되지 않았다.

#### 4

* 3번에서 백엔드데이터가 받아지지 않는 이유에 대해서도 계속 생각해보았다. 백엔드쪽 기본 url에 품종에 대한 요청변수가 없어서 그런거 아닐까 싶어서 kind를 요청변수로 추가해보기로 했다.

* 하지만 또 다른 문제가 보여서 고민이 생겼다.

* 예를 들어 품종 중 노르웨이숲을 검색하는 api는 이렇다.

http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?ServiceKey=P3gvH0LsdoPkxFnZU2Ee98hGDDEwVTJndJFa8NDUhznSLlZG6OOxBopFWLBmiCPOfWXsF8Wz8LFHJguz41qJvA%3D%3D&_type=json&upkind=422400&kind=000170&bgnde=20191201&endde=20191231&pageNo=1&numOfRows=10& 

* 보기처럼 노르웨이숲의 품종 코드는 000170이다.
  
* 그런데 api를 참고하는 문서를 보면 전체고양이의 품종코드는 000116이지만 이 코드를 넣으면 데이터가 없다고 나온다.

* 전체 품종을 나오게 하려면 kind=&로 하거나 아예 kind를 요청변수를 넣지 않아야 제대로 보여진다.

http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?ServiceKey=P3gvH0LsdoPkxFnZU2Ee98hGDDEwVTJndJFa8NDUhznSLlZG6OOxBopFWLBmiCPOfWXsF8Wz8LFHJguz41qJvA%3D%3D&_type=json&upkind=422400&kind=&bgnde=20191201&endde=20191231&pageNo=1&numOfRows=10&

http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?ServiceKey=P3gvH0LsdoPkxFnZU2Ee98hGDDEwVTJndJFa8NDUhznSLlZG6OOxBopFWLBmiCPOfWXsF8Wz8LFHJguz41qJvA%3D%3D&_type=json&upkind=422400&bgnde=20191201&endde=20191231&pageNo=1&numOfRows=10&

* kind=&를 리액트로 넘기려면 어떻게 해야할지 몰라서 코드를 이렇게도 수정해보고 저렇게도 수정해보았다.

* 우선 공통적으로는 백엔드에는 url에 kind 요청변수를 추가하였다.

// server.js  
```javascript

router.get("/page/:bgnde/:endde/:kind/:numOfRows/:id/", (req, res) => {

	const { bgnde, endde, numOfRows, id, kind } = req.params;
	const url = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&kind=${kind}&numOfRows=${numOfRows}&pageNo=${id}`;
	// 중략

```
// listStore.js
```javascript

export default class ListStore {
// 중략
@observable kind = "";

	// 중략
	@action
	loadList = async () => {
		try {
			const { items, kind, pageNo, numOfRows, happenFrom, happenTo } = this;
			const url = `/page/${happenFrom}/${happenTo}/${kind}/${numOfRows}/${pageNo}`;

```
* 하지만 결과는 404에러 kind의 값이 없어서 Request URL이 http://localhost:3000/page/20200108/20200108//72/1 이렇게 나온다.
  
![kind error](https://yoonucho.github.io/post_img/kind1_error.jpg)

* 그럼 프론트에서 값을 null로 주면

// listStore.js
```javascript

export default class ListStore {
// 중략
@observable kind = null;

```
* 역시나 404에러 이번에는 Request URL이 http://localhost:3000/page/20200108/20200108/null/72/1 이라고 나온다. 😑

* Request URL이 http://localhost:3000/page/20200108/20200108/undifined/72/1라고 나오는 에러는  프론트쪽에서 kind를 넣지 않거나 값을 주지 않고 선언만 했을때  발생하였었다.

// listStore.js
```javascript

export default class ListStore {
// 중략
@observable kind; //또는 아예 넣지 않거나

```

#### 5

* 이거저거 시도해보다가 kind를 요청변수로 추가하면서 전체고양이데이터를 받아오는 방법을 알아내었다! 

//server.js
```javascript

router.get("/page/:bgnde/:endde/:kind/:numOfRows/:id/", (req, res) => {

	// 중략
	const url = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&kind=&numOfRows=${numOfRows}&pageNo=${id}`;

```

* 진짜 키워드로 구글링도 많이 하고  인코딩문제인가 싶어서 encodeURIComponent()도 넣어보고 별별 삽질을 했었는데 그냥 url에서 kind=&라고 하니 되더라.. 

* 그리고 프론트쪽에서는 전체 고양이코드 000116을 넣으니 이제 url은 제대로 나왔다.

//listStore.js
```javascript

@observable kind = "000116";

```

* 그럼 위의 실제 공공api에서 실제 전체 고양이 코드를 넣으면 왜 데이터가 나오지 않을까 그건 궁금하다.  

### 아직 문제가 해결된거는 아니다. 그렇지만.. 

* 사실 코드를 수정하는 과정에서는  문서로 차근차근 정리를 해보지는 않았었다.

* 지금의 5번의 방법도 문서를 정리하는 과정에서 알게 된 것이고 멘토님께 보여드리려고 이슈로 글을 남겼을 때 
  
나왔던 에러가 나오게끔 구현을 재현(?)하게 되면서 문제안의 또다른 작은 문제는 방법을 해결하게 되었다.

* 이것 또한 며칠을 붙들고 있던 문제였는데 이렇게 문서를 작성하면서 알게되어서 기쁘지만 좀 허무하기도 한데

* 그간 코드삽질을 할때 문서도 같이 병행해서 작성했었다면 좀더 빨리 알 수 있지도 않았을까라는 아쉬운 생각이 들었다.

* 코드를 작성할때는 물론이고 코드를 작성하지 않을때도 계속 방법을 생각하느라 괴로웠었다. 그래서 별거 아닐 수도 있지만 좀 기쁘다. 😹