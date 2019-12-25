## 상단 필터값이 변경되는걸 감지하는 방법 

* 멘토님의 조언으로 상단필터값이 변경될때 store에서 reaction를 시도해보았다.

### reaction이란

 특정 값이 바뀔 때 어떤 작업을 하고 싶다면 reaction 함수를 사용

### reaction 기본 사용방법

	<pre> reaction(() => data, (data, reaction) => { sideEffect }, options?)</pre>


1. 객체를 observable로 감쌀때

	```javascript


	```

2. class 문법에 @observable를 사용할때 
 
	```javascript


	```

### 참고사이트

(https://velog.io/@velopert/begin-mobx#class-%EB%AC%B8%EB%B2%95%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%B4%EC%84%9C-%EC%A1%B0%EA%B8%88-%EB%8D%94-%EA%B9%94%EB%81%94%ED%95%98%EA%B2%8C)	


