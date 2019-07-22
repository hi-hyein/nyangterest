# 회원가입 인증코드 메일발송

## 인증 방법
### 1.회원가입진행 중 인증코드 인증
- 가입자가 이메일&비밀번호 입력 후 계속하기 버튼을 누르면 서버로 데이터 전송(전송된 데이터는 인증코드와 비교 후 true일때 DB저장됨)
- 계속하기 버튼을 누르면 인증코드 입력란 노출 (인증하고 누를 버튼 추가필요)
- 암호화된 인증코드 생성 / 변수에 담기
- 인증코드를 전송된 데이터의 이메일 주소로 전송
- 가입자기 인증코드를 입력 후 회원가입버튼을 누르면 서버의 인증코드와 비교
- 비교 후 true시 db에 회원정보 저장되며 인증완료 컬럼 변경, 회원가입완료 alert노출
- false시 인증코드 오류 alert노출, 로그아웃

### 2.회원가입 완료 후 인증코드 인증
- 가입자 첫 로그인시 인증페이지 노출(인증페이지 필요)
- 가입자의 메일로 인증코드 전송
- 인증코드 비교 후 true시 인증완료 컬럼 변경, 인증이 완료되었다는 alert노출
- false시 인증코드 재입력 alert노출, 로그아웃

## 공통적으로 필요한 것
- 암호화된 인증코드 
- 인증을 했는지 안했는지에 관련된 테이블 컬럼 생성 필요(로그인시 true시 메인노출 false시 인증페이지노출)

## 작업 계획
### nodemailer
메일을 보낼 수 있는 노드모듈 메일을 전송할 수 있고, 보안성이 좋으며, 유니코드 지원, HTML 문서를 메일 내용으로 사용, 파일 첨부 가능 등의 특징이 있다. gmail사용시 하루 500통 전송가능

~~~js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post("/nodemailerTest", function(req, res, next){
  let email = req.body.email;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youremail@gmail.com',  // gmail 계정 아이디를 입력
      pass: 'yourpassword'          // gmail 계정의 비밀번호를 입력
    }
  });

  let mailOptions = {
    from: 'youremail@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
    to: email ,                     // 수신 메일 주소
    subject: 'Sending Email using Node.js',   // 제목
    text: 'That was easy!'  // 내용
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    }
    else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.redirect("/");
})

module.exports = router;
~~~