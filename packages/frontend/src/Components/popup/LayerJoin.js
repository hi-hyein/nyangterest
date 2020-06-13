import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import AgreeLink from "../agree/AgreeLink";
import Service from "../agree/Service";
import Privacy from "../agree/Privacy";


// eslint-disable-next-line
const MAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const PASSWORD_FORMAT = /^(?=[a-zA-Z0-9!@$%^*#])(?!.*[^a-zA-Z0-9!@$%^*#]).{6,15}$/

class LayerJoin extends Component {
	state = {
		email: {
			value: '',
			vaildate: false,
			helper: {
				available : "사용 가능한 이메일 주소입니다",
				notAvailable : "잘못된 이메일 형식 입니다",
				overlapping: "이미 가입된 이메일입니다. 다른 이메일을 입력해주세요",
				complete: "회원가입이 완료되었습니다! 이메일 인증을 완료해주세요!"
			},
			overlapping: false,
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
	}

	validate = (format, value) => {
		const reg = format;
		const validate = reg.test(value);
		return validate;
	}

	emailOnChange = (e) => {
		const value = e.target.value
		const Validate = this.validate(MAIL_FORMAT, value)

		this.setState(prevState => ({
			email: {
				...prevState.email,
				value: value
			}
		}))

		if (Validate) {
			this.setState(prevState => ({
				email: {
					...prevState.email,
					validate: true,
				}
			}))
		} else {
			this.setState(prevState => ({
				email: {
					...prevState.email,
					validate: false,
				}
			}))
		}
	}

	passwordOnChange = (e) => {
		const value = e.target.value
		const Validate = this.validate(PASSWORD_FORMAT, value)

		this.setState(prevState => ({
			password: {
				...prevState.password,
				value: value
			}
		}))

		if (Validate) {
			this.setState(prevState=>({
				password: {
					...prevState.password,
					validate: true
				}
			}))
		} else {
			this.setState(prevState => ({
				password: {
					...prevState.password,
					validate: false
				}
			}))
		}
	}

	passwordCheckOnChange = (e) => {
		const value = e.target.value

		this.setState(prevState => ({
			password : {
				...prevState.password,
				check: {
					value: value
				}
			}
		}))

		if (this.state.password.value === value) {
			this.setState(prevState => ({
				password : {
					...prevState.password,
					check: {
						validate: true
					}
				}
			}))
		} else {
			this.setState(prevState => ({
				password : {
					...prevState.password,
					check: {
						validate: false
					}
				}
			}))
		}
	}

	sendJoinInfo = () => {
		const {email, password} = this.state;
		const userInfo = {
			email: email,
			password: password
		}

		if (email.vaildate && password.vaildate && password.check.vaildate) {
			fetch('/join', {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify(userInfo),
			}).then(res => res.json()).then(json => {
				this.setState(prevState => ({
					email: {
						...prevState.email,
						overlapping: json.emailOverlapping
					}
				}))

				if (email.overlapping === true) {
					this.setState(prevState => ({
						email: {
							...prevState.email,
							vaildate : null
						}
					}))
					alert(email.helper.overlapping)
					
				} else {
					this.setState(prevState => ({
						email: {
							...prevState.email,
							vaildate : true
						}
					}))

					alert(email.helper.complete)
				}
			})
		} else {
			alert("모든 입력사항을 알맞게 입력해주세요")
		}
	}

	render() {
		const { email, password } = this.state
		console.log(this.state)
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
						error={!email.validate && email.value !== ''}
						fullWidth={true}
					/>
					<FormHelperText id="component-helper-text">
						{email.validate && email.helper.available}
						{!email.validate  && email.value !== '' && email.helper.notAvailable}
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
						error={!password.validate && password.value !== ''}
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
						error={!password.check.vaildate && password.check.value !== ""}
					/>
					<FormHelperText id="component-helper-text">
						{password.check.vaildate && "비밀번호가 일치합니다"}
						{!password.check.vaildate && password.check.value !== "" && "비밀번호가 일치하지 않습니다"}
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