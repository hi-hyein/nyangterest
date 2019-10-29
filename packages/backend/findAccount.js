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

sendMailPassword = () => {
	console.log("메일보냄")
}

//비밀번호찾기
router.post("/findPassword",(req, res)=>{
	console.log("비밀번호찾기",req.body)
	const userEmail = req.body.email

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
			const tempPassword = Math.floor(Math.random() * 1000000)+100000;
			// 임시비번 암호화
			const tempPassHash = hash.sha256().update(tempPassword).digest('hex')
			// 임시비번 db저장
			connection.query(`UPDATE member SET password="${tempPassHash}" WHERE email="${userEmail}"`,()=>{
				let transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: 'nyangterest@gmail.com',  // gmail 계정 아이디를 입력
						pass: 'sidxjfptmxm!'          // gmail 계정의 비밀번호를 입력
					}
				});
			
				let mailOptions = {
					from: 'nyangterest@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
					to: userEmail,                     // 수신 메일 주소
					subject: '냥터레스트 임시비밀번호',   // 제목
					text: `안녕하세요 냥터레스트입니다. 임시비밀번호를 보내드립니다. 꼭 회원정보수정란에서 비밀번호를 변경해주세요. 임시비밀번호 : ${tempPassword}`  // 내용
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
			})
		}
	})
})

module.exports = router;