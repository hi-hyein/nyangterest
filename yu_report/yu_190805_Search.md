## 상단 필터박스 셀렉트박스로 검색하기 구현

### 내가 생각한 구현 방법

* 이미 서버측에서 요청받은 전체 데이터가 프론트에서 
* 불러와서 리스트로 보여지고 있으니 여기에서 추출하자.
* 백엔드측에 추가되는 변수를 추가하자.
* UI구현때 추가로 필요한 변수는  시도,시군구, 보호소이름, 품종, 상태, 중성화여부
* 우선 상태를 넣어보자.
* listStore에서 loadList함수를 재활용하면 되지 않을까
* 백엔드에 상태값을 null로 선언한다.
* 프론트엔드에서 받아들일 변수도 선언해야겠지
* 그런데 옵션은 어디서 받아오면 되려나?


### 내가 잘못 생각한 부분 및 진행 과정

1. 내가 받아온 전체데이터에는 옵션에 대한 정보가 없다 ;ㅁ;?
2. 다시 공공데이터 동물보호관리시스템_OpenAPI활용가이드를 보고 받아올수 있는 데이터 경로가 다름을 깨달음.
	* 예시: 시도 검색하려면 
	
	http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/sido?ServiceKey="서비스키"_type=json

	* 시군구 예시 서울특별시 
	http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/sigungu?upr_cd=6110000&ServiceKey="서비스키"_type=json

   * 상태를 검색하려면
상태
 - 전체 : null(빈값)
 - 공고중 : notice
 - 보호중 : protect


<pre>
	router.get("/search/:state/", (req, res) => {
	const state = req.params.state;
	let url = `${api}/abandonmentPublic?serviceKey=${serviceKey}_type=json&state=${state}`;

	fetch(url)
		.then(response => response.json())
		.then(json => {
			res.send(json.response.body);
			// console.log(json.response.body)
			console.log("key:" + req.params.state);

		})
		.catch(() => {
			res.send(JSON.stringify({ message: "System Error" }));
		});
});

</pre>

3. 내맘대로 되는게 하나도 없네 기존 백엔드 코드에서 state를 변수로만 정하면 될줄 알았는데 파라미터로 받아와서 url로 연결해야 프론트에서 보여질거 같다.

4. 총 받고 싶은 파라미터는 7개이상인데 이걸 받아오려면 router.get("/page/:numOfRows/:id/:xx/:xxx/:.....", (req, res) =>  이런식으로 받으려니 뭔가
잘못된거 같기도 하고 너무 복잡해 보인다. 아 모르겠다.


### 멘토링 후 다시 도전!

1. 멘토님이 이런 경우 즉 가변적인 파라미터를 선택적으로 가져와서 코드를 만들어야 할때는 post 방식으로 변경하고 body에 필요한 파라미터 값만 전달해 주는 식으로 만들면 된다고 하셨다. 오호라! 

2. get이 아닌 post로 테스트를 다시 진행하였다. 우선 백엔드 부분 먼저 콘솔로 찍어보자.

<pre>
	router.post("/search/", (req, res) => {
	const body = req.body;
	const numOfRows = body.numOfRows;
	const pageNo = body.pageNo;
	const state = body.state;

	let url = `${api}/abandonmentPublic?serviceKey=${serviceKey}_type=json&state=${state}&upkind=422400&numOfRows=${numOfRows}&pageNo=${pageNo}`;

	fetch(url)
		.then(response => response.json())
		.then(json => {
			res.send(json.response.body);
			console.log(json.response.body.state);

		})
		.catch(() => {
			res.send(JSON.stringify({ message: "System Error" }));
		});
});

</pre>

![너의 이름은 undefined] (https://yoonucho.github.io/post_img/code8-undefined.png)

1. 아니 왜 undefined일까 왜지? 이때까지는 알 수가 없었다.

2. 깨닫고 나서 보니 나같은 저세상 멍청이도 없다..

3. console.log(json.response.body.state)를 입력했을때  undefined이 나온 이유는 response.body에 state가 없어서 디폴트값인 undefined이 나온것이다.
	그래서 포스트맨을 참고하여 careAddr을 찍어봤고 원하는 결과를 얻었다. 이제 프론트쪽에 코드를 만들어서 연결을 해보면 되는거겠지?

	<pre>
	router.post("/search/", (req, res) => {
		const body = req.body;
		const numOfRows = body.numOfRows;
		const pageNo = body.pageNo;
		const state = body.state;

		let url = `${api}/abandonmentPublic?serviceKey=${serviceKey}_type=json&state=${state}&upkind=422400&numOfRows=${numOfRows}&pageNo=${pageNo}`;

		fetch(url)
			.then(response => response.json())
			.then(json => {
				res.send(json.response.body.);
				console.log(json.response.body.items.item.careAddr)

			})
			.catch(() => {
				res.send(JSON.stringify({ message: "System Error" }));
			});
	});

</pre>

![포스트맨에서는 이렇게 나옵니다. ] (https://yoonucho.github.io/post_img/post-res.png)

![드디어 원하는 결과 ] (https://yoonucho.github.io/post_img/code9.png)


### 프론트에서 테스트 왜 안되냐 ㅠㅠ

검색어가 없으면 기존 리스트를 보여주고 검색어가 있고 일치하면 결과를 보여줘라. 

키워드는 filter:주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환 , includes: 배열이 특정 요소를 포함하고 있는지 판별 toString: 문자열을 반환하는 object의 대표적인 방법  toLowerCase: 문자열을 소문자로 변환하여 주는 함수

음..잘안되네.. 우선 백엔드데이터를 프론트에서 받아오는 페이지를 만들어보자.

### 쉬운 단계부터 다시 시도해보자.

1. /search에서 post로 데이터 뿌리기 (성공)
2. 검색했을때 텍스트 검출하기 예제 만들기 - 검색키워드가 일치하면 일치한것만 보여줘라잉
   필터를 이용하고 아이템전체를 검색할수있어야 한다.
3. 실제데이터 적용해보자. - 검색어를 치면 결과물이 나오긴 함.역시 스크롤링이 들어가야 하는구나

4. 검색어 입력시 여러가지 문제사항
 * 시도,구군구등에 대한 api 추가 설정
 * 나이를 ex) 2019년생일때 1세로 변경
 * 검색어를 입력했을때 중복아이템이 있을때는 하나만 보여줘라.
 * 디테일 페이지를 만들어서 거기서 검색어를 입력하도록 해보자. 
 * 달력을 입력했을때 데이터가 나오게끔 설정하자.
 * 오브젝트를 한꺼번에 받을수는 없는건가? 
 * 리스트와 검색바를 통합해서 만들자. 접속시에는 /page였다가 검색바를 클릭했을때 post로 /search로 변환
 * 검색바의 props의 props 처리는 어떻게 해야 할까
 * 검색어가 2개이상일때 결과물이 나오게끔 

![검색어 입력 1차] (https://yoonucho.github.io/post_img/search1.gif)

* 오브젝트를 한꺼번에 받을수는 없는건가? 
  
 * Object.keys() 메서드는 개체 고유 속성의 이름을 배열로 반환합니다. 배열 순서는 일반 반복문을 사용할 때와 같다.
some() 메서드는 배열 안의 어떤 요소라도 주어진 판별 함수를 통과하는지 테스트한다.

* 검색어를 입력했을때 중복아이템이 있을때는 하나만 보여줘라.
	- 페이지를 넘어가지못해서 반복되는 것이었음. -post에서 페이지넘버를 받아올 수 있는 방법은 없는건가.
	- 그냥 get으로 받아옴 
	- 검색을 하려면 페이지가 스크롤이 되어서 나와있어야 결과가 나오는거 같다. 이건 어떻게 해야하나?

* 리스트와 검색바를 통합해서 만들자. 접속시에는 /page였다가 검색바를 클릭했을때 post로 /search로 변환
   - 통합을 하면 페이지가 바뀔 필요가 없을거 같다. 우선 기존 리스트와 통합을 했는데 스토어로(MobX) 해둔거라 연결을 하였으나
	 서치바 부분은 잘안되어서 스토어없이 유지해서 통합은 했음
	
