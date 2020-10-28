const request = require('supertest');
const server = require('../join');
const fs = require("fs");
const moment = require("moment");
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv");
const path = require("path");

// 환경설정 파일에서 이메일 인증 Secret key 가져오기
dotenv.config({ path: path.join(__dirname, "./.env") });
const EMAIL_CERTIFY_KEY = process.env.EMAIL_CERTIFY_KEY;


// db접속
const data = fs.readFileSync(__dirname + "../db.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

// 환경설정 연결 초기화
const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
});

describe('사용자가 소셜 로그인에 성공', () => {
	test('중복계정이 없다면 회원가입', async () => {
		const dumyData = {
			email: 'henyy1004@naver.com',
			password: null,
			signupdate: moment().format("YYYYMMDD"),
			certify: true,
			emailToken: await bcryptjs.hash(EMAIL_CERTIFY_KEY, 10),
			snsName: 'google'
		};

		const emailLink = `http://localhost:8080/user/join/welcome?email=${dumyData.email}&token=${dumyData.emailToken}`;

    // 메일 발송 params
    let mailSenderOption = {
        toEmail: dumyData.email,
        subject: "냥터레스트 회원가입을 위한 이메일 인증을 부탁드립니다.",
        text: `안녕하세요 회원가입을 축하드립니다. ${emailLink} 해당 링크로 접속해주시면 인증이 완료되어 냥터레스트에 로그인하실 수 있습니다.`,
    };

    // 회원 가입 처리 query
    // 회언 정보 DB저장
    const sql =
        "INSERT INTO `nyang_member` (`email`, `password`, `signupdate`, `certify`, `token`, `snsName`) VALUES ( ?,?,?,?,?,? )";
    const params = ((resistUserInfo) => {
        let resistUserInfoArray = [];
        for (items in resistUserInfo) {
            resistUserInfoArray.push(resistUserInfo[items]);
        }

			return resistUserInfoArray;
		})(resistUserInfo);

	const result = connection.query(sql, params, (err, rows) => {
			if (err) {
				console.log("회원가입 실패", err);
				return fals
			} else {
				if(resistUserInfo.snsName === null) {
					return false;
				}

				return true
			}
		});
		
		expect(result).toBe(true);
	})
})