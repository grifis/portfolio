import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import MyPageNav from "./mypage/MyPageNav";
import NavBar from './NavBar';

function MyPage(props) {


    return (
        <div>
            <div>
                <NavBar logout={props.logout} csrf_token={props.csrf_token}/>
                <h1>マイページ</h1>
                <MyPageNav />
            </div>
        </div>
    );
};

export default MyPage;
