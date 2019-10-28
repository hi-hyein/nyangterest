const fs = require("fs");
const express = require("express");
const router = express.Router();
const hash = require('hash.js');

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

router.post("/memberInfo", (req, res) => {
	const memberData = req.body.email
	console.log("회원정보이메일",memberData)
	connection.query(`SELECT * FROM member WHERE email="${memberData}"`, (err, rows, fields) => {
		res.json({
			_username : rows[0].username,
			_signupDate : rows[0].signupDate
		})
	})
});

router.post("/modifyMemberInfo", (req,res) => {
	const modifyName = req.body.modifyName
	const userEmail = req.body.userEmail
	const userModifyPassword = hash.sha256().update(req.body.modifyPassword).digest('hex')

	// 수정된 이름이 있을 떄 
	if(modifyName.length > 0) {
		console.log("수정된이름",modifyName)
		console.log("유저이메일",userEmail)
		connection.query(`UPDATE member SET username="${modifyName}" WHERE email="${userEmail}"`,(err,rows,filed)=>{
			
			if(err){
				// 수정실패 알려주기
				res.json({
					modifyState: false
				})
				console.log(err)
			}else {
				// 수정완료 알려주기
				res.json({
					modifyState: true
				})
			}
		})
	}else {
		console.log("수정된 이름이 없습니다.")
	}

	// 비밀번호 수정
	if(userModifyPassword!==undefined){
		connection.query(`UPDATE member SET password="${userModifyPassword}" WHERE email="${userEmail}"`,(err,rows,filed)=>{
			if(err){
				// 수정실패 알려주기
				res.json({
					modifyState: false
				})
				console.log(err)
			}else {
				// 수정완료 알려주기
				res.json({
					modifyState: true
				})
			}
		})
	}else{
		console.log("수정된 비밀번호가 없습니다.")
	}
})

module.exports = router;