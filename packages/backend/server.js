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
		.subtract(1, "month")
		.format("YYYYMMDD");
	const endde = moment().format("YYYYMMDD");
	const numOfRows = req.params.numOfRows;
	const pageNo = req.params.id;
	const url = `${api}/abandonmentPublic?ServiceKey=${serviceKey}_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&state=notice&numOfRows=${numOfRows}&pageNo=${pageNo}`;

	fetch(url)
		.then(response => response.json())
		.then(json => {
			res.send(json.response.body);
			// console.log(json.response.body.items)
			// console.log("key:" + req.params.id);
			// console.log("key2:" + req.params.numOfRows);
			// console.log("today:" + endde);
			// console.log("3month:" + bgnde);
		})
		.catch(() => {
			res.send(JSON.stringify({ message: "System Error" }));
		});
});

// 시군구

router.get("/search/sido", (req, res) => {
	const url = `${api}/sido?ServiceKey=${serviceKey}_type=json`;

	fetch(url)
		.then(response => response.json())
		.then(json => {
			res.send(json.response.body.items);
			console.log(json.response.body.items)

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
		to: memberMail,                     // 수신 메일 주소
		subject: '냥터레스트 회원가입을 위한 이메일 인증을 부탁드립니다.',   // 제목
		text: `안녕하세요 회원가입을 축하드립니다. ${emailLink} 해당 링크로 접속해주시면 인증이 완료되어 냥터레스트에 로그인하실 수 있습니다.`  // 내용
	};

	connection.query(`SELECT * FROM member WHERE email='${memberMail}'`, (err, rows, fields) => {
		if (!rows[0] === undefined) {
			res.send(rows)
			console.log(rows)
			console.log('있으니까 안돼!')
		} else {
			console.log('없으니까 가입가능')
			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error);
				}
				else {
					console.log('Email sent: ' + info.response);
				}
			});

			const sql = "INSERT INTO `member` (`email`, `password`, `signupdate`, `certify`) VALUES ( ?,?,?,? )"
			const params = [memberMail, passwordHash, signupdate, certify]
			connection.query(sql, params, (err, rows, fields) => {
				if (err) {
					console.log(err);
				} else {
					console.log(rows);
				}
			});
		}
	})
});


router.get("/welcome", (req, res) => {
	const certifyInfo = {
		email: req.query.email,
		token: req.query.token
	}

	//일단 이메일로만 찾아서 인증 컬럼 변경해보기
	// 할일 - 회원가입할때 가입되어있는 이메일 중복처리하기
	connection.query(`SELECT * FROM member WHERE email='${certifyInfo.email}'`, (err, rows, fields) => {
		if (!rows[0].certify) {
			res.sendFile(path.join(__dirname + '/welcome.html'))
			connection.query(`UPDATE member SET certify=true WHERE email='${certifyInfo.email}'`)
		} else {
			res.sendFile(path.join(__dirname + '/welcome2.html'))
		}
	})
});



app.use(express.json());

// // 중첩된 객체표현 허용여부
app.use(express.urlencoded({ extended: false }));

// 정적파일 서비스
app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname);

app.use(cors());
app.use("/", router);
// app.use("/search", router);
// app.use("/admin/member", router);




app.listen(PORT, function () {
	console.log("enabled web server listening !");
});

module.exports = app;
