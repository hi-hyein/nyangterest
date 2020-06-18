const fs = require("fs");
const express = require("express");
const path = require("path");
const router = express.Router();
const hash = require('hash.js');
const moment = require("moment");
const mailSender = require('./mailSender.js');

// db접속
const data = fs.readFileSync(__dirname + "/db.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

// 환경설정 연결 초기화
const connection = mysql.createConnection({
	host: conf.host,
	user: conf.user,
	password: conf.password,
	port: conf.port,
	database: conf.database
});

connection.connect();

// 이메일 중복 로직
const existUserEmail = (req, res) => {
	// url로 받아온 유저이메일
	const useremail = req.params.useremail;
	// 유저 이메일 중복 검사
	connection.query(`SELECT * FROM nyang_member WHERE email='${useremail}'`, (err,rows) => {
		if(err) {
			res.send('error')
		}else {
			// useremail 검색한 결과가 1개라도 나오면 true 보낸다
			// true : 중복있음
			// false : 중복없음
			res.send(rows.length === 1)
		}
	})
}

// 메일 중복 체크
router.get('/user/exists/email/:useremail', existUserEmail);

router.post("/join", (req, res) => {
	const body = req.body;
	console.log('test', body);
	const memberMail = body.email;
	const memberPass = body.password;
	const passwordHash = hash.sha256().update(memberPass).digest('hex');
	const signupdate = moment().format('YYYYMMDD');
	const certify = false
	const tokenUnique = moment().format()
	const emailToken = hash.sha256().update(`${memberMail}+${tokenUnique}`).digest('hex')
	const emailLink = `http://localhost:8080/welcome?email=${memberMail}&token=${emailToken}`;

	// 메일 발송 params
	let mailSenderOption = {
		toEmail: memberMail,
		subject: '냥터레스트 회원가입을 위한 이메일 인증을 부탁드립니다.',
		text: `안녕하세요 회원가입을 축하드립니다. ${emailLink} 해당 링크로 접속해주시면 인증이 완료되어 냥터레스트에 로그인하실 수 있습니다.`,
	}

	// 회원 가입 처리 query 
	connection.query(`SELECT * FROM nyang_member WHERE email='${memberMail}'`, (err, rows, fields) => {
		// 가입 이메일 중복 처리
		if (rows[0] !== undefined) {
			// 가입된 이메일이 있을때
			console.log('가입된 이메일이 있음, 회원가입 불가')

			// 이메일 중복 여부 front로 전송
			res.send(
				{ emailOverlapping: true }
			)
		} else {
			// 가입된 이메일이 없을때
			console.log('가입된 이메일이 없음, 회원가입 가능')

			// 회언 정보 DB저장
			const sql = "INSERT INTO `nyang_member` (`email`, `password`, `signupdate`, `certify`, `token`) VALUES ( ?,?,?,?,? )"
			const params = [memberMail, passwordHash, signupdate, certify, emailToken]
			
			// 가입된 이메일 없을때 query 처리
			connection.query(sql, params, (err, rows, fields) => {
				if (err) {
					console.log(err);
				} else {
					console.log(rows);
				}
			});

			// 회원가입 인증 메일 발송
			mailSender.sendGmail(mailSenderOption);

			// 이메일 중복 여부 front로 전송
			res.send({
				emailOverlapping: false
			})
		}
	})
});

// 회원가입 완료
router.get("/welcome", (req, res) => {
	// 인증메일 인증작업
	// 1. 쿼리로 가져온 이메일로 디비의 row를 뽑아온다
	// 2. 토큰과 db토큰 비교
	// 3. 비교 후 토큰이 맞으면 인증컬럼 변경

	const certifyInfo = {
		email: req.query.email,
		token: req.query.token
	}

	connection.query(`SELECT * FROM nyang_member WHERE email='${certifyInfo.email}'`, (err, rows, fields) => {
		// 회원가입시 저장된 토큰 가져오기
		const dbToken = rows[0].token

		// 메일로 받은 토큰과 db토큰 비교 && 인증상태가 false일때
		if (dbToken === certifyInfo.token && rows[0].certify === 0) {
			res.sendFile(path.join(__dirname + '/welcome.html'))
			connection.query(`UPDATE nyang_member SET certify=true WHERE token='${dbToken}'`)
		} else {
			// 인증상태가 true일때
			res.sendFile(path.join(__dirname + '/welcome2.html'))
		}
	})
});

module.exports = router;