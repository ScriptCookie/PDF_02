import React, {useLayoutEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

function AssiList(props) {
    const submapName = props.value.map((res , idx) => (<li key={idx}>{res}</li>))
    const [text, Settext] = useState();
    const navi = useNavigate();

    function clickList() {
        const ulList = document.getElementById('ulList');

        for(var i = 0 ; i < props.value.length ; i++) {
            const ulNodes = ulList.childNodes[i]
            ulNodes.addEventListener('click', function() {
                Settext(this.textContent);
            })
        }
    }

    function postSolving() {
        fetch('http://localhost:9000/SolvingList', {
            method : 'post',
            headers : {
                "Content-Type" : "application/json",
              },
            body : JSON.stringify({
                text : text,
                name : props.name
            })
        })
        navi('/solving');
    }

    useLayoutEffect(() => {
        clickList();
    })

    return(
        <div>
            <h3>과제 리스트</h3>
            <ul id='ulList' onClick={postSolving}>
                {submapName}
            </ul>
        </div>
    );
}

export default AssiList;