import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import TimeLine from './TimeLine';
import MyPage from './MyPage';
import NavBar from "./NavBar";
import Practice from './Practice';
import Home from './Home';
import Profile from "./mypage/Profile";
import Message from "./mypage/Message";
import Likes from "./mypage/Likes";
import MyPosts from "./mypage/MyPosts";
import Login from "./Login";
import Register from "./Register";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import axios from "axios";


function App() {
    const csrftoken = document.head.querySelector('meta[name="csrf-token"]').content;
    const [csrf_token, setCsrf_token] = useState({csrftoken});
    const logout = (e) => {
        e.preventDefault();
        axios.post('logout')
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
                    <Route path="mypage" element={<MyPage logout={logout} csrf_token={csrf_token}/>} >
                        <Route path="profile" element={<Profile />} />
                        <Route path="message" element={<Message />} />
                        <Route path="likes" element={<Likes />} />
                        <Route path="myposts" element={<MyPosts />} />
                    </Route>
                    <Route path="/timeline" element={<TimeLine />} />
                    <Route path="/practice" element={<Practice logout={logout} csrf_token={csrf_token} post={post}/>} />
                </Routes>
            </div>
        </Router>
    )
}
if (document.getElementById('apple')) {
    ReactDOM.render(<App />, document.getElementById('apple'));
}
