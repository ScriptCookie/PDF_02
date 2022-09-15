import React from 'react';
import {useNavigate} from 'react-router-dom';

function Subjectnull() {
    const navi = useNavigate();

    function createSubject() {
        navi('/createSubject');
    }

    return(
        <div>
            <h3>현제 개설된 과목이 없습니다.</h3>
            <button onClick={createSubject}>과목 개설하기</button>
        </div>
    );
}

export default Subjectnull;