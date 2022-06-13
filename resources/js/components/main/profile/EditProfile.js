import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardActions, Grid, InputLabel, MenuItem, NativeSelect, Select} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

function EditProfile(props) {

    const navigate = useNavigate();
    const {id} = useParams();
    const [tag, setTag] = React.useState('');
    const [profile, setProfile] = useState({
        name: "",
        text: "",
        tag: "",
        tag_id: "",
    });

    useEffect(() => {
        getProfile()
    }, [])

    const modify = {name: profile.name, text: profile.text, tag_id: tag}

    const putProfile = async() => {
        const response = await axios.put(`/api/profile/modify/${id}`, modify)
        navigate(`/profile/${id}`);
    }

    const tagChange = (event) => {
        setTag(event.target.value);
        console.log(event.target.value)
    };

    const getProfile = async() => {
        const response = await axios.get(`/api/profile/${id}`)
        console.log(response.data.profile);
        setProfile({
            name: response.data.profile.name,
            text: response.data.profile.text,
            tag: response.data.profile.tag.tag,
            tag_id: response.data.profile.tag_id,
        });
        setTag(`${response.data.profile.tag_id}`);
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
        },
        formControl: {
            minWidth: 120,
        },
    }));

    const classes = useStyles();

    return (
        <>
            <Grid item container>
                <Grid item xs={4}/>
                <Grid item xs={4}>
                    <Card variant="outlined" className={classes.card}>
                        <form>
                            <CardContent>
                                <TextField required label='名前' value={profile.name} onChange={(e) => {
                                    setProfile({name: e.target.value, text: profile.text,  tag: profile.tag, tagId: profile.tagId});
                                }}/>
                            </CardContent>
                            <CardContent>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">志望業界</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={tag}
                                        onChange={tagChange}
                                    >
                                        {props.tagList.map((tag) => <MenuItem value={tag.id} key={tag.id}>{tag.tag}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </CardContent>
                            <CardContent>
                                <TextField  label='ひとこと' variant="outlined" value={profile.text} onChange={(e) => {
                                    setProfile({name: profile.name, text: e.target.value, tag: profile.tag, tag_id: profile.tag_id});
                                }}/>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" onClick={() => navigate(-1)}>戻る</Button>
                                <Button variant="contained" color="primary" onClick={putProfile}>保存</Button>
                            </CardActions>
                        </form>
                    </Card>
                </Grid>
                <Grid item xs={4}/>
            </Grid>
        </>
    );
}

export default EditProfile;
