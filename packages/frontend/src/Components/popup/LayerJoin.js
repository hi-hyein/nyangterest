import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import AgreeLink from "../agree/AgreeLink";
import Service from "../agree/Service";
import Privacy from "../agree/Privacy";
import ShowHelperText from "../ShowHelperText";
import Validate from "../../utils/validate";

class LayerJoin extends Component {
    state = {
        email: {
            value: "",
            validate: false,
            overlapping: null,
            getValidateText: () => {
                let message = "잘못된 이메일 형식 입니다";
                if (this.state.email.overlapping) {
                    message =
                        "이미 가입된 이메일입니다. 다른 이메일을 입력해주세요";
                } else if (this.state.email.validate) {
                    message = "사용 가능한 이메일 주소입니다";
                }
                return message;
            },
            getError: () => {
                let error = false;

                if (this.state.email.value !== "") {
                    error =
                        !this.state.email.validate ||
                        this.state.email.overlapping;
                }

                return error;
            },
        },
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

    emailOnChange = (e) => {
        const value = e.target.value;

        this.setState((prevState) => ({
            email: {
                ...prevState.email,
                value: value,
            },
        }));

        // 입력된 이메일값이 공백이 아닐때
        if (value === "") {
            return;
        }
        // 이메일 중복 여부 체크
        fetch(`/user/exists/email`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                useremail: value,
            }),
        })
        .then((res) => res.json())
        .then((json) => {
            this.setState((prevState) => ({
                email: {
                    ...prevState.email,
                    overlapping: json,
                    validate: Validate.getEmalValidate(value),
                },
            }));
        });
    };

    passwordOnChange = (e) => {
        const value = e.target.value;

        this.setState((prevState) => ({
            password: {
                ...prevState.password,
                value: value,
            },
        }));

        this.setState((prevState) => ({
            password: {
                ...prevState.password,
                validate: Validate.getPasswordValidate(value),
            },
        }));
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

        if (this.state.password.value === value) {
            this.setState((prevState) => ({
                password: {
                    ...prevState.password,
                    check: {
                        ...prevState.password.check,
                        validate: true,
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
                    },
                },
            }));
        }
    };

    sendJoinInfo = () => {
        const { email, password } = this.state;
        const userInfo = {
            email: email.value,
            password: password.value,
        };

        if (
            email.validate &&
            password.validate &&
            password.check.validate &&
            !email.overlapping
        ) {
            fetch("/user/join", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(userInfo),
            })
                .then((res) => res.json())
                .then((json) => {
                    if (json) {
                        alert(
                            "회원가입이 완료되었습니다! 이메일 인증을 완료해주세요!"
                        );
                    } else {
                        alert(
                            "회원가입에 실패했습니다. 고객센터에 문의주세요."
                        );
                    }
                });
        } else {
            alert("모든 입력사항을 알맞게 입력해주세요");
        }
    };

    render() {
        const { email, password } = this.state;
        return (
            <div>
                <div>
                    <TextField
                        id='emailAddress'
                        label='이메일주소'
                        value={email.value}
                        placeholder='ex)nyangterest@email.com'
                        margin='normal'
                        variant='outlined'
                        onChange={this.emailOnChange}
                        error={email.getError()}
                        fullWidth={true}
                    />
                    {ShowHelperText(email)}
                </div>
                <div>
                    <TextField
                        id='password'
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
                        id='passwordCheck'
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
                <div
                    className='check-area'
                    style={{
                        marginTop: "10px",
                        paddingTop: "10px",
                        borderTop: "1px solid #eee",
                    }}
                >
                    <Router>
                        <label htmlFor='checkAgree'>
                            <Checkbox
                                style={{ background: "#fff", color: "#a1ceab" }}
                            />
                            <AgreeLink />
                            <Switch>
                                <Route
                                    path='/agree/service'
                                    component={Service}
                                />
                                <Route
                                    path='/agree/privacy'
                                    component={Privacy}
                                />
                            </Switch>
                        </label>
                    </Router>
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
                        onClick={this.sendJoinInfo}
                    >
                        계속하기
                    </Button>
                    {/* 구글 로그인과 동일함 */}
                    <a
                        target='_blank'
                        href='http://localhost:8080/auth/google'
                        style={{
                            margin: 20,
                            padding: 10,
                            background: "red",
                            display: "block",
                        }}
                    >
                        구글 회원가입
                    </a>
                </div>
            </div>
        );
    }
}

export default LayerJoin;
