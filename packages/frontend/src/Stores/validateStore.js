import { observable, action } from "mobx";

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