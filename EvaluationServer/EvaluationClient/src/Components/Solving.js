import React, { useEffect, useState } from 'react';

function Solving() {

    const [name, setName] = useState();
    const [explain, setExplain] = useState();
    const [date, setDate] = useState();

    function solvingList() {
        fetch('http://localhost:9000/Solving', {
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
            setName(res[1])
            setExplain(res[2])
            setDate(res[3])
        });
    }

    useEffect(() => {
        solvingList();
    }, [])

    return(
        <div>
            <h1>과제란</h1>
            Title : <input placeholder={name} disabled='disabled'></input>
            <p></p>
            explain : <input placeholder={explain} disabled='disabled'></input>
            <p></p>
            date : <input placeholder={date} disabled='disabled'></input>
            <p></p>
            <input placeholder='제출란'></input>
            <p></p>
            <button>과제 제출하기</button>
        </div>
    );
}

export default Solving;