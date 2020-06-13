# Join & Login Refactoring
## 이유
추후 연결시킬 sns로그인 기능을 위해 회원가입과 로그인의 flow를 다시 체크하며 mobx를 통한 회원가입,로그인 상태관리의 개선

## 지금까지의 flow 정리
### 회원가입
- client에서 이메일, 비밀번호, 비밀번호 확인 입력
- client에서 validate check (issue : 중복코드발생)
- 이메일, 비밀번호, 비밀번호 확인의 validate가 true면 server(/join)로 state를 전부 보냄 (issue : 불필요한것까지 모두 보내는 느낌)
```
state = {
    email: "",
    emailValidate: false,
    emailMatchText: "사용 가능한 이메일 주소입니다",
    emailNotMatchText: "잘못된 이메일 형식 입니다",
    password: "",
    passwordValidate: false,
    passwordMatchText: "사용 가능한 비밀번호입니다",
    passwordNotMatchText: "6자이상 15자 이하 입력해주세요",
    passwordCheck: "",
    passwordCheckValidate: false,
    memberInfo: []
}
```
- 서버에서는 입력된 이메일을 db의 쿼리로 체크
    - 중복이 있을 경우 : `{emailOverlapping: true}` 응답 client에서는 응답을 받아 `{emailValidate: false}`로 state 변경 후 중복 텍스트를 노출
    - 중복이 없을 경우 : `이메일주소, 암호화된 비밀번호, 가입일자, 이메일인증여부, 이메일토큰`을 database의 nyang_member table에 등록한다. 
        - 암호화된 비밀번호 : hash.js를 사용하여 `sha256`으로 암호화한다.
        - emailToken : 메일주소와 요청되었을때 시간을 결합하여 hash.js를 사용하여 `sha256`으로 암호화한다.
- 정보가 db에 등록되면 nodemailer.js를 사용하여 가입인증 메일을 전송한다.
- 정보가 db에 등록되면 server에서 client로 {emailOverlapping: false}를 응답한다.
- server에서 `{emailOverlapping: false}` 응답을 client에서 받아 `{emailValidate: true}` state 변경 후 이메일 전송 여부와 인증 안내 텍스트를 노출
- 이메일, 비밀번호, 비밀번호 확인의 validate가 true가 아니면 client에서 다시 입력해달라는 alert를 띄움

### 로그인
- client에서 이메일, 비밀번호 입력
- client에서 validate check (issue : 중복코드발생)
- 이메일, 비밀번호의 validate가 true면 server(/login)으로 state를 전부 보냄 (issue : 불필요한것까지 모두 보내는 느낌)
```
state = {
    userId: "",
    userIdValidate: false,
    userIdMatchText: "사용 가능한 이메일 주소입니다",
    userIdNotMatchText: "잘못된 이메일 형식 입니다",
    userPassword: '',
    userPasswordValidate: false,
    userPasswordMatchText: "사용 가능한 비밀번호입니다",
    userPasswordNotMatchText: "6자이상 15자 이하 입력해주세요",
}
```
- server에서 /login으로 요청이오면 `passport.js`를 사용하여 로그인 인증을 처리한다.
```
router.post("/login", passport.authenticate('local', {
	failureRedirect: "http://localhost:3000/"
}), (req, res) => {
	로그인 인증 후 동작로직
});
```
- server에서 로그인 인증에 성공하면 client로 `{sucess: true, _userId: userId}` 를 응답함
- Client에서는 server에서 받은 응답으로 로그인 처리
    - `!json.sucess` 로그인 실패시: 별도의 실패처리가 없음 (issue)
    - !json.sucess` 로그인 성공시
        - login store의 `userState를 login`으로 변경
        - login store의 `changeUserId userId`으로 변경 (issue : 로직이 나눠질 필요가 있나..?)
        - localStorage에 `userInfo : 로그인한 유저 아이디`를 저장
```
.then(res => res.json()).then(json => {
    if (!json.sucess) {
        console.log('로그인실패')
    } else {
        changeUserState() // userState를 login으로 변경 (로그인 유무상태)
        changeUserId(json._userId) // changeUserId userId으로 변경 (로그인한 유저 아이디 저장)
        localStorage.setItem(
            "userInfo",
            JSON.stringify(json._userId)
        )

        onClose()
    }
})
```
- 이메일, 비밀번호의 validate가 false면 아이디와 패스워드를 알맞게 입력해달라는 alert 노출

## 개선된 내용
### 가입시 이메일 전송 안되는 문제 해결
gmail에 냥터레스트 계정을 생성하여 메일을 전송하고있었는데 전송시 오류가 떴다.
```
Error: Invalid login: 535-5.7.8 Username and Password not accepted. Learn more at
```
#### 방법
구글계정 설정에서 `안전하지 않은 엑세스 허용`을 해준다
하지만 위 방법만으로도 오류가 해결되지 않을 경우
2중보안+앱비밀번호까지 설정을 해주고 그 앱비밀번호를 nodemailer password옵션에 설정해주어야한다.

냥터레스트는 안전하지 않은 엑세스 허용이 이미 되어있는 상태에서 오류가났기때문에
2중보안 + 앱비밀번호를 설정하여 앱비밀번호로 변경해주었더니 오류가 해결되었다.

### 냥터레스트 google계정 env파일로 설정
기존에는 노드메일러에 냥터레스트 구글계정이 노출되고 있었다.
계정의 경우 보안문제가 있다보니 윤우님께서 env파일에 설정을 추천해주셨다.
env파일에 냥터레스트 계정을 설정해주고 nodemailer 모듈에 적용해주었다.

```
// 환경설정 파일에서 Gmail계정정보 가져오기
dotenv.config({ path: path.join(__dirname, './.env') })
const GMAILID = process.env.GMAILID;
const GMAILPW = process.env.GMAILPW;

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
```

### 메일 전송 코드 분리
메일이 전송되는 경우는 아래와 같다.
- 회원가입시 인증요청
- 비밀번호 찾을때

지금은 위 두 경우밖에 없지만, 서비스에서 메일을 보내는 경우는 많고 같은 내용이 중복되고 있어
메일전송코드를 분리했다.

`join.js`, `findAccount.js` 에서 각각 사용중인 메일전송 모듈을 아래 코드 하나로 분리하였다.
각 js파일에서 모듈과 코드를 모두 불러와서 적용시키고있었기때문에 코드도 길어지고 같은내용을 작성해야하는 점들이 개선되었다.

```
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
```

아래처럼 사용해주면된다.
```
const mailSender = require("./mailSender.js"); // 모듈 불러오기

// 전송할 메일 옵션 설정해주기
let mailSenderOption = {
    toEmail: userEmail,                     // 수신 메일 주소
    subject: '냥터레스트 비밀번호를 재설정해주세요.',   // 제목
    text: `http://localhost:8080/account/password/modify?&token=${radomToken} 해당 링로 접속하여 비밀번호를 재설정해주세요.`  // 내용
};

// 비밀번호 재설정 이메일 전송 실행
mailSender.sendGmail(mailSenderOption);

```

## 개선이 필요하다 생각되는 부분
### validate 로직
```
const MAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const PASSWORD_FORMAT =  /^(?=[a-zA-Z0-9!@$%^*#])(?!.*[^a-zA-Z0-9!@$%^*#]).{6,15}$/
```
```
validate = (format, value) => {
    const reg = format;
    const validate = reg.test(value);
    return validate;
}
```
회원관련 기능에서 위 validate로직이 중복되고있다. 공통의 모듈로 분리하여 중복을 개선

### 로그인 실패시 로직 추가
```
.then(res => res.json()).then(json => {
    if (!json.sucess) {
        console.log('로그인실패') // 실패 로직 없음..
    } else {
       // 성공시 로직
    }
})
```
위 코드를 보면 caalient에서 실패시에 대한 처리가 없음. 로그인 실패시 로직을 추가하여 개선

### changeUserState, changeUserId 합치기?분리?(고민중...)
로그인,로그아웃시에 로그인 상태유무와, 유저아이디는 동시에 변경이 되어야한다.
그러나 내가 만든 기능은 모두 분리되어있음.
직관적이기 위해 둘은 분리되어야하는가? 하나로 합쳐 불필요한 분리를 개선해야하는가..?
```
login store

export default class loginStore {
	@observable userId = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')): "";
	@observable userState = localStorage.getItem('userInfo')?"login":"logout"

	constructor(root) {
		this.root = root;
	}

	@action
	changeUserState = ()=>{
		if(this.userState === "logout"){
			this.userState = "login"	
		}else {
			this.userState = "logout"
		}
	}

	@action
	changeUserId = (name)=>{
		this.userId= name
	}
}
```

```
로그인 성공시 client 처리 코드

.then(res => res.json()).then(json => {
    if (!json.sucess) {
        console.log('로그인실패')
    } else {
        changeUserState() // userState를 login으로 변경 (로그인 유무상태)
        changeUserId(json._userId) // changeUserId userId으로 변경 (로그인한 유저 아이디 저장)
        localStorage.setItem(
            "userInfo",
            JSON.stringify(json._userId)
        )

        onClose()
    }
})
```

### 정적인 html 페이지 개선
정적인 html페이지로 작업되어있는 페이지들을 react에 맞게 개선하기
- backend/welcome.html
- backend/welcome2.html
- backend/password.html
