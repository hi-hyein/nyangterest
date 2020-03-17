## 상단필터의 기능 

### 날짜 검색

* 날짜 선택기에서 시작일과 종료일을 선택한다. 기본셋은 오늘날짜부터 일주일전 날짜까지 지정되어 있고 무한 스크롤링으로 페이지를 넘기는 방식이다.

* open api에서는 검색조건의 기간이 따로 제한이 있지 않다. 하지만 검색의 편의성을 위해 최대 2주로 유효범위를 정한다.
  
* 유효범위를 2주로 정한 이유는 그 이상 범위가 넓어지면 데이터의 양이 늘어나 스크롤링을 하는 횟수가 많아지면 사용자입장에서는 피로감을 주지 않을까 생각하였다.


### 품종 선택

* 셀렉트박스에서 원하는 품종을 선택하면 해당 품종의 리스트를 볼 수 있다.

#### API

> Request


* endPoint : 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc';
  
* open api url: `${endPoint}/kind?ServiceKey=${serviceKey}&_type=json&up_kind_cd=422400`;  

<pre> GET /search/kind </pre>



> Response

![kind list](https://user-images.githubusercontent.com/2981954/76893157-ca2a5d80-6883-11ea-94dc-e55bc891aa1b.jpg)


### 검색어 입력 검색

* 검색어를 입력하면 유효범위내의 날짜에 전체 데이터에서 검색이 되고 검색 결과값은 기존대로 무한 스크롤링으로 출력된다.


#### API

> Request

* endPoint : 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc';

  <pre>GET /page/:bgnde/:endde/:kind/:numOfRows/:id/</pre>




| 요청변수        | 의미                 | 타입     |
| :---------- | ------------------ | ------ |
| bgnde       | 시작일                | string |
| endde       | 종료일                | string |
| numOfRows   | 한페이지에 보여지는 아이템의 갯수 | number |
| id          | 페이지수               | number |
| kind        | 품종명                | string |
| searchField | 검색된 값              | string |
 

* 유기동물 정보 조회 서비스 open api(이하 open api)에서 제공하는 요청변수에는 검색어에 대한 정보가 없음으로 프론트에서 변수 searchField에 입력된 값을 query string으로 요청해서 url에 받아온다.
  
  
##### kind

* open api에서 제공하는 모든 품종의 고양이 코드는 "000116"이다.
  
* 품종 셀렉트 박스를 선택하지 않으면 기본셋은 kind === "000116"이다
  
* 변수 kindEnum에 kind === "000116"를 대입한다.


| 품종명           |    품종코드    |   타입   |
| :------------ | :--------: | :----: |
| **고양이**       | **000116** | string |
| 노르웨이 숲        |   000170   | string |
| 데본 렉스         |   000171   | string |
| 러시안 블루        |   000172   | string |
| 레그돌-라가머핀      |   000173   | string |
| 맹크스           |   000174   | string |
| 먼치킨           |   000175   | string |
| 메인쿤           |   000176   | string |
| 발리네즈          |   000177   | string |
| 버만            |   000178   | string |
| 벵갈            |   000179   | string |
| 봄베이           |   000180   | string |
| 브리티시 쇼트헤어     |   000181   | string |
| 사바나캣          |   000182   | string |
| 샤트룩스          |   000183   | string |
| 샴             |   000184   | string |
| 셀커크 렉스        |   000185   | string |
| 소말리           |   000186   | string |
| 스노우 슈         |   000187   | string |
| 스코티시폴드        |   000188   | string |
| 스핑크스          |   000189   | string |
| 시베리안 포레스트     |   000190   | string |
| 싱가퓨라          |   000191   | string |
| 아메리칸 쇼트헤어     |   000192   | string |
| 아비시니안         |   000193   | string |
| 재패니즈밥테일       |   000194   | string |
| 터키시 앙고라       |   000195   | string |
| 통키니즈          |   000196   | string |
| 페르시안-페르시안 친칠라 |   000197   | string |
| 하바나 브라운       |   000198   | string |
| 하일랜드 폴드       |   000199   | string |
| 한국 고양이        |   000200   | string |


> Response

| 응답변수          | 의미              | 타입     |
| :------------ | --------------- | ------ |
| age           | 나이              | string |
| careAddr      | 보호장소            | string |
| careNm        | 보호소이름           | string |
| careTel       | 보호소전화번호         | string |
| chargeNm      | 담당자             | string |
| colorCd       | 색상              | string |
| desertionNo   | 유기번호            | number |
| filename      | Thumbnail Image | string |
| happenDt      | 접수일             | number |
| happenPlace   | 발견장소            | string |
| kindCd        | 품종              | string |
| neuterYn      | 중성화여부           | string |
| noticeEdt     | 공고종료일           | number |
| noticeNo      | 공고번호            | string |
| noticeSdt     | 공고시작일           | number |
| officetel     | 담당자연락처          | string |
| noticeComment | 특이사항            | string |
| orgNm         | 관할기관            | string |
| popfile       | Image           | string |
| processState  | 상태              | string |
| sexCd         | 성별              | string |
| specialMark   | 특징              | string |
| weight        | 체중              | string |
| numOfRows     | 한 페이지 결과 수      | number |
| pageNo        | 페이지 번호          | number |
| totalCount    | 전체 결과 수         | number |


<pre>
items: {item: [,…]}, numOfRows: 80, pageNo: 1, totalCount: 213}
items: {item: [,…]}
	item: [,…]
		0: {age: "2020(년생)", careAddr: "경상북도 경주시 금성로 385 (성건동) ", careNm: "가나동물병원", careTel: "010-2230-6303",…}
			age: "2020(년생)"
			careAddr: "경상북도 경주시 금성로 385 (성건동) "
			careNm: "가나동물병원"
			careTel: "010-2230-6303"
			chargeNm: "경주시"
			colorCd: "블랙화이트"
			desertionNo: 447505202000233
			filename: "http://www.animal.go.kr/files/shelter/2020/03/202003171703681_s.jpg"
			happenDt: 20200317
			happenPlace: "건천읍"
			kindCd: "[고양이] 한국 고양이"
			neuterYn: "U"
			noticeEdt: 20200330
			noticeNo: "경북-경주-2020-00232"
			noticeSdt: 20200318
			officetel: "054-779-6303"
			orgNm: "경상북도 경주시"
			popfile: "http://www.animal.go.kr/files/shelter/2020/03/202003171703681.jpg"
			processState: "보호중"
			sexCd: "Q"
			specialMark: "생후7일"
			weight: "0.10(Kg)"
... 중략
numOfRows: 80
pageNo: 1
totalCount: 213
</pre>


##### URL

* open api  url: `${endPoint}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&numOfRows=${numOfRows}&pageNo=${id}`;  

* 변수 kindParams에 upkind=422400&kind=${kind}값을 대입한다. 

<pre> const kindParams = `&upkind=422400&kind=${kind}`</pre>


* 품종을 선택하지 않았을때는 기본 url , 품종을 선택했을때는 url + kindParams의 url을 호출한다.
  
  
* defaultRes: url을 호출하여 응답받은  기본 데이터를 담은 json객체이다.
  
  
* kindAddRes: 선택한 품종의 데이터만 담은 json객체이다.

  
##### countUrl

* 검색어를 입력했을때 지정한 날짜의 전체 아이템을 호출하는 url이다.
  
* countUrl: `${endPoint}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&numOfRows=${totalCount}&pageNo=${id}` 

* countRes: url을 호출하여 응답받은 데이터(totalCount에 해당하는 아이템)를 담은 json객체이다.

* 품종을 선택하지 않았을때는 countUrl , 품종을 선택했을때는 url + kindParams의 url을 호출한다.



### 기본 데이터 구조

![Data structure](https://user-images.githubusercontent.com/2981954/76605636-b3dd7400-6508-11ea-8924-3f210f75fcff.jpg)


### filterItems

* post방식으로 가져온 countRes 또는 kindCountRes의 items.item 프로퍼티를 필터링한 변수이다.

### filterRes

* filterItems를 프로퍼티 item으로 넣어 응답받은 Json객체이다.
  

### 필터링 데이터 구조?

![filteringData structure](https://user-images.githubusercontent.com/2981954/76623960-4f341080-652c-11ea-8de7-26ebb0a74e25.jpg)


### 필터링시 문제 (작성중)

	* filterRes를 응답받아서 브라우저에 렌더링될때 스크롤링 컨셉을 유지하지 못한다.

    	* numOfRows에 totalCount값을 넣고 호출해서 한페이지에 전체갯수를 보여준다. 
    	* 스크롤링이 되게끔 하려면 한페이지에  numOfRows의 기본 갯수를 유지하게 데이터를 받아와야 한다.

	* 프론트에서 필터링을 인식하는 변수를 만들어서 true일때 호출할수 있는 url을 요청한다.