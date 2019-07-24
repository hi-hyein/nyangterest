import React, { Fragment } from "react";
// import JoinModal from "../popup/JoinModal";
// import LoginModal from "../popup/LoginModal";
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
			backgroundColor: 'skyblue',
			overflow: 'hidden',
			padding: "0 20px"
		}

		return (
			<div className="header" style={HeaderStyle}>
				<h1>NYANGTEREST</h1>
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
				<div className="button-area" style={{ float: "right", marginBottom: "20px" }}>
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

