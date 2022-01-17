import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

function TimeLine() {

    const [users, setUsers] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getUsers()
        getMovies()
    }, [])

    const getUsers = async() => {
        const response = await axios.get('/api/user');
        setUsers(response.data.users)
    }

    const getMovies = async() => {
        const response = await axios.get('/api/movie')
        setMovies(response.data.movie)
    }

    return (
        <div>
            <NavBar />
            <h1>タイムライン</h1>
            <div>
                {movies.map((movie) =>
                    <div>
                        <p>質問文:学生時代に力を入れたことは何ですか？</p>
                        <video src={`${movie.image_path}`} controls width="40%"></video>
                        <p>ユーザー名</p>
                    </div>
                )}
            </div>
            <ul>
                {users.map((user) => <li key={user.id}>{user.name}</li>)}
            </ul>
        </div>
    );
};

export default TimeLine;
