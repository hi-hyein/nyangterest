const request = require('supertest')
const app = require('../server_ex')
describe('GET request parameters', () => {

	// before('test', () => {
	// })

	it('test', (done) => {
		request(app)
			.get('/search/kind')
			.set('Content-Type', 'application/json')
			.expect(200, done)
	})
})