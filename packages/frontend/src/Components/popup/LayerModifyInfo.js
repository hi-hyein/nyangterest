import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ShowHelperText from "../ShowHelperText";
import Validate from "../../utils/validate";
class LayerModifyInfo extends Component {
    state = {
        signupDate: "",
        name: {
            value: "",
            validate: false,
            getValidateText: () =>
                this.state.name.validate === true
                    ? "사용 가능한 이름 형식 입니다."
                    : "2자이상 특수문자 사용불가",
            getError: () => {
                let error = false;

                if (this.state.name.validate) {
                    return (error = true);
                }

                return error;
            },
        },
        email: JSON.parse(localStorage.getItem("userInfo")),
        password: {
            value: "",
            validate: false,
            getValidateText: () =>
                this.state.password.validate === true
                    ? "사용 가능한 비밀번호입니다"
                    : "6자이상 15자 이하 입력해주세요",
            getError: () => {
                let error = false;
                if (this.state.password.value !== "") {
                    error = !this.state.password.validate;
                }
                return error;
            },
            check: {
                value: "",
                validate: false,
                getValidateText: () => {
                    if (
                        this.state.password.check.value ===
                        this.state.password.value
                    ) {
                        return "비밀번호가 일치합니다";
                    } else {
                        return "비밀번호가 일치하지 않습니다";
                    }
                },
                getError: () => {
                    let error = false;
                    if (this.state.password.check.value !== "") {
                        error = !this.state.password.check.validate;
                    }
                    return error;
                },
            },
        },
    };

    // 이름 유효성 검사, state 저장
    nameOnChange = (e) => {
        const value = e.target.value;

        this.setState((prevState) => ({
            name: {
                ...prevState.name,
                value: value,
                validate: Validate.getNameValidate(value),
            },
        }));
    };

    // 비밀번호 유효성 검사, state 저장
    passwordOnChange = (e) => {
        const value = e.target.value;

        this.setState((prevState) => ({
            password: {
                ...prevState.password,
                value: value,
            },
        }));

        // 비밀번호 유효성검사
        const validate = Validate.getPasswordValidate(value);
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
        console.log(this.state.email);
        fetch("/memberInfo", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                email: this.state.email,
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
                        userEmail: this.state.email,
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

    render() {
        const { name, email, signupDate, password } = this.state;

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
                        error={name.getError()}
                    />
                    {ShowHelperText(name)}
                </div>
                <div>
                    <TextField
                        id='member-email'
                        label='이메일주소'
                        value={email}
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
                        error={password.getError()}
                    />
                    {ShowHelperText(password)}
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
                        error={password.check.getError()}
                    />
                    {ShowHelperText(password.check)}
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
