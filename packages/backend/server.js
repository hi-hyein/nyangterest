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

const serviceKey = `P3gvH0LsdoPkxFnZU2Ee98hGDDEwVTJndJFa8NDUhznSLlZG6OOxBopFWLBmiCPOfWXsF8Wz8LFHJguz41qJvA%3D%3D&`;
const api = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc';
// 기본주소

router.get("/page/:numOfRows/:id/", (req, res) => {
	const bgnde = moment()
		.subtract(3, "month")
		.format("YYYYMMDD");
	const endde = moment().format("YYYYMMDD");
	const numOfRows = req.params.numOfRows;
	const pageNo = req.params.id;
	const url = `${api}/abandonmentPublic?serviceKey=${serviceKey}_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${numOfRows}&pageNo=${pageNo}`;

	fetch(url)
		.then(response => response.json())
		.then(json => {
			res.send(json.response.body);
			// console.log(json.response.body)
			console.log("key:" + req.params.id);
			console.log("key2:" + req.params.numOfRows);
			console.log("today:" + endde);
			console.log("3month:" + bgnde);
		})
		.catch(() => {
			res.send(JSON.stringify({ message: "System Error" }));
		});
});

// 검색

// 상태
router.get("/search/:state/", (req, res) => {
	const state = req.params.state;
	let url = `${api}/abandonmentPublic?serviceKey=${serviceKey}_type=json&state=${state}`;

	fetch(url)
		.then(response => response.json())
		.then(json => {
			res.send(json.response.body);
			// console.log(json.response.body)
			console.log("key:" + req.params.state);

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
	console.log('test', body);
	const memberMail = body.email;
	const memberPass = body.password;
	const passwordHash = hash.sha256().update(memberPass).digest('hex');
	const signupdate = moment().format('YYYYMMDD');
	const emailLink = `http://localhost:3000/welcome?email=${memberMail}&token=${emailToken}`;

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
		subject: 'Sending Email using Node.js',   // 제목
		text: `안녕하세요 회원가입을 축하드립니다. ${emailLink} 해당 링크로 접속해주세요. 그러면 회원가입이 완료됩니다.`  // 내용
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		}
		else {
			console.log('Email sent: ' + info.response);
		}
	});
});


router.post("/welcome", (req, res) => {
	const body = req.body
	const email = body.email
	const token = body.token
	console.log(email, token)
	// 디비에 저장된 이메일주소와 회원이입력한 이메일주소 비교
	// 토큰주소 비교하고
	// 디비에 정보저장하고
	// certify 컬럼 true로 변경
	console.log(memberMail);
	console.log(token, emailToken);
	if (memberMail === email && emailToken === token) {
		console.log("같아")
		// 패스워드 암호화하여 저장하기 
		// 암호화 함수는 SHA-256를 일단 사용할 것!(주로권장)
		const sql = "INSERT INTO `member` (`email`, `password`, `signupdate`) VALUES ( ?,?,? )";
		const params = [memberMail, passwordHash, signupdate]

		connection.query(sql, params, (err, rows, fields) => {
			if (err) {
				console.log(err);
			} else {
				console.log(rows);
			}
		});
	} else {
		console.log("x")
	}
});



app.use(express.json());

// // 중첩된 객체표현 허용여부
app.use(express.urlencoded({ extended: false }));

// 정적파일 서비스
app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname);

app.use(cors());
app.use("/", router);
app.use("/search", router);
// app.use("/admin/member", router);




app.listen(PORT, function () {
	console.log("enabled web server listening !");
});

module.exports = app;
