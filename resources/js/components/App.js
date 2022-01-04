import React from 'react';
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


function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="mypage" element={<MyPage />} >
                        <Route path="profile" element={<Profile />} />
                        <Route path="message" element={<Message />} />
                        <Route path="likes" element={<Likes />} />
                        <Route path="myposts" element={<MyPosts />} />
                    </Route>
                    <Route path="/timeline" element={<TimeLine />} />
                    <Route path="/practice" element={<Practice />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;
