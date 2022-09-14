import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
function Createsubject() {
    const [sub, setSub] = useState(null);
    const navi = useNavigate();

    function subName(e) {
        setSub(e.target.value)
    }

    function namePost() {
        if(sub === null) {
            alert('빈칸을 채워주십시오.')
        } else {
            fetch('http://localhost:9000/createSubject', {
                method : 'post',
                headers : {
                    "Content-Type" : "application/json",
                  },
                body : JSON.stringify({
                    sub : sub
                })
            })
            alert('과제가 만들어졌습니다.')
            alert('과제 목록 페이지로 이동합니다.')
            navi('/manager')
        }
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