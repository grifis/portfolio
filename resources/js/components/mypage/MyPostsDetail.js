import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

function MyPostsDetail(props) {
    const [myPostDetail, setMyPostDetail] = useState({
        que: "",
        path: "",
        name: "",
    });
    const params = useParams();

    useEffect(() => {
        getMyPostDetail()
    }, [])

    const getMyPostDetail = async () => {
        const response = await
            axios.get(`/api/mypost/${params.id}`);
        setMyPostDetail({
            que: response.data.myPost.question.question,
            path: response.data.myPost.video_path,
            name: response.data.myPost.user.name,
        })
    }

    return (
        <div>
            <h1>mypost詳細ページ</h1>
            <div>
                <p>質問文：{myPostDetail.que}</p>
                <video src={`${myPostDetail.path}`} controls width="40%"></video>
                <p>名前：{myPostDetail.name}</p>
            </div>
            <Link to={'/mypage/myposts'}>戻る</Link>
        </div>
    );
};

export default MyPostsDetail;
