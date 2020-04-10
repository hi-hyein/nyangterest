
const request = require('supertest')
const app = require('../server')
const fetch = require("node-fetch");

describe('GET request parameters', () => {
	// before('test', () => {

	// })

	const url = '/page/20200401/20200408/72/000116';

	const items = { "id": 1 }

	test('works with async / await', async () => {

		const getData = async (url) => {
			try {
				const response = await fetch(url);
				const json = await response.json(items)
				return json;

			} catch (error) {
				console.log(error);
			}
		}
		const data = await getData(url);
		expect(data).toEqual(
			{ id: 1 }
		);
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