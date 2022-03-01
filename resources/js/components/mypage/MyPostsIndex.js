import React, {useEffect, useState} from 'react';
import Test from '../Test';
import { Link as RouterLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Drawer, Grid, InputBase, InputLabel, MenuItem, Toolbar} from '@material-ui/core';
import { makeStyles, alpha} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import InfiniteScroll  from "react-infinite-scroller";
import axios from "axios";
import Link from '@material-ui/core/Link';
import Box from "@material-ui/core/Box";

function MyPostsIndex(props) {
    const windowWidth = window.outerWidth;
    const drawerWidth = windowWidth/4;
    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        getMyPostsFirst(1)
        return () => {
            reset()
        }
    }, []);

    const getMyPosts = async(page) => {
        const queries = {id: props.user.id};
        const response = await axios.get(`/api/myPosts?page=${page}`, {params: queries})
        if (response.data.myposts.data.length < 1) {
            props.setHasMore(false);
            console.log('no posts')
        } else {
            props.setHasMore(true);
        }
        console.log('setMyPosts completed');
        console.log(response.data.myposts.data);
        setMyPosts([...myPosts, ...response.data.myposts.data])
    }

    const getMyPostsFirst = async(page) => {
        const queries = {id: props.user.id};
        const response = await axios.get(`/api/myPosts?page=${page}`, {params: queries})
        if (response.data.myposts.data.length < 1) {
            props.setHasMore(false);
            console.log('no posts')
        }
        setMyPosts([...response.data.myposts.data])
        console.log('setMyPosts completed');
        console.log(response.data.myposts.data);
    }

    const reset = () => {
        props.setHasMore(true);
        console.log('リセットされたよ');
    }


    const loader =<div className="loader" key={0}>Loading ...</div>;

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            marginLeft: theme.spacing(5),
        },
        title: {
            flexGrow: 1,
        },
        test: {
            marginLeft: theme.spacing(5),
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        formControl: {
            margin: theme.spacing(1),
            marginLeft: theme.spacing(3),
            minWidth: 120,
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.black, 0.05),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.black, 0.15),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        ranking: {
            margin: theme.spacing(3),
        },
        rankTitle: {
            marginTop: theme.spacing(2),
            marginLeft: theme.spacing(2),
        },
    }));

    const classes = useStyles();

    const items = (
        <div>

            {myPosts.map((myPost) =>
                <Card variant="outlined" key={myPost.id} className={classes.menuButton}>
                    <CardContent>
                        <Typography color="textSecondary">
                            ユーザー名:
                            <Link color="textSecondary" component={RouterLink} to={`/profile/${myPost.user.id}`} >
                                {myPost.user.name}
                            </Link>
                        </Typography>
                        <Typography color="textSecondary">質問文:{myPost.question.question}</Typography>
                        <Typography color="textSecondary">志望業界:{myPost.tag.tag}</Typography>
                        <CardActions>
                            <video src={`${myPost.video_path}`} controls width="75%"/>
                        </CardActions>
                        <CardActions>
                            <Button variant="contained" color="primary" component={RouterLink} to={`/timeline/${myPost.id}`}>詳細</Button>
                            <Test user={props.user} movie={myPost}/>
                        </CardActions>
                    </CardContent>
                </Card>
            )}
        </div>);

    return (
        <div>
            <Grid item container >
                <Grid item xs={8}>
                    <div>
                        <Typography>タイムライン</Typography>
                        <InfiniteScroll
                            pageStart={1}
                            initialLoad={false}
                            loadMore={getMyPosts}    //項目を読み込む際に処理するコールバック関数
                            hasMore={props.hasMore}         //読み込みを行うかどうかの判定
                            loader={loader}>      {/* 読み込み最中に表示する項目 */}
                            {items}             {/* 無限スクロールで表示する項目 */}
                        </InfiniteScroll>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <Drawer color="primary" anchor="right" className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper,}}>

                    </Drawer>
                </Grid>
            </Grid>
        </div>
    );
}

export default MyPostsIndex;
