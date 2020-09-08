import React, { Component } from "react";
import styled from "styled-components";
import Done from "@material-ui/icons/Done";
import Button from "@material-ui/core/Button";
import Layer from "./popup/Layer";
import LayerLogin from "./popup/LayerLogin";
import LayerJoin from "./popup/LayerJoin";
import LayerFindPassword from "./popup/LayerFindPassword";

const WelcomeTitle = styled.h2`
    font-weight: 500;
    font-size: 60px;
    letter-spacing: 5px;
    color: #a1ceab;
    margin-bottom: 30px;
    padding-top: 25vh;
`;

const WelcomeBody = styled.div`
    font-size: 18px;
    line-height: 1.8;
`;

const DoneIcon = styled(Done)`
    .welcome_complete & {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 6rem;
    }
`;

const IconCircle = styled.span`
    position: relative;
    display: inline-block;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 6px solid #a1ceab;
`;

export default class WelcomeComplete extends Component {
    state = {
        openLogin: false,
        openJoin: false,
        openFindPassword: false,
    };

    popupOpenLogin = () => {
        this.setState({
            openLogin: true,
        });
    };

    popupOpenJoin = () => {
        this.setState({
            openJoin: true,
        });
    };

    popupOpenFindPassword = () => {
        this.setState({
            openFindPassword: true,
            openLogin: false,
        });
    };

    popupCLose = () => {
        this.setState({
            openLogin: false,
            openJoin: false,
            openModify: false,
            openFindPassword: false,
            openUnresister: false,
        });
    };

    render() {
        const { openLogin, openJoin, openFindPassword } = this.state;

        return (
            <div className='welcome_complete'>
                <WelcomeTitle>
                    <IconCircle>
                        <DoneIcon></DoneIcon>
                    </IconCircle>
                </WelcomeTitle>
                <WelcomeBody>
                    이미 인증된 회원입니다.
                    <div style={{ marginTop: 30 }}>
                        <Button
                            size='large'
                            variant='contained'
                            style={{
                                marginRight: "10px",
                                background: "#a1ceab",
                                color: "#fff",
                            }}
                            onClick={this.popupOpenLogin}
                        >
                            로그인하기
                        </Button>
                        <Button
                            size='large'
                            variant='contained'
                            onClick={this.popupOpenFindPassword}
                        >
                            내 계정 찾기
                        </Button>
                        {openLogin && (
                            <Layer onClose={this.popupCLose} layerTitle='Login'>
                                <LayerLogin
                                    onClose={this.popupCLose}
                                    openJoinLayer={this.popupOpenJoin}
                                />
                            </Layer>
                        )}
                        {openFindPassword && (
                            <Layer
                                onClose={this.popupCLose}
                                layerTitle='이메일 / 비밀번호 찾기'
                            >
                                <LayerFindPassword />
                            </Layer>
                        )}
                        {openJoin && (
                            <Layer onClose={this.popupCLose} layerTitle='Join'>
                                <LayerJoin />
                            </Layer>
                        )}
                    </div>
                </WelcomeBody>
            </div>
        );
    }
}
