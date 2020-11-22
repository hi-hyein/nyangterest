const _join = require('../join/_join');
const test_db = require('../db/test_db');

beforeAll(()=>{
	test_db.createDatabase();
})

describe('사용자가 소셜 로그인에 성공', () => {
	test('중복계정이 없다면 성공', () => {
		// test_db.createTableMember();
		// test_db.Addmember();
		const request = {
			"body": {
				"useremail": "nyangterest@test.com",
				"snsName": "google",
			}
		};
		expect(_join.existUserEmail(request)).toBe(false);
	})
})

afterAll(()=>{
	test_db.dropDatabase();
})