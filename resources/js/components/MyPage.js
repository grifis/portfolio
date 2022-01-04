import React from 'react';
import MyPageNav from "./mypage/MyPageNav";
import NavBar from './NavBar';

function MyPage() {
    return (
        <div>
            <div>
                <NavBar />
                <h1>マイページ</h1>
                <MyPageNav />
            </div>
        </div>
    );
};

export default MyPage;
