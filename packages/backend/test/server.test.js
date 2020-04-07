const request = require('supertest')
const app = require('../server_ex')
const fetch = require("node-fetch");

describe('GET request parameters', () => {
	// before('test', () => {

	// })
	const url = 'https://jsonplaceholder.typicode.com/posts/1'

	const getData = async (url) => {
		try {
			const response = await fetch(url);
			const json = await response.json();
			return json;

		} catch (error) {
			console.log(error);
		}
	}

	test('works with async / await', async () => {
		expect.assertions(1);
		const data = await getData(url);
		expect(data.id).toBe(1)


	})

	test('async / await status code', async (done) => {
		const response = await request(app).get("/page/:bgnde/:endde/:numOfRows/:kind");
		expect(response.statusCode).toBe(200);
		done()
	})

	test('test search/kind', (done) => {
		request(app)
			.get('/search/kind')
			.set('Content-Type', 'application/json')
			.expect(200, done)
	})
})