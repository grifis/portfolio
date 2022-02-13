import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

function TimeLineIndex(props) {

    const movies = props.movies;
    const users = props.users;

    useEffect(() => {
        props.getMovies()
        console.log('setUser completed')
    }, []);

    return (
        <div>
            <Grid item container spacing={2}>
                {movies.map((movie) =>
                        <Grid item xs={12} sm={6} md={4} key={movie.id}>
                            <Card variant="outlined" >
                                <CardContent>
                                    <Typography color="textSecondary">ユーザー名：{movie.user.name}</Typography>
                                    <Typography color="textSecondary">質問文：{movie.question.question}</Typography>
                                    <Typography color="textSecondary">志望業界：{movie.tag.tag}</Typography>
                                <CardActions>
                                    <video src={`${movie.video_path}`} controls width="65%"></video>
                                </CardActions>
                                <CardActions>
                                    <Button variant="contained" color="primary" component={Link} to={`/timeline/${movie.id}`}>詳細</Button>
                                </CardActions>
                                </CardContent>
                            </Card>
                        </Grid>
                )}
            </Grid>
        </div>
    );
};

export default TimeLineIndex;
