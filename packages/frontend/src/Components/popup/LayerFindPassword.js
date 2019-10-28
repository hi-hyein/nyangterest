import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

// eslint-disable-next-line
// const NAME_FORMAT = /^[가-힣a-zA-Z]{2,20}$/;
// const PASSWORD_FORMAT = /^(?=[a-zA-Z0-9!@$%^*])(?!.*[^a-zA-Z0-9!@$%^*]).{6,15}$/;

class LayerFindPassword extends Component {
    state = {
        email: "",
        emailValidateMessage: "가입된 이메일 주소로 임시 비밀번호를 보내드립니다. 비밀번호는 회원정보 수정에서 변경 가능합니다.",
        emailForm: false
    }

    findEmailOnclick = () => {
        this.setState({
            emailForm: true
        })
    }

    render(){
        const {email,emailValidateMessage, emailForm} = this.state
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
                        onChange=""
                        fullWidth={true}
                        error=""
                    />
                    <FormHelperText id="component-helper-text">
                        {emailValidateMessage}
                    </FormHelperText>
                </div> 
                <div style={{marginTop:"20px"}}>
                    <Button fullWidth={true} size="large" variant="contained" color="primary" onClick="">
                        계속
                    </Button>
                </div>
                <div style={{marginTop:"30px", paddingTop:"30px" , borderTop: "1px solid #eee"}}>
                    <div style={{marginBottom:"10px", fontSize:"14px",color: "#808080"}}>
                        가입한 이메일주소를 잊으셨습니까?
                    </div>
                    <Button fullWidth={true} size="large" variant="contained" color="default" onClick="">
                        가입한 이메일주소 찾기
                    </Button>
                </div> 
            </div>
        )
    }
}

export default LayerFindPassword;