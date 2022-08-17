import React, {useEffect, useState} from 'react';
import axios from "axios";
import {IconButton} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Typography from "@material-ui/core/Typography";

function Test(props) {
    const movie = props.movie;
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(movie.likes_count);

    useEffect(() => {
        isLikedByAuth();
    }, [])

    function isLikedByAuth() {  //投稿にいいねをしたuser_idのなかログインユーザーのidが入っているかを判定する。
        for(let i in movie.likes) {
            if(movie.likes[i].user_id === props.user.id){
                setIsLiked(true);
                break;
            }
        }
    }

    const likePost = (id, e) => {
        e.preventDefault();
        const data = { user_id: props.user.id, post_id: id}
        axios.post(`/api/like/${id}`, data)
            .then(res => {
                setLikesCount(likesCount+1);
                setIsLiked(true);
            })
    }

    const unLikePost = (id, e) => {
        e.preventDefault();
        const param = { user_id: props.user.id, post_id: id}
        axios.delete(`/api/unlike/${id}`, {data: param})
            .then(res => {
                setLikesCount(likesCount-1);
                setIsLiked(false);
            }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            { isLiked ? (
                <form>
                    <input type='hidden' value={props.csrf_token}/>
                    <IconButton type='submit' onClick={event => unLikePost(movie.id, event)}> {/*アロー関数の省略記法を使用*/}
                        <FavoriteIcon color={"secondary"}/>
                        <Typography>{likesCount}</Typography>
                    </IconButton>
                </form>
            ) : (
                <form>
                    <input type='hidden' value={props.csrf_token}/>
                    <IconButton type='submit' onClick={event => likePost(movie.id, event)}>
                        <FavoriteBorderIcon />
                        <Typography>{likesCount}</Typography>
                    </IconButton>
                </form>
            )}
        </div>
    );
}

export default Test;
