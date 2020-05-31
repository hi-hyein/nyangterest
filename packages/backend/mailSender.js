const nodemailer = require('nodemailer');
const path = require("path");
const dotenv = require('dotenv')

// 환경설정 파일에서 Gmail계정정보 가져오기
dotenv.config({ path: path.join(__dirname, './.env') })
const GMAILID = process.env.GMAILID;
const GMAILPW = process.env.GMAILPW;

// 메일 발송 객체
const mailSender = {
	// gmail발송
	sendGmail : function(param){
        const transporter = nodemailer.createTransport({
            service: 'gmail'
            ,prot : 587
            ,host :'smtp.gmlail.com'
            ,secure : false
            ,requireTLS : true
            , auth: {
              user: `${GMAILID}`
              ,pass: `${GMAILPW}`
            }
		});
		
        // 메일 옵션
        const mailOptions = {
			from: 'nyangterest@gmail.com',
			to: param.toEmail, // 수신할 이메일
			subject: param.subject, // 메일 제목
			text: param.text // 메일 내용
		};

        // 메일 발송    
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
    }
}

module.exports = mailSender;