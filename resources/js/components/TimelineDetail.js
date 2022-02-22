import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Grid, IconButton} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from "@material-ui/core/FormControl";

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

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        video: {
            marginTop: theme.spacing(5),
            marginRight: theme.spacing(5),
        },
        title: {
            fontSize: 14,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        drawer: {
            width: 100,
            flexShrink: 0,
        },
    }));

    const classes = useStyles();


    return (
        <Grid container direction="column">
            <Grid item container>
                <Grid item xs={8}>
                    <Box className={classes.video}>
                        <video src={`${postDetail.path}`} controls width="100%"></video>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>名前</Typography>
                                <Typography variant="h6" component="h2">{postDetail.name}</Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>志望業界</Typography>
                                <Typography variant="h6" component="h2">{postDetail.tag}</Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>質問文</Typography>
                                <Typography variant="h6" component="h2">{postDetail.que}</Typography>
                                { isLiked.bool ? (
                                    <form>
                                        <input type='hidden' value={props.csrf_token}/>
                                        <IconButton type='submit' onClick={unLikePost}>
                                            <FavoriteIcon color={"secondary"}/>
                                            <Typography>{likesCount.count}</Typography>
                                        </IconButton>
                                    </form>
                                ) : (
                                    <form>
                                        <input type='hidden' value={props.csrf_token}/>
                                        <IconButton type='submit' onClick={likePost}>
                                            <FavoriteBorderIcon />
                                            <Typography>{likesCount.count}</Typography>
                                        </IconButton>
                                    </form>
                                )}
                            </CardContent>
                            <CardContent>
                                <Button variant="contained" color="primary" component={Link} to={'/timeline'}>戻る</Button>
                                <FormControl>
                                    <input type='hidden' value={props.csrf_token}/>
                                    <Button color="secondary" variant="contained" type='submit' onClick={deletePost}>削除</Button>
                                </FormControl>
                            </CardContent>
                        </Card>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default TimelineDetail;
