# Helper Text
input영역에서 validate나 error 등 안내 메시지를 한 곳에서 관리할 수 있도록 작업하고 싶었다.
이유는 변화를 감지하는 state영역에 정적인 텍스트가 있는게 맞는것 같지 않았다.

## before
email, password state안에 중첩시켜 helper text를 정의해두었다.

```javascript
state = {
    email: {
        value: '',
        validate: false,
        helper: {
            available : "사용 가능한 이메일 주소입니다",
            notAvailable : "잘못된 이메일 형식 입니다",
            overlapping: "이미 가입된 이메일입니다. 다른 이메일을 입력해주세요",
        },
        overlapping: null,
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
    helper: {
        complete: "회원가입이 완료되었습니다! 이메일 인증을 완료해주세요!",
        failed: "회원가입에 실패했습니다. 고객센터에 문의주세요."
    },
}
```

## after
state에 helper text를 제거하고
헤당 조건에 따라 helper text를 return하는 객체(getHelperText)와 helper text를 보여주는 ui를 return해주는 기능(showHelperText)
을 만들었다. showHelperText를 만든 이유는 같은 코드가 반복되고 있어서다.

```javascript
// helper text 얻기
getHelperText = {
    email: () => {
        if(this.state.email.validate && !this.state.email.overlapping) {
            return "사용 가능한 이메일 주소입니다"
        } else if (this.state.email.overlapping) {
            return "이미 가입된 이메일입니다. 다른 이메일을 입력해주세요"
        } else {
            return "잘못된 이메일 형식 입니다"
        }
    },

    password: () => {
        if (this.state.password.validate) {
            return "사용 가능한 비밀번호입니다"
        }else {
            return "6자이상 15자 이하 입력해주세요"
        }
    },

    passwordCheck: () => {
        if (this.state.password.check.value === this.state.password.value) {
            return "비밀번호가 일치합니다"
        }else {
            return "비밀번호가 일치하지 않습니다"
        }
    },
}

// helper text 보여주기
showHelperText = (state, type) => {
    if(state) {
        return <FormHelperText id="component-helper-text">
                    {type()}
                </FormHelperText>
    }
}
```

# issue
## 반복되는 코드
helper text의 내부반복을 개선하기위해 수정하고보니 `getHelperText`와 `showHelperText`가 js파일 단위로 반복이 된다. `getHelperText`같은경우는 비슷한 형식이나 조건문이나 텍스트가 다르고, `showHelperText`같은 경우는 동일하다.
더 나은 코드 작성법은 어떤것일까..........

## 남발하는 if
`getHelperText`같은 경우 조건에 따라 return되는 텍스트가 다르고 여러 조건으로인해
if, else if를 남발중.... 한눈에 딱 정리되어 보이는 코드를 만들려고 했는데, 조건문들로 인해 크게 정리되어보이진 않는다.....(남이 봤을때 쉽게 이해 못할 것 같은 느낌)