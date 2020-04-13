
const request = require('supertest')
const app = require('../server')

describe('GET request parameters', () => {

	const url = "/page/20200405/20200412/72/000116/keyword"

	// before('test', () => {

	// })


	test('works with async / await', async () => {
		const response = await request(app).get(url);
		expect.assertions(1);
		expect(response.body.items.item[0].colorCd).toEqual("회색,흰색");
	})


	test('async / await input code', async () => {
		const response = await request(app).get("/input/searchField");
		expect(response.text).toEqual(JSON.stringify({ success: "test" }));
	})


	test('async / await status code', async () => {
		// const response = await request(app).get();
		const response = await request(app).get(url);
		expect(response.statusCode).toBe(200);
	})

	test('test search/kind', (done) => {
		request(app)
			.get('/search/kind')
			.set('Content-Type', 'application/json')
			.expect(200, done)
	})
})