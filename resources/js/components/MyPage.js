import React from 'react';
import { useState } from 'react';
import MyPageNav from "./mypage/MyPageNav";
import NavBar from './NavBar';

function MyPage() {

    const csrftoken = document.head.querySelector('meta[name="csrf-token"]').content;

    const [csrf_token, setCsrf_token] = useState({csrf_token});
    return (
        <div>
            <form action="/logout" method="post">
                <input type='hidden' value={csrf_token}/>
                <button type='submit'>ログアウト</button>
            </form>
            <div>
                <NavBar />
                <h1>マイページ</h1>
                <MyPageNav />
            </div>
        </div>
    );
};

export default MyPage;
