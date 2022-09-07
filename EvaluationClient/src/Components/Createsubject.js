import React, { useState } from 'react';

function Createsubject() {
    const [sub, setSub] = useState();

    function subName(e) {
        setSub(e.target.value)
    }

    function namePost() {
        fetch('http://localhost:9000/createSubject', {
            method : 'post',
            headers : {
                "Content-Type" : "application/json",
              },
            body : JSON.stringify({
                sub : sub
            })
        })
    }

    return(
        <div>
            <h3>과목 제작할 공간</h3>
            <input placeholder='과목의 이름' onChange={subName}></input>
            <button onClick={namePost}>만들기</button>
        </div>
    );
}

export default Createsubject;