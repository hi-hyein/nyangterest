const moment = require("moment");
const mailSender = require("../mailSender.js");
const bcryptjs = require("bcryptjs");

// 이메일 중복 로직
const existUserEmail = (req, res) => {
    // url로 받아온 유저이메일
    const useremail = req.body.useremail;
    // default value = null
    const snsName = req.body.snsName || null;
    // true = 계정 있음 , false = 계정 없음
    let result = false

    console.log(req.body)
    // sns 가입자가 아니라면
    if(!snsName) {
        connection.query(
            `SELECT * FROM nyang_member WHERE email='${useremail}' AND snsName IS NULL`,
            (err, rows) => {
                if(err) {
                    res.send("error", err)
                }
                if(rows.length) {
                    result = true
                    res.send(result);
                } else {
                    res.send(result)
                }
            }
        );
    } else {
        // sns 가입자라면
        connection.query(
            `SELECT * FROM nyang_member WHERE email='${useremail}' AND snsName='${snsName}'`,
            (err, rows) => {
                if(err) {
                    res.send("error", err)
                }
                if(rows.length) {
                    result = true
                    res.send(result);
                } else {
                    res.send(result)
                }
            }
        );
    }
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

module.exports = {
    existUserEmail: existUserEmail,
    resistUser: resistUser,
}