## 치명적인 오류 발견

### 상단필터 검색후 특정 상황일때 아이템 누락 오류 

우연히 10월 16일부터 10월 16일까지 검색을 해보니 마지막 페이지에 아이템이 하나가 남았을때 화면에 보여지지 않는걸 알게 되었다. 😔
   
### 원인파악
	
1. 개발자도구에서 보니 백엔드에서는 제대로 받아지는걸 확인할 수 있었다.
2. 이전 데이터는 배열로 되어있지만 마지막페이지 아이템은 그냥 object로 받아지는게 확인되었다.

### 해결방법 모색

* 조건문으로 item이 Array가 아닐경우  object를  Array로 변환하는 코드를 넣어서 새로운 배열을 만들어야 한다.

### 내가 예상했던 모습은

* 기존 배열에 변환한 코드도 배열에 합쳐져서 아이템갯수에 추가가 되어서 다른 코드없이 알아서 보일줄 알았다. 😒

### 하지만 현실은.. 

* 콘솔로 찍어보니 배열의 길이가 0인게 확인되었다. 계속 디버깅을 하다가 보니 비동기방식이라 다음 페이지를 불러올때 표시되는거 같아서 그런거 같았다.
* 드디어 화면에는 누락된 아이템이 표시가 되었다. 그러나 로딩중이 뱅글뱅글돈다.  마지막페이지라고 인식을 못하는 것이다.
  배열로 반환한 아이템을 갯수로 인식못하는거 같아서 이런 현상이 일어나는거 같았다.
  

### 해결방법 1차

* Array.isArray로 배열여부 확인 후 아니라면 concat()으로 새배열을 만들어 주는 조건문을 넣었다.
* 또 해당 조건문에 빈배열을 넣어주지 않으면 배열로 만든 아이템이 누락이 되어서 && []도 넣어주었다.
* 마지막페이지 인식을 못하는 부분은 아이템이 0보다 큰 조건문을 추가하여 해결하였다.

// listStore.js
```javascript

		// get방식일때
	@action
	loadList = async () => {
		try {
			// 중략
			runInAction(() => {

				if (Array.isArray(json.items.item) && []) {
					this.setItems([...items, ...json.items.item || []])
				} else {
					// 객체를 배열로 만들어서 기존배열에 추가하여 새배열을 만드는 코드
					this.items = items.concat(json.items.item).slice();
					this.loading = false;
					console.log(this.items);
					return items;
				}
				// 중략
		}
	};

```
// Home.js
```javascript

		{totalPage && (items.length === totalCount) && (items.length > 0 && filteredItems.length > 0) &&
			(<Message><p>마지막 페이지입니다!</p></Message>)
		}

```

### 뒤늦게 오류 발견 

* 기껏 PR보내고 머지하고나서 실행해보니 새벽시간에  아이템이 하나도 없으면 화면에서 에러를 뿜는걸 발견하였다. 😦
* 반환할 아이템(items)이 없으니  배열이 아니라 filter()를 사용 못하는거 같았다. 
  
### 해결방법 2차  

* 그래서  아이템(item)이 undefined일때는 filter()를 실행안하는 코드를 넣어서 에러를 막을 수 있었다.

	// Home.js  
	```javascript 

		const filteredItems = items.filter(item => {

		if (item === undefined) {
			return null;
		}

		// 중략
		});

	```

### 느낀 점

* 변수의 타입선언이 없는게 자바스크립트의 장점이라고 생각했는데 이런 경험을 하니 단점으로 느껴졌다.
* 이래서 타입스크립트를 쓰는건가 라고 생각하게 되었다.
### 해결방법 3차

  * 해결방법 2차에서 갑자기 든 생각이 반대로 하는게 더 낫지 않을까 라는 생각이 들었다.
  * 기존에는 아이템이 undefined일때 null을 리턴했다면 이번에는 아이템타입이 오브젝트일때만 필터링되게끔 조건문을 넣어봤다.

  	// Home.js  

	```javascript 
  const filteredItems = items.filter(item => {
			if (typeof item === "object") {
				return (
					// 중략
					)
				);
			} else {
				return null;
			}

		})

  ```

  * 바꾸고 나서 보니 해결방법 1차에서 배열인지 아닌지 비교하지 않아도 기존 코드를 그대로 쓸 수 있었다.

  // listStore.js
  ```javascript

		// get방식일때
    @action
    loadList = async () => {
      try {
        // 중략
        runInAction(() => {

            this.setItems([...items, ...json.items.item || []])
            
          // 중략
      }
    };

  ```

 ### 또다시 느낀 점

  * 음.. 뭐랄까 해결방법 3차까지 와서 보니  대부분의 코드가 원상복구가 되니 조금 허탈해졌었다.  그냥 기본 오브젝트타입일때만으로 비교를 했으면 부수적인 코드들이 붙지 않았을텐데.. 
  * 이런 마음도 앞으로 계속  리팩토링을 하게 되면서 겪게 되는거겠지. 멘탈을 강하게 훈련시켜야 할거 같다. 😅
  
