## 스크롤을 해서 보여지지 않는 데이터들은 왜 필터 기능이 동작하지 않는지에 대한 문제점 찾아보기 

### 문제 분석

* 예상 원인은 백엔드에서 데이터를 제대로 받아오지 않았기 때문이었다.

* 필터링되는 셀렉트박스와 셀렉트바의 코드는 프론트엔드쪽인 React Home.js에 있고 
  
* searchStore.js에 categoryChange함수가 실행되면 품종이나 키워드와 매칭이 되는 데이터를 보여주고 있다.

  // Home.js
  ```javascript

	const filteredItems = items.filter(item => {
			if (typeof item === "object") {
				return (
					item.kindCd.replace("한국 고양이", "코리안숏헤어").includes(selectedCategory) &&
					Object.keys(item).some(
						key =>
							typeof item[key] === "string" &&
							item[key].toLowerCase().replace("한국 고양이", "코리안숏헤어").includes(searchField)
						// , console.log(item.kindCd)
					)
				);
			} else {
				return null;
			}

		})

  ```

  // Home.js
  ```javascript

   @action
	categoryChange = (e) => {
		this.selectedCategory = e.value;

	};

	```

* 이때 백엔드와 연결된 부분이 없기때문에 더이상의 데이터를 받아오지 못하는거 같다.

### 해결방법 모색
  	
그래서 백엔드 데이터를 받아올수 있는 방법을 이것저것 시도해 보았다.

1-1. 멘토님이 조언해주신대로 listStore.js에서 loadList함수안에 slice를 하여 데이터를 일부 삭제해보았다.
백엔드에서는 데이터가 그대로 받아졌지만 화면에서는 삭제를 한 데이터가  출력되었다.

// listStore.js
```javascript
	@action
	loadList = async () => {

		//중략

			runInAction(() => {
				if (Array.isArray(json.items.item)) {
					this.setItems([...items, ...(json.items.item.slice(2) || [])]);
				}

		// 중략
```

![slice ok](https://yoonucho.github.io/post_img/slice_ok.jpg)

1-2. push를 넣어 데이터를 추가하고자 하였을때는 마찬가지로 백엔드에서 데이터는 그대로 받아졌지만  화면에서는 데이터가 없음이 표시되고

  콘솔창에서는 에러메시지가 나왔다.

// listStore.js
```javascript
	@action
	loadList = async () => {

		//중략

			runInAction(() => {
				if (Array.isArray(json.items.item)) {
					this.setItems([...items, ...(json.items.item.push(json.items.item) || [])]);
				}

		// 중략
```
![push error](https://yoonucho.github.io/post_img/push_error.jpg)

2. Home.js에서 render함수안에 필터링 전에 loadMore()를 넣으면
검색한 데이터를 전부 받아오는 것을 확인 하였다.


하지만 무작정 쏟아지듯 나오기때문에 속도가 너무 빨라서 누락되는 데이터가 많고 이는 기존 스크롤로 데이터를 보여지는 방식도 영향을 끼쳐서
방법이 아닌거 같다.

3. searchStore.js에  categoryChange함수에 loadMore함수를 넣어봤습니다.
하지만 카테고리를 변경후 백엔드데이터가 1페이지정도 받아지고는 더이상 진전이 없다.

이거저거 해본 결과 3번에서 검색시 전체데이터를 불러오는 방법이 맞을거 같은데 생각대도 되지 않았다.

3번에서 백엔드데이터가 받아지지 않는 이유에 대해서도 계속 생각해보았다. 품종에 대한 요청변수가 없어서 그런거 아닐까 싶어서 api에서 제공하는 kind를 요청변수로 넣어서도 시도해보았다.

그런데 문제는  예를 들어 품종 중 노르웨이숲을 검색하는 api는 이렇다.

http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?ServiceKey=P3gvH0LsdoPkxFnZU2Ee98hGDDEwVTJndJFa8NDUhznSLlZG6OOxBopFWLBmiCPOfWXsF8Wz8LFHJguz41qJvA%3D%3D&_type=json&upkind=422400&kind=000170&bgnde=20191005&endde=20191031&pageNo=1&numOfRows=10& 

노르웨이숲의 코드는 000170이다.
그런데 전체 품종을 나오게 하려면 kind=&로 하거나 kind에 요청변수를 넣지 않아야 제대로 보여진다.
http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?ServiceKey=P3gvH0LsdoPkxFnZU2Ee98hGDDEwVTJndJFa8NDUhznSLlZG6OOxBopFWLBmiCPOfWXsF8Wz8LFHJguz41qJvA%3D%3D&_type=json&upkind=422400&kind=&bgnde=20191005&endde=20191031&pageNo=1&numOfRows=10&

kind=&를 리액트로 넘길수 있는 방법도 이거저거 시도해봐도 undifined이 나와서 기존에 잘나오던 데이터도 제대로 나오지 않게 된다 ㅠㅠ

이외에도 시도해본 자잘한 방법들이 있는데 이거저거 시도하는게 엉뚱한 짓을 하고 있는건 아닌가 싶은 걱정이 든다.  

