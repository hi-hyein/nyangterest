
const fs = require("fs");
const express = require("express");
const router = express.Router();
const passport = require('passport');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

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
``
connection.connect();

router.use(session({name: 'nyangterest_session', secure: true, secret: 'abcde', resave: false, saveUninitialized: true, store: new FileStore(), cookie: {secure: true}})); // 세션 활성화
router.use(passport.initialize()); // passport 구동
router.use(passport.session()); // 세션 연결

router.get('/:userId', (req, res) => {
    const {userId} =  req.params;
    console.log(userId)
    const sql = `DELETE FROM nyang_member WHERE email="${userId}"`

    connection.query(sql, function (err, rows, fields) {
        if (err){
          res.send({
            unregisterState : false
          })
        }
        else{
          req.logout();//passportjs에 있는 기능
          res.send({
            unregisterState : true
          })
        }
    });
});


module.exports = router;