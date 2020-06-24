# Join Refactoring

## to do
- Fronend
  - [x] state 정리
  - [x] 이메일 중복체크 실시간으로 보여주기(helper text로 보여주기)
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


### 이메일 중복체크 실시간으로 보여주기(helper text로 보여주기) & 이메일 중복처리 분리

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

지금은 server에 /join 으로 요청을 받으면 멤버중복처리 & 중복처리응답 & 정보db저장 & 인증메일전송기능을 모두 한번에 하고있음. **이메일 중복처리와, 회원가입 기능 분리 필요**

```
회원가입 이메일 중복처리 : /user/exists/email/:useremail
회원등록 : /user/join
```

#### 새로운 Flow
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
  - 데이터베이스에 회원정보 등록이 완료되면 이메일인증을 위한 메일을 보낸다.
  - 데이터베이스에 회원정보 등록이 완료되면 등록 유무의 응답을 보낸다.

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

### 회원가입 기능 분리
```javascript
// 기존 server
const body = req.body;
const memberMail = body.email;
const memberPass = body.password;
const passwordHash = hash.sha256().update(memberPass).digest('hex');
const signupdate = moment().format('YYYYMMDD');
const certify = false
const tokenUnique = moment().format()
const emailToken = hash.sha256().update(`${memberMail}+${tokenUnique}`).digest('hex')
const emailLink = `http://localhost:8080/welcome?email=${memberMail}&token=${emailToken}`;

// 메일 발송 params
let mailSenderOption = {
  toEmail: memberMail,
  subject: '냥터레스트 회원가입을 위한 이메일 인증을 부탁드립니다.',
  text: `안녕하세요 회원가입을 축하드립니다. ${emailLink} 해당 링크로 접속해주시면 인증이 완료되어 냥터레스트에 로그인하실 수 있습니다.`,
}

// 회원 가입 처리 query 
connection.query(`SELECT * FROM nyang_member WHERE email='${memberMail}'`, (err, rows, fields) => {
  // 가입 이메일 중복 처리
  if (rows[0] !== undefined) {
    // 가입된 이메일이 있을때
    console.log('가입된 이메일이 있음, 회원가입 불가')

    // 이메일 중복 여부 front로 전송
    res.send(
      { emailOverlapping: true }
    )
  } else {
    // 가입된 이메일이 없을때
    console.log('가입된 이메일이 없음, 회원가입 가능')

    // 회언 정보 DB저장
    const sql = "INSERT INTO `nyang_member` (`email`, `password`, `signupdate`, `certify`, `token`) VALUES ( ?,?,?,?,? )"
    const params = [memberMail, passwordHash, signupdate, certify, emailToken]
    
    // 가입된 이메일 없을때 query 처리
    connection.query(sql, params, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        console.log(rows);
      }
    });

    // 회원가입 인증 메일 발송
    mailSender.sendGmail(mailSenderOption);

    // 이메일 중복 여부 front로 전송
    res.send({
      emailOverlapping: false
    })
  }
})
```

```javascript
// 변경 server
const resistUser = async (req, res) => {
	const resistUserInfo = {
		email: req.body.email,
		password: await bcryptjs.hash(req.body.password, 10),
		signupdate: moment().format('YYYYMMDD'),
		certify: false,
		emailToken: await bcryptjs.hash(EMAIL_CERTIFY_KEY, 10),
	}

	const emailLink = `http://localhost:8080/user/join/welcome?email=${resistUserInfo.email}&token=${resistUserInfo.emailToken}`

	// 메일 발송 params
	let mailSenderOption = {
		toEmail: resistUserInfo.email,
		subject: '냥터레스트 회원가입을 위한 이메일 인증을 부탁드립니다.',
		text: `안녕하세요 회원가입을 축하드립니다. ${emailLink} 해당 링크로 접속해주시면 인증이 완료되어 냥터레스트에 로그인하실 수 있습니다.`,
	}

	// 회원 가입 처리 query 
	// 회언 정보 DB저장
	const sql = "INSERT INTO `nyang_member` (`email`, `password`, `signupdate`, `certify`, `token`) VALUES ( ?,?,?,?,? )"
	const params = ((resistUserInfo) => {
		let resistUserInfoArray = [];
		for(items in resistUserInfo) {
			resistUserInfoArray.push(resistUserInfo[items]);
		}

		return resistUserInfoArray;
	})(resistUserInfo)

	console.log("params",params);
	
	connection.query(sql, params, (err, rows) => {
		if (err) {
			console.log('회원가입 실패',err);
			res.send(false)
		} else {
			console.log(rows);
			// 회원가입 인증 메일 발송
			mailSender.sendGmail(mailSenderOption);
			// 회원가입 성공 여부 front로 보내기
			res.send(true)
		}
	});
}
```

```javascript
// 기존 front
sendJoinInfo = () => {
  const {email, password} = this.state;
  const userInfo = {
    email: email,
    password: password
  }

  if (email.vaildate && password.vaildate && password.check.vaildate && !email.overlapping ) {
    fetch('/join', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(userInfo),
    }).then(res => res.json()).then(json => {
      this.setState(prevState => ({
        email: {
          ...prevState.email,
          overlapping: json.emailOverlapping
        }
      }))

      if (email.overlapping === true) {
        this.setState(prevState => ({
          email: {
            ...prevState.email,
            vaildate : false
          }
        }))
        alert(email.helper.overlapping)
        
      } else {
        this.setState(prevState => ({
          email: {
            ...prevState.email,
            vaildate : true
          }
        }))

        alert(email.helper.complete)
      }
    })
  } else {
    alert("모든 입력사항을 알맞게 입력해주세요")
  }
}
```

```javascript
// 변경 front
sendJoinInfo = () => {
  const {email, password, helper} = this.state;
  const userInfo = {
    email: email.value,
    password: password.value
  }

  if (email.validate && password.validate && password.check.validate && !email.overlapping) {
    fetch('/user/join', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(userInfo),
    })
    .then(res => res.json()).then(json => {
      if(json) {
        alert(helper.complete)
      }else {
        alert(helper.failed)
      }
    })
  } else {
    alert("모든 입력사항을 알맞게 입력해주세요")
  }
}
```

#### 가입진행 후 이메일인증 토큰 생성
- 목적 : 회원가입을 위한 이메일 주소의 유효성 확인
- 보완할 부분
  - 보안을 위해 토큰 생성을 위한 Secret key .env에 추가  
  - 토큰 생성할때 암호화 시스템을 `Salting` + `Key Stretching` 으로 구성된 `bcrypt`로 변경
  - 이메일 인증의 유효시간 추가

아래는 기존 `sha256` 알고리즘을 사용해서 암호화한 이메일 토큰이다. 현재시간과 사용자 이메일주소 문자를 사용하여 임의의 문자열을 직접 생성하여 매번 다른 암호화값을 만들어 주었다. 그러나 Salting과 기존에는 없는 Key stretching이 추가된 `bcrypt`를 사용하면 salt값이 매번 바뀌고 여러번 해쉬를 반복하기떄문에 같은 값을 입력해도 항상 다른 값이 생성되어 보안적인 부분이 더 강화될 수 있다.(다른 암호화 부분들도 변경할 것)

```javascript
// 기존
const tokenUnique = moment().format();
const emailToken = hash.sha256().update(`${memberMail}+${tokenUnique}`).digest('hex');
```

```javascript
// 변경

// 암호화 함수
const encryptionBcrypt = (ecrTarget) => {
	bcryptjs.genSalt(10, (_, salt) => {
		bcryptjs.hash(ecrTarget, salt, (_, hash) => {
			return hash;
		})
	})
}

// 이메일 토큰 생성
const resistUserInfo = {
    ...
    emailToken: encryptionBcrypt(EMAIL_CERTIFY_KEY),
    ...
	}

```

#### 고민했던 부분
- hash값을 return으로 내보내 다른 변수에 저장하게했었는데 undefined가 찍힘. 비동기로 돌아가고있어서 저장되는 타이밍???이 맞지 않는다고 생각했다.

```javascript
// 비밀번호 bcryptjs로 암호화하는 코드를 별도로 뻄
const encryptionBcrypt = (ecrTarget) => {
	bcryptjs.genSalt(10, (_, salt) => {
		bcryptjs.hash(ecrTarget, salt, (_, hash) => {
			return hash
		})
	})
}
```

위 코드를 수정하려다가 resistUser에서 async/await을 사용해 수정하였다.
```javascript
const resistUser = async (req, res) => {
	const resistUserInfo = {
		email: req.body.email,
		password: await bcryptjs.hash(req.body.password, 10),
		signupdate: moment().format('YYYYMMDD'),
		certify: false,
		emailToken: await bcryptjs.hash(EMAIL_CERTIFY_KEY, 10),
  }
}
```
- email.overlapping값의 경우 디폴트를 false로 해두었는데, false일경우에 회원가입기능이 가능한 조건이 되는데 이부분을 생각못했다. 그래서 디폴트를 null로 변경하였다.

#### 고민중
- 암호화방식을 변경 -> 기존 암호들도 변경된 방식으로 재설정필요
- bcryptjs에 있는 암호화된 값 비교 기능인 compare을 잘 사용하면 좋을 것 같다. 생각해보자
