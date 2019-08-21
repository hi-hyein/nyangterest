# 회원가입 인증코드 메일발송

## 인증 방법
### 메일로 인증링크 발송
1. 가입자기 회원가입정보(email주소 등)을 입력하여 버튼을 누르면 서버로 정보 전송
2. 전달된 정보를 기반으로 서버에서 인증링크를 메일로 발송
3. 인증링크로 접속시 서버에서 URL의 쿼리데이터 가져옴
4. 가져온 쿼리데이터로 DB 테이블을 검색하여 해당하는 row의 certify를 true로 변경


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
1. 인증링크주소 http://localhost:3000/{경로}+?email="+ {이메일주소} +"&token={암호화된 토큰} 생성 하여 메일 전송
2. 서버에서 링크의 이메일,토큰을 받아 일치하면 db의 certify값 true로 변경


# 작업이슈1
get 으로 인증링크 url 쿼리문 가져오면
~~~
Proxy error: Could not proxy request /welcome?email=qwer from localhost:3000 to http://localhost:8080.
[1] See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (ECONNRESET).
~~~
프록시관련 에러가 난다

## 작업이슈1 해결

서버에서 처리되어야 할 쿼리문을 프론트 주소로 받으니 이슈가 나왔던것
서버는 작업은 서버주소로! 프론트 작업은 프론트주소로!(당연한것!)


# 어려움 느낀 부분
1. '/'으로 받은 데이터를 '/welcome'으로 전달해서 이메일 주소와 토큰을 비교하여 처리하려고했지만 
전달이 잘 되지 않음 -> 따라서 링크의 이메일 주소 정보만가져와서 테이블 검색 후 바로 처리
~~~
SyntaxError: Unexpected token s in JSON at position 0
~~~
~~~
UnhandledPromiseRejectionWarning: TypeError: Only absolute URLs are supported
~~~
이런 오류들..발생

  - ### ㄴ 오류검색하여 체크한 내용
    - 서버에서 서버로 데이터를 전달할때는 절대경로필요..? ex) http://localhost:8080같은..
    - 데이터 타입이 잘못된 경우






