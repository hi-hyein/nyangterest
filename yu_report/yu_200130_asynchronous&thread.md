## 상단 검색필터 이슈, 비동기와 스레드 (멘토님의 코드 리뷰 후)  


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

  2. Promise.all()을 사용하면 동시에 URL 호출이 가능할거라고 생각했다.	
   
* 비동기 처리에 대한 이해를 제대로 하지 못하여서  동기적으로 처리하려고 하던게 문제
   

### 멘토님의 코드 리뷰	

* async, await 사용

* router.get() 호출 시 두번 째 파라미터에 async 사용 가능

* https://github.com/henyy1004/nyangterest/pull/113


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

* 해당 날짜의 모든 데이터를 프론트엔드에서 렌더링을 받아왔다.

* 렌더링되는 데이터가 많을때의 문제점과 무한스크롤링을 할수 있게끔 코드를 수정해야 한다.





### 다시 공부하는 비동기


#### 인자,인수, 매개변수?

* Parameter가 매개변수인건 알고 있었는데 인자와 인수가 매번 헷갈려서 용어도 이번 기회에 다시 정리해보았다.

* 인자란 함수를 정의할때 외부로부터 받아들이는 임의의 값을 의미한다.

    * 인자 === 매개변수 === Parameter === 가인수

	* 예시
		<pre>
			function multiply(a, b) {
				return a * b;
			}
		</pre>

  		함수의 인자값은 a와 b다.


* 인수란 함수를 호출할때 사용되는 값

	* 인수 === Argument === 전달인자

	* 예시
		<pre>multiply(5, 2)</pre>

     함수 호출시 인수값은 5와 2다.


#### 내가 이해한  비동기 와 콜백함수 

* 비동기 처리란 특정 로직이 끝날때까지 기다리지 않고 먼저 실행되는것을 말한다.
  
* 이 비동기 처리를 위해 콜백함수가 필요하다.

#### Promise

* 하지만 콜백함수는 가독성이 떨어지며 비동기함수안에서 비동기를 호출하는 동기적인 코드를 넣으려다가 콜백헬을 만나게 된다.

* 이때의 해결책으로 Promise를 사용하면 .then()을 이용해 코드를 순차적으로 진행하개 만들어준다.
  
* Promise가 완전히 콜백함수를 대체해주는 것은 아니다. 

* 콜백을 예측가능한 패턴으로 사용할 수있게 해준다.


#### Async / await을 사용하면

* 코드가 간결하고 깔끔해진다.

* try / catch로 에러 핸들링이 가능하다.

* 콜백함수를 더이상 사용하지 않아도 된다.

* Promise를 대체하는건 아니다. 

* 연결된 Promise를 하나의 함수로 감싸진 여러개의 함수 호출로 변환할 수 있다.

* 디버깅이 용이해진다.

* 다른 언어에서는 이미 사용하고 있었다. C#(5.0부터), 스칼라, 파이썬(3.5부터) 등등




### 스레드


#### 프로세스란?

* 프로세스(process)란 단순히 실행 중인 프로그램(program)이다.

* 즉, 사용자가 작성한 프로그램이 운영체제에 의해 메모리 공간을 할당받아 실행 중인 것을 말한다.

* 이러한 프로세스는 프로그램에 사용되는 데이터와 메모리 등의 자원 그리고 스레드로 구성된다.


#### 스레드란?

* 스레드(thread)는 어떠한 프로그램 내에서, 특히 프로세스 내에서 실행되는 흐름의 단위를 말한다. 일반적으로 한 프로그램은 하나의 스레드를 가지고 있지만, 프로그램 환경에 따라 둘 이상의 스레드를 동시에 실행할 수 있다. 


#### 프로세스가 은행이라면 스레드는 은행 창구


#### 멀티 스레드

*  하나의 프로세스 내의  메모리를  여러개의 스레드가 공유하며 사용한다는 것을 말한다.


#### Task

* 스레드보다 높은 수준의 추상화

* 작업의 최소단위 


#### Task가 일이라면 스레드는 일꾼
  

#### DEADLOCK

  * 프로세스가 자원을 얻지 못해 다음 처리를 하지 못하는 상태로, ‘교착 상태’라고도 하며 시스템적으로 한정된 자원을 여러 곳에서 사용하려고 할 때 발생한다.

![Process](https://cdn57.androidauthority.net/wp-content/uploads/2016/04/processes-and-threads-deadlock-16x9-720p-840x472.jpg)


#### 세마포어

* 에츠허르 데이크스트라가 고안한, 두 개의 원자적 함수로 조작되는 정수 변수로서, 멀티프로그래밍 환경에서 공유 자원에 대한 접근을 제한하는 방법으로 사용된다. 이는 철학자들의 만찬 문제의 고전적인 해법이지만 모든 교착 상태를 해결하지는 못한다.


#### 뮤텍스

* 공유된 자원의 데이터를 여러 쓰레드가 접근하는 것을 막는 것
  

#### 세마포어는 뮤텍스가 될수 있지만, 뮤텍스는 세마포어가 될 수 없다.


#### 세마포어는 파일시스템 상 파일형태로 존재, 뮤텍스는 프로세스 범위.



### 참고사이트

(https://amagrammer91.tistory.com/9)

(https://infosecguide.tistory.com/117)

(https://yoonucho.github.io/review/2019/01/31/callback_function.html)

(https://medium.com/@constell99/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-async-await-%EA%B0%80-promises%EB%A5%BC-%EC%82%AC%EB%9D%BC%EC%A7%80%EA%B2%8C-%EB%A7%8C%EB%93%A4-%EC%88%98-%EC%9E%88%EB%8A%94-6%EA%B0%80%EC%A7%80-%EC%9D%B4%EC%9C%A0-c5fe0add656c)

(https://en.wikipedia.org/wiki/Async/await)

러닝자바스크립트 299P ~ 301P - 이선브라운 

자바스크립트 코딩의 기술  312P ~ 324P - 조 모건

(https://ko.wikipedia.org/wiki/%EC%8A%A4%EB%A0%88%EB%93%9C_(%EC%BB%B4%ED%93%A8%ED%8C%85))

(http://tcpschool.com/java/java_thread_concept)

(https://gmlwjd9405.github.io/2018/09/14/process-vs-thread.html)

(http://charlie0301.blogspot.com/2018/03/c-task.html)

(http://egloos.zum.com/sword33/v/6000691)

(https://jwprogramming.tistory.com/12)

(https://jwprogramming.tistory.com/13?category=680235)

(https://ko.wikipedia.org/wiki/%EC%84%B8%EB%A7%88%ED%8F%AC%EC%96%B4)

(https://sycho-lego.tistory.com/11)

