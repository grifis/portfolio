import React from 'react';

function Profile(props) {
    return (
        <>
            {console.log(props.user)}
            <h1>名前：{props.user.name}</h1>
            <h1>志望業界：{props.user.tag_id}</h1>
            <h1>一言</h1>
            <textarea placeholder="一言"></textarea>
        </>
    );
}

export default Profile;
