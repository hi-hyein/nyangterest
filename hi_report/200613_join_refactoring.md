# Join Refactoring

## to do
- Fronend
  - [x] state 정리
  - [ ] 이메일 중복체크 실시간으로 보여주기(helper text로 보여주기)
  - [ ] server의 회원가입 완료(welcome.html)페이지 compoenet화
  - [ ] validate 체크로 인해 영향가는 코드 다시 훑어보기 (boolean 체크같은)
  - [ ] validate 공통으로 빼기

- Server
  - [ ] 인증을 위한 `token` 생성 방식 다시 훑어보기
  - [ ] 
## done
### state 정리
하나의 값으로 관리되던 state를 한눈에 구조를 파악하기 쉽게 email과 password로 나누어 각 영역의 object 내부데이터 방식으로 수정 
```javascript
// 변경 전
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
```javascript
// 변경 후
state = {
    email: {
        value: '',
        vaildate: false,
        helper: {
            available : "사용 가능한 이메일 주소입니다",
            notAvailable : "잘못된 이메일 형식 입니다",
            overlapping: "이미 가입된 이메일입니다. 다른 이메일을 입력해주세요",
            complete: "회원가입이 완료되었습니다! 이메일 인증을 완료해주세요!"
        },
        overlapping: false,
    },
    password: {
        value: '',
        validate: false,
        check: {
            value: '',
            validate: false,
        },
        helper: {
            available: "사용 가능한 비밀번호입니다",
            notAvailable: "6자이상 15자 이하 입력해주세요",
        }
    },
}
```
#### render 내부의 state 선언 변화
```javascript
// 변경 전
const { email, password, emailValidate, emailMatchText, emailNotMatchText, passwordValidate, passwordMatchText, passwordNotMatchText, passwordCheck, passwordCheckValidate } = this.state
```
```javascript
// 변경 후
const { email, password } = this.state
```
#### memberInfo: [] 삭제
회원가입 버튼 클릭 후 서버에서 내려오는 데이터를  memberInfo: []에 담았는데, 내려오는 정보는 이메일 중복에 대한 boolean 데이터 하나 였다. memberInfo 라는 변수명도 맞지 않는 것 같고, 배열로 받는 것도 맞지 않는 것 같아 삭제 후 이메일 중복에 대한 데이터는 `email.overlapping` 값에 담는 것으로 수정되었다.

#### setState 변화
```javascript
// 변경 전
this.setState({
    email: value
})
```
```javascript
// 변경 후
this.setState(prevState => ({
    email: {
        ...prevState.email,
        value: value
    }
}))
```


### 이메일 중복체크 실시간으로 보여주기(helper text로 보여주기)

#### 기존 Flow
- Front
  - 회원가입 입력창에 이메일, 비밀번호, 비밀번호확인 입력시 validate 체크
  - 이메일, 비밀번호, 비빌번호 확인 입력란이 모두 입력되고 회원가입버튼을 누르면 server에 이메일주소와 패스워드를 server로 보내 회원가입 요청(이메일,비밀번호,비밀번호확인 validate === true 이어야함 그렇지 않을시에는 알맞게 입력해달라는 alert 노출)
  - server에서 중볶유무값을 받아 state에 저장한다.
  - 저장된 중복 state값이 true면 사용중인 이메일이라는 alert를 띄운다.
  - 저장된 중복 state값이 false면 회원가입이 완료되었다는ㄴ alert를 띄운다.

- Server
  - front에서 회원정보(email, password)를 받는다.
  - 데이터베이스 nyang_member table에서 email조건으로 row를 찾는다.
  - email조건으로 검색된 결과값으로 이메일 중복여부 boolean값을 front로 보낸다.
  - 중복여부가 true라면 front로 true를 보낸다
  - 중복여부가 false라면 이메일, 암호화된 패스워드, 등록날짜, 이메일인증여부, 인증관련토큰을    데이터베이스 nyang_member table에 등록하고, 이메일인증을 위한 메일을 보낸다. 그리고 front로 false를보낸다

지금은 server에 /join 으로 요청을 받으면 멤버중복처리 & 중복처리응답 & 정보db저장 & 인증메일전송기능을 모두 한번에 하고있음.

이메일 중복처리와 가입기능을 분리시켜 처리

- [x] 회원가입 이메일 중복처리 : /user/exists/email/:useremail
- [ ] 회원등록 : /user/join

### 새로운 Flow
- Front
  - 회원가입 입력창에 이메일, 비밀번호, 비밀번호확인 입력시 validate 체크
  - 회원가입 입력창에서 받은 email주소의(onChange) 입렵값이 공백이 아닐때 server에 이메일 중복처리 요청
  - server에서 받응 응답으로 이메일 중복처리 state(overlapping) 변경
  - 중복처리에 대한 helper text를 보여준다.
  - 이메일, 비밀번호, 비빌번호 확인 입력란이 모두 입력되고 회원가입버튼을 누르면 server에 이메일주소와 패스워드를 server로 보내 회원가입 요청(이메일,비밀번호,비밀번호확인 validate && 이메일중복 === false && 모든 입력창 !== '' 이어야함 그렇지 않을시에는 알맞게 입력해달라는 alert 노출)
  - server에서 등록 유무의 응답을 받아 alert를 띄운다.

- Server
  - 중복처리 후 응답
  - front에서 받은 회원정보(이메일,패스워드)를 받아 회원등록을 진행한다.
  - 이메일, 암호화된 패스워드, 등록날짜, 이메일인증여부, 인증관련토큰을 데이터베이스 nyang_member table에 등록한다.
  - 등록이 완료되면 이메일인증을 위한 메일을 보낸다.
  - 등록이 완료되면 등록 유무의 응답을 보낸다.

```javascript
// front

// 이메일 입력시
emailOnChange = (e) => {
		const value = e.target.value
		const Validate = this.validate(MAIL_FORMAT, value)

		// ..setstate 처리..

		// 입력된 이메일값이 공백이 아닐때
		if(value !== '' ) {
			fetch(`/user/exists/email/${value}`)
			.then(res => res.json())
			.then(json => {
				this.setState(prevState => ({
					email: {
						...prevState.email,
						overlapping: json,
					}
				}));
				console.log(this.state.email.overlapping)
			})
		}else {
			return
		}
  }
  
  // 기타작업
  ...sendJoinInfo, helper text 에 state.email.overlapping 조건 추가
```
```javascript
// server

// 이메일 중복 로직
const existUserEmail = (req, res) => {
	// url로 받아온 유저이메일
	const useremail = req.params.useremail;
	// 유저 이메일 중복 검사
	connection.query(`SELECT * FROM nyang_member WHERE email='${useremail}'`, (err,rows) => {
		if(err) {
			res.send('error')
		}else {
			// useremail 검색한 결과가 1개라도 나오면 true 보낸다
			// true : 중복있음
			// false : 중복없음
			res.send(rows.length === 1)
		}
	})
}

// 메일 중복 체크
router.get('/user/exists/email/:useremail', existUserEmail);
```

email입력값의 validate true일때 중복처리요청을 보내면 되겠다고 생각했는데,
실시간으로 서버에 중복처리 요청을 보내야 true, fasle가 정확히 들어왔다.
따라서 이메일 입력시 계속 중복처리 요청을 보내는걸로 변경하였다.