import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import { observer, inject } from "mobx-react";

@inject("validateStore")
@observer
class LayerModifyInfo extends Component {
    state = {
        signupDate: "",
        name: {
            value: "",
            validate: false,
            message: "",
        },
        email: {
            value: JSON.parse(localStorage.getItem("userInfo")),
            validate: false,
            message: "",
        },
        password: {
            value: "",
            validate: null,
            message: "",
            check: {
                value: "",
                validate: null,
                message: "",
            },
        },
    };

    // 이름 유효성 검사, state 저장
    nameOnChange = (e) => {
        const value = e.target.value;
        this.props.validateStore.validateValue = value;

        this.setState((prevState) => ({
            name: {
                ...prevState.name,
                value: value,
                validate: this.props.validateStore.getValidate("NAME"),
            },
        }));
    };

    // 비밀번호 유효성 검사, state 저장
    passwordOnChange = (e) => {
        const value = e.target.value;
        this.props.validateStore.validateValue = value;

        this.setState((prevState) => ({
            password: {
                ...prevState.password,
                value: value,
            },
        }));

        // 비밀번호 유효성검사
        const validate = this.props.validateStore.getValidate("PASSWORD");
        if (!validate) {
            if (e.target.value.length <= 0) {
                this.setState((prevState) => ({
                    password: {
                        ...prevState.password,
                        validate: null,
                    },
                }));
            } else {
                this.setState((prevState) => ({
                    password: {
                        ...prevState.password,
                        validate: false,
                    },
                }));

                if (e.target.value.length > 15) {
                    this.setState((prevState) => ({
                        password: {
                            ...prevState.password,
                            message: "15자 이하로 입력해주세요.",
                        },
                    }));
                }

                if (e.target.value.length < 6) {
                    this.setState((prevState) => ({
                        password: {
                            ...prevState.password,
                            message: "최소 6자이상 입력해주세요.",
                        },
                    }));
                }
            }
        } else {
            this.setState((prevState) => ({
                password: {
                    ...prevState.password,
                    validate: true,
                },
            }));
        }
    };

    passwordCheckOnChange = (e) => {
        const value = e.target.value;

        this.setState((prevState) => ({
            password: {
                ...prevState.password,
                check: {
                    ...prevState.password.check,
                    value: value,
                },
            },
        }));

        if (this.state.password === value) {
            this.setState((prevState) => ({
                password: {
                    ...prevState.password,
                    check: {
                        ...prevState.password.check,
                        validate: true,
                        message: "입력된 비밀번호와 일치합니다.",
                    },
                },
            }));
        } else {
            this.setState((prevState) => ({
                password: {
                    ...prevState.password,
                    check: {
                        ...prevState.password.check,
                        validate: false,
                        message: "입력된 비밀번호와 일치하지 않습니다.",
                    },
                },
            }));
        }
    };

    // 서버에서 데이터 가져오기
    getMemberData = () => {
        console.log(this.state.email.value);
        fetch("/memberInfo", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                email: this.state.email.value,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                // 이름, 가입날짜 셋팅
                this.setState((prevState) => ({
                    signupDate: json._signupDate,
                    name: {
                        ...prevState.name,
                        value: json._username ? json._username : "",
                    },
                }));
            });
    };

    //회원정보수정 버튼
    modifyOnClick = () => {
        if (
            this.state.name.validate !== null ||
            this.state.password.validate !== null ||
            this.state.password.check.validate !== null
        ) {
            if (
                this.state.name.validate ||
                (this.state.password.validate &&
                    this.state.password.check.validate)
            ) {
                fetch("/modifyMemberInfo", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        userEmail: this.state.email.value,
                        modifyName: this.state.name.value,
                        modifyPassword:
                            this.state.password.validate &&
                            this.state.password.check.validate
                                ? this.state.password.value
                                : undefined,
                    }),
                })
                    .then((res) => res.json())
                    .then((json) => {
                        if (json.modifyState) {
                            alert("수정이 완료되었습니다.");
                            // 변경상태 , 비밀번호 초기값으로 돌려주자
                            this.setState((prevState) => ({
                                name: {
                                    ...prevState.name,
                                    validate: null,
                                },
                                password: {
                                    ...prevState.password,
                                    value: "",
                                    validate: null,
                                    check: {
                                        ...prevState.password.check,
                                        value: "",
                                        validate: null,
                                    },
                                },
                            }));
                        } else {
                            alert("오류로 인해 수정이 완료되지 않았습니다.");
                        }
                    });
            } else {
                alert("알맞게 입력해주세요");
            }
        } else {
            alert("수정된 내용이 없습니다.");
        }
    };

    // 데이터 셋팅
    componentWillMount() {
        this.getMemberData();
    }

    // input error check
    getError = {
        nameResult: false,
        passwordResult: false,
        passwordCheckResult: false,

        getNameError: () => {
            if (this.state.name.value !== "") {
                this.getError.nameResult = !this.state.name.validate;
            } else {
                this.getError.nameResult = false;
            }

            return this.getError.nameResult;
        },

        getPasswordError: () => {
            if (this.state.password.value !== "") {
                this.getError.passwordResult = !this.state.password.validate;
            } else {
                this.getError.passwordResult = false;
            }
            return this.getError.passwordResult;
        },

        getPasswordCheckError: () => {
            if (this.state.password.check.value !== "") {
                this.getError.passwordCheckResult = !this.state.password.check
                    .validate;
            } else {
                this.getError.passwordCheckResult = false;
            }
            return this.getError.passwordCheckResult;
        },
    };

    render() {
        const { name, userEmail, signupDate, password } = this.state;
        return (
            <div>
                <div>
                    <TextField
                        id='member-name'
                        label='이름'
                        value={name.value}
                        placeholder='홍길동'
                        margin='normal'
                        variant='outlined'
                        type='text'
                        onChange={this.nameOnChange}
                        fullWidth={true}
                        error={this.getError.getNameError()}
                    />
                    {name.message.length > 0 &&
                        !name.validate &&
                        name.validate !== null && (
                            <FormHelperText id='component-helper-text'>
                                {name.message}
                            </FormHelperText>
                        )}
                </div>
                <div>
                    <TextField
                        id='member-email'
                        label='이메일주소'
                        value={userEmail}
                        margin='normal'
                        variant='outlined'
                        fullWidth={true}
                        disabled
                    />
                </div>
                <div>
                    <TextField
                        id='member-password'
                        label='비밀번호'
                        value={password.value}
                        placeholder='6자 이상 15자이하'
                        margin='normal'
                        variant='outlined'
                        type='password'
                        onChange={this.passwordOnChange}
                        fullWidth={true}
                        error={!password.validate && password.validate !== null}
                    />
                    {password.message.length > 0 &&
                        !password.validate &&
                        password.validate !== null && (
                            <FormHelperText id='component-helper-text'>
                                {password.message}
                            </FormHelperText>
                        )}
                </div>
                <div>
                    <TextField
                        id='member-password-check'
                        label='비밀번호 확인'
                        value={password.check.value}
                        placeholder='비밀번호를 다시한번 입력해주세요'
                        margin='normal'
                        variant='outlined'
                        type='password'
                        onChange={this.passwordCheckOnChange}
                        fullWidth={true}
                        error={
                            !password.check.validate &&
                            password.check.validate !== null
                        }
                    />
                    {password.check.value.length > 0 &&
                        password.check.vaidate !== null && (
                            <FormHelperText id='component-helper-text'>
                                {password.check.message}
                            </FormHelperText>
                        )}
                </div>
                <div>
                    <TextField
                        id='member-date'
                        label='가입일자'
                        value={signupDate}
                        margin='normal'
                        variant='outlined'
                        type='text'
                        fullWidth={true}
                        disabled
                    />
                </div>
                <div
                    style={{
                        marginTop: "30px",
                        paddingTop: "30px",
                        borderTop: "1px solid #eee",
                    }}
                >
                    <Button
                        fullWidth={true}
                        size='large'
                        variant='contained'
                        style={{ background: "#a1ceab", color: "#fff" }}
                        onClick={this.modifyOnClick}
                    >
                        회원정보 수정하기
                    </Button>
                </div>
            </div>
        );
    }
}

export default LayerModifyInfo;
