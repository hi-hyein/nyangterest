
const request = require('supertest')
const app = require('../server')

describe("Nyangterest unit test!", () => {

	describe('GET request parameters test', () => {

		const url = "/page/20200405/20200412/72/000116/keyword"

		// before('test', () => {

		// })

		test('Input keyword and Change kind with async / await', async () => {
			const response = await request(app).get("/page/20200405/20200412/72/000200/0.3kg");
			expect.assertions(1);
			expect(response.body.items.item[0]).toHaveProperty('weight', "0.3(Kg)")
		})

		test('Input keyword(한글) with async / await', async () => {
			const response = await request(app).get(`/page/20200405/20200412/72/000116/${encodeURI("치즈")}`);
			expect.assertions(1);
			expect(response.body.items.item[0].colorCd).toContain("치즈");
		})

		test('Input keyword with async / await', async () => {
			const response = await request(app).get("/page/20200405/20200412/72/000116/054-270-2724");
			expect.assertions(1);
			expect(response.body.items.item[0].officetel).toBe("054-270-2724");
		})


		test('Change kind with async / await', async () => {
			const response = await request(app).get("/page/20200405/20200412/72/000197/keyword");
			expect.assertions(1);
			expect(response.body.items.item[0].kindCd).toEqual("[고양이] 페르시안-페르시안 친칠라");
		})

		test('Default with async / await', async () => {
			const response = await request(app).get(url);
			const totalCount = response.body.totalCount;
			expect.assertions(1);
			expect(response.body.items.item[totalCount - 1].colorCd).toEqual("갈흰검");
		})


		// test('async / await input code', async () => {
		// 	const response = await request(app).get("/input/searchField");
		// 	expect(response.text).toEqual(JSON.stringify({ success: "test" }));
		// })

		test('Async / await status code', async () => {
			// const response = await request(app).get();
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



