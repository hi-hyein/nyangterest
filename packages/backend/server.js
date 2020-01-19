const fs = require("fs");
const express = require("express");
const path = require("path");
const router = express.Router();
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
const PORT = 8080;
const login = require('./login');
const memberInfo = require('./memberInfo');
const findAccount = require('./findAccount');
const join = require('./join');
const logger = require('./winston')

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
router.post("/page/", (req, res) => {
	const body = req.body;
	const bgnde = body.bgnde || null;
	const endde = body.endde || null;
	const numOfRows = body.totalCount;
	const pageNo = body.pageNo;

	const url = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${numOfRows}&pageNo=${pageNo}`;

	fetch(url)
		// .then(res.send(body))
		.then(console.log(body, url))
		.then(response => response.json())
		.then(json => {
			res.send(json.response.body)
			console.log(bgnde, endde, json.response.body.totalCount)
			const totalCount = json.response.body.totalCount
			// if (numOfRows >= this.totalCount) {
			// 	return numOfRows;
			// }
			// totalCount = json.response.body.totalCount;
			// return totalCount;
		})
		.catch(() => {
			res.send(JSON.stringify({ message: "System Error" }));
		});

});

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

// 회원가입 미들웨어
app.use("/", join);
// 로그인 미들웨어
app.use("/", login);
// 회원정보 수정 미들웨어
app.use("/", memberInfo);
// 계정찾기 미들웨어
app.use("/account", findAccount);

app.listen(PORT, function () {
	logger.info("enabled web server listening !");
	// console.log("enabled web server listening !");
});

module.exports = app;
