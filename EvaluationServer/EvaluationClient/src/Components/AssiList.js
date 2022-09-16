import React from 'react';

function AssiList(props) {
    return(
        <div>
            <h3>과제 리스트</h3>
            <h3>{props.value}</h3>
        </div>
    );
}

export default AssiList;