import React from 'react';
import { Link, Outlet } from "react-router-dom";

function MyPageNav() {
    return(
        <div className="nav">
            <Link to="profile">プロフィール</Link>
            <Link to="message">メッセージ</Link>
            <Link to="myposts">自分の投稿</Link>
            <Link to="likes">いいねした投稿</Link>
            <Link to="/practice">面接練習する</Link>
            <Outlet />
        </div>
    );
};

export default MyPageNav;
