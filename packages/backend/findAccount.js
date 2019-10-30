const fs = require("fs");
const express = require("express");
const router = express.Router();
const hash = require('hash.js');
const nodemailer = require('nodemailer');

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

const sendMailer = (...arg)=>{
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'nyangterest@gmail.com',  // gmail 계정 아이디를 입력
			pass: 'sidxjfptmxm!'          // gmail 계정의 비밀번호를 입력
		}
	});

	let mailOptions = {
		from: 'nyangterest@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
		to: memberMail,                     // 수신 메일 주소
		subject: '냥터레스트 회원가입을 위한 이메일 인증을 부탁드립니다.',   // 제목
		text: `안녕하세요 회원가입을 축하드립니다. ${tempPassword} 해당 링로 접속해주시면 인증이 완료되어 냥터레스트에 로그인하실 수 있습니다.`  // 내용
	};

	// 가입인증메일 보내기
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		}
		else {
			console.log('Email sent: ' + info.response);
		}
	});
}

//비밀번호찾기
router.post("/findPassword",(req, res)=>{
	console.log("비밀번호찾기",req.body)
	const userEmail = req.body.email
	let randomPassword = ""

	// DB에서 비교
	connection.query(`SELECT * FROM member WHERE email="${userEmail}"`, (err, rows, fields) => {
		if(rows[0].email!==userEmail){
			console.log("비밀번호찾기 : 이메일 없음")
			res.json({
				emailMatch: false
			})
		}else {
			console.log("비밀번호찾기 : 이메일 있음")
			res.json({
				emailMatch:  true
			})

			// 임시비밀번호 메일 보내기
			// 6자리 임시숫자만들기
			tempPassword = (Math.floor(Math.random() * 1000000)+100000).toString()
			console.log("임시비번",tempPassword)
			// 임시비번 암호화
			const tempPassHash = hash.sha256().update(tempPassword).digest('hex')
			// 임시비번 db저장
			connection.query(`UPDATE member SET password="${tempPassHash}" WHERE email="${userEmail}"`)

		}
	})
})

module.exports = router;