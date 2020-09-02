import React, { Component } from "react";

export default class Welcome extends Component {
    render() {
        const { params } = this.props.match;

        return (
            <>
                <h1>WELCOME!</h1>
                <p>
                    <span style={{ color: "blue" }}>{params.email}</span>님
                    <br />
                    냥터레스트 가입을 환영합니다!
                    <br />
                    가족이 필요한 야옹이들에
                    <br />
                    많은 관심 부탁드립니다.
                </p>
            </>
        );
    }
}
