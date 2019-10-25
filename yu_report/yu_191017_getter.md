## 코드 리팩토링

### getter

- get을 이용하면 호출시 ()없이 변수처럼 사용할 수 있다.


   
### 해결방법 모색
	
1. 백엔드에서 bgnde과 endde를 바디로 받은 주소를 fetch하는 방식
2. 달력 lib에서 featch관련 api 찾기
3. 제공되는 api가 없으면 다른 달력 lib로 바꾸기
4. result로 새로운페이지로 넘기기   

클라이언트에서 서버에 요청을 하면 서버는 응답을 해야겠지.

백엔드의 리퀘스트 파라미터를  react에 어떻게 넘기나? 
react bgnde와 endde 값을 백엔드에 요청한다?

### 내가 구현하고 싶은건

* 백엔드쪽 node.js open api의 요청변수 bgnde(공고 시작일)와 endde(종료일)을  post방식으로 body로 받아와서  리액트쪽에서 달력 날짜를 선택할 시 from과 to값으로 넣어서 원하는 날짜를 검색할시 결과물을 보여주는 방식 

1. 백엔드쪽에서 바디에 bgnde와 endde에 YYYYMMDD형식으로 스트링값을 넣어보자.

2. 달력은 전체 리스트에서 검색해야할텐데 그래서 infinite scroll이 아닌 result에서 넘겨야할거같다?

3. 리스트가 처음 나올때는 날짜가 필터링되기전의 데이터가 나와야할거같다 handleOnChange함수를 실행했을때 바뀌는걸로 
4. 달력 from, to값을 undefined로 설정하자.
   

### 고통과 고난의 시간

* 거진 일주일 내내 삽질을 했다. 요청변수값이 undefined가 나오니 뭘 어찌할 수가 없었다. ㅠ^ㅠ
더구나 post로 요청하려하니 웹에서는 확인도 할수 없고 포스트맨으로 하는것도 한계가 있고 그래서 어제부터 get방식으로 바꿔서 시도해보았다.
개발자도구 네트워크탭에서 fetch url이 보이니 훨씬 수월해졌다.

* 다시 삽질끝에 알아낸 건 결국 저번과 비슷한 type의 충돌문제였다.
백엔드 요청변수 bgnde와 endde의 타입을 string으로 변경하니 드디어 검색이 되었다!!!

//  GET 방식 
 * Node.js Code

  ```javascript
 
	router.get("/page/:bgnde/:endde/:numOfRows/:id/", (req, res) => {
		const bgnde = req.params.bgnde;
		const endde = req.params.endde;
		const numOfRows = req.params.numOfRows;
		const pageNo = req.params.id;
		const url = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${numOfRows}&pageNo=${pageNo}`;

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
 * React.js Code

  ```javascript

	@action
	loadList = async () => {

	// 중략...
	const { items, pageNo, numOfRows, from, to } = this;
	const happenFrom = moment(from).format("YYYYMMDD")
	const happenTo = moment(to).format("YYYYMMDD")
	const url = `/page/${happenFrom}/${happenTo}/${numOfRows}/${pageNo}`;
	// 중략...

 ```

//  POST 방식 
 * Node.js Code

  ```javascript
 
	router.post("/page/", (req, res) => {
		const body = req.body;
		const bgnde = body.bgnde || null;
		const endde = body.endde || null;
		const numOfRows = body.numOfRows;
		const pageNo = body.pageNo;

		const url = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${numOfRows}&pageNo=${pageNo}`;

		fetch(url)
			.then(console.log(body, url))
			.then(response => response.json())
			.then(json => {
				res.send(json.response.body)
				console.log(bgnde, endde, json.response.body.totalCount)
			})
			.catch(() => {
				res.send(JSON.stringify({ message: "System Error" }));
			});

});

 ```

 * React.js Code

  ```javascript
	@action
		loadList = async () => {

			try {
				const { items, pageNo, numOfRows } = this;
				const { from, to } = this.root.searchStore;
				const bgnde = moment(from).format("YYYYMMDD")
				const endde = moment(to).format("YYYYMMDD")
				const url = `/page/`;
				// const url = `/page/${numOfRows}/${pageNo}`;
				const response = await fetch(url, {
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					method: 'POST',
					body: JSON.stringify({ bgnde, endde, numOfRows, pageNo })

				})
				const json = await response.json();
				runInAction(() => {
					this.setItems([...items, ...json.items.item || []])
					this.setCount(json.totalCount)
				}, console.log(json.totalCount));

			} catch (err) {
				runInAction(() => {
					console.log(err);
					this.isLoading = false;
				})
			}
		};

 ```

### 나의 착각 그리고 그냥 GET방식으로 하는 이유

1. 요청변수를 POST로 받으면 그값이 res.json에 담겨야 한다는 큰 착각을 하였었다.
내가 이렇게 착각한 이유중 하나는 검색해서 본 유툽영상이나 글들은 폼데이터로 새로운 값을 넣는 예시였기 때문에 그리 생각을 하였다.

2. 달력연동에서 fetch는 어떻게 연결을 해야하나 라이브러리 api를 찾아보았으나 없어서 막막했었다.
   달력에서 입력받는 value값이 to와 from인데 fetch와 어떻게 접목(?)시켜야하나 싶어서 엉뚱하게도 fetch기능을 제공하는 달력라이브러리가 있나 검색을 열심히 하였으나 마땅한 라이브러리를 찾지 못했었다. 

3. 부끄럽게도 이번에 삽질하면서야 안 사실인데 백엔드의 요청변수와 프론트에서의 요청변수 이름이 동일해야 하는줄 알았다.	
   그래서 요청변수 bgnde와 endde에  날짜 value값 from과 to을 어떻게 넣어야 하나라고만 생각을 했었다가 
   요청변수 이름이 동일하지 않아도 된다는게 기억나서 url에 요청변수 이름으로 바로 넣으면 되지 않을까라는 생각이 들었고 
   바로 들어가지네 살짝 허무하면서도 신기방기하다.

4. 이후 POST방식으로 해보고 알았는데  3번의 방식은 Get방식에서 url에 바로 넣을수 있어서  가능하지만 POST방식에서는 이름이 같아야 백엔드가 자기 이름인지 알아 듣는거 같더라.

5. 처음에 POST방식을 실패했던 이유를 깨달았는데  res.send로 req.body와 res.json()을 같이 시도하려니 에러가 났던 것이다. 에러가 난 상태에서 이미 새벽이라 잠을 자려고 누워서 에러 원인에 대해서 곰곰히 생각을 해보다가 res.body는 보내지 않아도 되지 않을까라는 생각이 들었고 다음날 다시 시도해보니 POST방식도 성공했다!

6. 하지만 굳이 POST방식으로 안해도 될거 같았다. 날짜와 페이지정보라서 보안을 필요로 하는 데이터도 아니고 GET방식이 좀더 속도가 빠르기 때문에 그대로 GET방식으로 진행하였다.


### 날짜 검색시 나타나는 잔잔한 오류(?) 와 코드 리팩토링의 필요성  

1. 날짜 검색은 이제야 드디어 되는데 눈에 보이는 오류들을 해결해야한다.
handleFromChange와 handleToChange 함수를 실행할때 (from과 to에 날짜를 선택했을때 )  loadList()를 불러오는데
한번에 할수있는 방법을 찾아야 하고 처음 불러온 날짜의 값을 계속 가지고 있는것도 문제다.

   * 이건 의외로 간단한데 handleFromChange 함수에서 실행했던 loadList()를 지우고 해결되었다.

2. 날짜를 검색했을때 기본 현재날짜의 데이터는 없어지지 않고 하단에 검색된 날짜의 데이터가 나온다.
   현재날짜데이터는 없어지고 검색한 날짜의 데이터만 보이게끔 리렌더링해야 한다. 조건문을 어떻게 해야 할까?
   원인을 파악하였는데 Spread Operator를 사용하는것 때문에 기존 아이템이 없어지지않고 누적되는것 같다 이걸 없애고 setTimeout함수를 써야 할지 고민된다.
   개인적인 고집으로는 Spread Operator를 사용하고 싶다 ㅋ
   from과 to에 날짜를 선택했을때 리스트는 새로고침이 되어야 한다 마치 수정이나 추가나 삭제후 화면이 다시 그려지는것처럼 

   * 주말 낮에 몇 시간을 붙잡고 있다가  안풀려서  고민하고 있다가  새벽에 갑자기 든 생각이 handeToChange에서 to의 값이  입력이 되면 리셋되는 함수를 만들어서 실행을 하면  될거같다는 생각이 들었다. to의 값이 입력이 되면 타입이 undefined에서 object(Date)로 바뀐다.
  타입이 object일때만 리셋함수를 실행하게 하는 코드를 넣었더니  최근날짜데이터는 리셋되고 검색된 날짜의 데이터가 나왔다. Spread Operator도 그대로 사용할수 있어서 뿌듯하다.

  ```javascript
  @action
	handleToChange = to => {
		this.to = to;
		console.log(typeof to)
		// to의 날짜를 선택했을때 최근날짜의 리스트는 리셋해야 한다.
		if (typeof to === "object") {
			this.resetList();
			this.loadList();
		} else {
			this.loadList();
		}
	};

	@action
	resetList = () => {
		this.items = []
		this.isLoading = false;
	};

 ```

3. searchList()를 만들었었다가 기존 url에  bgnde와 endde을 파라미터로 추가해도 될거 같아서 loadList()에 코드를 추가하였다.
   달력라이브러리에서 제공하는 변수인 input value값 from과 to는 검색에 관련되었으니 searchStore에 다시 분리해줬다.

4. 달력에서 from과 to에  날짜를 선택한 후  더이상 보여줄 페이지가 없을때도 로딩중이 되는 에러 해결방법 모색
     * json정보에 totalCount라는 응답변수가 있다 이걸 이용해서 조건문을 걸면 될거 같아서 코드를 추가하였다.

5. 기본 세팅한 날짜는 현재날짜로 설정해두었는데 가령 새벽에는 유기 데이터가 전혀 없을때가 있다. 
 	이럴때 콘솔창에서 TypeError: Invalid attempt to spread non-iterable instance 에러가 나는데 
	 loadlist안에 코드를 수정하니 에러메세지는 더이상 나오지 않는데 맞는건지는 잘 모르겠다.


  ``` javascript 
  // 중략
  @observable totalCount = 0;

  	@action
	loadList = async () => {

		try {
			// 중략 
			runInAction(() => {
				this.setItems([...items, ...json.items.item || []])
				this.setCount(json.totalCount)
			}, console.log(json.totalCount));
		} catch (err) {
			runInAction(() => {
				console.log(err);
				this.isLoading = false;
			})
		}
	};

	@action
	setCount = (totalCount) => {
		this.totalCount = totalCount;

	}

	@action
	loadMore = () => {
		const { pageNo, numOfRows, totalCount } = this;
		let totalPage = Math.ceil(numOfRows * pageNo) >= totalCount;

		let message = observable({
			return: "마지막 페이지입니다.",
			continue: "데이터가 남아있습니다."

		})

		// totalPage의 갯수가 totalCount의 수보다 크거나 같으면 리턴
		if (totalPage) {
			return console.log(message.return)
		}
		else {
			console.log(message.continue)
			this.isLoading = true;
			this.scrolling = true;
			this.pageNo++;
			this.loadList();
		}
	}

  ```

6. 마지막페이지까지 스크롤링 후 새로고침을 하지 않고 날짜변경을 여러번 하면 기존 검색한 페이지 + 1이 된다.

   1. resetList()에 this.pageNo = 1을 추가해서 해결한줄 알았는데  여러번 검색시 간헐적으로 한페이지가 홀랑 넘어가는 오류가 생기길래
   여러번 테스트해본결과 to나 from에서 기존 날짜를 겹쳐서 검색하면 스킵되는거 같더라.

   2. resetList()에 isLoading을 true로 바꾸고 원하는 대로 보여진다. flase일때는 기존에 불러온 데이터라 스킵되는 느낌인데 확실하지는 않다.

 ``` javascript
 	@action
	resetList = () => {
		this.items = []
		this.pageNo = 1;
		this.isLoading = true;
	};
 ```

7. get함수를 만들어서 예쁘게 wrapping할 코드들이 많다.

8. 달력라이브러리 코드를 Home.js에서 분리하여 DayPicker.js에  액션로직을 분리하여 listStore.js와 searchStore.js에 추가하였다.

9. 이건 남자친구의 피드백인데 만약 사용자가 날짜 선택전에 품종 카테고리나 검색어를 입력할때는 어떻게 해야 할지도 생각해보자. 

10. store파일(listStore.js,searchStore.js)에서 화면에 경고 메세지를 띄우는 방법은 없으려나. 

     * 이건 생각해보니 로직만 담는 파일에 뷰코드가 있는건 철학에 맞지 않는거 아닐까 싶다.
  
11. store파일에 if문 코드 중  삼항연산자로 변경할 수 있는 코드가 있는지 찾아보고 수정

	 * 마땅히 수정할 코드가 없는듯 하다.

### 느낀 점
 1. 혼자 고민하다가 개발자 커뮤니티나 지인 개발자분에게 질문을 하려고 보니 내용정리가 필요했고  그 과정중에 이유를 발견할 수 있었다.
   해결이 되지 않을때는 풀리지 않는 문제에 대해서 생각을 정리 해보자. 
 2. 그리고 어느정도의 휴식도 머리를 맑게 해줘서 필요하구나 생각했다.