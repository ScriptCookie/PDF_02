import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function Assignment() {
    const navi = useNavigate();
    const [subName, setSubName] = useState();
    const [managerName, setmanagerName] = useState();

    fetch('http://localhost:9000/managerSubName', {
        method : 'post',
        headers : {
            "Content-Type" : "application/json",
          },
        body : JSON.stringify({
            posting : 'posting'
        })
    })
    .then(res => res.json())
    .then(res => {
        setmanagerName(res[0])
        setSubName(res[1])
    })

    function createMove() {
        navi('/createassi')
    }

    return(
        <div>
            <h2>{managerName} 교수님 {subName}과목 페이지</h2>

            <button onClick={createMove}>과제 만들기</button>
        </div>
    );
}

export default Assignment;