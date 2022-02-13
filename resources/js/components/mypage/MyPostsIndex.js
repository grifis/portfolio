import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

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
                        <Link to={`/mypage/myposts/${myPost.id}`}>詳細</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyPostsIndex;
