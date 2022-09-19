import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Assinull from './Assinull';
import AssiList from './AssiList';
import Invite from './Invite';

function Assignment() {
    const navi = useNavigate();
    const [subName, setSubName] = useState();
    const [managerName, setmanagerName] = useState();
    const [show, setShow] = useState(false);
    const [showInvite, setShowInvite] = useState(false);
    const [assignmentName , setAssignmentName] = useState([]);
    const [assignmentDate , setAssignmentDate] = useState();

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
        .then(res => {
            if(res.length === 0) {
                setShow(false);
            } else if (res.length !== 0) {
                setShow(true);
                const resNameMap = res.map((res) => (res[1]))
                const resDateMap = res.map((res) => (res[3]))
                setAssignmentName(resNameMap)
                setAssignmentDate(resDateMap)
            }
        })
    }

    function invite() {
        setShowInvite(true);
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
            {show ? <AssiList value={assignmentName} name = {managerName}/> : <Assinull/>}
            <button onClick={createMove}>과제 만들기</button>
            <p></p>
            {showInvite && <Invite/>}
            <button onClick={invite}>구성원 초대하기</button>
        </div>
    );
}

export default Assignment;