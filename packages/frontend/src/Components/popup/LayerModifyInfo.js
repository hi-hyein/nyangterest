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
        userEmail: JSON.parse(localStorage.getItem("userInfo")),
        signupDate: "",
        nameValidate: null,
        nameValidateMessage : "",
        password: "",
        passwordValidate: null,
        passwordValidateMessage : "",
        passwordCheck: "",
        passwordCheckValidate: null,
        passwordCheckValidateMessage: "",
    }

    // 이름 유효성 검사, state 저장
    nameOnChange = (e) => {
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
    }

    // 비밀번호 유효성 검사, state 저장
    passwordOnChange = (e) => {
        // 이름저장
        this.setState({
            password : e.target.value
        })

        // 이름 유효성검사
        const validate = PASSWORD_FORMAT.test(e.target.value);
        if(!validate){
            if(e.target.value.length <= 0) {
                this.setState({
                    passwordValidate: null,
                })
            }else {
                this.setState({
                    passwordValidate: false,
                })

                if(e.target.value.length > 15){
                    this.setState({
                        passwordValidateMessage: "15자 이하로 입력해주세요."
                    })
                }

                if(e.target.value.length < 6){
                    this.setState({
                        passwordValidateMessage: "최소 6자이상 입력해주세요"
                    })
                }
            }
        }else {
            this.setState({
                passwordValidate: true
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
                passwordCheckValidateMessage : "입력된 비밀번호와 일치합니다."
                
			})
		} else {
			this.setState({
                passwordCheckValidate: false,
                passwordCheckValidateMessage : "입력된 비밀번호와 일치하지 않습니다."
			})
		}
    }

    // 서버에서 데이터 가져오기
    getMemberData =  () => {
        console.log(this.state.userEmail)
		fetch("/memberInfo",{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email: this.state.userEmail
            })
        })
        .then(res=>res.json()).then(json=>{
            console.log(json)
            // 이름 셋팅
            if(json._username !== null){
                this.setState({
                    name: json._username,
                })
            }

            // 가입날짜 셋팅
            this.setState({
                signupDate: json._signupDate,
            })
        })

    }

    //회원정보수정 버튼
    modifyOnClick = () => {
        if(this.state.nameValidate !==null || this.state.passwordValidate !==null || this.state.passwordCheckValidate !==null ){
            if(this.state.nameValidate || (this.state.passwordValidate && this.state.passwordCheckValidate)){
                fetch("/modifyMemberInfo",{
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        userEmail: this.state.userEmail,
                        modifyName: this.state.name,
                        modifyPassword: this.state.passwordValidate && this.state.passwordCheckValidate ? this.state.password : undefined
                    })
                }).then(res=>res.json()).then(json=>{
                    if(json.modifyState){
                        alert("수정이 완료되었습니다.")
                        // 변경상태 , 비밀번호 초기값으로 돌려주자
                        this.setState({
                            nameValidate: null,
                            passwordValidate: null,
                            passwordCheckValidate: null,
                            paswword: "",
                            passwordCheck: ""
                        })
                    }else {
                        alert("오류로 인해 수정이 완료되지 않았습니다.")
                    }
                })
            }else {
                alert("알맞게 입력해주세요")
            }
        }else {
            alert("수정된 내용이 없습니다.")
        }
    }
     
    // 데이터 셋팅
    componentWillMount () {
        this.getMemberData()
    } 

    render(){
        const { name,userEmail, signupDate, nameValidate, nameValidateMessage, password, passwordValidate, passwordValidateMessage,passwordCheck, passwordCheckValidate, passwordCheckValidateMessage, } = this.state
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
                        onChange={this.nameOnChange}
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
                        value={userEmail}
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
                        value={password}
                        placeholder="6자 이상 15자이하"
                        margin="normal"
                        variant="outlined"
                        type="password"
                        onChange={this.passwordOnChange}
                        fullWidth={true}
                        error={!passwordValidate && passwordValidate !== null}
                    />
                    {passwordValidateMessage.length>0 && !passwordValidate &&  passwordValidate !== null &&
                        <FormHelperText id="component-helper-text">
                            {passwordValidateMessage}
                         </FormHelperText>
                    }
                </div>
                <div>
                    <TextField
                        id="member-password-check"
                        label="비밀번호 확인"
                        value={passwordCheck}
                        placeholder="비밀번호를 다시한번 입력해주세요"
                        margin="normal"
                        variant="outlined"
                        type="password"
                        onChange={this.passwordCheckOnChange}
                        fullWidth={true}
                        error={!passwordCheckValidate && passwordCheckValidate !== null}
                    />
                   {passwordCheckValidateMessage.length>0  &&  passwordCheckValidate !== null &&
                        <FormHelperText id="component-helper-text">
                            {passwordCheckValidateMessage}
                         </FormHelperText>
                    }
                </div>
                <div>
                    <TextField
                        id="member-date"
                        label="가입일자"
                        value={signupDate}
                        margin="normal"
                        variant="outlined"
                        type="text"
                        fullWidth={true}
                        disabled
                    />
                </div> 
                <div style={{marginTop:"30px",paddingTop:"30px", borderTop:"1px solid #eee"}}>
                <Button fullWidth={true} size="large" variant="contained" color="primary" onClick={this.modifyOnClick}>
                    회원정보 수정하기
                </Button>
                </div>
            </div>
        )
        
    }
}

export default LayerModifyInfo;