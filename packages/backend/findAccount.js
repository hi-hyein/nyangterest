const fs = require("fs");
const express = require("express");
const router = express.Router();
const hash = require("hash.js");
const path = require("path");
const mailSender = require("./mailSender.js");

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

//비밀번호찾기
router.post("/password/find", (req, res) => {
    console.log("비밀번호찾기", req.body);
    const userEmail = req.body.email;

    // DB에서 비교
    connection.query(
        `SELECT * FROM nyang_member WHERE email='${userEmail}'`,
        (err, rows, fields) => {
            if (err) {
                console.log("에러", err);
                res.json({
                    emailMatch: false,
                });
            } else {
                if (!rows[0]) {
                    console.log("비밀번호찾기 : 이메일 없음");
                    res.json({
                        emailMatch: false,
                    });
                } else {
                    console.log("비밀번호찾기 : 이메일 있음");

                    let radomToken = hash
                        .sha256()
                        .update(userEmail + Math.random() * 1)
                        .digest("hex");

                    connection.query(
                        `UPDATE nyang_member SET token='${radomToken}' WHERE email='${userEmail}'`,
                        (err) => {
                            if (err) {
                                console.log("에러", err);
                            } else {
                                console.log("토큰UPDATE");
                            }
                        }
                    );

                    let mailSenderOption = {
                        toEmail: userEmail, // 수신 메일 주소
                        subject: "냥터레스트 비밀번호를 재설정해주세요.", // 제목
                        text: `http://localhost:8080/account/password/modify?&token=${radomToken} 해당 링로 접속하여 비밀번호를 재설정해주세요.`, // 내용
                    };

                    // 비밀번호 재설정 이메일 전송
                    mailSender.sendGmail(mailSenderOption);

                    res.json({
                        emailMatch: true,
                    });
                }
            }
        }
    );
});

// 비밀번호수정 get,post동시에..해도되나?
router.get("/password/modify", (req, res) => {
    res.sendFile(path.join(__dirname + "/password.html"));
});

router.post("/password/modify", (req, res) => {
    const token = req.body.modifyToken;
    const password = hash.sha256().update(req.body.password).digest("hex");

    connection.query(
        `UPDATE nyang_member SET password='${password}' WHERE token='${token}'`,
        (err, rows) => {
            if (err) {
                console.log("비밀번호찾기 비번 업데이트 에러", err);
                res.json({
                    passwordUpdate: false,
                });
            } else {
                console.log("비밀번호찾기 비번 업데이트 성공");
                res.json({
                    passwordUpdate: true,
                });
            }
        }
    );
});

module.exports = router;
