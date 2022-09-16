import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Assinull from './Assinull';
import AssiList from './AssiList';

function Assignment() {
    const navi = useNavigate();
    const [subName, setSubName] = useState();
    const [managerName, setmanagerName] = useState();
    // const [assignmentName , setAssignmentName] = useState();
    // const [assignmentDate , setAssignmentDate] = useState();

    function assiname() {
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
    }

    function assilist() {
        fetch('http://localhost:9000/assilist', {
            method : 'post',
            headers : {
                "Content-Type" : "application/json",
              },
            body : JSON.stringify({
                posting : 'posting'
            })
        })
        .then(res => res.json())
        .then(res => console.log(res))
    }

    useEffect(() => {
        assiname();
        assilist();
    }, [])

    function createMove() {
        navi('/createassi')
    }

    return(
        <div>
            <h2>{managerName} 교수님 {subName}과목 과제 페이지</h2>
            {/* <AssiList value={[assignmentName, assignmentDate]}/> */}
            <button onClick={createMove}>과제 만들기</button>
        </div>
    );
}

export default Assignment;