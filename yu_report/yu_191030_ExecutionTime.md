## 수행시간 로그

### 발생 문제

- 상단검색필터에서 셀렉트박스로 품종 조회시 화면을 줄여서 스크롤이 생길 때 나오는 데이터의 수행시간 측정

   
### 자바스크립트에서 수행시간 측정 방법
	
1. Date객체의 getTime()을 이용하여 측정
  * 지정된 날짜의 시간에 해당하는 숫자 값을 표준시로 리턴. getTime 메소드가 리턴 한 값 은 1970 년 1 월 1 일 00:00:00 이후 밀리초의 수를 반환한다.

2. console.time(), console.timeEnd()를 이용하여 측정
  * 타이머를 시작해 작업이 얼마나 걸리는지 추적할 수 있다. 각 타이머에게 고유한 이름을 줄 수 있고, 
  한 페이지에 최대 10,000개의 타이머를 설정할 수 있다. 같은 이름으로 console.timeEnd()를 호출할 때, 브라우저가 밀리초 단위로 경과한 시간을 출력한다.

3. performance.now()를 이용하여 측정
  * DOMHighResTimeStamp(https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp)를 반환 
  천분의 1 밀리 초의 정확도를 얻을 수 있다.


### 내가 시도한 해결방법은

* 1번은 오래된 방법으로 정확도가 일치하지 않다고 한다. 이 솔루션은 DOM이 없어서 Node 성능 개체를 사용할 수 없기 때문에 Node.js를 사용하는 경우에 유용하다고 한다.
* 2번은 비표준, 3번이 표준이고 정확도가 높다고  하여 3번을 적용해보려고 한다.


###  적용해보기

* 필터링 함수 전에 t0이라는 변수를 넣어주고 이후에 t1을 넣어주고 시간차를 콘솔로 찍어본다.

// Home.js

``` javascript
		// 수행시간 로그
		let t0 = performance.now();
		const filteredItems = items.filter(item => {
			// 중략

		})
		// 수행시간 로그
		let t1 = performance.now();
		console.log((t1 - t0) + 'ms')
```    

* 10월 16일부터 품종 노르웨이 숲을 선택하고 스크롤이 나올 수있도록 창을 줄이고 나서 log

<pre>
  Home.js:180 0.2949999980046414ms
  listStore.js:80 false 1807
  listStore.js:87 데이터가 남아있습니다.
  Home.js:180 0.24000000121304765ms
  Home.js:180 0.49500000022817403ms
  listStore.js:80 false 1807
  listStore.js:87 데이터가 남아있습니다.
  Home.js:180 0.3499999984342139ms
  Home.js:180 0.7699999987380579ms
  listStore.js:80 false 1807
  listStore.js:87 데이터가 남아있습니다.
  Home.js:180 0.5899999996472616ms
  Home.js:180 0.8249999991676304ms
  listStore.js:80 false 1807
  listStore.js:87 데이터가 남아있습니다.
  Home.js:180 1.3600000020232983ms
  Home.js:180 0.6450000000768341ms
  listStore.js:80 false 1807
  listStore.js:87 데이터가 남아있습니다.
  Home.js:180 0.6250000005820766ms
  Home.js:180 0.6549999998242129ms
  listStore.js:80 false 1807
  listStore.js:87 데이터가 남아있습니다.
  Home.js:180 2.795000000332948ms
  Home.js:180 0.9700000009615906ms
  listStore.js:80 false 1807
  listStore.js:87 데이터가 남아있습니다.
  Home.js:180 0.844999998662388ms
  Home.js:180 0.8450000023003668ms
  listStore.js:80 false 1807
  listStore.js:87 데이터가 남아있습니다.
  Home.js:180 0.9649999992689118ms
  Home.js:180 0.9849999987636693ms
  listStore.js:80 false 1807
  listStore.js:87 데이터가 남아있습니다.
  Home.js:180 1.0599999986879993ms
  Home.js:180 1.2900000001536682ms
  listStore.js:80 false 1807
  listStore.js:87 데이터가 남아있습니다.
  Home.js:180 1.0499999989406206ms
  Home.js:180 1.0549999969953205ms
  listStore.js:80 false 1807
  listStore.js:87 데이터가 남아있습니다.
  Home.js:180 1.5100000018719584ms
  Home.js:180 1.2500000011641532ms
  listStore.js:80 false 1807
  listStore.js:87 데이터가 남아있습니다.
  Home.js:180 1.5950000015436672ms
  Home.js:180 1.299999999901047ms
  listStore.js:80 true 1807
  listStore.js:84 마지막 페이지입니다.

</pre>


### 성능이 나쁜건지 좋은건지 솔직히 잘 모르겠다.

 * 1807개의 총데이터에서 노르웨이 숲으로 필터링했을때 아이템을 3개 찾으면서 걸린 시간인데
   아이템 갯수 대비로는 적은 시간이 걸린건 아닌거 같은데 이게 총데이터를 조회를 한거라서
   이후에 예를 들어 러시안 블루를 선택했을때는  1.6699999978300184ms라는 빛의 속도로 데이터를 보여준다. 뭔가 해결방안이 필요해 보이긴 하다. 
   