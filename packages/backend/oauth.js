"use strict";

const fs = require("fs");
const express = require("express");
const router = express.Router();
const path = require("path");
const passport = require("passport");
// const session = require("express-session");
// const FileStore = require("session-file-store")(session);
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, './.env') })

// db접속
const data = fs.readFileSync(__dirname + "/db.json");
const conf = JSON.parse(data);
const mysql = require("mysql");
const { default: fetch } = require("node-fetch");

// 환경설정 연결 초기화
const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
});

connection.connect();

// router.use(
//     session({
//         name: "nyangterest_session",
//         secure: true,
//         secret: "abcde",
//         resave: false,
//         saveUninitialized: true,
//         store: new FileStore(),
//         cookie: { secure: true },
//     })
// ); // 세션 활성화

// router.use(passport.initialize()); // passport 구동
// router.use(passport.session()); // 세션 연결

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

// strategy 구성
// google
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async function (accessToken, refreshToken, profile, done) {
            console.log("profile:", profile);

            // profile이 있다면 (인증에 성공해 회원정보가 넘어옴)
            if (profile) {
                const response = await fetch(
                    // 소셜 서비스 정보도 같이 보내야됨
                    // post요청으로 json객체에 담아 보내기
                    // `/user/exists/email/${profile._json.email}/${profile.provider}`
                    `/user/exists/email/${profile._json.email}/`
                );
                const json = await response.json();
            
                // 이메일이 중복된다면
                if (json) {
                    // 로그인 처리 예시
                    // const response = await fetch(
                    //     '/login'
                    // ,{
                    //     headers: {
                    //     Accept: "application/json",
                    //     "Content-Type": "application/json",
                    //     },
                    //     method: "POST",
                    //     body: sendAccountInfo,
                    // });
                    // const json = await response.json();
                }
            
                // else 회원가입 처리 예시
                const joinData = {
                    email: profile._json.email,
                    snsName: profile.provider,
                    // email: 'henyy1004@naver.com',
                    // snsName: 'google',
                    password: null,
                    certify: true,
                }
                const joinResponse = await fetch(
                    '/user/join'
                ,{
                    headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(joinData), 
                });
                const joinJson = await joinResponse.json();

                if(!joinJson) {
                    return done(null);
                }
                
                return done(null, profile);
            }
            
            return done(null);
        }
    )
);

router.get(
    "/google",
    passport.authenticate("google", {
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
        accessType: "offline",
        prompt: "select_account",
    }),
    function (req, res) {
        console.log("1. req /google:", req, "req end");
    }
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:3000/join/welcome/1234",
        session: false,
    }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect("http://localhost:3000/");
    }
);

module.exports = router;
