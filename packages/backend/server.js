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
const login = require('./login');
const memberInfo = require('./memberInfo');

const serviceKey = `P3gvH0LsdoPkxFnZU2Ee98hGDDEwVTJndJFa8NDUhznSLlZG6OOxBopFWLBmiCPOfWXsF8Wz8LFHJguz41qJvA%3D%3D`;
const api = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc';

// 기본주소

router.get("/page/:bgnde/:endde/:numOfRows/:id/", (req, res) => {

	const { bgnde, endde, numOfRows, id } = req.params;
	const url = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${numOfRows}&pageNo=${id}`;

	fetch(url)
		.then(response => response.json())
		.then(json => {
			res.send(json.response.body);
			console.log(bgnde, endde, json.response.body.totalCount);
		})
		.catch(() => {
			res.send(JSON.stringify({ message: "System Error" }));
		});
});

// 기본주소

// post방식
// router.post("/page/", (req, res) => {
// 	const body = req.body;
// 	const bgnde = body.bgnde || null;
// 	const endde = body.endde || null;
// 	const numOfRows = body.numOfRows;
// 	const pageNo = body.pageNo;

// 	const url = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${numOfRows}&pageNo=${pageNo}`;

// 	fetch(url)
// 		// .then(res.send(body))
// 		.then(console.log(body, url))
// 		.then(response => response.json())
// 		.then(json => {
// 			res.send(json.response.body)
// 			console.log(bgnde, endde, json.response.body.totalCount)
// 		})
// 		.catch(() => {
// 			res.send(JSON.stringify({ message: "System Error" }));
// 		});

// });

// 품종

router.get("/search/kind", (req, res) => {
	const url = `${api}/kind?ServiceKey=${serviceKey}&_type=json&up_kind_cd=422400`;

	fetch(url)
		.then(response => response.json())
		.then(json => {
			res.send(json.response.body.items);
			// console.log(json.response.body.items)

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

// 회원가입
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
		// 가입 이메일 중복 처리
		if (rows[0] !== undefined) {
			// 가입된 이메일이 있을때
			console.log('있으니까 안돼')
			res.send(
				{ emailOverlapping: true }
			)
		} else {
			// 가입된 이메일 존재
			console.log('아이디없을때', rows)
			console.log('없으니까 가입가능')

			// 회언 정보 DB저장
			const sql = "INSERT INTO `member` (`email`, `password`, `signupdate`, `certify`, `token`) VALUES ( ?,?,?,?,? )"
			const params = [memberMail, passwordHash, signupdate, certify, emailToken]
			connection.query(sql, params, (err, rows, fields) => {
				if (err) {
					console.log(err);
				} else {
					console.log(rows);
				}
			});

			// 가입인증메일 보내기
			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error);
				}
				else {
					console.log('Email sent: ' + info.response);
				}
			});

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

	connection.query(`SELECT * FROM member WHERE email='${certifyInfo.email}'`, (err, rows, fields) => {
		// 회원가입시 저장된 토큰 가져오기
		const dbToken = rows[0].token

		// 메일로 받은 토큰과 db토큰 비교 && 인증상태가 false일때
		if (dbToken === certifyInfo.token && rows[0].certify === 0) {
			res.sendFile(path.join(__dirname + '/welcome.html'))
			connection.query(`UPDATE member SET certify=true WHERE token='${dbToken}'`)
		} else {
			// 인증상태가 true일때
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

// 로그인 미들웨어
app.use("/", login);
// 회원정보 수정 미들웨어
app.use("/", memberInfo);

app.listen(PORT, function () {
	console.log("enabled web server listening !");
});

module.exports = app;
