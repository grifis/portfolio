import React, {useEffect, useState} from 'react';
import { Link as RouterLink } from "react-router-dom";

import {Drawer, Grid, InputBase, InputLabel, MenuItem, Toolbar} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles, alpha} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Link from '@material-ui/core/Link';
import SearchIcon from '@material-ui/icons/Search';

import InfiniteScroll  from "react-infinite-scroller";
import axios from "axios";

import Test from '../../../../Test';

function TimeLineIndex(props) {

    const windowWidth = window.outerWidth;
    const drawerWidth = windowWidth/4;
    const [tag, setTag] = React.useState('');
    const [word, setWord] = React.useState('');
    const [movies, setMovies] = useState([]);
    const [ranks, setRanks] = useState([]);


    useEffect(() => {
        getMovies(1)
        getRank()
        return () => {
            reset()
        }
    }, [tag, word])

    const getMovies = async(page) => {
        const queries = {tag_id: tag, word: word};
        const response = await axios.get(`/api/movie?page=${page}`, {params: queries})
        if (response.data.movie.data.length < 1) {
            props.setHasMore(false);
        }
        console.log(response.data.movie.data);
        setMovies([...movies, ...response.data.movie.data])
    }

    const getRank = async() => {
        const queries = {tag_id: tag, word: word};
        const response = await axios.get(`/api/rank`, {params: queries})
        setRanks([...response.data.rank])
    }

    const reset = () => {
        props.setHasMore(true);
    }

    const tagChange = (event) => {
        setMovies([]);
        setTag(event.target.value);
    };

    const wordChange = (event) => {
        console.log(event.nativeEvent.isComposing);
            if (event.key === 'Enter' &&　!event.nativeEvent.isComposing) {
                setMovies([]);
                setWord(event.target.value);
                event.target.value = "";
            }
    }

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

    //各スクロール要素
    const items = (
        <div>
            {movies.map(function(movie) {
                return(
                <Card variant="outlined" key={movie.id} className={classes.menuButton}>
                    <CardContent>
                        <Typography color="textSecondary">
                            ユーザー名:
                            <Link color="textSecondary" component={RouterLink} to={`/profile/${movie.user.id}`}>
                                {movie.user.name}
                            </Link>
                        </Typography>
                        <Typography color="textSecondary">質問文:{movie.question.question}</Typography>
                        <Typography color="textSecondary">志望業界:{movie.tag.tag}</Typography>
                        <CardActions>
                            <video src={`${movie.video_path}`} controls width="75%"/>
                        </CardActions>
                        <CardActions>
                            <Button variant="contained" color="primary" component={RouterLink}
                                    to={`/timeline/${movie.id}`}>詳細</Button>
                            <Test user={props.user} movie={movie}/>
                        </CardActions>
                    </CardContent>
                </Card>)
            })}
        </div>);


    //ロード中に表示する項目
    const loader =<div className="loader" key={0}>Loading ...</div>;

    return (
        <div>
            <Grid item container >
                <Grid item xs={8}>
                    <div>
                        <Typography>タイムライン</Typography>
                        <InfiniteScroll
                            pageStart={1}
                            initialLoad={false}
                            loadMore={getMovies}    //項目を読み込む際に処理するコールバック関数
                            hasMore={props.hasMore}         //読み込みを行うかどうかの判定
                            loader={loader}>      {/* 読み込み最中に表示する項目 */}
                                {items}             {/* 無限スクロールで表示する項目 */}
                        </InfiniteScroll>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <Drawer color="primary" anchor="right" className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper,}}>
                        <Toolbar/>
                        <div className={classes.drawerContainer}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">業界検索</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tag}
                                    onChange={tagChange}
                                >
                                    <MenuItem　value={null}>全業界</MenuItem>
                                    {props.tagList.map((tag) =>
                                        <MenuItem value={tag.id} key={tag.id}>{tag.tag}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="検索"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    type="text"
                                    onKeyDown={wordChange}
                                />
                            </div>
                            <div>
                                <Typography className={classes.rankTitle}>〜いいね数ランキング〜</Typography>
                                {ranks.map((rank, index) =>
                                    <Card key={rank.id} variant="outlined" className={classes.ranking}>
                                        <CardContent>
                                            <Typography>第{index+1}位</Typography>
                                            <Typography>いいね数：{rank.likes_count}</Typography>
                                            <Typography>ユーザー名：{rank.user.name}</Typography>
                                            <video src={`${rank.video_path}`} controls width="75%"/>
                                            <Button variant="contained" color="primary" component={RouterLink} to={`/timeline/${rank.id}`}>詳細</Button>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </Drawer>
                </Grid>
            </Grid>
        </div>
    );
}

export default TimeLineIndex;
