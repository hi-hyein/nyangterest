const fs = require("fs");
const express = require("express");
const path = require("path");
const router = express.Router();
const dotenv = require("dotenv");
const _join = require("./join/_join");

// 환경설정 파일에서 이메일 인증 Secret key 가져오기
dotenv.config({ path: path.join(__dirname, "./.env") });
const EMAIL_CERTIFY_KEY = process.env.EMAIL_CERTIFY_KEY;

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
    database: conf.database,
});

connection.connect();

router.post("/user/exists/email", _join.existUserEmail);
router.post("/user/join", _join.resistUser);

// 회원가입 완료
router.get("/user/join/welcome", (req, res) => {
    // 인증메일 인증작업
    // 1. 쿼리로 가져온 이메일로 디비의 row를 뽑아온다
    // 2. 토큰과 db토큰 비교
    // 3. 비교 후 토큰이 맞으면 인증컬럼 변경

    const certifyInfo = {
        email: req.query.email,
        token: req.query.token,
    };

    connection.query(
        `SELECT * FROM nyang_member WHERE email='${certifyInfo.email}'`,
        (err, rows, fields) => {
            // 회원가입시 저장된 토큰 가져오기
            const dbToken = rows[0].token;

            // 메일로 받은 토큰과 db토큰 비교 && 인증상태가 false일때
            if (dbToken === certifyInfo.token && rows[0].certify === 0) {
                res.redirect(
                    `http://127.0.0.1:3000/join/welcome/${certifyInfo.email}`
                );
                connection.query(
                    `UPDATE nyang_member SET certify=true WHERE token='${dbToken}'`
                );
            } else {
                // 인증상태가 true일때
                res.redirect(`http://127.0.0.1:3000/join/welcome/complete`);
            }
        }
    );
});

module.exports = router;
