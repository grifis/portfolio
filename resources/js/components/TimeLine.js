import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

function TimeLine(props) {

    const [users, setUsers] = useState([]);
    const [movies, setMovies] = useState([]);
    const [userInfo, setUserInfo] = useState({
        name: "",
        id: "",
    });

    useEffect(() => {
        getUsers()
        getMovies()
    }, [])

    const getUsers = async() => {
        const response = await axios.get('/api/user');
        setUsers(response.data.users)
        setUserInfo({
            name: response.data.users[0].name,
            id: response.data.users[0].id
        })
        console.log(response.data.users)
    }

    const getMovies = async() => {
        const response = await axios.get('/api/movie')
        setMovies(response.data.movie)
    }

    return (
        <div>
            <NavBar logout={props.logout} csrf_token={props.csrf_token} user={props.user}/>
            <h1>タイムライン</h1>
            <div>
                {movies.map((movie) =>
                    <div key={movie.id}>
                        <p>質問文：{movie.question.question}</p>
                        <video src={`${movie.video_path}`} controls width="40%"></video>
                        <p>名前：{movie.user.name}</p>
                    </div>
                )}
            </div>
            <ul>
                {users.map((user) => <li key={user.id}>{user.name}</li>)}
            </ul>
            <p>{userInfo.name}</p>
        </div>
    );
};

export default TimeLine;
