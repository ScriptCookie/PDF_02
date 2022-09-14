import React from 'react';

function SubjectList(props) {
    //console.log('props', props.value)

    const submap = props.value.map((res, idx) => (<li key={idx}>{res}</li>))

    return(
        <div>
            <h3>개설한 과목 리스트</h3>
            <ul id='subList'>
                {submap}
            </ul>
        </div>
    );
}

export default SubjectList;