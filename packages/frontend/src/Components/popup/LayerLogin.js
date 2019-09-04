import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LayerLogin extends Component {
    state = {
        userId:'',
        userPassword:''
    }

    userIdHandler = (e) => {
        this.setState({
            userId: e.target.value
        })
    }

    userPwHandler = (e) => {
        this.setState({
            userPassword: e.target.value
        })
    }

    sendUserInfo = () => {
        const state = this.state
        const stateTojson = JSON.stringify(state)

        fetch('/signin',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: stateTojson,
        }).then(res=>res.json()).then(json=>{
            if(!json.sucess){
                console.log('로그인실패')
            }else {
                console.log('로그인성공')
            }
        })
    }

    render(){
        return (
            
            <div>      
                <div>
                    <TextField
                        id="outlined-name"
                        label="이메일주소"
                        placeholder="ex)nyangterest@email.com"
                        margin="normal"
                        variant="outlined"
                        fullWidth={true}
                        onChange={this.userIdHandler}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-name"
                        label="비밀번호"
                        placeholder="비밀번호를 입력해주세요"
                        margin="normal"
                        variant="outlined"
                        type="password"
                        fullWidth={true}
                        onChange={this.userPwHandler}
                    />
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