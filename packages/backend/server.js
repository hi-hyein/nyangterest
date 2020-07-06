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
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, './.env') })

const doAsync = fn => async (req, res, next) => await fn(req, res, next).catch(next);

// upkind enum
// https://www.data.go.kr/data/15001096/openapi.do
// select to '유기동물 정보를 조회' in select box item
const UPKIND = {
	DOG: 417000,
	CAT: 422400,
	ETC: 429900
};

class OpenAPI {
	#url
	#serviceKey

	constructor() {
		this.#url = "http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc";
		this.#serviceKey = process.env.SERVICE_KEY;
	}

	get Url() {
		return this.#url;
	}

	get serviceKey() {
		return this.#serviceKey;
	}

	get request() {
		return ( async () => {
			let result = {};
			try {
				console.log(this.Url);	// maybe call override method
				const response = await fetch(this.Url);
				const json = await response.json();
				result = await json.response.body;

			} catch (error) {
				console.log(error);
				result = error;
			}
			return result;
		})();
	}
}

class abandonmentPublicOpenAPI extends OpenAPI {
	#abandonmentPublicUrl
	constructor(bgnde, endde, kind) {
		super();
		this.#abandonmentPublicUrl = `${super.Url}/abandonmentPublic?ServiceKey=${super.serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&numOfRows=1000000&upkind=${UPKIND.CAT}`;
		if (kind !== "000116") {
			this.#abandonmentPublicUrl += `&kind=${kind}`;
		}
	}

	get Url() {
		return this.#abandonmentPublicUrl;
	}

	get request() {
		return super.request;
	}
}

class KindOpenAPI extends OpenAPI {
	#kindPublicUrl
	constructor() {
		super();
		this.#kindPublicUrl = `${super.Url}/kind?ServiceKey=${super.serviceKey}&_type=json&up_kind_cd=422400`;
	}

	get Url() {
		return this.#kindPublicUrl;
	}

	get request() {
		return super.request;
	}
}


// 기본주소
router.get("/page/:bgnde/:endde/:numOfRows/:kind/:searchField", doAsync(async (req, res) => {

	const { bgnde, endde, kind, searchField } = req.params;

	const apiObject = new abandonmentPublicOpenAPI(bgnde, endde, kind);
	const defaultRes = await apiObject.request;
	//console.log(defaultRes);

	let defaultItem = defaultRes.items.item || []

	if (typeof defaultItem === 'undefined') defaultItem = defaultRes.items

	const filteredItems = await filterArr(defaultItem, searchField)

	let selectItems = searchField === "keyword" ? defaultItem : filteredItems;

	let typeItems = (Array.isArray(selectItems)) ? selectItems : [selectItems];

	let items = typeItems.addArr(100);

	if (items.length === 0) items = [[]]

	let arrRes = { items }

	res.json(arrRes)

}))


// 품종
router.get("/search/kind", async (req, res) => {
	let response = await new KindOpenAPI().request;
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

const filterArr = async (defaultItem, searchField) => {

	Array.prototype.addArr = n => {
		const arr = this;
		const length = arr.length;
		const count = Math.ceil(length / n);
		const item = [];
		for (let i = 0; i < count; i++) {
			item.push(arr.splice(0, n));
		}
		return item;
	}

	const strObj = {
		"F": "암컷",
		"M": "수컷",
		"Q": "성별 미상",
		"Y": "중성화O",
		"N": "중성화X",
		"U": "중성화 미상",
		"한국 고양이": "코리안숏헤어"
	}

	let defaultValue = Object.values(defaultItem)

	if (typeof defaultValue[0] === 'string') defaultValue = [defaultItem]

	let filteredItems = defaultValue.filter(item => {
		let re = new RegExp(Object.keys(strObj).join("|"), "gi");
		let regExp = /[()]/gi;
		let searchKeyword = searchField.toUpperCase().trim()
		if (typeof item === "object") {
			return (
				Object.keys(item).some(
					key =>
						typeof item[key] === "string" &&
						item[key].replace(re, (matched => {
							return strObj[matched]
						})).replace(regExp, "").toUpperCase().includes(searchKeyword)
				)
			);
		} else {
			return null;
		}

	})

	return filteredItems;

}

module.exports = {
	app: app,
	filterArr: filterArr
}
