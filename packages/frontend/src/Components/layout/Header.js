import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Layer from '../popup/Layer';
import LayerLogin from '../popup/LayerLogin';
import LayerJoin from '../popup/LayerJoin';
import { observer, inject } from "mobx-react";
import DehazeIcon from '@material-ui/icons/Dehaze';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import LayerModifyInfo from "../admin/LayerModifyInfo";

@inject('loginStore')
@observer
class Header extends React.Component {
	state = {
		openLogin: false,
		openJoin: false,
		openModify: false,
		btnMenuArea: false,
	}

	popupOpenLogin = () => {
		this.setState({
			openLogin: true,
		})
	}

	popupOpenJoin = () => {
		this.setState({
			openJoin: true,
		})
	}

	popupOpenModify = () => {
		this.setState({
			openModify: true,
		})
	}


	popupCLose = () => {
		this.setState({
			openLogin: false,
			openJoin: false,
			openModify: false,
		})
	}

	menuToggle = () => {
		if(this.state.btnMenuArea===true){
			this.setState({
				btnMenuArea: false
			})
		}else {
			this.setState({
				btnMenuArea: true
			})
		}
	}

	logout = () => {
		this.props.loginStore.changeUserState()
		fetch('/logout').then(res=>{
			console.log(res)
		})
		localStorage.removeItem('userInfo')
	}


	render() {
		const {userState} = this.props.loginStore;
		const { openLogin, openJoin, openModify, btnMenuArea } = this.state;
		const HeaderStyle = {
			position: 'fixed',
			top: '0',
			left: '0',
			right: '0',
			padding: "0 20px",
			zIndex: '999',
			backgroundColor: 'skyblue',
		}

		const LogoStyle = {
			position:'absolute',
			top: '50%',
			left: '50%',
			transform:'translate(-50%,-50%)',
			fontSize:'30px',
			fontWeight: 'bold',
			letterSpacing: '3px'
		}

		const menuBtnArea = {
			position: 'relative',
			display: 'inline-block',
			verticalAlign: 'middle',
			marginLeft: '10px'
		}

		const myMenuList = {
			position: 'absolute',
			top: '100%',
			right: '0',
		}

		return (
			<>
				<div className="header" style={HeaderStyle}>
					<h1 style={LogoStyle}><Link exact="true" to="/" style={{ textDecoration: 'none', color: '#000' }}>NYANGTEREST</Link></h1>

					{/* 로그아웃 상태 : 로그인 상태 */}
					<div className="button-area" style={{ float: "right", margin: "20px 0" }}>
						{userState === 'logout' ?
							<Fragment>
								<Button variant="contained" onClick={this.popupOpenLogin} style={{ marginRight: "10px" }}>LOGIN</Button>
								<Button variant="contained" color="primary" onClick={this.popupOpenJoin}>JOIN</Button>
							</Fragment> :
							<>
							<span>{localStorage.getItem('userInfo')}님 안녕하세요</span>
							<div className="btn-menu-area" style={menuBtnArea}>
								<button type="button" title="메뉴" onClick={this.menuToggle} style={{background: "none"}}>
									<DehazeIcon />
								</button>
								{btnMenuArea === true && 
								<div className="my-menu-list" style={myMenuList}>
									<Paper>
										<MenuList>
										<MenuItem onClick={this.logout}>로그아웃</MenuItem>
										<MenuItem onClick={this.popupOpenModify}>회원정보수정</MenuItem>
										<MenuItem>회원탈퇴</MenuItem>
										</MenuList>
									</Paper>
								</div>
								}
							</div>
							</>
						}
					</div>
				</div>
				{/* 레이어 */}
				{openLogin &&
					<Layer onClose={this.popupCLose} layerTitle="Login">
						<LayerLogin onClose={this.popupCLose}/>
					</Layer>
				}
				{openJoin &&
					<Layer onClose={this.popupCLose} layerTitle="Join">
						<LayerJoin />
					</Layer>
				}
				{openModify &&
					<Layer onClose={this.popupCLose} layerTitle="회원정보수정">
						<LayerModifyInfo />
					</Layer>
				}
			</>
		);
	}
}

export default Header;

