import React from 'react';
import { Link } from "react-router-dom";

function TimeLineIndex(props) {

    const movies = props.movies;
    const users = props.users;

    return (
        <div>
            <h1>タイムライン</h1>
            <div>
                {movies.map((movie) =>
                    <div key={movie.id}>
                        <p>質問文：{movie.question.question}</p>
                        <video src={`${movie.video_path}`} controls width="40%"></video>
                        <p>名前：{movie.user.name}</p>
                        <Link to={`/timeline/${movie.id}`}>詳細</Link>
                    </div>
                )}
            </div>
            <ul>
                {users.map((user) => <li key={user.id}>{user.name}</li>)}
            </ul>
        </div>
    );
};

export default TimeLineIndex;
