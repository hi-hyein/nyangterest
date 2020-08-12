# Validate Store

## validate의 class화가 부적합한 이유
- class 내부의 변수가 변경되지 않는다.

## validate를 store에 넣어 전역화 시키기!
validate기능의 위치를 고민하고 있었는데
윤우님에게 코드리뷰를 부탁드렸는데 바로 이부분에 대해 리뷰해주셨다(감사ㅎㅎ)
store 생각을 왜 못했지...

```javascript
export default class validateStore {
	@observable validateValue = '';

	constructor(root) {
		this.root = root;

		// 고정 정규식
		this.mailFormat  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        this.passwordFormat = /^(?=[a-zA-Z0-9!@$%^*#])(?!.*[^a-zA-Z0-9!@$%^*#]).{6,15}$/;
        this.nameFormat = /^[가-힣a-zA-Z]{2,20}$/;
	}

    @action
    // type을 받아 type별로 validate분기처리
	getValidate = (type) => {
		let reg = '';
		
        // eslint-disable-next-line default-case
        switch(type) {
            case 'MAIL':
                reg = this.mailFormat;
                break;
            case 'PASSWORD':
                reg = this.passwordFormat;
                break;
            case 'NAME':
                reg = this.nameFormat;
                break;
		}
		
        return reg.test(this.validateValue);
    }
}
```

### 궁금한점
```
this.mailFormat  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
this.passwordFormat = /^(?=[a-zA-Z0-9!@$%^*#])(?!.*[^a-zA-Z0-9!@$%^*#]).{6,15}$/;
this.nameFormat = /^[가-힣a-zA-Z]{2,20}$/;
```
정규식은 변하지 않을것이라 생각했는데 생각해보니..
나중에 정규식을 변경해서 지정할 수도 있겠다 생각을 했다.
정규식을 변경해서 유효성검증을 하고 싶을 때도 생각해서 만들어 놓아야 할까?