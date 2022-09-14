import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function ManagerSignUp() {
    const navi = useNavigate();
    const [number , setNumber] = useState(null);
    const [pw , setPw] = useState(null);
    const [name , setName] = useState(null);

    function PostManager() {
        fetch('http://localhost:9000/manager', {
            method : 'post',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
              },
            body : JSON.stringify({
                number : number,
                pw : pw,
                name : name,
                subjectNames : []
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res === false) {
                alert('중복된 아이디 입니다.')
            } 
            if(res !== false) {
                alert('가입이 되었습니다.')
                alert('로그인 페이지로 이동합니다.')
                navi('/');
            }
        })
    }

    function MoveBack() {
        navi('/');
    }

    function Number(e) {
        setNumber(e.target.value)
    }

    function password(e) {
        setPw(e.target.value);
    }

    function Name(e) {
        setName(e.target.value)
    }

    function SignUp() {
        if(number === null || pw === null || Name === null) {
            alert('빈칸을 채워주세요');
        } else {
            PostManager();
        }
    }

    return(
        <div>
        <h2>관리자 회원가입 페이지 입니다.</h2>
        <input placeholder='직번 입력' onChange={Number}></input>
        <input placeholder='비밀번호 입력' type='password' onChange={password}></input>
        <input placeholder='이름 입력'onChange={Name}></input>
        <button onClick={SignUp}>가입하기</button>
        <button onClick={MoveBack}>돌아가기</button>
        </div>
    );
}

export default ManagerSignUp;