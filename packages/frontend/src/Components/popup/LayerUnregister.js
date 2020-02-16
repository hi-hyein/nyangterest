import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import UnRegisterAgree from "../agree/UnRegisterAgree";
import { observer, inject } from "mobx-react";

@inject('loginStore')
@observer
class LayerUnregister extends Component {
    state = {
        agree1 : false,
        agree2 : false,
    }

    handler = (name, state) => {
        this.setState({
            [name]: state
        })
    }

    sendUnregister = () => {
        const userId = localStorage.getItem('userInfo');
        const newLocal = `/unregister/${JSON.parse(userId)}`;
        fetch(newLocal).then(res => res.json()).then(json=>{
            if(json.unregisterState === true){
                alert('회원탈퇴가 완료되었습니다.')
                localStorage.removeItem('userInfo');
                document.location.href='/';
            }else {
                alert('회원탈퇴가 실패하였습니다.')
            }
        });
    }

    handlerUnregister = () => {
        if(this.state.agree1 && this.state.agree2){
            this.sendUnregister();
        }else {
            alert('모두 동의해주세요.')
        }
    }


    render(){
        return (
            <>
            <UnRegisterAgree
                title = "복구 불가 안내"
                content = "회원탈퇴 진행 시 본인을 포함한 타인 모두 아이디 재사용이나 복구가 불가능합니다.신중히 선택하신 후 결정해주세요."
                handler = {this.handler}
                name = 'agree1'
                >

            </UnRegisterAgree>
            <UnRegisterAgree
                title = "내정보 기록 삭제 안내"
                content = "메일, 이름, 가입일자 이용기록이 모두 삭제되며,삭제된 데이터는 복구되지 않습니다.삭제되는 서비스를 확인하시고, 필요한 데이터는 미리 백업을 해주세요."
                handler = {this.handler}
                name = 'agree2'
                ></UnRegisterAgree>
            
            <div>      
                <Button fullWidth={true} size="large" variant="contained" color="primary" onClick={this.handlerUnregister}>
                    회원탈퇴하기
                </Button>
            </div>
            </>
        ) 
    }
}

export default LayerUnregister;