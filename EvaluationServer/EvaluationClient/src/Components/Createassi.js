import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function Createassi() {
    const [managerName, setManagerName] = useState();
    const [managerSubject, setManagerSubject] = useState();
    const [explains, setExplains] = useState(null);
    const [assiNames, setAssiNames] = useState(null);
    const date = new Date();
    const navi = useNavigate();

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
        setManagerName(res[0])
        setManagerSubject(res[1])
    })

    function assiExplains(e) {
        setExplains(e.target.value);
    }

    function assiName(e) {
        setAssiNames(e.target.value);
    }

    function postAssiData() {
        fetch('http://localhost:9000/assignments', {
            method : 'post',
            headers : {
                "Content-Type" : "application/json",
              },
            body : JSON.stringify({
                name : managerName,
                subject : managerSubject,
                assiname : assiNames,
                explains : explains,
                date : date.toLocaleDateString()
            })
        })
        if(assiNames !== null || explains !== null) {
            alert('과제가 만들어졌습니다.')
            navi('/assignment')
            
        } else if(assiNames === null || explains === null) {
            alert('빈칸을 채우세요.')
        }
    }

    return(
        <div>
            <h2>과제 제작</h2>
            <input placeholder='과제 이름' onChange={assiName}></input>
            <input placeholder='과제 설명' onChange={assiExplains}></input>
            <input placeholder={date.toLocaleDateString()} disabled='disabled'></input>
            <button onClick={postAssiData}>만들기</button>
        </div>
    );
}

export default Createassi;