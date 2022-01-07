import React from 'react';
import { Link } from "react-router-dom";

function NavBar() {
    return(
        <div className="nav">
            <Link to="/mypage">マイページ</Link>
            <Link to="/timeline">タイムライン</Link>
            <Link to="/practice">面接練習</Link>
        </div>
    )
}

export default NavBar;
