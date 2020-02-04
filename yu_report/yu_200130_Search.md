## 상단 검색 필터 기능 (멘토님의 코드 리뷰 후)  


### 문제 분석

*  멘토님이 팁을 주셨음에도 나는 결국 실패를 하였다. 😔

*  멘토님과 오프라인 멘토링을 하면서 나는 아직 비동기에 대해서 제대로 이해를 못하고 있던 걸 깨닫게 되었다.


### 멘토님의 팁  

* 서버에서 요청 받으면 처음에 numOfRows=1의 파라미터로 API를 호출한다.

* 거기에서 totalCount의 값만 얻어온다.

* 다시 API를 호출할 때 numOfRows=totalCount로 한다. => 그러면 모든 데이터를 다 가져올 수 있다

* 이 결과를 client에 준다. => 분명히 잘 될수 밖에 없다는 멘토님의 말씀


### 내가 잘못 생각했던 방법은 

* API호출을 2번 해야 할 방법으로 콜백함수를 활용할 생각을 하지 못하였고 두개의 URL을 동시에 어떻게 호출해야 할까 라는 생각을 했었다.
  
  1. 백엔드와 프론트엔드에 각각 첫번째 URL은 http://localhost:3000/page/시작일/종료일/페이지당 보여줄 개수/페이지수로 
  	두번째 url은  http://localhost:3000/page/시작일/종료일/전체 아이템 개수/페이지수로 실행되는 각각의 콜백함수를 만들었었다.
  	비동기코드인데 동기적으로 처리하려고 하던게 문제

  2. Promise.all()을 사용하면 동시에 URL 호출이 가능할거라고 생각했다.	
   

### 멘토님의 코드 리뷰	

* 콜백함수의 제어권을 가질 방법은 세마포어와 뮤텍스를 이용하지 않는 한 없다.
  

### 세마포어, 뮤텍스?
  	


### Async / await



// 변경 전 코드



// server.js
```javascript

router.get("/page/:bgnde/:endde/:numOfRows/:id/", (req, res) => {

	const { bgnde, endde, numOfRows, id } = req.params;
	const url = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${numOfRows}&pageNo=${id}`;

	fetch(url)
		.then(response => response.json())
		.then(json => {
			res.send(json.response.body);
			console.log(bgnde, endde, json.response.body.totalCount);
		})
		.catch(() => {
			res.send(JSON.stringify({ message: "System Error" }));
		});
});


```

// 변경 후 코드 (ft.멘토님)

// server.js
```javascript
router.get("/page/:bgnde/:endde/:numOfRows/:id/", async (req, res) => {

	const { bgnde, endde, numOfRows, id } = req.params;
	const url = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${numOfRows}&pageNo=${id}`;

	const response = await fetch(url);
	const json = await response.json();
	const totalCount = json.response.body.totalCount;

	const secoundUrl = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${totalCount}&pageNo=1`;

	const response2 = await fetch(secoundUrl);
	const json2 = await response2.json();
	const allList = json2.response.body;

	res.send(allList);

});

```

### 프론트 쪽 코드 되돌리기

  
// listStore.js
```javascript

@action
loadList = async () => {
	try {
		const { items, pageNo, numOfRows, happenFrom, happenTo } = this;
		const url = `/page/${happenFrom}/${happenTo}/${numOfRows}/${pageNo}`;
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
			this.loading = false;
			this.hasMore = false;
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

### 다음 단계는?


### 참고사이트


