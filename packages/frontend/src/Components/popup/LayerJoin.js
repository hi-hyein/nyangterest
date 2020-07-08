import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import AgreeLink from "../agree/AgreeLink";
import Service from "../agree/Service";
import Privacy from "../agree/Privacy";
import Validate from "../Validate";

class LayerJoin extends Component {
	state = {
		email: {
			value: '',
			validate: false,
			helper: {
				available : "사용 가능한 이메일 주소입니다",
				notAvailable : "잘못된 이메일 형식 입니다",
				overlapping: "이미 가입된 이메일입니다. 다른 이메일을 입력해주세요",
			},
			overlapping: null,
		},
		password: {
			value: '',
			validate: false,
			check: {
				value: '',
				validate: false,
			},
			helper: {
				available: "사용 가능한 비밀번호입니다",
				notAvailable: "6자이상 15자 이하 입력해주세요",
			}
		},
		helper: {
			complete: "회원가입이 완료되었습니다! 이메일 인증을 완료해주세요!",
			failed: "회원가입에 실패했습니다. 고객센터에 문의주세요."
		},
	}

	// Todo : helper text 빼기
	helperText = {
		email: {
			available : "사용 가능한 이메일 주소입니다",
			notAvailable : "잘못된 이메일 형식 입니다",
			overlapping: "이미 가입된 이메일입니다. 다른 이메일을 입력해주세요",
		},
		password: {
			available: "사용 가능한 비밀번호입니다",
			notAvailable: "6자이상 15자 이하 입력해주세요",
		},
		result: {
			complete: "회원가입이 완료되었습니다! 이메일 인증을 완료해주세요!",
			failed: "회원가입에 실패했습니다. 고객센터에 문의주세요."
		}
	}

	// input error 체크
	getError = {
		emailResult : false,
		passwordResult: false,
		passwordCheckResult: false,
		getEmailError : () => {
			if(this.state.email.value !== '') {
				this.getError.emailResult = !this.state.email.validate || this.state.email.overlapping
			}
			return this.getError.emailResult
		},

		getPasswordError : () => {
			if(this.state.password.value !== '') {
				this.getError.passwordResult = !this.state.password.validate
			}
			return this.getError.passwordResult
		},
		getPasswordCheckError : () => {
			if(this.state.password.check.value !== '') {
				this.getError.passwordCheckResult = !this.state.password.check.validate
			}
			return this.getError.passwordCheckResult
		}
	}

	emailOnChange = (e) => {
		const value = e.target.value
		const validate = new Validate(value,'MAIL').getValidate()

		this.setState(prevState => ({
			email: {
				...prevState.email,
				value: value
			}
		}))
		
		this.setState(prevState => ({
			email: {
				...prevState.email,
				validate: validate,
			}
		}));

		// 입력된 이메일값이 공백이 아닐때
		if(value !== '' ) {
			fetch(`/user/exists/email/${value}`)
			.then(res => res.json())
			.then(json => {
				this.setState(prevState => ({
					email: {
						...prevState.email,
						overlapping: json,
					}
				}));
			})
		}else {
			this.setState(prevState => ({
				email: {
					...prevState.email,
					overlapping: null,
				}
			}));
		}
	}

	passwordOnChange = (e) => {
		const value = e.target.value
		const validate = new Validate(value,'PASSWORD').getValidate()

		this.setState(prevState => ({
			password: {
				...prevState.password,
				value: value
			}
		}))

		this.setState(prevState=>({
			password: {
				...prevState.password,
				validate: validate
			}
		}))
	}

	passwordCheckOnChange = (e) => {
		const value = e.target.value

		this.setState(prevState => ({
			password : {
				...prevState.password,
				check: {
					...prevState.password.check,
					value: value
				},
			}
		}))

		if (this.state.password.value === value) {
			this.setState(prevState => ({
				password : {
					...prevState.password,
					check: {
						...prevState.password.check,
						validate: true
					}
				}
			}))
		} else {
			this.setState(prevState => ({
				password : {
					...prevState.password,
					check: {
						...prevState.password.check,
						validate: false
					}
				}
			}))
		}
	}

	sendJoinInfo = () => {
		const {email, password, helper} = this.state;
		const userInfo = {
			email: email.value,
			password: password.value
		}

		if (email.validate && password.validate && password.check.validate && !email.overlapping) {
			fetch('/user/join', {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify(userInfo),
			})
			.then(res => res.json()).then(json => {
				if(json) {
					alert(helper.complete)
				}else {
					alert(helper.failed)
				}
			})
		} else {
			alert("모든 입력사항을 알맞게 입력해주세요")
		}
	}

	render() {
		const { email, password } = this.state
		return (
			<div>
				<div>
					<TextField
						id="emailAddress"
						label="이메일주소"
						value={email.value}
						placeholder="ex)nyangterest@email.com"
						margin="normal"
						variant="outlined"
						onChange={this.emailOnChange}
						error={this.getError.getEmailError()}
						fullWidth={true}
					/>
					<FormHelperText id="component-helper-text">
						{email.validate && !email.overlapping && email.helper.available}
						{!email.validate  && email.value !== '' && email.helper.notAvailable}
						{email.overlapping && email.helper.overlapping}
					</FormHelperText>
				</div>
				<div>
					<TextField
						id="password"
						label="비밀번호"
						value={password.value}
						placeholder="6자 이상 15자이하"
						margin="normal"
						variant="outlined"
						type="password"
						onChange={this.passwordOnChange}
						fullWidth={true}
						error={this.getError.getPasswordError()}
					/>
					<FormHelperText id="component-helper-text">
						{password.validate && password.helper.available}
						{!password.validate  && password.value !== '' && password.helper.notAvailable}
					</FormHelperText>
				</div>
				<div>
					<TextField
						id="passwordCheck"
						label="비밀번호 확인"
						value={password.check.value}
						placeholder="비밀번호를 다시한번 입력해주세요"
						margin="normal"
						variant="outlined"
						type="password"
						onChange={this.passwordCheckOnChange}
						fullWidth={true}
						error={this.getError.getPasswordCheckError()}
					/>
					<FormHelperText id="component-helper-text">
						{password.check.value === password.value && password.check.value !== "" && "비밀번호가 일치합니다"}
						{password.check.value !== password.value && password.check.value !== "" && "비밀번호가 일치하지 않습니다"}
					</FormHelperText>
				</div>
				<div className="check-area" style={{ marginTop: "10px", paddingTop: "10px", borderTop: "1px solid #eee" }}>
					<Router>
						<label htmlFor="checkAgree">
							<Checkbox
								style={{ background: '#fff', color: '#a1ceab' }}
							/>
							<AgreeLink />
							<Switch>
								<Route path="/agree/service" component={Service} />
								<Route path="/agree/privacy" component={Privacy} />
							</Switch>
						</label>
					</Router>
				</div>
				<div style={{ marginTop: "30px", paddingTop: "30px", borderTop: "1px solid #eee" }}>
					<Button fullWidth={true} size="large" variant="contained" style={{ background: '#a1ceab', color: '#fff' }} onClick={this.sendJoinInfo}>
						계속하기
                </Button>
				</div>
			</div>
		)

	}

	
}

export default LayerJoin;