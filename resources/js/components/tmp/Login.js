import React from 'react';
import { Link } from "react-router-dom";

function Login() {
    return (
        <div>
            <h1>ログインページ</h1>
            <form>
                <p>メールアドレス:<input/></p>
                <p>パスワード:<input/></p>
            </form>
            <Link to="/timeline">ログイン</Link>
            <h2>登録はこちらから</h2>
            <Link to="/register">登録</Link>
        </div>
    );
};

export default Login;
