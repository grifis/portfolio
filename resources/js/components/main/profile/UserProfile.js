import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useParams } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import {Card, CardActions, Grid} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

function UserProfile() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [profile, setProfile] = useState({
        name: "",
        tag: "",
        text: "",
    });

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async() => {
        const response = await axios.get(`/api/profile/${id}`)
        console.log(response.data.profile.tag);
        setProfile({
            name: response.data.profile.name,
            tag: response.data.profile.tag.tag,
            text: response.data.profile.text,
        });
        console.log(response.data.profile)
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        video: {
            marginTop: theme.spacing(5),
            marginRight: theme.spacing(5),
            marginLeft: theme.spacing(5),
        },
        title: {
            fontSize: 14,
        },
        card: {
            marginTop: theme.spacing(5),
        }
    }));

    const classes = useStyles();

    return (
        <>
            <Grid item container>
                <Grid item xs={4}/>
                <Grid item xs={4}>
                    <Card variant="outlined" className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>名前</Typography>
                            <Typography variant="h6" component="h2">{profile.name}</Typography>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>志望業界</Typography>
                            <Typography variant="h6" component="h2">{profile.tag}</Typography>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>ひとこと</Typography>
                            <Typography variant="h6" component="h2">{profile.text}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary" onClick={() => navigate(-1)}>戻る</Button>
                            <Button variant="contained" color="primary" component={Link} to="edit">編集</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={4}/>
            </Grid>
        </>
    );
}

export default UserProfile;
