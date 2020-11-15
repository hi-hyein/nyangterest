const request = require('supertest');
const fs = require("fs");
const moment = require("moment");
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv");
const path = require("path");
const _join = require('../join/_join');
const test_db = require('../db/test_db');

// 환경설정 파일에서 이메일 인증 Secret key 가져오기
dotenv.config({ path: path.join(__dirname, "./.env") });
const EMAIL_CERTIFY_KEY = process.env.EMAIL_CERTIFY_KEY;


describe('사용자가 소셜 로그인에 성공', () => {
	test('중복계정이 없다면 성공', async () => {
		test_db.connect.connect();
		test_db.createDB(test_db.connect);
		// test_db.createTable('CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))');
		// const request = {
		// 	body: {
		// 		"useremail": "nyangterest@test.com",
		// 		"snsName": "google",
		// 	}
		// };
		
		// expect(_join.existUserEmail(request)).toEqual(false);
		test_db.dropDB();
	})
})