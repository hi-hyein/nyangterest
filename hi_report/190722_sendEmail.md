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


# 진행하려했던 순서변경
~~~
서버에서 인증주소 메일로 전달(서버경로) -> 서버에서 쿼리문 받아서 처리 -> 프론트 회원가입완료페이지 연결처리
~~~
에서
~~~
서버에서 인증주소 메일로 전달(프론트경로) -> 회원가입완료페이지 바로노출-> 프론트에서 받은 쿼리데이터 받아와 json으로 변환하여 서버로 전달 -> 데이터 서버처리
ㄴ 여기서 처리되는 데이터 노출 걱정..보안...누군가 작정하고 해킹할 수 있을 듯..!!
~~~

# 회원정보 저장 과정 변경
~~~
인증하지 않으면 회원정보가 저장되지 않고 로그인된 페이지로 넘어가지 못함! 

 1. 회원이 정보 기입 하여 버튼 누르면 정보 서버로 전달
 2. 전달된 정보로 이메일 전송
 3. 전송된 이메일 인증시 회원가입정보 디비에 저장
~~~

~~~
회원정보는 저장되지만 인증하지 않으면 로그인된 페이지로 넘어가지 못함!

 1. 회원이 정보 기입 하여 버튼 누르면 정보 서버로 전달
 2. 전달된 회원가입 정보 디비에 저장 다만 certify값 false
 3. 전송된 이메일 인증시 certify ture값 변경
~~~

과정 변경한 이유는..
다른 경로로 회원정보를 받아서 인증을 위한 비교를 하려고하니
코드가 복잡해지는 것 같아서 과정을 간결하게 변경..

ㄴ 복잡해지는 것 같아 변경하려했지만 이 또한 변경하려고하니 추가되는 사항이 많음.... 

## 고민
1. 인증메일링크 접속 후 프론트에서 데이터받아 서버로보내기 vs 서버에서 먼저 처리하기
2. 인증메일링크로 인증 후 회원정보 db저장 진행 vs db에 먼저 회원정보 저장 후 인증메일링크로 인증 후 certify 값만 변경
3. 서버처리, 프론트처리 이해한 것 같다가도 헷갈립니다!

## 느낀점
계획대로 하고싶어 문서작성은 했지만..! 역시 계획대로 안되는 것이 인생ㅎ..

# fetch

- promise란?





