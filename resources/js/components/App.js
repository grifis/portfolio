import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import TimeLine from './TimeLine';
import MyPage from './MyPage';
import Practice from './Practice';
import Profile from "./mypage/Profile";
import Message from "./mypage/Message";
import Likes from "./mypage/Likes";
import MyPosts from "./mypage/MyPosts";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import axios from "axios";


function App() {
    const csrftoken = document.head.querySelector('meta[name="csrf-token"]').content;
    const [csrf_token, setCsrf_token] = useState({csrftoken});
    const element = document.getElementById('apple');
    let stock  = [];
    if (element && element.dataset.user) {
        stock = JSON.parse(element.dataset.user)
    };
    const [user, setUser] = useState([]);
    useEffect(() => {
        setUser(stock)
        console.log(user)
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

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="mypage" element={<MyPage logout={logout} csrf_token={csrf_token} user={user}/>} >
                        <Route path="profile" element={<Profile logout={logout} csrf_token={csrf_token} user={user}/>} />
                        <Route path="message" element={<Message logout={logout} csrf_token={csrf_token} user={user}/>} />
                        <Route path="likes" element={<Likes />} logout={logout} csrf_token={csrf_token} user={user}/>
                        <Route path="myposts" element={<MyPosts logout={logout} csrf_token={csrf_token} user={user}/>} />
                    </Route>
                    <Route path="/timeline" element={<TimeLine logout={logout} csrf_token={csrf_token} user={user}/>} />
                    <Route path="/practice" element={<Practice logout={logout} csrf_token={csrf_token} post={post} user={user}/>} />
                </Routes>
            </div>
        </Router>
    )
}
if (document.getElementById('apple')) {
    ReactDOM.render(<App />, document.getElementById('apple'));
}
