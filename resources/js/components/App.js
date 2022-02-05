import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import TimeLine from './TimeLine';
import MyPage from './MyPage';
import Practice from './Practice';
import Profile from "./mypage/Profile";
import Message from "./mypage/Message";
import Likes from "./mypage/Likes";
import MyPosts from "./mypage/MyPosts";
import TimelineDetail from "./TimelineDetail";
import NavBar from './NavBar';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import axios from "axios";
import TimeLineIndex from "./TimelineIndex";


function App() {
    const csrftoken = document.head.querySelector('meta[name="csrf-token"]').content;
    const [csrf_token, setCsrf_token] = useState({csrftoken});
    const element = document.getElementById('apple');
    const [users, setUsers] = useState([]);
    const [movies, setMovies] = useState([]);
    let stock  = [];
    if (element && element.dataset.user) {
        stock = JSON.parse(element.dataset.user)
    };

    const [user, setUser] = useState([]);
    useEffect(() => {
        getUsers()
        getMovies()
        setUser(stock)
        console.log('setUser completed')
    }, []);

    const logout = () => {
        axios.post('/logout')
            .then(response => {
                console.log('ok');
            })
    }
    const post = () => {
        axios.post('/create/posts')
            .then(response => {
                console.log('ok');
            })
    }

    const getUsers = async() => {
        const response = await axios.get('/api/user');
        setUsers(response.data.users)
        console.log('setUsers completed')
    }

    const getMovies = async() => {
        const response = await axios.get('/api/movie')
        setMovies(response.data.movie)
        console.log('setMovies completed')
    }

    return (
        <Router>
            <div>
                <NavBar logout={logout} csrf_token={csrf_token} user={user}/>
                <Routes>
                    <Route path="mypage" element={<MyPage logout={logout} csrf_token={csrf_token} user={user}/>} >
                        <Route path="profile" element={<Profile logout={logout} csrf_token={csrf_token} user={user}/>} />
                        <Route path="message" element={<Message logout={logout} csrf_token={csrf_token} user={user}/>} />
                        <Route path="likes" element={<Likes logout={logout} csrf_token={csrf_token} user={user}/>}/>
                        <Route path="myposts" element={<MyPosts logout={logout} csrf_token={csrf_token} user={user}/>} />
                    </Route>
                    <Route path="/timeline" element={<TimeLine logout={logout} csrf_token={csrf_token} user={user}  />} >
                        <Route index element={<TimeLineIndex logout={logout} csrf_token={csrf_token} user={user} movies={movies} users={users} />} />
                        <Route path=":id" element={<TimelineDetail movies={movies} users={users} />} />
                    </Route>
                    <Route path="/practice" element={<Practice logout={logout} csrf_token={csrf_token} post={post} user={user}/>} />
                </Routes>
            </div>
        </Router>
    )
}
if (document.getElementById('apple')) {
    ReactDOM.render(<App />, document.getElementById('apple'));
}
