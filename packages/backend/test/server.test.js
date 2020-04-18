
const request = require('supertest')
const app = require('../server')

describe("Nyangterest unit test!", () => {

	describe('GET request parameters test', () => {

		const startDay = new Date(Date.now() + -14 * 24 * 3600 * 1000).toISOString().slice(0, 10).replace(/-/g, "");
		const endDay = new Date().toISOString().slice(0, 10).replace(/-/g, "");
		const per = 1000;
		const str = "keyword"

		const getData = async (url) => {
			try {
				const response = await request(app).get(url);
				const items = await response.body.items
				return items;

			} catch (error) {
				console.log(error);
			}
		};

		const url = `/page/${startDay}/${endDay}/${per}/000116/${str}`;

		// before('test', () => {

		// })


		//검색어를 입력했을때 string이 들어있는지 확인(기존코드에서 수정 예정)

		// test('Input keyword with async / await', async () => {
		// 	const data = await getData(url);
		// 	// expect.assertions(1);
		// 	console.log(typeof data.item[0])
		// 	expect(data.item[0].age).toBe();
		// })


		// 아이템의 갯수와 전체 결과 수가 일치하는지

		// 품종코드(변하지 않는 값)
		test('Change kind with async / await', async () => {
			const data = await getData(`/page/${startDay}/${endDay}/72/000197/${str}`);
			for (let i = 0; i < data.item.length; i++) {
				expect(data.item[i].kindCd).toContain("페르시안-페르시안 친칠라");
			}
		})

		// 예외처리
		test('Change kind with async(error) / await', async () => {
			const data = await getData(`/page/${startDay}/${endDay}/72/000170/${str}`);
			for (let i = 0; i < data.item.length; i++) {
				await expect(data.item[i].kindCd).resolves.toContain("페르시안-페르시안 친칠라");
				await expect(data.item[i].kindCd).rejects.toThrow('error')
			}
		})

		// 응답받은 값에 고양이가 포함되어있는지 확인
		test('ToHaveProperty default with async / await', async () => {
			const data = await getData(url);
			for (let i = 0; i < 10; i++) {
				expect(data.item[i].kindCd).toMatch(/고양이/)
			}

		})

		test('Default with async / await', async () => {
			const data = await getData(url);
			expect.assertions(2);
			expect(data.item.length <= per).toBeTruthy();
			expect(data.item.length > per).toBeFalsy();
		})

		// test('async / await input code', async () => {
		// 	const response = await request(app).get("/input/searchField");
		// 	expect(response.text).toEqual(JSON.stringify({ success: "test" }));
		// })

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



