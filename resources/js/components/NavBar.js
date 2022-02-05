import React from 'react';
import { Link } from "react-router-dom";

function NavBar(props) {
    return(
        <div className="nav">
            <form>
                <input type='hidden' value={props.csrf_token}/>
                <input type='submit' onClick={props.logout} value="ログアウト"/>
            </form>
            <Link to="/mypage/myposts">マイページ</Link>
            <Link to="/timeline">タイムライン</Link>
            <Link to="/practice">面接練習</Link>
            <p>{props.user.name}様 ID:{props.user.id}</p>
        </div>
    )
}

export default NavBar;
