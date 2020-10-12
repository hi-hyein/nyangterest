const fs = require("fs");
const express = require("express");
const path = require("path");
const router = express.Router();
const moment = require("moment");
const mailSender = require("./mailSender.js");
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv");

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

// 이메일 중복 로직
const existUserEmail = (req, res) => {
    // url로 받아온 유저이메일
    const useremail = req.params.useremail;
    // default value = null
    const snsName = req.params.snsName || null;

    // 유저 이메일 중복 검사
    connection.query(
        `SELECT * FROM nyang_member WHERE email='${useremail}'`,
        (err, rows) => {
            if (err) {
                res.send("error");
            } else {
                // 같은 이메일 주소를 갖고있는 rows(array)를 가져와 params로 받은 snsName로 filtering하여 조건에 해당되는 배열을 return 한다.
                // 해당 배열의 length가 0 보다 크면 중복이 있기때문에 true return
                // true = 계정 있음 , false = 계정 없음
                // 가입이 가능한 경우 (false return)
                // 1. rows가 없는 경우
                // 2. snsName과 일치하는 배열이 없는 경우
                const isExist =
                    rows.length > 0 ||
                    rows.filter(function (item) {
                        return item.snsName === snsName;
                    }).length > 0;

                res.send(isExist);
            }
        }
    );
};
// 회원등록
const resistUser = async (req, res) => {
    const resistUserInfo = {
        email: req.body.email,
        password: req.body.password ? await bcryptjs.hash(req.body.password, 10) : null,
        signupdate: moment().format("YYYYMMDD"),
        certify: req.body.certify || false,
        emailToken: await bcryptjs.hash(EMAIL_CERTIFY_KEY, 10),
        snsName: req.body.snsName || null
    };

    const emailLink = `http://localhost:8080/user/join/welcome?email=${resistUserInfo.email}&token=${resistUserInfo.emailToken}`;

    // 메일 발송 params
    let mailSenderOption = {
        toEmail: resistUserInfo.email,
        subject: "냥터레스트 회원가입을 위한 이메일 인증을 부탁드립니다.",
        text: `안녕하세요 회원가입을 축하드립니다. ${emailLink} 해당 링크로 접속해주시면 인증이 완료되어 냥터레스트에 로그인하실 수 있습니다.`,
    };

    // 회원 가입 처리 query
    // 회언 정보 DB저장
    const sql =
        "INSERT INTO `nyang_member` (`email`, `password`, `signupdate`, `certify`, `token`, `snsName`) VALUES ( ?,?,?,?,?,? )";
    const params = ((resistUserInfo) => {
        let resistUserInfoArray = [];
        for (items in resistUserInfo) {
            resistUserInfoArray.push(resistUserInfo[items]);
        }

        return resistUserInfoArray;
    })(resistUserInfo);

    connection.query(sql, params, (err, rows) => {
        if (err) {
            console.log("회원가입 실패", err);
            res.send(false);
        } else {
            if(resistUserInfo.snsName === null) {
                 // 회원가입 인증 메일 발송
                mailSender.sendGmail(mailSenderOption);
                // 회원가입 성공 여부 front로 보내기
                res.send(true);
            }
            // 회원가입 성공 여부 front로 보내기
            res.send(true);
        }
    });
};

router.get("/user/exists/email/:useremail", existUserEmail);
router.post("/user/join", resistUser);

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
