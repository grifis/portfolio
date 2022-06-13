import React from 'react';
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>さぁ、面接練習を始めよう</h1>
            <Link to="/login">ログイン</Link>
        </div>
    );
};

export default Home;
