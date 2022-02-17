import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Box, Drawer, Grid, InputBase, InputLabel, MenuItem, Toolbar} from '@material-ui/core';
import { makeStyles, alpha} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import InfiniteScroll  from "react-infinite-scroller";

function MyPostsIndex(props) {
    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        getMyPosts()
        console.log('get MyPosts')
    }, []);

    const getMyPosts = async() => {
        const queries = {id: props.user.id};
        const response = await axios.get('/api/myposts', {params: queries})
        setMyPosts(response.data.myposts)
        console.log('setMyPosts completed');
        console.log(response.data.myposts);
    }

    return (
        <div>
            <div>
                <p>自分の投稿</p>
                {myPosts.map((myPost) =>
                    <div key={myPost.id}>
                        <p>質問文：{myPost.question.question}</p>
                        <video src={`${myPost.video_path}`} controls width="40%"></video>
                        <p>名前：{myPost.user.name}</p>
                        <Link to={`/myposts/${myPost.id}`}>詳細</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyPostsIndex;
