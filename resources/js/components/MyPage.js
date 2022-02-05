import React from 'react';
import MyPageNav from "./mypage/MyPageNav";

function MyPage(props) {


    return (
        <div>
            <h1>マイページ</h1>
            <MyPageNav user={props.user}/>
        </div>
    );
};

export default MyPage;
