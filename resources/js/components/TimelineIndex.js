import React, {useEffect, useState} from 'react';
import Test from './Test';
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

function TimeLineIndex(props) {

    const windowWidth = window.outerWidth;
    const drawerWidth = windowWidth/4;
    const [tag, setTag] = React.useState('');
    const [word, setWord] = React.useState('');
    const [movies, setMovies] = useState([]);
    const [ranks, setRanks] = useState([]);


    useEffect(() => {
        getMoviesFirst(1)
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
            console.log('no posts')
        }
        console.log(response.data.movie.data);
        console.log(response.data)
        setMovies([...movies, ...response.data.movie.data])
    }

    const getMoviesFirst = async(page) => {
        const queries = {tag_id: tag, word: word};
        const response = await axios.get(`/api/movie?page=${page}`, {params: queries})
        if (response.data.movie.data.length < 1) {
            props.setHasMore(false);
            console.log('no posts')
        }
        console.log(response.data.movie.data);
        console.log(response.data)
        setMovies([...response.data.movie.data])
    }

    const getRank = async() => {
        const queries = {tag_id: tag, word: word};
        const response = await axios.get(`/api/rank`, {params: queries})

        console.log(response.data.rank);
        setRanks([...response.data.rank])
    }

    const reset = () => {
        props.setHasMore(true);
        console.log('????????????????????????');
    }

    const tagChange = (event) => {
        setTag(event.target.value);
        console.log(event.target.value);
    };

    const wordChange = (event) => {
        if (event.target.value) {
            window.document.onkeydown = function(event){
                if (event.key === 'Enter') {
                    setWord(event.target.value);
                    console.log(event.target.value);
                    event.target.value = "";
                }
            }
        } else {
                window.document.onkeydown = function(event){
                    if (event.key === 'Enter') {
                        console.log('nothing');
                    }
                }
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

    //????????????????????????
    const items = (
        <div>
            {movies.map((movie) =>
                <Card variant="outlined" key={movie.id} className={classes.menuButton}>
                    <CardContent>
                        <Typography color="textSecondary">
                            ???????????????:
                            <Link color="textSecondary" component={RouterLink} to={`/profile/${movie.user.id}`} >
                                {movie.user.name}
                            </Link>
                        </Typography>
                        <Typography color="textSecondary">?????????:{movie.question.question}</Typography>
                        <Typography color="textSecondary">????????????:{movie.tag.tag}</Typography>
                        <CardActions>
                            <video src={`${movie.video_path}`} controls width="75%"/>
                        </CardActions>
                        <CardActions>
                            <Button variant="contained" color="primary" component={RouterLink} to={`/timeline/${movie.id}`}>??????</Button>
                            <Test user={props.user} movie={movie}/>
                        </CardActions>
                    </CardContent>
                </Card>
            )}
        </div>);


    //?????????????????????????????????
    const loader =<div className="loader" key={0}>Loading ...</div>;

    return (
        <div>
            <Grid item container >
                <Grid item xs={8}>
                    <div>
                        <Typography>??????????????????</Typography>
                        <InfiniteScroll
                            pageStart={1}
                            initialLoad={false}
                            loadMore={getMovies}    //???????????????????????????????????????????????????????????????
                            hasMore={props.hasMore}         //??????????????????????????????????????????
                            loader={loader}>      {/* ??????????????????????????????????????? */}
                                {items}             {/* ?????????????????????????????????????????? */}
                        </InfiniteScroll>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <Drawer color="primary" anchor="right" className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper,}}>
                        <Toolbar/>
                        <div className={classes.drawerContainer}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">????????????</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tag}
                                    onChange={tagChange}
                                >
                                    <MenuItem???value={null}>?????????</MenuItem>
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
                                    placeholder="??????"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    type="text"
                                    onChange={wordChange}
                                />
                            </div>
                            <div>
                                <Typography className={classes.rankTitle}>?????????????????????????????????</Typography>
                                {ranks.map((rank, index) =>
                                    <Card key={rank.id} variant="outlined" className={classes.ranking}>
                                        <CardContent>
                                            <Typography>???{index+1}???</Typography>
                                            <Typography>???????????????{rank.likes_count}</Typography>
                                            <Typography>??????????????????{rank.user.name}</Typography>
                                            <video src={`${rank.video_path}`} controls width="75%"/>
                                            <Button variant="contained" color="primary" component={RouterLink} to={`/timeline/${rank.id}`}>??????</Button>
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
