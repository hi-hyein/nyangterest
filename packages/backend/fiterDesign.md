## 상단필터의 기능 

### 날짜 검색

날짜 선택기에서 시작일과 종료일을 선택하면 원하는 날짜의 유기묘 리스트를 볼 수 있다.


### 품종 선택

셀렉트박스에서 원하는 품종을 선택하면 해당 품종의 리스트를 볼 수 있다.


### 검색어 입력 검색

검색어를 입력하면 관련된 내용이 있는 리스트를 볼 수 있다.


### API

* endPoint : 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc';

* 요청변수: bgnde, endde, numOfRows, id, kind
  
    * bgnde : 시작일 
    * endde : 종료일 
	* numOfRows : 한페이지에 보여지는 아이템의 갯수
	* id : 페이지수
	* kind : 품종	

* 유기동물 정보 조회 서비스 open api에서 제공하는 요청변수에는 검색어에 대한 정보가 없음으로 프론트에서 검색어로 입력한 값을 body로 요청해서 받아온다.
  
* 따라서 검색어로 입력한 값은 post방식으로 요청해야 한다. 
  

#### Get


##### URL

* 품종선택과 검색어를 입력하지 않았을 때 호출하는 url이다.

* url: `${endPoint}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${numOfRows}&pageNo=${id}`;  

* defaultRes: url을 호출하여 응답받은  기본 데이터를 담은 json객체이다.

* <pre>kind==="000116"</pre>
  
##### kindAddUrl

* 품종선택을 했을 때 호출하는 url이다.
* kindAddUrl: `${endPoint}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&kind=${kind}&numOfRows=${numOfRows}&pageNo=${id}`;
  
* kindAddRes: kindAddUrl을 호출하여 응답받은 데이터(선택한 품종의)를 담은 json객체이다.

* <pre>kind!=="000116"</pre>
  

#### Post


##### countUrl

* 검색어를 입력했을때 지정한 날짜의 전체 아이템을 호출하는 url이다.
  
* countUrl: `${endPoint}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${totalCount}&pageNo=${id}` 

* countRes: url을 호출하여 응답받은 데이터(totalCount에 해당하는 아이템)를 담은 json객체이다.

* <pre>kind==="000116" & searchField!=="keyword"</pre>

  
##### kindCountUrl

* 품종선택과 검색어를 입력했을때 지정한 날짜의 전체 아이템을 호출하는 url이다.

* kindCountUrl: `${endPoint}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&kind=${kind}&numOfRows=${totalCount}&pageNo=${id}`;
  
* kindCountRes: kindCountUrl을 호출하여 응답받은 데이터(totalCount에 해당하는 아이템에서 선택한 품종)를 담은 json객체이다.

* <pre>kind!=="000116" & searchField!=="keyword"</pre> 
  

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