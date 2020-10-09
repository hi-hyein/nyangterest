"use strict";

const fs = require("fs");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const session = require("express-session");
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
