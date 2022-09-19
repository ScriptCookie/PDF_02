import React, { useEffect, useState } from 'react';

function Invite() {
    const [url, setUrl] = useState();

    function link() {
        fetch('http://localhost:9000/invite', {
            method : 'post',
            headers : {
                "Content-Type" : "application/json",
              },
            body : JSON.stringify({
                posting : 'posting'
            })
        })
        .then(res => res.json())
        .then(res => setUrl(res))
    }

    useEffect(() => {
        link();
    }, [])

    return(
        <div>
            <h3>구성원 초대 링크</h3>
            {url}
        </div>
    );
}

export default Invite;