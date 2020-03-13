## 상단필터의 기능 

### 날짜 검색

날짜 선택기에서 시작일과 종료일을 선택하면 원하는 날짜의 유기묘 리스트를 볼 수 있다.


### 품종 선택

셀렉트박스에서 원하는 품종을 선택하면 해당 품종의 리스트를 볼 수 있다.


### 검색어 입력 검색

검색어를 입력하면 관련된 내용이 있는 리스트를 볼 수 있다.


### 검색조건

1. 품종 선택 안하고 검색어 입력안했을때

<pre>kind==="000116"</pre>

2. 품종 선택했을때

<pre>kind!=="000116"</pre>

3. 품종 선택 안하고 검색어 입력했을때

<pre>kind==="000116" and searchField!=="keyword"</pre>

4. 품종 선택 & 검색어 입력했을때

<pre>kind!=="000116" and searchField!=="keyword"</pre> 


### API

http://localhost:3000/page/:bgnde/:endde/:kind/:numOfRows/:id/


* request parameters: bgnde, endde, numOfRows, id, kind 

* request.body: searchField

1. get 방식
   
	* request: url - `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${numOfRows}&pageNo=${id}`;

	* response: defaultRes

	* request: kindAddUrl - `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&kind=${kind}&numOfRows=${numOfRows}&pageNo=${id}`;
	
	* response: kindAddRes 


2. post 방식
   	
	* request: countUrl - `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${totalCount}&pageNo=${id}`
	
	* response: countRes 

	* request: kindCountUrl - `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&kind=${kind}&numOfRows=${totalCount}&pageNo=${id}`;

	* response: kindCountRes

### 필터링 데이터 구조?

![Data structure](https://user-images.githubusercontent.com/2981954/76605636-b3dd7400-6508-11ea-8924-3f210f75fcff.jpg)


### 해결이 안되는 부분

	* 검색어를 입력했을때 전체 데이터에서 필터링이 되어서 응답받은 데이터가 filterItems인데 

