import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

function TimelineDetail(props) {
    const [postDetail, setPostDetail] = useState({
        que: "",
        path: "",
        name: "",
    });
    const params = useParams();

    useEffect(() => {
        getPostDetail()
    }, [])

    const getPostDetail = async () => {
        const response = await
            axios.get(`/api/timeline/${params.id}`);
        setPostDetail({
            que: response.data.post.question.question,
            path: response.data.post.video_path,
            name: response.data.post.user.name,
        })
    }

    return (
        <div>
            <h1>Timeline詳細ページ</h1>
            <div>
                <p>質問文：{postDetail.que}</p>
                <video src={`${postDetail.path}`} controls width="40%"></video>
                <p>名前：{postDetail.name}</p>
            </div>
            <Link to={'/timeline'}>戻る</Link>
        </div>
    );
};

export default TimelineDetail;
