
const request = require('supertest')
const app = require('../server')
const fetch = require("node-fetch");
require('dotenv').config()

const serviceKey = process.env.SERVICE_KEY;

const api = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc';

const url = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=20200405&endde=20200405&numOfRows=20&upkind=422400&kind=`;

describe('GET request parameters', () => {

	// before('test', () => {

	// })


	test('works with async / await', async () => {

		const getData = async (url) => {
			try {
				const response = await fetch(url);
				const json = await response.json();
				const items = await json.response.body.items;
				return items;

			} catch (error) {
				console.log(error);
			}
		}
		const data = await getData(url);
		expect.assertions(1);
		expect(data.item[0].colorCd).toEqual("고등어");
	})

	test('async / await status code', async () => {
		// const response = await request(app).get();
		const response = await request(app).get("/page/20200405/20200412/72/000116");
		expect(response.statusCode).toBe(200);
	})

	test('test search/kind', (done) => {
		request(app)
			.get('/search/kind')
			.set('Content-Type', 'application/json')
			.expect(200, done)
	})
})