## 상단 필터값이 변경되는걸 감지하는 방법 

* 멘토님의 조언으로 상단필터값이 변경될때 store에서 reaction를 시도해보았다.

### Reaction이란

 * 특정 값이 바뀔 때 어떤 작업을 하고 싶다면 reaction 함수를 사용
 
 * 기본적으로 파생된 값을 가지고 View를 업데이트하거나 로그를 찍는 사이드 이펙트를 내포하고 있는 동작을 말한다. 
   

### reaction 기본 사용방법

<pre> reaction(() => data, (data, reaction) => { sideEffect }, options?)</pre>


1. 객체를 observable로 감쌀때

```javascript

import { observable, reaction } from "mobx";

const counter = observable({ count: 0 })

const reaction = reaction(
	() => counter.count,
	(count, reaction) => {
		console.log("reaction: invoked. counter.count = " + count)
		reaction.dispose()
	}
)

counter.count = 1

counter.count = 2

console.log(counter.count)

```

2. class 문법에 @observable를 사용할때 

 
```javascript

import { observable, reaction } from "mobx";

class Counter {
	@observable count = 0;
}

const counter = new Counter();

reaction(
	() => counter.count,
	(count, reaction) => {
		console.log("reaction: invoked. counter.count = " + count)
		reaction.dispose()
	}
)

counter.count = 1

counter.count = 2

console.log(counter.count)

```

### 그럼 냥터레스트에는 어떻게 적용해야 할까

1. reaction 사용방법 중 냥터레스트 store가 class문법으로 되어 있어서 2번을 선택했다.
	
2. 초반에는 사용문법을 제대로 확인해보지 않아서 에러 화면이 출력되었다.
	
![reaction error] (https://yoonucho.github.io/post_img/re_error.jpg)

// 에러코드

```javascript

	//  중략
	reaction(
			() => { console.log("change") }
		);

```
3. 사용법을 다시 확인 후 에러없이 적용은 되었으나 콘솔창에 로그가 없다?
	그리고 의심이 드는건 handleToChange함수안의 콘솔로그로 변경되는 값이 감지되는데 reaction은 왜 필요하지라는 생각이 들었다.
   
```javascript

import { observable, action, reaction } from "mobx";

export default class SearchStore {

	@observable to = new Date();

	constructor(root) {
		this.root = root;
	}

	// DayPicker 날짜 선택기
	@action
	handleToChange = to => {

		const { loadList, resetList } = this.root.listStore;
		console.log(typeof to, to)
		this.to = to;

		resetList();
		loadList();
	};

}

const search = new SearchStore();

reaction(
	() => search.to,
	(value, reaction) => { console.log(`${value} change!`) }
);

```

4. 우선 관련 자료들을 검색하여 reaction 함수를 적용한 코드를 살펴보니 reaction함수 이후 observable로 관리중인 state를 수동으로 변경해주는걸 깨달았다!

```javascript

// 중략
const search = new SearchStore();

reaction(
	() => search.to,
	(value, reaction) => { console.log(`${value} change!`) }
);

search.to = new Date().toLocaleString();

search.to = new Date();

```
![reaction ok] (https://yoonucho.github.io/post_img/re_ok.jpg)


5. 여기까지 해봤을때 3번에 느낀 의심으로 인한 궁금증이 해소가 되지 않더라 "그래서 뭐?" 어떻다는건지 냥터레스트에서는 도움이 되지 않는거 같다는 생각이 들었다.
	
6. 검색했던 포스팅 내용 중  React와 Mobx를 같이 사용할때 컴포넌트에 observer만 선언해주면 render함수가 렌더되기 때문에 reaction은 사용하지 않다도 되는걸 알게 되었다.
	
7. 즉 냥터레스트에서는 Home 컴포넌트 상단에 @observer를 사용하기 때문에 자동으로 렌더링을 해주는 것이다.
	찾아봤던 예시도 React를 배제하고 사용할때의 예시들 이었던걸 다시 확인하게 되었다.


### 그래서 결론은

* 비록 냥터레스트에서는 사용안해도 되는 함수였지만 Mobx를 기존보다 좀 더 딥하게 알아가는 과정이었다 생각한다.

* 사실은 Mobx를 초반에 공부할때 보던 포스팅들이었는데 그때는 왜 몰랐을까? 조금 부끄럽기도 하다.   


### 참고사이트

(https://mobx.js.org/refguide/reaction.html)

(https://velog.io/@velopert/begin-mobx#class-%EB%AC%B8%EB%B2%95%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%B4%EC%84%9C-%EC%A1%B0%EA%B8%88-%EB%8D%94-%EA%B9%94%EB%81%94%ED%95%98%EA%B2%8C)

(https://hyunseob.github.io/2017/10/07/hello-mobx/)	


