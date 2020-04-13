const fs = require("fs");
const express = require("express");
const path = require("path");
const router = express.Router();
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
const PORT = 8080;
const logger = require('./winston')

require('dotenv').config()

const serviceKey = process.env.SERVICE_KEY;

const api = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc';


const doAsync = fn => async (req, res, next) => await fn(req, res, next).catch(next);

async function err() {
	throw new Error('에러 발생');
}

// 기본주소


router.get("/page/:bgnde/:endde/:numOfRows/:kind", doAsync(async (req, res) => {

	const getData = async (url) => {
		try {
			const response = await fetch(url);
			const json = await response.json();
			const body = await json.response.body;
			return body;

		} catch (error) {
			console.log(error);
		}
	};

	const { bgnde, endde, numOfRows, id, kind } = req.params;


	// 기본 url

	const baseUrl = `${api}/abandonmentPublic?ServiceKey=${serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&numOfRows=1000&upkind=422400&kind=`;

	const kindParam = `${kind}`

	const KINDENUM = kind === "000116";

	let url = (KINDENUM) ? `${baseUrl}` : `${baseUrl}${kindParam}`;

	const defaultRes = await getData(url)

	res.json(defaultRes)


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



app.use(express.json());

// // 중첩된 객체표현 허용여부
app.use(express.urlencoded({ extended: false }));

// 정적파일 서비스
app.use(express.static(path.join(__dirname, "public")));
// console.log(__dirname);

app.use(cors());
app.use("/", router);

// app.listen(PORT, function () {
// 	logger.info("enabled web server listening !");
// 	// console.log("enabled web server listening !");
// });

module.exports = app;
