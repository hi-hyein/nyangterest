const express = require("express");
const path = require("path");
const router = express.Router();
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
const PORT = 8080;

router.get("/", (req, res) => {
	// res.send("Hello");
	fetch(
		"http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=20140301&endde=20140430&pageNo=1&numOfRows=10&ServiceKey=P3gvH0LsdoPkxFnZU2Ee98hGDDEwVTJndJFa8NDUhznSLlZG6OOxBopFWLBmiCPOfWXsF8Wz8LFHJguz41qJvA%3D%3D&_type=json"
	)
		.then(response => response.json())
		.then(json => {
			res.send(json);
		})
		.catch(() => {
			res.send(JSON.stringify({ message: "System Error" }));
		});
});

app.use(express.json());

// 중첩된 객체표현 허용여부
app.use(express.urlencoded({ extended: false }));

// 정적파일 서비스
app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname);

app.use(cors());
app.use("/", router);

module.exports = app;

// app.get("/", function(req, res, next) {
// 	res.json({ msg: "This is CORS-enabled for all origins!" });
// });

app.listen(PORT, function() {
	console.log("enabled web server listening !");
});

module.exports = app;
