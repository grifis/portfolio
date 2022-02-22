import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import TimeLine from './TimeLine';
import Practice from './Practice';
import Profile from "./mypage/Profile";
import Message from "./mypage/Message";
import Likes from "./mypage/Likes";
import MyPosts from "./mypage/MyPosts";
import TimelineDetail from "./TimelineDetail";
import NavBar from './NavBar';
import MyPostsIndex from "./mypage/MyPostsIndex";
import MyPostsDetail from "./mypage/MyPostsDetail";
import LikesIndex from "./mypage/LikesIndex";
import LikesDetail from "./mypage/LikesDetail";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import axios from "axios";
import TimeLineIndex from "./TimelineIndex";
import { Grid } from '@material-ui/core';


function App() {
    const csrftoken = document.head.querySelector('meta[name="csrf-token"]').content;
    const [csrf_token, setCsrf_token] = useState({csrftoken});
    const element = document.getElementById('apple');
    const [users, setUsers] = useState([]);
    const [movies, setMovies] = useState([]);
    const [likePosts, setLikePosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [tagList, setTagList] = React.useState([]);
    const [hasMoreLikePost, setHasMoreLikePost] = useState(true);
    let stock  = [];
    if (element && element.dataset.user) {
        stock = JSON.parse(element.dataset.user)
    }

    const [user, setUser] = useState([]);
    useEffect(() => {
        getUsers()
        getTagList()
        setUser(stock)
        console.log('setUser completed')
    }, []);

    const getTagList = async () => {
        const response = await
            axios.get(`/api/tag`)
        setTagList(response.data.tag);
    }

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





    return (
        <Router>
            <Grid container direction="column">
                <Grid item>
                    <NavBar logout={logout} csrf_token={csrf_token} user={user}/>
                </Grid>
                <Grid item container>
                    <Grid item sm={1} />
                    <Grid item xs={12} sm={10}>
                    <Routes>
                        <Route path="profile" element={<Profile logout={logout} csrf_token={csrf_token} user={user}/>} />
                        <Route path="message" element={<Message logout={logout} csrf_token={csrf_token} user={user}/>} />
                        <Route path="likes" element={<Likes />}>
                            <Route index element={<LikesIndex logout={logout} csrf_token={csrf_token} user={user}  likePosts={likePosts} hasMoreLikePost={hasMoreLikePost} setLikePosts={setLikePosts} setHasMoreLikePost={setHasMoreLikePost}/>} />
                            <Route path=":id" element={<LikesDetail movies={movies} users={users} />} />
                        </Route>
                        <Route path="myposts" element={<MyPosts logout={logout} csrf_token={csrf_token} user={user}/>} >
                            <Route index element={<MyPostsIndex logout={logout} csrf_token={csrf_token} user={user} movies={movies} users={users} />} />
                            <Route path=":id" element={<MyPostsDetail movies={movies} users={users} />} />
                        </Route>
                        <Route path="timeline" element={<TimeLine />} >
                            <Route index element={<TimeLineIndex logout={logout} csrf_token={csrf_token} user={user}   hasMore={hasMore} setHasMore={setHasMore} setMovies={setMovies} tagList={tagList}/>} />
                            <Route path=":id" element={<TimelineDetail movies={movies} user={user} csrf_token={csrf_token} />} />
                        </Route>
                        <Route path="practice" element={<Practice logout={logout} csrf_token={csrf_token} post={post} user={user}/>} />
                    </Routes>
                    </Grid>
                    <Grid item sm={1} />
                </Grid>
            </Grid>
        </Router>
    )
}
if (document.getElementById('apple')) {
    ReactDOM.render(<App />, document.getElementById('apple'));
}
