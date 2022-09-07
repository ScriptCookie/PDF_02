import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Subjectnull from './Subjectnull';

function Managermainpage(props) {
    const navi = useNavigate();
    const [name , setName] = useState();
    const [subject, setSubject] = useState();

    function reload() {
        fetch('http://localhost:9000/managerReload', {
            method : 'post',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
              },
            body : JSON.stringify({
                nowurl : props.init
            })
        })
        .then(res => res.json())
        .then(res => {
            setName(res);
            console.log('컴포넌트 렌더링 후', res);
        })
    }

    function createSubject() {
        navi('/createSubject');
    }

    useEffect(() => {
        reload();
        fetch('http://localhost:9000/managerdata')
        .then(res => res.json())
        .then(res => {
            setName(res[0])
            setSubject(res[1])
        })
    }, [])

    console.log('sub', props.init);

    return (
        <div>
            <h2>{name} 교수님 메인페이지</h2>
            <ul id='ul'></ul>
            <Subjectnull/>
            <button onClick={createSubject}>과목 개설하기</button>
            <p>{props.init}</p>
        </div>
    );
}

export default Managermainpage;