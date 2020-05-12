
const request = require('supertest')
const app = require('../server')

describe("Nyangterest unit test!", () => {

	describe('GET request parameters test', () => {

		const startDay = new Date(Date.now() + -14 * 24 * 3600 * 1000).toISOString().slice(0, 10).replace(/-/g, "");
		const endDay = new Date().toISOString().slice(0, 10).replace(/-/g, "");
		const per = 100;
		const str = "keyword"
		const url = `/page/${startDay}/${endDay}/${per}/000116/${str}`;

		const getData = async (url) => {
			try {
				const response = await request(app).get(url);
				const items = await response.body.items;
				return items;

			} catch (error) {
				console.log(error);
			}
		};


		// before('test', () => {

		// })

		// 품종을 선택했을때 조회된 아이템이 하나일때 배열을 만들어주기?
		// test.only('Change kind  Object with async / await', async () => {
		// 	const resTotalCount = await request(app).get(`/page/20200423/20200423/${per}/000172/${str}`);
		// 	const items = await resTotalCount.body.items
		// 	const totalCount = await resTotalCount.body.totalCount;
		// 	console.log(items)
		// 	expect(totalCount).toBe(1);

		// })


		// 검색어를 입력했을때 data[0][0]에 string이 들어 있는지 확인
		test('Input keyword with async / await', async () => {

			const changeStr = encodeURI("2020년생");
			const newUrl = `/page/${startDay}/${endDay}/${per}/000116/${changeStr}`;

			const data = await getData(newUrl);

			expect.assertions(1);
			expect(data[0][0].age.length > 0).toBeTruthy();
		})

		// 품종코드(변하지 않는 값)
		test('Change kind with async / await', async () => {
			const data = await getData(`/page/${startDay}/${endDay}/${per}/000197/${str}`);
			for (let i = 0; i < data.length; i++) {
				expect(data[0][i].kindCd).toContain("페르시안-페르시안 친칠라");

			}
		})

		// 예외처리 
		test('Change kind with async(error) / await', async () => {
			const data = await getData(`/page/${startDay}/${endDay}/${per}/000170/${str}`);
			const kindCd = Promise.resolve(data[0][0].kindCd)
			const error = Promise.reject('error')
			await expect(kindCd).resolves.toEqual("[고양이] 노르웨이 숲");
			await expect(error).rejects.toBe('error')

		})


		// 응답받은 데이터에 고양이가 포함되어있는지 확인
		test('ToHaveProperty default with async / await', async () => {
			const data = await getData(url);
			for (let i = 0; i < 10; i++) {
				expect(data[i][0].kindCd).toMatch(/고양이/)
			}

		})

		test('Default with async / await', async () => {
			const data = await getData(url);
			expect.assertions(2);
			expect(data[0].length <= per).toBeTruthy();
			expect(data[0].length > per).toBeFalsy();
		})

		test('Async / await status code', async () => {
			const response = await request(app).get(url);
			expect(response.statusCode).toBe(200);
		})

		test('Test search/kind', (done) => {
			request(app)
				.get('/search/kind')
				.set('Content-Type', 'application/json')
				.expect(200, done)
		})
	})

})



