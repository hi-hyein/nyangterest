## 상단필터 기능 백엔드로 옮기기

* 이슈와 PR에 올린 내용과 중복이 되어서  고민을 하다가 압축을 한다고 생각하고 내용을 정리를 해보았다.

### 멘토님의 팁  

* 전체 목록의 갯수를 얻어오는 API 호출, totalCount
  
* totalCount 만큼의 전체 목록을 가져옴

* (Option) filter parameter 대로 filter 로직을 구현, filteredList 구함

* filteredList에서 numOfRows에 해당하는 72개의 list를 return


### 순서대로 코드짜보기

* 삽질을 줄여보기 위해 멘토링 시간때 말씀해주신 팁을 토대로 순서대로 코드를 작성해보았다.
  

//server.js
```javascript

router.get("/page/:bgnde/:endde/:kind/:numOfRows/:id/", async (req, res) => {

	// 첫번째  totalCount의 값을 확인하기 위한 api 호출

	const { bgnde, endde, numOfRows, id } = req.params;
	const url = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${numOfRows}&pageNo=${id}`;
	const response = await fetch(url);
	const json = await response.json();
	const totalCount = json.response.body.totalCount

	// 두번째  totalCount만큼 전체데이터를 가져오는 api 호출

	const allUrl = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${totalCount}&pageNo=${id}`;
	const allRes = await fetch(allUrl);
	const allJson = await allRes.json();

	// 세번째  (option) fiter parameter대로 filter 로직 구현 (이부분이 문제입니다.)
       
        // 품종 api 호출
	const kindUrl = `${api}/kind?ServiceKey=${serviceKey}&_type=json&up_kind_cd=422400`;

	const kindRes = await fetch(kindUrl);
	const kindJson = await kindRes.json();

        // 품종코드를 받아옴
	const kind = kindJson.response.body.items.item[0].kindCd
	
        // 받아온 품종코드값을 요청변수에 넣음
	const completeUrl = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&kindCd=${kind}&numOfRows=${totalCount}&pageNo=${id}`;
	console.log(completeUrl)

	const completeRes = await fetch(completeUrl);
	const completeJson = await completeRes.json();
	const completeItems = completeJson.response.body.items;
	const completeList = completeJson.response.body;
        
        // 품종 셀렉트박스를 선택시 value값을 필터링하는 코드(작성중)

	const filteredItems = Array.from(completeItems).filter(item => item.kindCd.includes(//그러면 이부분에는 valu값을 넣어야 하니 kind가 맞지 않을까? ))

	 // 그리고 선택한 value값을 다시 호출해야 하지 않을까?
	
	res.send(completeList);

       // 네번째  filterList에서 numOfRow에 해당하는 72개의 데이터를 return

})

```

// listStrore.js
```javascript

@action
	loadList = async () => {
		try {
			const { items, pageNo, numOfRows, happenFrom, happenTo } = this;

            // 품종 선택시 value값
			const { selectedCategory } = this.root.searchStore;
			const url = `/page/${happenFrom}/${happenTo}/${selectedCategory}/${numOfRows}/${pageNo}`;
			console.log(selectedCategory)
			const response = await fetch(url);
			const json = await response.json();
			runInAction(() => {
				if (Array.isArray(json.items.item)) {
					this.setItems([...items, ...(json.items.item || [])]);
				}
				else {
					// 객체를 배열로 만들어서 기존배열에 추가하여 새배열을 만드는 코드
					this.items = items.concat(json.items.item).slice();
					console.log(typeof items);

				}
				this.setCount(json.totalCount);
			});

		} catch (err) {
			runInAction(() => {
				console.log(err);
				this.isLoading = false;
			})
		}
	};


```

### 실패 -> 멘토님피드백 -> 해결-> 새로운 문제발생 -> 멘토님피드백...

* 의도한 로직의 흐름을 스스로 설명해 보라는 말씀에 다시 코드를 살펴보며 셀프문답을 해보았고 신기하게도(?) 막혔던 부분이  해결이 되었다.

* 삽질을 하는게 두려워서 멘토님의 팁에 의존해서 수동적으로 해결하려고 하는게 문제였다. 


#### 품종 셀렉트박스

* kind를 요청변수로 넣고 품종 셀렉트박스를 선택했을때 이벤트의 value값을 받아서 해당 품종의 url이 나오는걸 확인하였다.

* 여러번 api를 호출하기 때문에 반복코드를  getData() 함수를 만들었다.

* 품종코드는 품종 셀렉트박스를 선택했을때 value값을 받아서 처리하면 되니깐 굳이 품종api는 불러오지 않아도 될듯 싶다.
  
* url과 completeUrl으로 구분한 이유는 품종코드의 전체고양이 000116이 들어가면 아이템이 없다고 나오기때문에 구분을 하였다.
  
* 간단한 조건문은 삼항연산자로 처리를 해보았다.

* totalCount를 받아오는 코드는 필요없을거 같아서 삭제하였다.  




// server.js

```javascript
router.get("/page/:bgnde/:endde/:kind/:numOfRows/:id/", (async (req, res) => {

	const getData = async (url) => {
		try {
			const response = await fetch(url);
			const json = await response.json();
			const body = await json.response.body;
			return body;

		} catch (error) {
			console.log(error);
		}
	};

	const { bgnde, endde, numOfRows, id, kind } = req.params;

	// 기본 url

	const url = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${numOfRows}&pageNo=${id}`;

	const totalRes = await getData(url)

	const completeUrl = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&kind=${kind}&numOfRows=${numOfRows}&pageNo=${id}`;

	const completeRes = await getData(completeUrl);

	const completeItems = completeRes.items;

	const selectRes = (kind === "000116") ? totalRes : completeRes;

	res.send(selectRes)

})

```


* 아이고 이런.. 😟 프론트에 있던 품종코드를 지웠더니 품종을 선택후 해당 품종이 없을때는 아래와 같은 에러가 발생하였다.

![TypeError]](https://user-images.githubusercontent.com/2981954/75251591-3cc49200-581e-11ea-9f96-a0d29b615362.jpg)


* 프론트쪽에 아이템이 없을때 대처할 코드를 작성하였다. json.items.item이 존재하지 않을때 빈배열을 만들어서 반환해주게 하였다.

```javascript
@action
	loadList = async () => {
		try {
			// 중략
			runInAction(() => {
                                
				//중략

                 // 추가코드
				else if (typeof json.items.item === "undefined") Object.keys([] + (json.items.item))
				
                 //중략

			});
			// 중략
		}
	};
```

* 이제 에러는 해결되었는데 화면에 안내메세지가 없어서 조건에 맞는 코드를 추가로 작성하였다.

// Home.js

```javascript
{!loading && (totalCount === 0) &&<Message><p>검색결과가 없습니다.</p></Message>}

```

#### 검색어

* searchField는 공공api의 요청변수로 넣을수가 없어서 body에 실어야 했다.
  
* get방식의 새로운 함수를 만들었었으나 기존코드를 post방식으로 변경해도 될거 같아서 다시 코드를 수정하였다.


* 기존 프론트에 있던 필터링 코드를 백엔드에 옮겨서 콘솔창에 찍어보니 제대로 검색이 되는거 같다.(이때만 해도 그렇게 착각을 하였다..)

//server.js

```javascript

router.post("/page/:bgnde/:endde/:kind/:numOfRows/:id/",async (req, res) => {

// 중략
	const { bgnde, endde, numOfRows, id, kind } = req.params;
	const { searchField } = req.body;

	// 기본 url

	// 중략

	const strObj = {
		"F": "암컷",
		"M": "수컷",
		"Q": "성별 미상",
		"Y": "중성화O",
		"N": "중성화X",
		"U": "중성화 미상",
		"한국 고양이": "코리안숏헤어"
	}

	const filteredItems = selectItems.filter(item => {
		let re = new RegExp(Object.keys(strObj).join("|"), "gi");
		let regExp = /[()]/gi;
		let searchKeyword = searchField.toUpperCase().trim()

		if (typeof item === "object") {
			return (
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

	console.log(filteredItems)
	res.send(selectRes)


})

```

//listStore.js

```javascript
	@action
	loadList = async () => {
		try {
			const { items, pageNo, numOfRows, happenFrom, happenTo } = this;
			const { selectedCategory, searchField } = this.root.searchStore;
			const url = `/page/${happenFrom}/${happenTo}/${selectedCategory}/${numOfRows}/${pageNo}`;
			const response = await fetch(url, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ searchField })
			})

			const json = await response.json();

		// 중략
	};

```

* 문제는 filteredItems을 어떻게 json object에 넣어야 할지 난감하였다. filterItems는 items.item을 필터링한 값이기 때문이다.
  
* 멘토님께 피드백요청을 하고 유닛테스트를 작성해보라는 조언을 해주셨다.

* 유닛테스트는 작년에 DR프로젝트를 진행할때 어렵게 작성을 해보고 필요성을 잘 모르겠어서 보류해둔거긴 했는데 다시 하려고하니 막막해서 유툽을 시청했다.
  
* 유툽을 보고 코드를 좀 짜봤더니 우선 화면에 필터링 된 결과가 나오는걸 보니 제대로 된거 같아서 엄청 기뻤다. 내가 만든 json이 된다고? 😸

// server.js

```javascript

    const item = filteredItems;

	const items = { item }

	const filterRes = { items }

	const finalTotalRes = (searchField === "keyword") ? selectRes : filterRes

```

* 하지만 현재 코드에서는 현재 응답받은 72개의 아이템이 있는 1페이지내에서만 검색이 되는걸 발견하였다. 필요없을줄 알았던 totalCount를 요청변수로 넣는 코드를 다시 살려야 한다.

* numOfRows에 totalCount를 넣으면 무한 스크롤없이  1페이지에 필터링된 전체 갯수가 나온다. 에고 머리야..🤕

  
```javascript

	// 중략

    const totalCount = selectRes.totalCount;

	const countUrl = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${totalCount}&pageNo=${id}`;

	const countRes = await getData(countUrl);

	const kindCountUrl = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&kind=${kind}&numOfRows=${totalCount}&pageNo=${id}`;

	const kindCountRes = await getData(kindCountUrl);

	//  kind === "000116" &&  searchField !== "keyword"

	if (kind === "000116" && searchField !== "keyword") countRes


	//  kind !== "000116" &&  searchField !== "keyword"

	if (kind !== "000116" && searchField !== "keyword") kindCountRes

	const selectCountRes = (searchField !== "keyword") ? countRes : kindCountRes

	const totalItems = selectCountRes.items.item;

	const item = filteredItems;

	const items = { item }

	const filterRes = { items }

```

* 다시 numOfRows를 요청변수로 넣으면 되지 않을까 싶어서 코드를 수정하였다.


```javascript

	const finalUrl = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${numOfRows}&pageNo=${id}`;

	const finalRes = await getData(finalUrl)

	// 검색어를 입력했을때는 searchField !== "keyword" 무조건 filterRes

	if (searchField !== "keyword") res.send(filterRes)

```
* 기존 json포맷과 비슷하게 만들긴 했는데 numOfRow, pageNo, totalCount가 없어서 그런가 싶어서 코드도 추가하였다.
  
```javascript

    // 중략

	numOfRows = parseInt(numOfRows)

	pageNo = parseInt(id)

	const totalCount = item.length;

	const filterRes = { items, numOfRows, totalCount, pageNo }


```  
  
* finalUrl을 호출하지 못하는 상황인거 같다. 멘토님께 빠른 피드백을 받았는데 코드검증이 필요하다 하셨다. 코드를 어느정도 작성하고 유닛테스트를 작성하려고 했는데 유닛테스트를 작성할 방법을 모색해봐야겠다.
  

### 처음겪게 된 일들 그리고..
    
* 여태 공공Api 서비스를 이용했어도 일일 트래픽을 초과해본적이 없는데 오늘까지 2회를 달성(?)하였다
  
<pre>{"response":{"header":{"resultCode":99,"resultMsg":"LIMITED NUMBER OF SERVICE REQUESTS EXCEEDS ERROR."}}}</pre>

* 여태 제공받은 json을 이용만 해봤는데 간단하게 내가 만들수 있는게 신기하였다.

* 해결이 안될때는 정말 답답한데 조금씩 해결되면 무척 기쁘다. 나는 역시 개발자를 해야 할거 같다 😂