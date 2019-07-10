import React from "react";
import Cn from "classnames";
import "../../JoinPopup.css"; //임시확인용 css

class JoinPopup extends React.Component {
	constructor(){
		super();
		this.state = {
			email: "",
			password: "",
			emailValidate: false,
			emailValidateNot: false,
			passwordValidate: true,
			passwordCheck: "",
			passwordCheckState: false,
		}

		this.emailHandleChange = this.emailHandleChange.bind(this);
		this.passwordHandleChange = this.passwordHandleChange.bind(this);
		this.validate = this.validate.bind(this);
	}

	//메일 유효성 정규식
	mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	// 패스워드 유효성 정규식
	passwordformat = /^[a-zA-Z0-9]{6,15}$/;

	// 이메일 핸들러
	emailHandleChange(event) {
		const value = event.target.value;
		const mailValidate = this.validate(this.mailformat,value);

		this.setState({
			email: value,
		});

		if(mailValidate) {
			this.setState({
				emailValidate: true,
				emailValidateNot: false
			});
		}else if(value.length === 0){
			this.setState({
				emailValidateNot: false
			});
		}else {
			this.setState({
				emailValidate: false,
				emailValidateNot: true
			});
		}
	}

	// 패스워드 핸들러
	passwordHandleChange(event) {
		const value = event.target.value;
		const passwordValidate = this.validate(this.passwordformat,value);

		this.setState({
			password: value
		});

		if(passwordValidate || value.length === 0) {
			this.setState({
				passwordValidate: true,
			});
		}else {
			this.setState({
				passwordValidate: false
			});
			
			if(value.length > 14) {
				alert('15자 이상 안됨!')
			}
		}
	}
	
	// 유효성 검사
	validate(format,value) {
		const reg = format;
		const validate = reg.test(value);
		return validate;
	}
	
	handlerSubmit = ()=>{

		// state들을... 백으로 넘겨! 어떤..객채화가 필요하겠지!
		//백에서 받아서..!쿼리로...디비저장!!
		// 이메일 주소, 패스워드가 알맞게 입력했을때 백으로 보내자!
		if(this.state.emailValidate && !this.state.emailValidateNot && this.state.passwordValidate && this.state.passwordCheckState){
			const state = this.state;
			// state to json
			const stateTojson = JSON.stringify(state)
			console.log(state);
			console.log(stateTojson);

			fetch('/', {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: stateTojson,
			});
		}else {
			alert('이메일주소와 패스워드를 바르게 입력해주세요')
		}
	}

	// 비밀번호 일치 체크
	passwordHandleCheck = (event)=>{
		const value = event.target.value;
		this.setState({
			passwordCheck: value
		})
		if(this.state.password === value) {
			this.setState({
				passwordCheckState: true,
			});
		}else {
			this.setState({
				passwordCheckState: false,
			});
		}
	}
	
	render() {
		return (
			<div className="popup">
				<div className="popup_wrap">
					<h2>JOIN</h2>
					<div>
						<label htmlFor="email">
							이메일 주소 
							{this.state.emailValidate && " - 사용 가능한 이메일 주소입니다"}
							{this.state.emailValidateNot && " - 잘못된 이메일 형식 입니다"}
						</label>
						<input type="text" name="email" id="email" placeholder="ex)email@address.com" onChange={this.emailHandleChange}
						/>
						<div>
							{this.state.emailValidate && "해당 이메일 주소로 인증링크를 보내드립니다. 메일 확인 후 링크로 접속해주세요!"}
						</div>
					</div>
					<div>
						<label htmlFor="password">비밀번호 - <span className={Cn(this.state.passwordValidate ? '' : 'error')}>6자 이상 15자 이하 입력해 주세요</span></label>
						<input type="password" name="password" id="password" placeholder="password" onChange={this.passwordHandleChange}/>
					</div>
					<div>
						<label htmlFor="passwordCheck">비밀번호 확인
							{this.state.passwordCheckState && "- 비밀번호가 일치합니다"}
							{this.state.passwordCheck.length === 0 && ""}
							{!this.state.passwordCheckState && this.state.passwordCheck.length > 0 && "- 비밀번호가 일치하지않습니다"}
						</label>
						<input type="password" name="passwordCheck" id="passwordCheck" placeholder="password" onChange={this.passwordHandleCheck}/>
					</div>
					<div className="check-area">
						<label htmlFor="checkAgree">
							<input type="checkbox" id="checkAgree"></input>
							<a href="#none" target="_blank" title="새창">이용약관</a> & <a href="#none" target="_blank" title="새창">개인정보 처리 방침</a> 동의하기
						</label>
					</div>
					<div className="button-area">
						<button type="button" onClick={this.handlerSubmit}>계속하기</button>
					</div>
					<div className="button-area">
						<button type="button">카카오 계정으로 가입하기</button>
						<button type="button">네이버 계정으로 가입하기</button>
					</div>
				</div>
				<button type="button" onClick={this.props.onClick}>닫기</button>
			</div>
		);
	}
}

export default JoinPopup;

