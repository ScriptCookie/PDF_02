import React, { useLayoutEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

function SubjectList(props) {
    const submap = props.value.map((res, idx) => (<li key={idx}>{res}</li>))
    const [text, Settext] = useState();
    const navi = useNavigate();

    function clickList() {
        const subList = document.getElementById('subList');

        for(var i = 0 ; i < props.value.length ; i++) {
            const ulNodes = subList.childNodes[i]
            ulNodes.addEventListener('click', function() {
                Settext(this.textContent);
            })
        }
    }

    function postText() {
        fetch('http://localhost:9000/managerList', {
            method : 'post',
            headers : {
                "Content-Type" : "application/json",
              },
            body : JSON.stringify({
                list : text
            })
        })
        .then(res => res.json())
        .then(res => res)
        navi('/assignment')
    }

    function createSubject() {
        navi('/createSubject');
    }

    useLayoutEffect(() => {
        clickList();
    }, [])

    return(
        <div>
            <h3>개설한 과목 리스트</h3>
            <ul id='subList' onClick={postText}>
                {submap}
            </ul>
            <button onClick={createSubject}>과목 개설하기</button>
        </div>
    );
}

export default SubjectList;