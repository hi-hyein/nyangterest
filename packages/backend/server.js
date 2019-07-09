const fs = require("fs");
const moment = require("moment");
const express = require("express");
const path = require("path");
const router = express.Router();
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
const PORT = 8080;
const hash = require('hash.js')

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

router.post("/", (req, res) => {
	const body = req.body;
	console.log('test',body);

	const email = body.email;
	const password = body.password;
	const passwordHash = hash.sha256().update(password).digest('hex');
	const signupdate = moment().format('YYYYMMDD');

	// 패스워드 암호화하여 저장하기 
	// 암호화 함수는 SHA-256를 일단 사용할 것!(주로권장)
	const sql = "INSERT INTO member (email,password,signupdate)";
	const params = [email, passwordHash, signupdate]

	connection.query(sql,params,(err, rows, fields) => {
		if(err){
		console.log(err);
		} else {
		console.log(rows);
		}
	});
	// const sql = 'INSERT INTO member (email, password, signupdate) VALUES(?, ?, ?)';
	// var params = [email, passwordHash, signupdate];
	// connection.query(sql, params, function(err, rows, fields){
	// 	if(err){
	// 		console.log(err);
	// 	} else {
	// 		console.log(rows);
	// 	}
	// });
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
