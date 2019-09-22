import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { observer, inject } from "mobx-react";

const MAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const PASSWORD_FORMAT = /^[a-zA-Z0-9]{6,15}$/

@inject('loginStore')
@observer
class LayerLogin extends Component {
    state = {
        userId: "",
        userIdValidate: false,
        userIdMatchText: "사용 가능한 이메일 주소입니다",
        userIdNotMatchText: "잘못된 이메일 형식 입니다",
        userPassword:'',
        userPasswordValidate: false,
        userPasswordMatchText: "사용 가능한 비밀번호입니다",
        userPasswordNotMatchText: "6자이상 15자 이하 입력해주세요",
    }

    validate = (format, value) => {
        const reg = format;
		const validate = reg.test(value);
		return validate;
    }

    userIdHandler = (e) => {
        const value = e.target.value
        const Validate = this.validate(MAIL_FORMAT, value)

        this.setState({
            userId: e.target.value
        })

        if(Validate){
            this.setState({
                userIdValidate: true
            })
        }else {
            this.setState({
                userIdValidate: false,
            })
        }
    }

    userPwHandler = (e) => {
        const value = e.target.value
        const Validate = this.validate(PASSWORD_FORMAT, value)

        this.setState({
            userPassword: e.target.value
        })

        if(Validate){
            this.setState({
                userPasswordValidate: true
            })
        }else {
            this.setState({
                userPasswordValidate: false,
            })
        }
    }

    sendUserInfo = () => {
        const state = this.state
        const stateTojson = JSON.stringify(state)
        const {changeUserId,changeUserState} = this.props.loginStore

        if ( state.userIdValidate && state.userPasswordValidate ){
            fetch('/signin',{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: stateTojson,
            })
            .then(res=>res.json()).then(json=>{
                if(!json.sucess){
                    console.log('로그인실패')
                }else {
                    console.log('로그인성공')
                    console.log(json._userId)
                    changeUserState()
                    changeUserId(json._userId)
                }
            })
        }else {
            alert("아이디와 패스워드를 알맞게 입력해주세요")
        }
    }

    render(){
        const {userId, userIdValidate, userIdMatchText, userIdNotMatchText, userPassword, userPasswordValidate, userPasswordMatchText, userPasswordNotMatchText} = this.state
        return (    
            <div>      
                <div>
                    <TextField
                        id="userIdInput"
                        label="이메일주소"
                        placeholder="ex)nyangterest@email.com"
                        margin="normal"
                        variant="outlined"
                        fullWidth={true}
                        onChange={this.userIdHandler}
                        error={!userIdValidate&&userId!==""}
                    />
                    <FormHelperText id="component-helper-text">
                        { userIdValidate && userIdMatchText}
                        { !userIdValidate&&userId!=="" && userIdNotMatchText }
                    </FormHelperText>
                </div>
                <div>
                    <TextField
                        id="userPasswordInput"
                        label="비밀번호"
                        placeholder="비밀번호를 입력해주세요"
                        margin="normal"
                        variant="outlined"
                        type="password"
                        fullWidth={true}
                        onChange={this.userPwHandler}
                        error={!userPasswordValidate&&userPassword!==""}
                    />
                    <FormHelperText id="component-helper-text">
                        { userPasswordValidate && userPasswordMatchText}
                        { !userPasswordValidate&&userPassword!=="" && userPasswordNotMatchText }
                    </FormHelperText>
                </div>
                <div style={{marginTop:"30px",paddingTop:"30px", borderTop:"1px solid #eee"}}>
                <Button fullWidth={true} size="large" variant="contained" color="primary" onClick={this.sendUserInfo}>
                    로그인
                </Button>
                <Button fullWidth={true} size="large" variant="contained" style={{marginTop:"15px"}}>
                    회원가입
                </Button>
                </div>
            </div>
        )
        
    }
}

export default LayerLogin;