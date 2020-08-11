import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { observer, inject } from "mobx-react";

@inject('loginStore', 'validateStore')
@observer
class LayerLogin extends Component {
	state = {
		userId: "",
		userIdValidate: false,
		userPassword: '',
		userPasswordValidate: false,
	}

	getHelperText = {
		id: () => {
			if(this.state.userIdValidate) {
				return '사용 가능한 이메일 주소입니다'
			}else {
				return '잘못된 이메일 형식 입니다'
			}
		},

		password: () => {
			if(this.state.userPasswordValidate) {
				return '사용 가능한 비밀번호입니다'
			}else {
				return '6자이상 15자 이하 입력해주세요'
			}
		}
	}

	// helper text 보여주기
	showHelperText = (state, type) => {
		if(state) {
			return <FormHelperText id="component-helper-text">
						{type()}
					</FormHelperText>
		}
	}

	userIdHandler = (e) => {
		const value = e.target.value
		this.props.validateStore.validateValue = value

		this.setState({
			userId: e.target.value
		})

		this.setState({
			userIdValidate: this.props.validateStore.getValidate('MAIL'),
		})
	}

	userPwHandler = (e) => {
		const value = e.target.value
		this.props.validateStore.validateValue = value

		this.setState({
			userPassword: e.target.value
		})

		this.setState({
			userPasswordValidate: this.props.validateStore.getValidate('PASSWORD'),
		})
	}

	sendUserInfo = () => {
		const state = this.state
		const onClose = this.props.onClose
		const stateTojson = JSON.stringify(state)
		const { changeUserId, changeUserState } = this.props.loginStore

		if (state.userIdValidate && state.userPasswordValidate) {
			fetch('/login', {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: stateTojson,
			})
				.then(res => res.json()).then(json => {
					if (!json.sucess) {
						console.log('로그인실패')
					} else {
						console.log('로그인성공')
						console.log(json._userId)
						changeUserState()
						changeUserId(json._userId)
						localStorage.setItem(
							"userInfo",
							JSON.stringify(json._userId)
						)

						onClose()
					}
				})

		} else {
			alert("아이디와 패스워드를 알맞게 입력해주세요")
		}
	}

	findPasswordHandler = () => {
		this.props.openFindPassword()
	}

	btnJoinHandler = () => {
		this.props.openJoinLayer()
	}

	render() {
		const { userId, userIdValidate, userPassword, userPasswordValidate } = this.state
		return (
			<div>
				<div>
					<TextField
						id="userIdInput"
						label="이메일주소"
						placeholder="ex)nyangterest@email.com"
						margin="normal"
						variant="outlined"
						fullWidth={true}
						onChange={this.userIdHandler}
						error={!userIdValidate && userId !== ""}
					/>
					{this.showHelperText(userId, this.getHelperText.id)}
				</div>
				<div>
					<TextField
						id="userPasswordInput"
						label="비밀번호"
						placeholder="비밀번호를 입력해주세요"
						margin="normal"
						variant="outlined"
						type="password"
						fullWidth={true}
						onChange={this.userPwHandler}
						error={!userPasswordValidate && userPassword !== ""}
					/>
					{this.showHelperText(userPassword, this.getHelperText.password)}
				</div>
				<div>
					<button type="button" style={{ fontSize: "16px", color: "#808080", fontWeight: "bold" }} onClick={this.findPasswordHandler}>
						가입한 이메일 / 비밀번호 찾기
                    </button>
				</div>
				<div style={{ marginTop: "30px", paddingTop: "30px", borderTop: "1px solid #eee" }}>
					<Button fullWidth={true} size="large" variant="contained" style={{ background: '#a1ceab', color: '#fff' }} onClick={this.sendUserInfo}>
						로그인
                </Button>
					<Button fullWidth={true} size="large" variant="contained" style={{ marginTop: "15px" }} onClick={this.btnJoinHandler}>
						회원가입
                </Button>
				</div>
			</div>
		)

	}
}

export default LayerLogin;