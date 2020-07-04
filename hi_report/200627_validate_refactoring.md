# Validate Refactoring

## 문제점
- 비슷한 코드가 유효성 검사를 하는 코드에서 반복되고있다.
```javascript
// eslint-disable-next-line
const MAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const PASSWORD_FORMAT = /^(?=[a-zA-Z0-9!@$%^*#])(?!.*[^a-zA-Z0-9!@$%^*#]).{6,15}$/

validate = (format, value) => {
		const reg = format;
		const validate = reg.test(value);
		return validate;
	}

	emailOnChange = (e) => {
		const value = e.target.value
		const Validate = this.validate(MAIL_FORMAT, value)

		this.setState(prevState => ({
			email: {
				...prevState.email,
				value: value
			}
		}))
		
		if (Validate) {
			this.setState(prevState => ({
				email: {
					...prevState.email,
					validate: true,
				}
			}));
		} else {
			this.setState(prevState => ({
				email: {
					...prevState.email,
					validate: false,
				}
			}))
		}

```

## 개선방법
- 응집도있는 코드를 만들어라
- validate 함수를 state 안에 넣어보기

> https://webactually.com/2018/02/%EB%AA%85%ED%99%95%ED%95%9C-%EC%BD%94%EB%93%9C-%EC%9E%91%EC%84%B1%EB%B2%95/


## 개선내용

각각의 파일에 들어있던 validate를 연관성있는 변수, 기능들을 모아 별도의 class로 생성하였다.
```javascript
class Validate {
    constructor(value, type) {
        // eslint-disable-next-line
		this.mailFormat  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        this.passwordFormat = /^(?=[a-zA-Z0-9!@$%^*#])(?!.*[^a-zA-Z0-9!@$%^*#]).{6,15}$/;
        this.nameFormat = /^[가-힣a-zA-Z]{2,20}$/;
        this.validateValue = value;
        this.type = type;
    }
    
    get MailFormat() {
        return this.mailFormat;
    }

    get PasswordFormat() {
        return this.passwordFormat;
    }

    get NameFormat() {
        return this.nameFormat;
    }

    get ValidateValue() {
        return this.validateValue;
    }

    get Type() {
        return this.type
    }

    getValidate() {
        let reg = '';
        // eslint-disable-next-line default-case
        switch(this.Type) {
            case 'MAIL':
                reg = this.MailFormat;
                break;
            case 'PASSWORD':
                reg = this.PasswordFormat;
                break;
            case 'NAME':
                reg = this.nameFormat;
                break;
        }
        return reg.test(this.validateValue);
    }
}

export default Validate;
```

그리고 validate가 필요한 컴포넌트에 import로 불러와 인스턴스를 생성하여 사용하였다.

```javascript
import Validate from "../Validate";

// 인스턴스 생성 후 mail validate 검증
const validate = new Validate(value,'MAIL').getValidate(); // result validate = boolean
```

## 궁금한점
- ui가 아닌 기능단위의 파일은 어디에 위치하는게 좋을까
- class에서 private가 필요한 이유