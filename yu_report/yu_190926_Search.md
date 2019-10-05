## 상단 필터박스 달력으로 지정한 날짜 데이터  연동 구현

### 발생 문제

- 기본 일주일치 날짜 데이터는  제대로 검색이 된걸 확인하였다.
- 그러나 출력되지 않은 일자에 대한 예를들어 17일에서 18일치는 내용이 나오지 않았다.
- 해결방법 모색

   
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

다시 삽질끝에 알아낸 건 결국 저번과 비슷한 type의 충돌문제였다.
백엔드 요청변수 bgnde와 endde의 타입을 string으로 변경하니 드디어 검색이 되었다!!!

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

### 나의 착각

1. 요청변수를 post로 받으면 그값이 json에 담겨야 한다는 큰 착각을 하였었다.
내가 이렇게 착각한 이유중 하나는 검색해서 본 유툽영상이나 글들은 새로운 값을 넣는 예시였기 때문에 그리 생각을 하였다.

2. 달력연동에서 fetch는 어떻게 연결을 해야하나 라이브러리 api를 찾아보았으나 없어서 막막했었다.
   달력에서 입력받는 value값이 to와 from인데 fetch와 어떻게 접목(?)시켜야하나 싶어서 엉뚱하게도 fetch기능을 제공하는 달력라이브러리가 있나 검색을 열심히 하였으나 마땅한 라이브러리를 찾지 못했었다. 

3. 부끄럽게도 이번에 삽질하면서야 안 사실인데 백엔드의 파라미터와 프론트에서의 파라미터이름이 동일해야 하는줄 알았다.	
   그래서 요청변수 bgnde와 endde에  날짜 value값 from과 to을 어떻게 넣어야 하나라고만 생각을 했었다가 
   파라미터이름이 동일하지 않아도 된다는게 기억나서 url에 파라미터로 바로 넣으면 되지 않을까라는 생각이 들었고 
   바로 들어가지네 살짝 허무하면서도 신기방기하다.

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

3.  검색한 날짜의 아이템이 더 이상 없을때 로딩이 멈추고 메세지를 띄워줘야 할거 같다. 

4. get함수를 만들어서 예쁘게 wrapping할 코드들이 많다.

5. 검색할때 결국 같은 url을 불러도 될거 같아서 searchList()를 만들었었다가 loadList()에 코드를 추가하였다.
   그런데 검색에 관련된 코드니 searchStore에 다시 분리해줘야 할거 같다.

6. 달력라이브러리 코드를 다시 분리해보자.

7. 이건 남자친구의 피드백인데 만약 사용자가 날짜 선택전에 품종 카테고리나 검색어를 입력할때는 어떻게 해야 할까? 

   