## 상단필터 개선

### 개선한 부분

#### 기본 리스트 나올때 URL과 날짜 검색시 URL분리

* 기본 리스트 loadList() 실행시 스크롤링시 무한 스크롤링 

// server.js
```javascript
// 기본주소
router.get("/page/:bgnde/:endde/:numOfRows/:id/", async (req, res) => {

	const { bgnde, endde, numOfRows, id } = req.params;
	const url = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${numOfRows}&pageNo=${id}`;

	const response = await fetch(url);
	const json = await response.json();
	console.log(numOfRows)

	const allList = json.response.body;

	res.send(allList);

});

```

// listStore.js
```javascript

// 기본주소

@action
loadList = async () => {
	try {
		const { items, pageNo, numOfRows, happenFrom, happenTo } = this;
		const url = `/page/${happenFrom}/${happenTo}/${numOfRows}/${pageNo}`;
		const response = await fetch(url);
		const json = await response.json();

		// 중략
};


```  

* 검색 리스트 searchList() 실행시 전체 리스트 무한 스크롤없이 보여주기

// server.js
```javascript

// 날짜 선택시
router.get("/search/:bgnde/:endde/:numOfRows/:id/", async (req, res) => {

	const { bgnde, endde, numOfRows, id } = req.params;
	const url = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${numOfRows}&pageNo=${id}`;

	const response = await fetch(url);
	const json = await response.json();
	const totalCount = json.response.body.totalCount
	console.log(numOfRows)
	const searchUrl = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${totalCount}&pageNo=${id}`;

	const searchRes = await fetch(searchUrl);
	const searchJson = await searchRes.json();
	const searchList = searchJson.response.body;

	res.send(searchList);

});

```

// listStore.js
``` javascript
// 날짜 선택시
	@action
	searchList = async () => {
		try {
			const { items, pageNo, numOfRows, happenFrom, happenTo } = this;
			const url = `/search/${happenFrom}/${happenTo}/${numOfRows}/${pageNo}`;
			const response = await fetch(url);
			const json = await response.json();
			// 중략

		} 
	};

```

* 날짜검색시 searchList() 실행시키기

// searchStore.js
``` javascript
	@action
	handleToChange = to => {
		const { searchList, resetList } = this.root.listStore;
		console.log(typeof to, to)
		this.to = to;

		resetList();
		// console.log("reset")
		searchList();
		console.log("search!")
	};

```
// Home.js
``` javascript
		componentDidMount() {
		const { handleScroll, loadList, searchList, selectedCategory } = this.props.listStore;
		
		// 중략

		if (selectedCategory === "") {
			console.log("search")
			searchList();

		}
		console.log("load")
		loadList();
	}

```


#### 상단필터 성별, 중성화, 나이 등 검색어기능 개선 

* 품종검색에만 신경쓰다 보니 검색어 입력시 제대로 검색이 안되는걸 확인하게 되었다.

* 제공되는 데이터를 검색하기 쉽게 치환할 필요가 있어보인다.

* 치환해야 할 문자열이 많아서 검색해보니 아래와 같은 방법이 검색이 되었다.


```javascript
const strObj = {
			"F": "암컷",
			"M": "수컷",
			"Q": "성별 미상",
			"Y": "중성화O",
			"N": "중성화X",
			"U": "중성화 미상",
			"한국 고양이": "코리안숏헤어"
		}

		console.log(typeof strObj)

		const filteredItems = items.filter(item => {
			let re = new RegExp(Object.keys(strObj).join("|"), "gi");
			let regExp = /[()]/gi;
			let searchKeyword = searchField.toUpperCase().trim()

			if (typeof item === "object") {
				return (
					item.kindCd.replace("한국 고양이", "코리안숏헤어").includes(selectedCategory) &&
					Object.keys(item).some(
						key =>
							typeof item[key] === "string" &&
							item[key].replace(re, (matched => {
								return strObj[matched]
							})).replace(regExp, "").toUpperCase().includes(searchKeyword)

						
					)
				);
			} else {
				return null;
			}

		})
```


### 개선하고 싶은 부분 그리고 고민들..

1. 검색후 무한스크롤 기능을 넣어야 할지 말지 고민

2. 로고 클릭했을때 새로고침기능이 필요할거 같다.
   
3. 오늘날짜와 종료일날짜가 동일할경우, 즉 종료일을 변경하지 않았을때를 인식하여 
시작일을 선택했을때 리셋을 하게 하는 로직을 만들어야 하지 않을까?

4. 검색시 속도개선(리스트가 3초안에는 전부 나와야 하지 않나? 캐시 라이브러리 아니면 lazy loading)

5. 검색어 입력시 하단에 자동 검색어 나오게 하기 (AutoComplete)

6. 검색어 안내 메뉴얼 UI 

7. UI UX 개선 (리스트 팝업창 등)

8. 기본리스트를 스크롤링하다가 품종을 선택하게 된다면? 전체데이터에서 필터링처리를 해야 

	아니면 날짜 검색을 클릭안하고 품종이나 검색어를 입력하려고 하면 경고창을 띄운다?


##  API 서비스키 환경변수 저장

* dotenv 라이브러리 설치
  

### 참고사이트

(https://stackoverflow.com/questions/15604140/replace-multiple-strings-with-multiple-other-strings)

(https://velog.io/@public_danuel/process-env-on-node-js)

(https://velog.io/@ground4ekd/nodejs-dotenv)

(https://velog.io/@suseodd/Heroku%EC%97%90-.env%ED%8C%8C%EC%9D%BC-%EC%A0%81%EC%9A%A9-20k621f03d)

(https://elena90.tistory.com/entry/JavaScript-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C-replace-%EB%A5%BC-replaceAll-%EC%B2%98%EB%9F%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EB%AA%A8%EB%93%A0-%EB%AC%B8%EC%9E%90-%EB%B0%94%EA%BE%B8%EA%B8%B0-feat%EC%A0%95%EA%B7%9C%EC%8B%9D)

