import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

// eslint-disable-next-line
const MAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

class LayerFindPassword extends Component {
    state = {
        email: "",
        emailValidate: undefined,
        emailValidateMessage: "가입된 이메일 주소로 임시 비밀번호를 보내드립니다. 비밀번호는 회원정보 수정에서 변경 가능합니다.",
    }

    emailOnchange = (e)=>{
        const value = e.target.value

        this.setState({
            email: value
        })

        // 메일 유효성검사
        const validate = MAIL_FORMAT.test(value)

        if(!validate){
            // 입력값이 없을 경우
           if(value.length <= 0){
            this.setState({
                emailValidate: undefined,
                emailValidateMessage: "가입된 이메일 주소로 임시 비밀번호를 보내드립니다. 비밀번호는 회원정보 수정에서 변경 가능합니다."
            })
           }else {
            this.setState({
                emailValidate: false,
                emailValidateMessage: "잘못된 이메일 형식 입니다.",
            })
           }
        }else {
            this.setState({
                emailValidate: true,
                emailValidateMessage: "가입된 이메일 주소로 임시 비밀번호를 보내드립니다. 비밀번호는 회원정보 수정에서 변경 가능합니다."
            })
        }
    }


    // 계속 버튼 : 이메일 주소 전송
    findEmailOnclick = () => {
        const dataJson = JSON.stringify({
            email: this.state.email
        })

        console.log(this.state.email)

       fetch("/account/password/find",{
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: dataJson
       })
       .then((res)=>res.json())
       .then((json)=>{
           const matchState = json
           if(matchState.emailMatch){
                this.setState({
                    emailValidateMessage: "등록된 이메일입니다. 해당이메일로 임시비밀번호를 발송하였습니다." 
                })
           }else {
                this.setState({
                    emailValidateMessage: "등록되지 않은 이메일입니다." 
                })
           }
       })
    }

    render(){
        const {email,emailValidate,emailValidateMessage} = this.state
        return (
            <div> 
                <div>
                    <TextField
                        id="member-name"
                        label="가입한 이메일 주소"
                        value={email}
                        placeholder="nyangterest@email.com"
                        margin="normal"
                        variant="outlined"
                        type="text"
                        onChange={this.emailOnchange}
                        fullWidth={true}
                        error={!emailValidate && emailValidate !== undefined}
                    />
                    <FormHelperText id="component-helper-text">
                        {emailValidateMessage}
                    </FormHelperText>
                </div> 
                <div style={{marginTop:"20px"}}>
                    <Button fullWidth={true} size="large" variant="contained" color="primary" onClick={this.findEmailOnclick}>
                        계속
                    </Button>
                </div>
            </div>
        )
    }
}

export default LayerFindPassword;