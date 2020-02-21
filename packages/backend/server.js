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
const unregister = require('./unregister')

require('dotenv').config()

const serviceKey = process.env.SERVICE_KEY;

const api = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc';

// 기본주소


// 날짜 선택시
// router.get("/search/:bgnde/:endde/:numOfRows/:id/", async (req, res) => {

// 	const { bgnde, endde, numOfRows, id } = req.params;
// 	const url = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${numOfRows}&pageNo=${id}`;

// 	const response = await fetch(url);
// 	const json = await response.json();
// 	const totalCount = json.response.body.totalCount
// 	const searchUrl = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${totalCount}&pageNo=${id}`;

// 	const searchRes = await fetch(searchUrl);
// 	const searchJson = await searchRes.json();
// 	const searchList = searchJson.response.body;

// 	res.send(searchList);

// });

const doAsync = fn => async (req, res, next) => await fn(req, res, next).catch(next);


async function err() {
	throw new Error('에러 발생');
}

router.get("/page/:bgnde/:endde/:kind/:numOfRows/:id/", doAsync(async (req, res) => {

	// totalCount의 값을 확인하기 위한 api 호출

	const { bgnde, endde, numOfRows, id } = req.params;
	const url = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${numOfRows}&pageNo=${id}`;
	const response = await fetch(url);
	const json = await response.json();
	const totalCount = json.response.body.totalCount

	// totalCount만큼 전체데이터를 가져오는 api 호출

	const allUrl = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&numOfRows=${totalCount}&pageNo=${id}`;
	const allRes = await fetch(allUrl);
	const allJson = await allRes.json();

	// (option) fiter parameter대로 filter 로직 구현

	const kindUrl = `${api}/kind?ServiceKey=${serviceKey}&_type=json&up_kind_cd=422400`;
	const kindRes = await fetch(kindUrl);
	const kindJson = await kindRes.json();
	const kind = kindJson.response.body.items.item[0].kindCd
	// console.log(kind)

	const completeUrl = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&kindCd=${kind}&numOfRows=${totalCount}&pageNo=${id}`;
	console.log(kind)

	const completeRes = await fetch(completeUrl);
	const completeJson = await completeRes.json();
	const completeItems = completeJson.response.body.items;
	const completeList = completeJson.response.body;

	const strObj = {

		"F": "암컷",
		"M": "수컷",
		"Q": "성별 미상",
		"Y": "중성화O",
		"N": "중성화X",
		"U": "중성화 미상",
		"한국 고양이": "코리안숏헤어"
	}

	// let re = new RegExp(Object.keys(strObj).join("|"), "gi");
	const filteredItems = Array.from(completeItems).filter(item => item.kindCd.includes(kind))

	// {
	// 	// let regExp = /[()]/gi;
	// 	// let searchKeyword = searchField.toUpperCase().trim()
	// 	return (item

	// 		// 	&& Object.keys(item).some(
	// 		// 		key =>
	// 		// 			typeof item[key] === "string" &&
	// 		// 			item[key].replace(re, (matched => {
	// 		// 				return strObj[matched]
	// 		// 			})).replace(regExp, "").toUpperCase().includes(searchKeyword)

	// 		// 		, console.log(selectedCategory)
	// 		// 	)
	// 	)


	// })

	const filterUrl = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&upkind=422400&kindCd=${kind}&numOfRows=${totalCount}&pageNo=${id}`;

	const filterRes = await fetch(filterUrl);
	const filterJson = await filterRes.json();

	const filterList = filterJson.response.body;

	console.log(filterUrl)

	console.log(filteredItems)
	// filterList에서 numOfRow에 해당하는 72개의 데이터를 return

	res.send(completeList);

}))

// 품종
router.get("/search/kind", (req, res) => {
	const url = `${api}/kind?ServiceKey=${serviceKey}&_type=json&up_kind_cd=422400`;

	fetch(url)
		.then(response => response.json())
		.then(json => {
			res.send(json.response.body.items);
			// console.log(json.response.body.items.item[0].kindCd)

		})
		.catch(() => {
			res.send(JSON.stringify({ message: "System Error" }));
		});
})

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
// 회원탈퇴
app.use("/unregister", unregister);

app.listen(PORT, function () {
	logger.info("enabled web server listening !");
	// console.log("enabled web server listening !");
});

module.exports = app;
