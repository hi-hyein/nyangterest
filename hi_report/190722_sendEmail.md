# 회원가입 인증코드 메일발송

## 인증 방법
### 메일로 인증링크 발송
1. 가입자가 가입하기 버튼 클릭 > 서버에서 가입자가 입력한 이메일 주소로 인증링크가 포함된 메일 발송
2. 가입팝업창에는 인증메일이 전송 & 인증링크에 대한 안내 내용으로 전환
3. 가입자가 인증메일의 링크로 접근 > 서버에서 해당 링크 key값(혹은 토큰?)을 체크하여 db table의 가입인증 컬럼을 true로 변경


## 공통적으로 필요한 것
- 인증링크에 들어갈 email주소 + 토큰주소

  ㄴ email주소 : db 인증상태를 변경할 키값

  ㄴ 토큰주소 : 올바른 경로로 전달되었는지 확인할 용도
- member 테이블에 인증상태 컬럼 : certify (타입 : TYNYINT(1),기본값 0)

   MYSQL BOOLEAN
   mysql5 이상부터 BOOLEAN타입을 사용할 수 있게 되었다고 한다. 데이터타입은 TYNYINY이며 0과 1로 저장된다.

## 작업 계획
### 노드모듈 nodemailer 사용
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

## 인증링크 메일 발송
1. 인증링크주소 http://localhost:3000/{경로}+?email="+ email +"&token={암호화된 토큰} 생성 하여 메일 전송
2. 서버에서 링크의 이메일,토큰을 받아 일치하면 db의 certify값 true로 변경


# 작업이슈
get 으로 인증링크 url 쿼리문 가져오면
~~~
Proxy error: Could not proxy request /welcome?email=qwer from localhost:3000 to http://localhost:8080.
[1] See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (ECONNRESET).
~~~
프록시관련 에러가 난다

