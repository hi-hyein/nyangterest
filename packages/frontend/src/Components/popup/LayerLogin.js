import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LayerLogin extends Component {
    state = {

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
                    />
                </div>
                <div style={{marginTop:"30px",paddingTop:"30px", borderTop:"1px solid #eee"}}>
                <Button fullWidth={true} size="large" variant="contained" color="primary">
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