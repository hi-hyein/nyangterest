# nodemailer not sending

## 문제
유저의 입력받은 이메일이 db의 이메일과 일치하다면 메일전송이 되어야하는데 메일 전송이 되지 않음

- 버튼을 생성하여 다른 경로로 요청을 보내 메일을 보내봤는데 메일보내는 기능은 정상적으로 작동
- 위 코드영역에서만 nodemailer를 제외한 다른 작업은 모두 진행된다. (nodemailer가 투명인간취급을 받고있음...)

**문제의 코드**
```javascript
router.post("/account/password/find",(req, res)=>{
console.log("비밀번호찾기",req.body)
const userEmail = req.body.email

// DB에서 비교
connection.query(`SELECT * FROM member WHERE email="${userEmail}"`, (err,rows,fields) => {
if(err){
  console.log("에러",err)
  res.json({
    emailMatch: false
  })
}else if(rows[0].email!==userEmail){
    console.log("비밀번호찾기 : 이메일 없음")
    res.json({
      emailMatch: false
    })
  }else {
    console.log("비밀번호찾기 : 이메일 있음")
    res.json({
      emailMatch:  true
    })

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nyangterest@gmail.com',  // gmail 계정 아이디를 입력
        pass: 'sidxjfptmxm!'          // gmail 계정의 비밀번호를 입력
      }
    });
  
    let mailOptions = {
      from: 'nyangterest@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
      to: 'henyy1004@naver.com',                     // 수신 메일 주소
      subject: '냥터레스트 회원가입을 위한 이메일 인증을 부탁드립니다.',   // 제목
      text: `안녕하세요 회원가입을 축하드립니다.   해당 링로 접속해주시면 인증이 완료되어 냥터레스트에 로그인하실 수 있습니다.`  // 내용
    };
  
    transporter.sendMail(mailOptions, (error, info)=> {
      console.log("info:",info)
  
      if (error) {
        console.log(error);
      }
      else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
})
})
```

## 해결하기위해 해봤던 작은 행동들..
- nodemailer의 변수값들의 이름을 바꿔봄 : 다른 곳에서 사용중인 nodemailer과 동일한 변수값을 쓰고있는데.... 혹시나 충돌이 나는걸까봐 하지만 이 이유는 아니었다.
- nodemailer의 위치를 바꿔봄 : 처리순ㅅㅓ로인해 발생된 문제일까봐 하지만 이 이유도 아니었다.
- server.js에서 nodemailer작업이 포함된 회원가입기능을 join.js파일로 빼봄 : 변수값들의 이름을 바꾼이유와 비슷... 하지만! 이것도 이유는 아니다!(같은결과;;;ㅎㅎ)
- query문들을과 res.json 제거해봄 : nodemailer가 정상적으로 작동함..!
- query문안에 res.json을 제거해봄 : nodemailer가 정상적으로 작동함..! -> 따라서 query문제는아님
- query문만 제거하고 res.json만 냄겨둠 : 작동안됨! 

- 결론 : nodemailer는 response 때문에 작동이 안되고있는것!

## 해결방법
**변경 전 코드**
```javascript
res.json({
  emailMatch:  true
})

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nyangterest@gmail.com',  // gmail 계정 아이디를 입력
    pass: 'sidxjfptmxm!'          // gmail 계정의 비밀번호를 입력
  }
});

let mailOptions = {
  from: 'nyangterest@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
  to: 'henyy1004@naver.com',                     // 수신 메일 주소
  subject: '냥터레스트 회원가입을 위한 이메일 인증을 부탁드립니다.',   // 제목
  text: `안녕하세요 회원가입을 축하드립니다.   해당 링로 접속해주시면 인증이 완료되어 냥터레스트에 로그인하실 수 있습니다.`  // 내용
};

transporter.sendMail(mailOptions, (error, info)=> {
  if (error) {
    console.log(error);
  }
  else {
    console.log('Email sent: ' + info.response);
  }
});
```
**변경 후 코드**
```javascript
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nyangterest@gmail.com',  // gmail 계정 아이디를 입력
    pass: 'sidxjfptmxm!'          // gmail 계정의 비밀번호를 입력
  }
});

let mailOptions = {
  from: 'nyangterest@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
  to: 'henyy1004@naver.com',                     // 수신 메일 주소
  subject: '냥터레스트 회원가입을 위한 이메일 인증을 부탁드립니다.',   // 제목
  text: `안녕하세요 회원가입을 축하드립니다.   해당 링로 접속해주시면 인증이 완료되어 냥터레스트에 로그인하실 수 있습니다.`  // 내용
};

transporter.sendMail(mailOptions, (error, info)=> {
  if (error) {
    console.log(error);
  }
  else {
    console.log('Email sent: ' + info.response);
    res.json({
      emailMatch:  true
    })
  }
});
```

기존에는 위처럼 response와 nodemailer를 따로 작성하였는데
nodemailer안에 response를 넣어 해결하였다.
즉 메일이 성공적으로 보내지면 response를 실행하는 것

## 의문점
response의 위치를 변경하여 해결은 되었지만
join.js에서도 비슷하게 nodemailer가 사용되고있는데 비밀번호찾기에서만
response로인해 작동되지 않는지에 대한 의문점은 풀리지않았다;
ing...