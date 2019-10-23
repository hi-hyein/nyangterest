import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

// eslint-disable-next-line
const NAME_FORMAT = /^[가-힣a-zA-Z]{2,20}$/;
const PASSWORD_FORMAT = /^(?=[a-zA-Z0-9!@$%^*])(?!.*[^a-zA-Z0-9!@$%^*]).{6,15}$/;

class LayerModifyInfo extends Component {
    state = {
        name: "",
        nameValidate: null,
        nameValidateMessage : "",
    }

    render(){
        const { name, nameValidate, nameValidateMessage } = this.state
        return (
            
            <div>     
                <div>
                    <TextField
                        id="member-name"
                        label="이름"
                        value={name}
                        placeholder="홍길동"
                        margin="normal"
                        variant="outlined"
                        type="text"
                        onChange={(e)=>{
                            // 이름저장
                            this.setState({
                                name : e.target.value
                            })

                            // 이름 유효성검사
                            const validate = NAME_FORMAT.test(e.target.value);
                            if(!validate){
                                if(e.target.value.length <= 0) {
                                    this.setState({
                                        nameValidate: null,
                                    })
                                }else {
                                    this.setState({
                                        nameValidate: false,
                                    })

                                    if(e.target.value.length > 20){
                                        this.setState({
                                            nameValidateMessage: "20자 이하로 입력해주세요."
                                        })
                                    }

                                    if(e.target.value.length < 2){
                                        this.setState({
                                            nameValidateMessage: "최소 2자이상 입력해주세요"
                                        })
                                    }
                                }
                            }else {
                                this.setState({
                                    nameValidate: true
                                })
                            }
                        }}
                        fullWidth={true}
                        error={!nameValidate && nameValidate !== null}
                    />
                    {nameValidateMessage.length>0 && !nameValidate &&  nameValidate !== null &&
                        <FormHelperText id="component-helper-text">
                            {nameValidateMessage}
                         </FormHelperText>
                    }
                </div> 
                <div>
                    <TextField
                        id="member-email"
                        label="이메일주소"
                        value="henyy100@naver.com"
                        margin="normal"
                        variant="outlined"
                        fullWidth={true}
                        disabled
                    />
                </div>
                <div>
                    <TextField
                        id="member-password"
                        label="비밀번호"
                        value=""
                        placeholder="6자 이상 15자이하"
                        margin="normal"
                        variant="outlined"
                        type="password"
                        onChange=""
                        fullWidth={true}
                        error=""
                    />
                    <FormHelperText id="component-helper-text">
                        
                    </FormHelperText>
                </div>
                <div>
                    <TextField
                        id="member-password-check"
                        label="비밀번호 확인"
                        value=""
                        placeholder="비밀번호를 다시한번 입력해주세요"
                        margin="normal"
                        variant="outlined"
                        type="password"
                        onChange=""
                        fullWidth={true}
                        error=""
                    />
                    <FormHelperText id="component-helper-text">
                       
                    </FormHelperText>
                </div>
                <div>
                    <TextField
                        id="member-date"
                        label="가입일자"
                        value="2019-10-23"
                        margin="normal"
                        variant="outlined"
                        type="text"
                        fullWidth={true}
                        disabled
                    />
                </div> 
                <div style={{marginTop:"30px",paddingTop:"30px", borderTop:"1px solid #eee"}}>
                <Button fullWidth={true} size="large" variant="contained" color="primary" onClick="">
                    회원정보 수정하기
                </Button>
                </div>
            </div>
        )
        
    }
}

export default LayerModifyInfo;