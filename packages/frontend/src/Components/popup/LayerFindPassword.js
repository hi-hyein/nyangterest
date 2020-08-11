import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { observer, inject } from "mobx-react";

@inject('validateStore')
@observer
class LayerFindPassword extends Component {
	state = {
		email: "",
		emailValidate: false,
		emailMatch: null,
	}

	// helper text 얻기
	getHelperText = {
		email: () => {
			if(this.state.emailValidate) {
				if(this.state.emailMatch) {
					return '등록된 이메일로 확인되었습니다. 해당 이메일로 임시비밀번호 변경페이지를 발송하였습니다.'
				}else if(!this.state.emailMatch && this.state.emailMatch !== null) {
					return '등록되지 않은 이메일로 확인되었습니다. 회원가입을 진행해주세요.'
				}else {
					return '가입된 이메일 주소로 임시 비밀번호를 보내드립니다. 비밀번호는 회원정보 수정에서 변경 가능합니다.'
				}

			} else {
				return '잘못된 이메일 형식 입니다'
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

	emailOnchange = (e) => {
		const value = e.target.value
		this.props.validateStore.validateValue = value
		
		this.setState({
			email: value
		})

		// 메일 유효성검사
		this.setState({
			emailValidate: this.props.validateStore.getValidate('MAIL')
		})
	}


	// 계속 버튼 : 이메일 주소 전송
	findEmailOnclick = () => {
		const dataJson = JSON.stringify({
			email: this.state.email
		})

		console.log(this.state.email)

		fetch("/account/password/find", {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: dataJson
		})
			.then((res) => res.json())
			.then((json) => {
				const matchState = json
				if (matchState.emailMatch) {
					this.setState({
						emailMatch: true
					})
				} else {
					this.setState({
						emailMatch: false
					})
				}
			})
	}

	render() {
		const { email, emailValidate } = this.state
		return (
			<div>
				<div>
					<TextField
						id="member-name"
						label="가입한 이메일 주소"
						value={email}
						placeholder="nyangterest@email.com"
						margin="normal"
						variant="outlined"
						type="text"
						onChange={this.emailOnchange}
						fullWidth={true}
						error={!emailValidate && email != ""}
					/>
					{this.showHelperText(email, this.getHelperText.email)}
				</div>
				<div style={{ marginTop: "20px" }}>
					<Button fullWidth={true} size="large" variant="contained" style={{ background: '#a1ceab', color: '#fff' }} onClick={this.findEmailOnclick}>
						계속
                    </Button>
				</div>
			</div>
		)
	}
}

export default LayerFindPassword;