import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

function LikesDetail(props) {
    const [LikesDetail, setLikesDetail] = useState({
        que: "",
        path: "",
        name: "",
        tag: "",
    });
    const params = useParams();

    useEffect(() => {
        getLikesDetail()
    }, [])

    const getLikesDetail = async () => {
        const response = await
            axios.get(`/api/timeline/${params.id}`);
        setLikesDetail({
            que: response.data.post.question.question,
            path: response.data.post.video_path,
            name: response.data.post.user.name,
            tag: response.data.post.tag.tag,
        })
    }

    return (
        <div>
            <h1>Likes詳細ページ</h1>
            <div>
                <p>質問文：{LikesDetail.que}</p>
                <video src={`${LikesDetail.path}`} controls width="40%"></video>
                <p>名前：{LikesDetail.name}</p>
            </div>
            <Link to={'/likes'}>戻る</Link>
        </div>
    );
};

export default LikesDetail;
