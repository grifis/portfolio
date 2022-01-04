import React from 'react';
import { Link } from "react-router-dom";

function Register() {
    return (
        <div>
            <h1>登録ページ</h1>
            <p>ユーザー名:<input/></p>
            <p>メールアドレス:<input/></p>
            <p>パスワード:<input/></p>
            <Link to="/login">登録</Link>
        </div>
    );
};

export default Register;
