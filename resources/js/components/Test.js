import React, {useEffect, useState} from 'react';
import axios from "axios";
import {IconButton} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Typography from "@material-ui/core/Typography";

function Test(props) {
    const [isLiked, setIsLiked] = useState([]);
    const [likesCount, setLikesCount] = useState({
        count: "",
    })
    const movie = props.movie;

    useEffect(() => {
        getIsLiked()
    }, [])

    const getIsLiked = async () => {
        const queries = { user_id: props.user.id, post_id: movie.id};
        const response = await
            axios.get(`/api/isLiked/${movie.id}`, {params: queries})
        setIsLiked(response.data.bool)
        setLikesCount({
            count: response.data.count
        })
        console.log('id=' + `${movie.id}`)
        console.log(response.data)
    }

    const likePost = (id, e) => {
        e.preventDefault();
        const data = { user_id: props.user.id, post_id: id}
        axios.post(`/api/like/${id}`, data)
            .then(res => {
                console.log('successfully liked');
                getIsLiked();
            })
    }

    const unLikePost = (id, e) => {
        e.preventDefault();
        const param = { user_id: props.user.id, post_id: id}
        axios.delete(`/api/unlike/${id}`, {data: param})
            .then(res => {
                console.log('successfully unliked');
                getIsLiked();
            }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            { isLiked ? (
                <form>
                    <input type='hidden' value={props.csrf_token}/>
                    <IconButton type='submit' onClick={function(){const id = movie.id;unLikePost(id, arguments[0])}}>
                        <FavoriteIcon color={"secondary"}/>
                        <Typography>{likesCount.count}</Typography>
                    </IconButton>
                </form>
            ) : (
                <form>
                    <input type='hidden' value={props.csrf_token}/>
                    <IconButton type='submit' onClick={function(){const id = movie.id;likePost(id, arguments[0])}}>
                        <FavoriteBorderIcon />
                        <Typography>{likesCount.count}</Typography>
                    </IconButton>
                </form>
            )}
        </div>
    );
}

export default Test;
