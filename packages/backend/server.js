const express = require("express");
const path = require("path");
const router = express.Router();
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
const PORT = 8080;

router.get("/page/:numOfRows/:id/", (req, res) => {
	const numOfRows = req.params.numOfRows;
	const pageNo = req.params.id;

	const url = `http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?serviceKey=P3gvH0LsdoPkxFnZU2Ee98hGDDEwVTJndJFa8NDUhznSLlZG6OOxBopFWLBmiCPOfWXsF8Wz8LFHJguz41qJvA%3D%3D&_type=json&bgnde=20170101&endde=20190531&upkind=422400&state=notice&numOfRows=${numOfRows}&pageNo=${pageNo}`;
	fetch(url)
		.then(response => response.json())
		.then(json => {
			res.send(json.response.body);
			console.log("key:" + req.params.id);
			console.log("key2:" + req.params.numOfRows);
			console.log(json.response.body.pageNo);
		})
		.catch(() => {
			res.send(JSON.stringify({ message: "System Error" }));
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
app.use("/page", router);

// // app.get("/", function(req, res, next) {
// // 	res.json({ msg: "This is CORS-enabled for all origins!" });
// // });

app.listen(PORT, function() {
	console.log("enabled web server listening !");
});

module.exports = app;
