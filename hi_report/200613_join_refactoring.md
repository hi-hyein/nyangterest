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


