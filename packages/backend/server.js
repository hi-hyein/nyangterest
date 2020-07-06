const fs = require("fs");
const express = require("express");
const path = require("path");
const router = express.Router();
const cors = require("cors");
const app = express();
const PORT = 8080;
const login = require('./login');
const memberInfo = require('./memberInfo');
const findAccount = require('./findAccount');
const join = require('./join');
const logger = require('./winston')
const unregister = require('./unregister')
const dotenv = require('dotenv')

const ArrayObject = require('./Array');
Array.prototype.ToTwoDimensionalArray = ArrayObject.ToTwoDimensionalArray;

const filterObject = require('./Filter');

const abandonmentPublicOpenAPIModule = require('./classes/abandonmentPublicOpenAPI');
const KindOpenAPIModule = require('./classes/KindOpenAPI');

dotenv.config({ path: path.join(__dirname, './.env') })

const doAsync = fn => async (req, res, next) => await fn(req, res, next).catch(next);

// 기본주소
router.get("/page/:bgnde/:endde/:numOfRows/:kind/:searchField", doAsync(async (req, res) => {

	const { bgnde, endde, kind, searchField } = req.params;

	const apiObject = new abandonmentPublicOpenAPIModule.abandonmentPublicOpenAPI(bgnde, endde, kind);
	const defaultRes = await apiObject.request;
	//console.log(defaultRes);

	let defaultItem = defaultRes.items.item || []

	if (typeof defaultItem === 'undefined') defaultItem = defaultRes.items

	const filteredItems = await filterObject.filter(defaultItem, searchField)

	let selectItems = searchField === "keyword" ? defaultItem : filteredItems;

	let typeItems = (Array.isArray(selectItems)) ? selectItems : [selectItems];

	let items = typeItems.ToTwoDimensionalArray(100);

	if (items.length === 0) items = [[]]

	let arrRes = { items }

	res.json(arrRes)

}))


// 품종
router.get("/search/kind", async (req, res) => {
	let response = await new KindOpenAPIModule.KindOpenAPI().request;
	//console.log(response);
	res.send(response.items);
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
	connection.query("SELECT * FROM nyang_member", (error, rows, fields) => {
		if (error) {
			console.log(error.stack);
		}
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
app.use("/admin/member", router);

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

if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, () => {
		logger.info("enabled web server listening !");
		// console.log("enabled web server listening !");
	});
}

module.exports = {
	app: app,
	filterArr: filterObject.filter
}
