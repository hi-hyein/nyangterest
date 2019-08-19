import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import AgreeLink from "../AgreeLink";
import Service from "../agree/Service";
import Privacy from "../agree/Privacy";

const MAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const PASSWORD_FORMAT = /^[a-zA-Z0-9]{6,15}$/

class LayerJoin extends Component {
    state = {
        email:"",
        emailValidate: false,
        emailMatchText: "사용 가능한 이메일 주소입니다",
        emailNotMatchText: "잘못된 이메일 형식 입니다",
        password:"",
        passwordValidate: false,
        passwordMatchText: "사용 가능한 비밀번호입니다",
        passwordNotMatchText: "6자이상 15자 이하 입력해주세요",
        passwordCheck:"",
        passwordCheckValidate: false,
    }

    validate = (format, value) => {
        const reg = format;
		const validate = reg.test(value);
		return validate;
    }

    emailOnChange = (e) => {
        const value = e.target.value
        const Validate = this.validate(MAIL_FORMAT, value)

        this.setState ({
            email: value
        })
        
        if(Validate){
            this.setState({
                emailValidate: true
            })
        }else {
            this.setState({
                emailValidate: false,
            })
        }
    }

    passwordOnChange = (e) => {
        const value = e.target.value
        const Validate = this.validate(PASSWORD_FORMAT, value)

        this.setState ({
            password: value
        })

        if(Validate){
            this.setState({
                passwordValidate: true
            })
        }else {
            this.setState({
                passwordValidate: false,
            })
        }
    }

    passwordCheckOnChange = (e) => {
        const value = e.target.value

        this.setState ({
            passwordCheck: value
        })

        if (this.state.password === value) {
			this.setState({
				passwordCheckValidate: true,
			})
		} else {
			this.setState({
				passwordCheckValidate: false,
			})
		}
    }

    sendJoinInfo = ()=> {
        const state = this.state
        const stateTojson = JSON.stringify(state)

        if ( state.emailValidate && state.passwordValidate && state.passwordCheckValidate){
            fetch('/', {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: stateTojson,
			});
            alert("회원가입이 완료되었습니다. 입력된 이메일로 인증을 해주세요!")
        }else {
            alert("모든 입력사항을 알맞게 입력해주세요")
        }
    }

    render(){
        const {email, password, emailValidate, emailMatchText, emailNotMatchText, passwordValidate, passwordMatchText, passwordNotMatchText, passwordCheck, passwordCheckValidate} = this.state
    
        return (
            <div>      
                <div>
                    <TextField
                        id="outlined-name"
                        label="이메일주소"
                        value={email}
                        placeholder="ex)nyangterest@email.com"
                        margin="normal"
                        variant="outlined"
                        onChange={this.emailOnChange}
                        error={!emailValidate&&email!==""}
                        fullWidth={true}
                    />
                    <FormHelperText id="component-helper-text">
                        { emailValidate && emailMatchText}
                        { !emailValidate&&email!=="" && emailNotMatchText }
                    </FormHelperText>
                </div>
                <div>
                    <TextField
                        id="outlined-name"
                        label="비밀번호"
                        value={password}
                        placeholder="6자 이상 15자이하"
                        margin="normal"
                        variant="outlined"
                        type="password"
                        onChange={this.passwordOnChange}
                        fullWidth={true}
                        error={!passwordValidate&&password!==""}
                    />
                    <FormHelperText id="component-helper-text">
                        { passwordValidate && passwordMatchText}
                        { !passwordValidate&&password!=="" && passwordNotMatchText }
                    </FormHelperText>
                </div>
                <div>
                    <TextField
                        id="outlined-name"
                        label="비밀번호 확인"
                        value={passwordCheck}
                        placeholder="비밀번호를 다시한번 입력해주세요"
                        margin="normal"
                        variant="outlined"
                        type="password"
                        onChange={this.passwordCheckOnChange}
                        fullWidth={true}
                        error={!passwordCheckValidate&&passwordCheck!==""}
                    />
                    <FormHelperText id="component-helper-text">
                        {passwordCheckValidate && "비밀번호가 일치합니다"}
                        { !passwordCheckValidate&&passwordCheck!=="" && "비밀번호가 일치하지 않습니다" }
                    </FormHelperText>
                </div>
                <div className="check-area" style={{marginTop:"10px",paddingTop:"10px", borderTop:"1px solid #eee"}}>
                    <Router>
                        <label htmlFor="checkAgree">
                            <Checkbox
                                color="primary"
                            />
                            <AgreeLink />
                            <Switch>
                                <Route path="/agree/service" component={Service} />
                                <Route path="/agree/privacy" component={Privacy} />
                            </Switch>
                        </label>
                    </Router>
                </div>
                <div style={{marginTop:"30px",paddingTop:"30px", borderTop:"1px solid #eee"}}>
                <Button fullWidth={true} size="large" variant="contained" color="primary" onClick={this.sendJoinInfo}>
                    계속하기
                </Button>
                </div>
            </div>
        )
        
    }
}

export default LayerJoin;