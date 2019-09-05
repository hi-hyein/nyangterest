import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Layer from '../popup/Layer';
import LayerLogin from '../popup/LayerLogin';
import LayerJoin from '../popup/LayerJoin';
class Header extends React.Component {
	state = {
		openLogin: false,
		openJoin: false,
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

	popupCLose = () => {
		this.setState({
			openLogin: false,
			openJoin: false,
		})
	}


	render() {
		const { openLogin, openJoin } = this.state;
		const HeaderStyle = {
			position: 'fixed',
			top: '0',
			left: '0',
			right: '0',
			overflow: 'hidden',
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

		return (
			<div className="header" style={HeaderStyle}>
				<h1 style={LogoStyle}><Link exact to="/" style={{textDecoration:'none', color:'#000'}}>NYANGTEREST</Link></h1>
				{openLogin &&
					<Layer onClose={this.popupCLose} layerTitle="Login">
						<LayerLogin />
					</Layer>
				}
				{openJoin &&
					<Layer onClose={this.popupCLose} layerTitle="Join">
						<LayerJoin />
					</Layer>
				}

				{/* 로그아웃 상태 : 로그인 상태 */}
				<div className="button-area" style={{ float: "right", margin: "20px 0" }}>
					{this.props.userState === 'logout' ?
						<Fragment>
							<Button variant="contained" onClick={this.popupOpenLogin} style={{ marginRight: "10px" }}>LOGIN</Button>
							<Button variant="contained" color="primary" onClick={this.popupOpenJoin}>JOIN</Button>
						</Fragment> :
						<button type="button">MENU</button>
					}
				</div>
			</div>
		);
	}
}

export default Header;

