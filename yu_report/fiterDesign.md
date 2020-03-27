## 유기묘 정보 조회 서비스의 검색 기능 

### 개요

* 유기묘 조회서비스의 검색기능은 유기동물 공공 api 데이터에서 날짜별 품종별 검색어로 검색할수 있도록 만드는 기능이다.

* 날짜선택은 react-day-picker 라이브러리를 이용하여 구현한다. 

* 품종선택은 React-select 라이브러리를 이용하여 구현한다.

* 검색어창의 UI는 머터리얼 UI를 이용하여 구현한다.

![검색하기](https://user-images.githubusercontent.com/2981954/77226836-32728b00-6b73-11ea-990f-6f9c1fbe6347.png)  


### 1. 날짜 검색

* 날짜 선택기의 이벤트 동작은 [react-day-picker](https://react-day-picker.js.org/)를 이용하여 구현한다.

* 날짜 선택기에서 시작일과 종료일을 선택한다. 기본셋은 오늘 날짜부터 일주일전 날짜까지 지정되어 있고 무한 스크롤링으로 페이지를 넘기는 방식이다.

* open api에서는 날짜 기간의 범위가 제한이 있지 않다. 하지만  또한 검색의 편의성을 위해 최대 2주로 유효범위를 정한다.
  
* open api 개발계정의 각 api의 최대요청 갯수는 하루에 1000회다. 1000회를 초과하게 되면 다음날이 될때까지 서비스를 사용할 수가 없게 된다.
  
* 또한 데이터의 양이 늘어나 스크롤링을 하는 횟수가 많아지게 되면 사용자 입장에서도 피로감을 주지 않을까 생각하여서 결정하였다.


### 2. 품종 선택

* 셀렉트박스의 이벤트 동작은  [React-select의 Async](https://react-select.com/async)를 이용하여 구현한다.
  
* 셀렉트박스에서 원하는 품종을 선택하면 해당 품종의 리스트를 무한 스크롤링으로 볼 수 있다.

* 유기묘들 중에 제일 많은 품종인 한국고양이를 제일 상단으로 배치하여 사용자의 편의성을 고려하였다.

* 한국고양이라는 품종명을 더 익숙한 명칭인 코리안숏헤어로 변경하였다.


| 품종명       |    품종코드    | 품종명           |  품종코드  |
| :-------- | :--------: | :------------ | :----: |
| **고양이**   | **000116** | 셀커크 렉스        | 000185 |
| 노르웨이 숲    |   000170   | 소말리           | 000186 |
| 데본 렉스     |   000171   | 스노우 슈         | 000187 |
| 러시안 블루    |   000172   | 스코티시폴드        | 000188 |
| 레그돌-라가머핀  |   000173   | 스핑크스          | 000189 |
| 맹크스       |   000174   | 시베리안 포레스트     | 000190 |
| 먼치킨       |   000175   | 싱가퓨라          | 000191 |
| 메인쿤       |   000176   | 아메리칸 쇼트헤어     | 000192 |
| 발리네즈      |   000177   | 아비시니안         | 000193 |
| 버만        |   000178   | 재패니즈밥테일       | 000194 |
| 벵갈        |   000179   | 터키시 앙고라       | 000195 |
| 봄베이       |   000180   | 통키니즈          | 000196 |
| 브리티시 쇼트헤어 |   000181   | 페르시안-페르시안 친칠라 | 000197 |
| 사바나캣      |   000182   | 하바나 브라운       | 000198 |
| 샤트룩스      |   000183   | 하일랜드 폴드       | 000199 |
| 샴         |   000184   | 코리안숏헤어        | 000200 |


* 품종 타입은 string이다.


### 3. 검색어 입력 

* 검색어창의 UI는 [머터리얼 UI의 Text Field](https://material-ui.com/components/text-fields/#text-field)를 이용하여 구현한다.

* 검색어를 입력하면 유효범위내의 날짜의 전체 데이터에서 검색 결과값을 포함한 리스트를  무한 스크롤링으로 볼 수 있다.


### 4. Data-flow 

![냥터레스트 search data flow](https://user-images.githubusercontent.com/2981954/77760520-6693f300-702e-11ea-999e-fab3f7d6b7cb.jpg)


### 5-1. (Front <-> Back) (ft.멘토님)

* Front에서 시작일,종료일,한페이지결과수,품종,검색어를 Request Parameter로 url에 넣고 Get메소드로 요청을 하면 Back은 openAPI에서 Get메소드로 요청하여  JSON 데이터 중 아이템을 받아서 Front에 전달해준다. 이를 Front가 화면에 보여준다.

#### 데이터 구조

![Data structure](https://user-images.githubusercontent.com/2981954/77659528-15252e80-6f70-11ea-801f-4915ec2c680c.png)

* Array in Array 구조 - 밖의 Array는 페이지번호(인덱스)이고 안의  Array는  한 페이지에 보여줄 유기묘 데이터 객체이다.


### 5-2. (Back <-> openAPI)

* Back에서 시작일,종료일,결과보다 큰 수,품종을  Request Parameter로 url에 넣고 Get메소드로 요청을 하면 oPenAPI는 Get메소드로 요청하여  JSON 데이터에서 Body객체를 받아서 Back에  전달해준다. 
  
* endPoint : 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc';

* openAPI url: `${endPoint}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&numOfRows=${numOfRows}&pageNo=${id}&upkind=422400&kind=`;

* 유기 동물 중 고양이에 대한 정보만 필요하기 때문에 고양이에 대한 데이터만 조회 된다. 


#### 요청 메시지 명세

| Request Parameter | 의미        | 타입     |
| :---------------- | --------- | ------ |
| bgnde             | 시작일       | string |
| endde             | 종료일       | string |
| numOfRows         | 한페이지 결과 수 | number |
| kind              | 품종        | string |
| searchField       | 검색어       | string |


> Request

[조건1] 검색기능을 선택하지 않았을 때 (기본)
	
  <pre>GET /page/:bgnde/:endde/:numOfRows</pre>

[조건2] 품종 셀렉트박스에서 품종을 선택했을 때 

* 프론트에서 품종 셀렉트박스로 선택한 품종코드를  품종에 대한 Request Parameter 품종명의 값으로 받아와서 url에 추가해 API를 요청한다.

  <pre>GET /page/:bgnde/:endde/:numOfRows/:kind</pre>


[조건3] 검색어를 입력했을 때 

* 프론트엔드에서 검색어창에 검색어를 입력했을때 검색어의 입력값을 url에 추가한다.
	
  <pre>GET /page/:bgnde/:endde/:numOfRows/searchField="치즈"</pre>

[조건4] 검색어를 입력 후 품종 셀렉트박스에서 품종을 선택했을 때 

  <pre>GET /page/:bgnde/:endde/:numOfRows/:kind/searchField="치즈"</pre>


> Response

#### 응답 메시지 명세

| Response Parameter | 의미              | 타입     |
| :----------------- | --------------- | ------ |
| age                | 나이              | string |
| careAddr           | 보호장소            | string |
| careNm             | 보호소이름           | string |
| careTel            | 보호소전화번호         | string |
| chargeNm           | 담당자             | string |
| colorCd            | 색상              | string |
| desertionNo        | 유기번호            | number |
| filename           | Thumbnail Image | string |
| happenDt           | 접수일             | number |
| happenPlace        | 발견장소            | string |
| kindCd             | 품종              | string |
| neuterYn           | 중성화여부           | string |
| noticeEdt          | 공고종료일           | number |
| noticeNo           | 공고번호            | string |
| noticeSdt          | 공고시작일           | number |
| officetel          | 담당자연락처          | string |
| noticeComment      | 특이사항            | string |
| orgNm              | 관할기관            | string |
| popfile            | Image           | string |
| processState       | 상태              | string |
| sexCd              | 성별              | string |
| specialMark        | 특징              | string |
| weight             | 체중              | string |
| numOfRows          | 한 페이지 결과 수      | number |
| pageNo             | 페이지 번호          | number |
| totalCount         | 전체 결과 수         | number |

#### 데이터 구조

<pre>
items: {item: [{age: "2017(년생)", careAddr: "경상남도 거제시 사등면 두동로1길 109 (사등면, 한국자원재생공사폐비닐적재장) 거제시유기동물보호소",…},…]}
	item: [{age: "2017(년생)", careAddr: "경상남도 거제시 사등면 두동로1길 109 (사등면, 한국자원재생공사폐비닐적재장) 거제시유기동물보호소",…},…]
		[0 … 99]
		[100 … 199]
		[200 … 282]
numOfRows: 10000
pageNo: 1
totalCount: 283
</pre>



  
