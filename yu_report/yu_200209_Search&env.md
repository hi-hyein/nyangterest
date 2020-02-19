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
		const { selectedCategory } = this.props.searchStore;
		
		// 중략

		if (selectedCategory !== "") {
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

* 치환해야 할 문자열이 많아서 검색해보고 아래와 같이 적용을 해보았다.


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

### 문제발생 그리고 해결과정

1. 기본리스트 상태 즉 loadList 함수가 실행되고 있을때 날짜 선택없이  품종을 선택하거나 검색어를 입력하게 되면 해당 날짜에 대한 데이터가 전부 나오지 않는다. 그래서 loadList 함수가 실행중일때 품종이나 검색어를 실행하게 되면 searhList 함수를 실행해야 할 코드가 필요하다. 

// searchStore.js
```javascript
	@action
	categoryChange = (e) => {
		const { searchList, resetList } = this.root.listStore;
		this.selectedCategory = e.value
		if (// 어떤 조건문을 넣어서 구분을 해야 할까) {
			console.log("체인지!!")
			resetList();
			searchList();
		}
	};

```

2. 어떻게 구분을 해야 할까 고민하다가 totalPage로 구분할 수 있지 않을까라는 생각이 들었다.

// searchStore.js
```javascript
	@action
	categoryChange = (e) => {
		const { searchList, resetList, totalPage } = this.root.listStore;
		this.selectedCategory = e.value
		if (!totalPage) { 
			console.log("체인지!!")
			resetList();
			searchList();
		}
	};

```	

3. 수정한 코드로는 loadList가 실행중일때 스크롤링을 전부 넘겨서 마지막 페이지일때 totalPage가 true가 될때 필터링이 되고
마지막페이지가 아니면 totalPage가 false상태라 resetList함수와 searhList함수가 올바르게 실행되는걸 확인하였다.


4. 하지만 searchList가 실행중일때는 resetList함수와 searhList함수가 필요없는데 불필요하게 또 실행되는 이슈가 있었다.


5. 그래서 조건문을 어떻게 변경할까 고민을 하다가 아이템의 갯수와 totalCoun를 이용하면 제대로 동작할거 같았다. 


// searchStore.js
```javascript
	@action
	categoryChange = (e) => {
		const { searchList, resetList, totalCount, items } = this.root.listStore;
		this.selectedCategory = e.value
		console.log("필터링!!")
		if (items.length !== totalCount) {
			console.log("체인지!!")
			resetList();
			searchList();
		}
	};

```	

6. 이제 내가 원하는 로직대로 제대로 동작하는걸 확인하고 검색어 입력시에도 적용되게끔 코드를 변경하였다.

// searchStore.js
```javascript
	@action
	searchChange = debounce((searchField) => {
		const { searchList, resetList, totalCount, items } = this.root.listStore;
		this.searchField = searchField;
		if (items.length !== totalCount) {
			console.log("체인지!!")
			resetList();
			searchList();
		}
	}, 800);


```	


### 개선하고 싶은 부분 그리고 고민들..

1. 검색후 searchList함수 실행시 무한스크롤 기능을 넣어야 할지 말지 고민 또 넣는다면 어떻게 넣어야 할까?

2. 로고 클릭했을때 새로고침 기능이 필요할거 같다.
   
3. 날짜를 선택전에 기본 종료일 날짜와 선택하려는 종료일 날짜가 동일할경우, 즉 종료일을 변경하지 않았을 때를 인식하여 
   시작일을 선택했을때 리셋을 하게 하는 로직을 만들어야 하지 않을까?

4. 검색시 속도개선(리스트가 3초안에는 전부 나와야 하지 않나? 캐시 라이브러리 아니면 lazy loading)이 필요하다.

5. 검색어 입력시 하단에 자동 검색어 나오게 하기 (AutoComplete)

6. 검색어 안내 메뉴얼 UI 

7. UI UX 개선 (리스트 팝업창 등)

    
### 참고사이트

(https://stackoverflow.com/questions/15604140/replace-multiple-strings-with-multiple-other-strings)

(https://elena90.tistory.com/entry/JavaScript-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C-replace-%EB%A5%BC-replaceAll-%EC%B2%98%EB%9F%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EB%AA%A8%EB%93%A0-%EB%AC%B8%EC%9E%90-%EB%B0%94%EA%BE%B8%EA%B8%B0-feat%EC%A0%95%EA%B7%9C%EC%8B%9D)


##  API 서비스키 환경변수 저장


* 공공API 서비스키가 직접 코드에 들어가있는게 계속 신경이 쓰였다. 그래서 이번에 변경을 해보았다.

1. dotenv 라이브러리 설치
  
<pre>yarn add dotenv</pre>

2. 루트경로에 .env파일을 만들고 API서비스키를 넣는다.
   
<pre>SERVICE_KEY = 실제서비스키입력</pre>

3. 기존 server.js파일에는 아래와 같이 코드를 추가해준다.

```javascript

	require('dotenv').config()
	const serviceKey = process.env.SERVICE_KEY;

```
4. .gitignore에 .env파일을 등록한다.


### Heroku로 배포할때는 ?

* 로컬에서 수정한 내용을 Heroku에서도 적용하고 싶었다.그래서 로컬처럼 진행을 해서 배포 시도를 하였다. 

* 조금 찜찜했던게 .gitignore에서 등록하면 Heroku는  env파일을  어떻게 인식할까 싶었는데 역시나 .env파일을 못읽는거 같았다.

* 나와 비슷한 이슈를 겪은 사람이 있지 않을까 싶어서 검색을 해봤더니 heroku-dotenv 패키지를 설치하여 .env파일의 내용을 인식하게끔 해주는 방법이 있더라.

1. heroku-dotenv를 설치한다.

<pre>yarn add heroku-dotenv</pre>


2. Heroku로 .env파일 내용을 보낸다.

<pre>heroku-dotenv push</pre>


### 참고사이트

(https://velog.io/@public_danuel/process-env-on-node-js)

(https://velog.io/@ground4ekd/nodejs-dotenv)

(https://velog.io/@suseodd/Heroku%EC%97%90-.env%ED%8C%8C%EC%9D%BC-%EC%A0%81%EC%9A%A9-20k621f03d)
