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