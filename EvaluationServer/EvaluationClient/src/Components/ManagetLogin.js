import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';

function ManagerLogin() {
    const navi = useNavigate();
    const [Loginnumber, setLoginNumer] = useState(null)
    const [Loginpw, setLoginPw] = useState(null);

    function postManager() {
        fetch('http://localhost:9000/loginmanager', {
            method : 'post',
            headers : {
                "Content-Type" : "application/json",
              },
            body : JSON.stringify({
                loginnumber : Loginnumber,
                loginpw : Loginpw
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res === true) {
                navi('/manager')
            } else if (res === false) {
                alert('존재하지 않거나 아이디 및 비밀번호가 틀렸습니다.')
            }
        });
    }

    function Loginnumbers(e) {
        setLoginNumer(e.target.value);
    }

    function LoginPws(e) {
        setLoginPw(e.target.value);
    }

    function MoveSignUp() {
        navi('/managersignup');
    }
    
    return(
        <div>
        <h2>관리자 로그인 페이지 입니다.</h2>
        <input placeholder='직번 입력' onChange={Loginnumbers}></input>
        <input placeholder='비밀번호 입력' onChange={LoginPws}></input>
        <button onClick={postManager}>로그인</button>
        <button onClick={MoveSignUp}>회원가입</button>
        </div>
    );
}


export default ManagerLogin;