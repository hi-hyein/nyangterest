## API Unit Test

* Jest로 유닛테스트를 작성하면서 이슈를 겪었고 그 과정들을 정리해보려고 한다.

### 삽질을 했던 이유 분석

* 문제 : 테스트에서 실제 api호출을 해서 어떻게 데이터를 받아오는 건지 모른다.
  
* 원인 : open api serviceKey의 정보가 있는 .env(환경설정파일)의 path 문제로 받아온 값이 undefined이다.

* 해결: 프로젝트 root에 있던 .env파일을 backend파일로 옮기고 server.js에 path를 제대로 인식시켜줌

### Jest로 환경 설정하기

#### Jest 설치하기
  
  <pre>npm install --save -dev jest</pre>


#### Watch 설치하기

  <pre>npm install watch</pre>

* package.json 파일에 추가
	<pre>
		"scripts": {
		"start": "node server.js",
		"test": "jest --watch --runInBand --detectOpenHandles --forceExit"
		}
	</pre>


#### Supertest 설치하기
  
  <pre>npm install --save -dev supertest</pre>
  

###  최종 API 구현 코드 

```javascript

	describe("Nyangterest unit test!", () => {

		describe('GET request parameters test', () => {

			const url = "/page/20200405/20200412/72/000116/keyword"

			// 검색어 입력 & 품종 변경
			test('Input keyword and Change kind with async / await', async () => {
				const response = await request(app).get("/page/20200405/20200412/72/000200/0.3kg");
				expect.assertions(1);
				expect(response.body.items.item[0]).toHaveProperty('weight', "0.3(Kg)")
			})

			// 검색어 입력(한글)할 때
			test('Input keyword(한글) with async / await', async () => {
				const response = await request(app).get(`/page/20200405/20200412/72/000116/${encodeURI("치즈")}`);
				expect.assertions(1);
				expect(response.body.items.item[0].colorCd).toContain("치즈");
			})

			// 검색어 입력할 때
			test('Input keyword with async / await', async () => {
				const response = await request(app).get("/page/20200405/20200412/72/000116/054-270-2724");
				expect.assertions(1);
				expect(response.body.items.item[0].officetel).toBe("054-270-2724");
			})

			// 품종 변경
			test('Change kind with async / await', async () => {
				const response = await request(app).get("/page/20200405/20200412/72/000197/keyword");
				expect.assertions(1);
				expect(response.body.items.item[0].kindCd).toEqual("[고양이] 페르시안-페르시안 친칠라");
			})

			// 기본 api 

			test('Default with async / await', async () => {
			const response = await request(app).get(url);
			const totalCount = response.body.totalCount;
			expect.assertions(1);
			expect(response.body.items.item[totalCount - 1].colorCd).toEqual("갈흰검");
		    })


			// 기본 api status
			test('Async / await status code', async () => {
				const response = await request(app).get(url);
				expect(response.statusCode).toBe(200);
			})

			// 품종 api status
			test('Test search/kind', (done) => {
				request(app)
					.get('/search/kind')
					.set('Content-Type', 'application/json')
					.expect(200, done)
			})
		})

})

```

### Issue 와 Fix

####  Issue 1 

* 테스트를 PASS하지 못하였고 확인해보니 open api serviceKey값이 undefined이다.

![주석 2020-04-15 194946](https://user-images.githubusercontent.com/2981954/79329398-b3def280-7f52-11ea-8934-725a99672b94.jpg)


#### Issue 1 fix 	
  
  
* 기존 .env파일은 root에 위치해있고 dotenv패키지도 root에 설치되어있어서 테스트파일에서는 path를 제대로 인식하지 못하여 값이 undefined인 것을 확인하였다.

* 기존의 .env파일을 backend폴더에 옮기고 server.js에서 path 설정을 명확히 해주었다.

//server.js

```javascript

const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, './.env') })


```

* package.json 파일에 추가

<pre>
	"test": "NODE_ENV=test jest --setupFiles dotenv/config --watch --runInBand --detectOpenHandles --forceExit"
</pre>	

```javascript
	
	if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, function () {
		logger.info("enabled web server listening !");
		// console.log("enabled web server listening !");
	});
}

```



#### Issue 2

* NODE_ENV=test를 package.json에 넣으려니 아래와 같은 에러 메세지가 나왔다.

	<pre>  'NODE_ENV'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는
	배치 파일이 아닙니다.</pre>


#### Issue 2 fix

* 글로벌 환경에서  win-node-env를 설치한다.

  <pre>npm install -g win-node-env</pre> 


#### Issue 3 
![주석 2020-04-14 170743](https://user-images.githubusercontent.com/2981954/79305281-0fe35000-7f2e-11ea-9e73-38c25dc147f7.jpg)


#### Issue 3 fix	

	* 검색어를 encodeURL()함수안에 넣는다.

```javascript
	test('Input keyword(한글) with async / await', async () => {
		const response = await request(app).get(`/page/20200405/20200412/72/000116/${encodeURI("치즈")}`);
		expect.assertions(1);
		expect(response.body.items.item[0].colorCd).toContain("치즈");
	})

```
#### Issue 4 

* package.json 파일에 jest 환경을 설정할때 watchman을 넣으면 아래 와 같은 에러 메세지 가 나왔다.
  
	<pre>
	"test": "NODE_ENV=test jest --setupFiles dotenv/config --watchman --runInBand --detectOpenHandles --forceExit"
	</pre>	


![주석 2020-04-15 192812](https://user-images.githubusercontent.com/2981954/79327875-24d0db00-7f50-11ea-842b-2c8ebbfb30c5.jpg)


#### Issue 4 fix	

* watch나 watchAll로 변경해주면 해결되었다.()

	<pre>
	"test": "NODE_ENV=test jest --setupFiles dotenv/config --watch --runInBand --detectOpenHandles --forceExit"
	</pre>	


#### 고민 또는 의문점 

* 테스트 코드는 어제 작성을 다하였는데 내용 정리중에 테스트를 실행했다가 하나의 코드가 실패한걸 발견하였다.

	```javascript
	test('Default with async / await', async () => {
					const response = await request(app).get(url);
					expect.assertions(1);
					expect(response.body.items.item[0].colorCd).toEqual("회색,흰색");
				})
	```


* 조금 지난 날짜를 일부러 넣은거라  변동사항이 없을줄 알았는데 오늘 업데이트가 된듯 하여 테스트 코드를 수정해주었다.
  
* 테스트한 날짜에 변동사항이 있어서 테스트가 PASS 하지 못하였을 때는 지금과 같이  코드를 수정하는게 맞는건지 처음부터 변동사항이 없을 내용을 테스트하는 코드를 작성해야 하는게 맞는건지 고민이 되고 궁금하다.
  

### 참고자료

https://jestjs.io/docs/en/configuration#testenvironment-string.

https://jestjs.io/docs/en/cli#options

https://medium.com/@lusbuab/using-dotenv-with-jest-7e735b34e55f

https://hashcode.co.kr/questions/9521/nodejs-%EC%82%AC%EC%9D%B4%ED%8A%B8%EC%A0%91%EA%B7%BC-%EC%8B%9C-request-path-contains-unescaped-characters-%EC%97%90%EB%9F%AC

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/encodeURI

https://d2.naver.com/helloworld/2564557

https://yonghyunlee.gitlab.io/temp_post/jest/


