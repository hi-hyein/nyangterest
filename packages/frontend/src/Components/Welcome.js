import React, { Component } from "react";
import styled from "styled-components";
import FavoriteIcon from "@material-ui/icons/Favorite";

const WelcomeTitle = styled.h2`
    font-weight: 500;
    font-size: 60px;
    letter-spacing: 5px;
    color: #a1ceab;
    margin-bottom: 30px;
    padding-top: 25vh;
`;

const WelcomeBody = styled.p`
    font-size: 18px;
    line-height: 1.8;
`;

const WelcomePoint = styled.span`
    color: #a1ceab;
    font-weight: 500;
`;

export default class Welcome extends Component {
    render() {
        const { params } = this.props.match;
        return (
            <>
                <WelcomeTitle>
                    <FavoriteIcon style={{ fontSize: "60px" }}></FavoriteIcon>
                    <br />
                    Welcome!
                </WelcomeTitle>
                <WelcomeBody>
                    <WelcomePoint>{params.email}</WelcomePoint>
                    님
                    <br />
                    냥터레스트 가입을 환영합니다!
                    <br />
                    가족이 필요한 야옹이들에게 많은 관심 부탁드립니다.
                </WelcomeBody>
            </>
        );
    }
}
