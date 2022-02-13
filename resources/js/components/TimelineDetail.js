import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IconButton } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

function TimelineDetail(props) {
    const [postDetail, setPostDetail] = useState({
        que: "",
        path: "",
        name: "",
        tag: "",
    });
    const [isLiked, setIsLiked] = useState({
        bool: "",
    });
    const [likesCount, setLikesCount] = useState({
        count: "",
    })
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getPostDetail()
        getIsLiked()
        getLikesCount()
    }, [])

    const getIsLiked = async () => {
        const queries = { user_id: props.user.id, post_id: params.id};
        const response = await
            axios.get(`/api/isLiked/${params.id}`, {params: queries})
        setIsLiked({
            bool: response.data.bool,
        })
        console.log(response.data);
    }

    const getPostDetail = async () => {
        const response = await
            axios.get(`/api/timeline/${params.id}`);
        setPostDetail({
            que: response.data.post.question.question,
            path: response.data.post.video_path,
            name: response.data.post.user.name,
            tag: response.data.post.tag.tag,
        })
    }

    const getLikesCount = async () => {
        const response = await
            axios.get(`/api/likesCount/${params.id}`);
        setLikesCount({
            count: response.data.count
        })
        console.log(response.data);
    }

    const deletePost = (e) => {
        axios.delete(`/api/delete/${params.id}`)
            .then(response => {
                console.log(params.id)
                console.log(response.data);
                navigate('/timeline')
            })
        e.preventDefault();
    }

    const likePost = (e) => {
        e.preventDefault();
        const data = { user_id: props.user.id, post_id: params.id}
        axios.post(`/api/like/${params.id}`, data)
            .then(res => {
                console.log('successfully liked');
                getIsLiked();
                getLikesCount();
            })
    }

    const unLikePost = (e) => {
        e.preventDefault();
        const param = { user_id: props.user.id, post_id: params.id}
        axios.delete(`/api/unlike/${params.id}`, {data: param})
            .then(res => {
                console.log('successfully unliked');
                getIsLiked();
                getLikesCount();
            }).catch(err => {
                console.log(err)
        })
    }

    return (
        <div>
            <h1>Timeline詳細ページ</h1>
            <div>
                <p>質問文：{postDetail.que}</p>
                <video src={`${postDetail.path}`} controls width="40%"></video>
                <p>名前：{postDetail.name}</p>
                <p>志望業界：{postDetail.tag}</p>
            </div>
            <form>
                <input type='hidden' value={props.csrf_token}/>
                <input type='submit' onClick={deletePost} value="削除"/>
            </form>
            { isLiked.bool ? (
                <form>
                    <input type='hidden' value={props.csrf_token}/>
                    <IconButton type='submit' onClick={unLikePost}>
                        <FavoriteIcon color={"secondary"}/>
                    </IconButton>
                </form>
            ) : (
                <form>
                    <input type='hidden' value={props.csrf_token}/>
                    <IconButton type='submit' onClick={likePost}>
                        <FavoriteBorderIcon />
                    </IconButton>
                </form>
            )}
            <p>いいね数：{likesCount.count}</p>
            <Link to={'/timeline'}>戻る</Link>
        </div>
    );
};

export default TimelineDetail;
