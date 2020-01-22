## 상단 검색 필터 기능의 문제에 대해  다시 파악하기  

### 문제 분석

* 내가 멘토님께 제대로 설명을 못드려서 커뮤니케이션의 문제로 멘토님이 전에 주신 팁으로는 해결이 되지 않았다. 

* 멘토님은 API를 호출할때 날짜를 지정한 것 만큼의 모든 데이터를 가지고 온다고 생각했었다고 하셨다. 
  
  
### 멘토님의 팁  

* 서버에서 요청 받으면 처음에 numOfRows=1의 파라미터로 API를 호출한다.

* 거기에서 totalCount의 값만 얻어온다.

* 다시 API를 호출할 때 numOfRows=totalCount로 한다. => 그러면 모든 데이터를 다 가져올 수 있다

* 이 결과를 client에 준다. => 분명히 잘 될수 밖에 없다는 멘토님의 말씀

  

### 백알못이라 또 고민되는 것들
  	
* API호출을 2개 이상은  어떻게 보내야 할까? 

* 그럼 API호출을 동시에 해야 하는걸까?

* 요청변수 numOfRows에 응답변수인 totalCount의 값을 어떻게 넣어야 할까?

* 한 함수안에서 2개의 URL을 fetch해야하는건지 아니면 두개의 함수를 각각 만들어야 하는 건지
  

### 구현과정에 대해 생각해보자

* 냥터레스트의 화면이 렌더링 될때 백엔드에서는 두개의 API를 호출해야 한다.

* 특정 날짜를 검색하기 전에는 스크롤링이 생길때 기본 API만 호출되면서 새로운 페이지가 나온다?


### 코드 적용해보기

#### 2개의 함수 만들기

* searchList함수를 만들었고 요청변수 numOfRows에 totalCount값을 넣는 코드를 만들어 보았다.
  
// listStore.js
```javascript

	@action
	loadList = async () => {
		try {
			const { items, pageNo, numOfRows, happenFrom, happenTo } = this;
			const url = `/page/${happenFrom}/${happenTo}/${numOfRows}/${pageNo}`;
			const response = await fetch(url);
			const json = await response.json();

			// 중략

		} catch (err) {
			runInAction(() => {
				console.log(err);
				this.isLoading = false;
			})
		}
	};

	@action
	searchList = async () => {
		try {
			const { items, pageNo, totalCount, happenFrom, happenTo } = this;
			const url = `/page/${happenFrom}/${happenTo}/${totalCount}/${pageNo}`;
			const response = await fetch(url);
			const json = await response.json();

			// 중략

		} catch (err) {
			runInAction(() => {
				console.log(err);
				this.isLoading = false;
			})
		}
	};
```

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

router.get("/page/:bgnde/:endde/:totalCount/:id/", (req, res) => {

	const { bgnde, endde, totalCount, id } = req.params;
	const url = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${totalCount}&pageNo=${id}`;

	fetch(url)
		// 중략
});

```

* 그리고 HOME.js의 componentDidMount()와 searchStore.js의 handleToChange()에도 searchList()를 추가하였다.


### 내가 예상했던 모습은

* loadList의 요청url은 http://localhost:3000/page/시작일/종료일/페이지당 보여줄 개수/페이지수 이고
  
* searchList의 요청 url은  http://localhost:3000/page/시작일/종료일/전체 아이템 개수/페이지수 이니깐
  
 처음에는 전체 아이템 개수 - totalCount의 state값인 0이었다가  

 날짜를 검색했을때는 해당 날짜의 totalCount의 값이 제대로 들어가 있을거라 생각했다.
  
* 하지만 이전의 검색한 날짜의 데이터의 totalCount의 값이 들어가더라..


### 그러면 같은 함수를 두번 호출하면 어떨까?

* 그래서 이번엔 searchList함수만 2번 호출을 해보았다. 하지만 이전의 검색한 날짜의 데이터의 totalCount의 값이 들어가는건 동일하다.

### 어떻게 해야 제대로 된 값을 가져올 수 있을까?

1. 두번째 호출되는 함수를 setTimeOut으로 조금 늦게 호출을 하면? 

2. 아니면 함수안에 2개의 Api를 호출을 하면 어떨까?


#### 두번째 호출되는 함수를 setTimeOut으로 조금 늦게 호출을 하면? 
	  
* 속도와는 상관이 없는거 같다 여전히 같은 상태

####  함수안에 2개의 Api를 호출?

* 2개이상의 url는 호출하는 방법은 찾아보니  Promise.all()을 사용한다고 한다. 

* 음? 그런데 API를 호출하는 함수는
  기존에 async await을 적용하고 있고 promise의 윗버전(?)이라 생각하고있었는데 Promise.all()을 사용할 수 있는지 된다고 해도
  하위버전(?)을 하게 되는건 아닌지 의문이 들었을때 검색했던 한 페이지에 아래와 같은 글이 있었고 Promise.all()을 사용해야겠다 생각하게 되었다.

> 좀 헷갈립니다. 우리가 async/await를 쓰고있었지 promise를 쓰는게 아녔잖아요?! 그런데도 이게 가능한 이유는 async/await 과 promise가 같은 맥락이기 때문입니다.
> Promise.all이 뭘 뜻하는지 이해하면 좀더 이해하기 쉽습니다. 그러니까 promise의 기초로 돌아가봅시다.
기본적으로 Promise.all은 promise 들의 배열을 받습니다. 그리고 그걸 다 합쳐서 하나의 promise로 만듭니다.
그 하나의 promise는 배열 안에 있는 모든 구성원 promise 들이 resolved(결정)될 때 비로소 resolve 합니다.

* 하지만 역시나 실패 프론트쪽에서는 아예 빈화면만 보인다. 🤕 백엔드쪽 데이터를 확인했으나 역시나 똑같은 상황..

//listStore.js

```javascript
// get방식일때
  @action
  loadList = async (urls) => {
    try {
      const { items, pageNo, happenFrom, happenTo, totalCount } = this;
      const urls = [`/page/${happenFrom}/${happenTo}/${totalCount}/${pageNo}`, `/search/${happenFrom}/${happenTo}/${totalCount}/${pageNo}`]
      let json = await Promise.all(urls.map(url => fetch(url)))
      console.log(json)

      runInAction(() => {
        if (Array.isArray(json.items.item)) {
          this.setItems([...items, ...(json.items.item || [])]);
        }
        else {
          // 객체를 배열로 만들어서 기존배열에 추가하여 새배열을 만드는 코드
          this.items = items.concat(json.items.item).slice();
          console.log(typeof items);
          this.loading = false;
          this.hasMore = false;

        }
        this.setCount(json.totalCount);

        return json.json()
      })

    } catch (err) {
      runInAction(() => {
        console.log(err);
        this.isLoading = false;
      })
    }
  };

```

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

router.get("/page/:bgnde/:endde/:totalCount/:id/", (req, res) => {

	const { bgnde, endde, totalCount, id } = req.params;
	const url = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${totalCount}&pageNo=${id}`;

	fetch(url)
		// 중략
});

```


#### 디버깅 후 totalCount의 값이  URL에 온전히 들어올 때를 발견

* 스크롤링이 되어서 페이지가 2페이지로 넘어가야 그제서야 URL에 totalCount가 제대로 들어오더라 

* 하지만 item이 빈값으로 넘어와서 데이터를 더이상 보여주지 않고 return이 된다. 


#### 하아.. 답답하다.. 


### 참고사이트

(https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

(https://medium.com/@kiwanjung/%EB%B2%88%EC%97%AD-async-await-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-%EC%A0%84%EC%97%90-promise%EB%A5%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-955dbac2c4a4)


