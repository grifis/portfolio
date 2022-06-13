import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import axios from "axios";
import { Grid } from '@material-ui/core';

import Create from './main/posts/create/create';
import Message from "./tmp/Message";
import TimelineDetail from "./main/posts/show/show/TimelineDetail";
import NavBar from './layout/NavBar';
import MyPostsIndex from "./main/posts/index/myIndex/MyPostsIndex";
import MyPostsDetail from "./main/posts/show/myPostsShow/MyPostsDetail";
import LikesIndex from "./main/posts/index/likesIndex/LikesIndex";
import LikesDetail from "./main/posts/show/likesShow/LikesDetail";
import TimeLineIndex from "./main/posts/index/index/TimelineIndex";
import UserProfile from "./main/profile/UserProfile";
import EditProfile from "./main/profile/EditProfile";


function App() {
    const csrftoken = document.head.querySelector('meta[name="csrf-token"]').content;
    const [csrf_token, setCsrf_token] = useState({csrftoken});
    const [users, setUsers] = useState([]);
    const [movies, setMovies] = useState([]);
    const [likePosts, setLikePosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [tagList, setTagList] = React.useState([]);
    const [hasMoreLikePost, setHasMoreLikePost] = useState(true);
    const [user, setUser] = useState([]);
    const element = document.getElementById('apple');
    let stock  = [];
    if (element && element.dataset.user) {
        stock = JSON.parse(element.dataset.user)
    }


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
                    <Grid item />
                    <Grid item xs={12} sm={12}>
                    <Routes>
                        <Route path="profile/:id" element={<UserProfile />} />
                        <Route path="profile/:id/edit" element={<EditProfile user={user} tagList={tagList}/>} />
                        <Route path="message" element={<Message />} />
                        <Route path="likes" element={<LikesIndex user={user} likePosts={likePosts} hasMoreLikePost={hasMoreLikePost} setLikePosts={setLikePosts} setHasMoreLikePost={setHasMoreLikePost} tagList={tagList}/>} />
                        <Route path="likes/:id" element={<LikesDetail movies={movies} users={users} />} />
                        <Route path="myposts" element={<MyPostsIndex csrf_token={csrf_token} user={user} movies={movies} users={users} hasMore={hasMore} setHasMore={setHasMore} tagList={tagList}/>} />
                        <Route path="myposts/:id" element={<MyPostsDetail movies={movies} users={users} />} />
                        <Route path="timeline" element={<TimeLineIndex csrf_token={csrf_token} user={user} hasMore={hasMore} setHasMore={setHasMore} tagList={tagList}/>} />
                        <Route path="timeline/:id" element={<TimelineDetail movies={movies} user={user} csrf_token={csrf_token} />} />
                        <Route path="practice" element={<Create post={post} user={user}/>} />
                    </Routes>
                    </Grid>
                    <Grid item />
                </Grid>
            </Grid>
        </Router>
    )
}
if (document.getElementById('apple')) {
    ReactDOM.render(<App />, document.getElementById('apple'));
}
