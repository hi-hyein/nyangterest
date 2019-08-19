const fs = require("fs");
const moment = require("moment");
const express = require("express");
const path = require("path");
const router = express.Router();
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
const PORT = 8080;
const hash = require('hash.js');
const nodemailer = require('nodemailer');

router.get("/page/:numOfRows/:id/", (req, res) => {
	const bgnde = moment()
		.subtract(3, "month")
		.format("YYYYMMDD");
	const endde = moment().format("YYYYMMDD");
	const numOfRows = req.params.numOfRows;
	const pageNo = req.params.id;
	const serviceKey = `P3gvH0LsdoPkxFnZU2Ee98hGDDEwVTJndJFa8NDUhznSLlZG6OOxBopFWLBmiCPOfWXsF8Wz8LFHJguz41qJvA%3D%3D&`;

	const url = `http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?serviceKey=${serviceKey}_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&state=notice&numOfRows=${numOfRows}&pageNo=${pageNo}`;
	fetch(url)
		.then(response => response.json())
		.then(json => {
			res.send(json.response.body);
			console.log("key:" + req.params.id);
			console.log("key2:" + req.params.numOfRows);
			console.log(json.response.body.pageNo);
			console.log("today:" + endde);
			console.log("3month:" + bgnde);
		})
		.catch(() => {
			res.send(JSON.stringify({ message: "System Error" }));
		});
});

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

app.get("/admin/member", (req, res) => {
	connection.query("SELECT * FROM member", (err, rows, fields) => {
		res.send(rows);
		// console.log(rows.id);
	});
});


const emailToken = hash.sha256().update('nyangterest').digest('hex')

router.post("/", (req, res) => {
	const body = req.body;
	console.log('test',body);
	const memberMail = body.email;
	const memberPass = body.password;
	const passwordHash = hash.sha256().update(memberPass).digest('hex');
	const signupdate = moment().format('YYYYMMDD');
	const certify = false
	const emailLink = `http://localhost:8080/welcome?email=${memberMail}&token=${emailToken}`;

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'nyangterest@gmail.com',  // gmail 계정 아이디를 입력
			pass: 'sidxjfptmxm!'          // gmail 계정의 비밀번호를 입력
		}
	});

	let mailOptions = {
		from: 'nyangterest@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
		to: memberMail ,                     // 수신 메일 주소
		subject: '냥터레스트 회원가입을 위한 이메일 인증을 부탁드립니다.',   // 제목
		text: `안녕하세요 회원가입을 축하드립니다. ${emailLink} 해당 링크로 접속해주시면 인증이 완료되어 냥터레스트에 로그인하실 수 있습니다.`  // 내용
	};

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		}
		else {
		  console.log('Email sent: ' + info.response);
		}
	  });

	const sql = "INSERT INTO `member` (`email`, `password`, `signupdate`, `certify`) VALUES ( ?,?,?,? )"
	const params = [memberMail, passwordHash, signupdate, certify]
	connection.query(sql,params,(err, rows, fields) => {
		if(err){
		console.log(err);
		} else {
		console.log(rows);
		}
	});
});


router.get("/welcome",(req,res)=>{
	res.sendFile(path.join(__dirname+'/welcome.html'));
	const email = req.query.email;
	console.log(email)
	
});



app.use(express.json());

// // 중첩된 객체표현 허용여부
app.use(express.urlencoded({ extended: false }));

// 정적파일 서비스
app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname);

app.use(cors());
app.use("/", router);
// app.use("/page", router);
// app.use("/admin/member", router);

// // app.get("/", function(req, res, next) {
// // 	res.json({ msg: "This is CORS-enabled for all origins!" });
// // });



app.listen(PORT, function() {
	console.log("enabled web server listening !");
});

module.exports = app;
