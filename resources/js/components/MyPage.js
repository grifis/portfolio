import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import MyPageNav from "./mypage/MyPageNav";
import NavBar from './NavBar';

function MyPage(props) {


    return (
        <div>
            <div>
                <NavBar logout={props.logout} csrf_token={props.csrf_token} user={props.user}/>
                <h1>マイページ</h1>
                <MyPageNav user={props.user}/>
            </div>
        </div>
    );
};

export default MyPage;
