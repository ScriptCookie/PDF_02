import React, { useEffect, useState } from 'react';
import Subjectnull from './Subjectnull';
import SubjectList from './SubjectList';

function Managermainpage(props) {
    const [name , setName] = useState();
    const [sub , setSub] = useState();
    const [show, setShow] = useState(false);

    function managerdatas() {
        fetch('http://localhost:9000/managerdata', {
            method : 'post',
            headers : {
                "Content-Type" : "application/json",
              },
            body : JSON.stringify({
                respon : true
            })
        })
        .then(res => res.json())
        .then(res => {
            setName(res[0])
            if(res[1].length === 0) {
                setShow(false);
            } else if(res[1] !== 0) {
                setShow(true);
                setSub(res[1]);
            }
        })
    }

    useEffect(() => {
        managerdatas();
    }, [])

    return (
        <div>
            <h2>{name} 교수님 메인페이지</h2>
            <ul id='ul'></ul>
            {show ? <SubjectList value={sub}/> : <Subjectnull/>}
            <p>{props.init}</p>
        </div>
    );
}

export default Managermainpage;