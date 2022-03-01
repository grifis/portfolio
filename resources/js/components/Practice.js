import React, {useEffect, useState} from 'react';
import Webcam from "react-webcam";
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {alpha, makeStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from "@material-ui/core/FormControl";


const WebcamComponent = () => <Webcam />;

function Practice(props) {
    const navigate = useNavigate();
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getQuestions()
    }, [])

    const getQuestions = async() => {
        const response = await axios.get('/api/question');
        let num = Math.floor(Math.random() * response.data.que.length);
        setQuestions(response.data.que[num]);
        console.log(response.data.que[num]);
    }

    const handleStartCaptureClick = React.useCallback(() => {
        setCapturing(true);
        const userAgent = window.navigator.userAgent;
        let mimeCode = "video/mp4"
        if(userAgent.indexOf('Chrome') != -1) {
            mimeCode = "video/webm"
        }
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: mimeCode
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);

    const handleDataAvailable = React.useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStopCaptureClick = React.useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);



    const handleDownload = React.useCallback((e) => {  //recordedChunksが変化した時に再計算
        e.preventDefault();
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {   //Blobはバイナリを扱う
                type: "video/webm"
            });
            const url = URL.createObjectURL(blob);  //メモリに保存されたblobにアクセス可能なURLを生成
            const data = new FormData();
            data.append('video', blob, 'sample.webm');
            data.append('userId', props.user.id);
            data.append('tagId', props.user.tag_id);
            data.append('questionId', questions.id);
            axios.post('/api/upload', data, {
                headers: { 'content-type': 'multipart/form-data'},
            })
                .then(res => {
                    console.log('success')
                    navigate('/timeline')
                }).catch(response => {
                console.log(response)
            });
            window.URL.revokeObjectURL(url);  //メモリの解放
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        video: {
            marginTop: theme.spacing(2),
            marginRight: theme.spacing(5),
            marginLeft: theme.spacing(5),
        },
        box: {
            marginTop: theme.spacing(2),
            marginRight: theme.spacing(5),
        },
        buttonBox: {
            marginTop: theme.spacing(2),
        },
        button: {
            marginRight: theme.spacing(3),
        },
    }));

    const classes = useStyles();

    return (
        <Grid container direction="column">
            <Grid item container>
                <Grid item xs={9}>
                    <Box className={classes.video}>
                        <Webcam audio={true} muted={true} ref={webcamRef} width="100%"/>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box className={classes.box}>
                        <Card>
                            <CardContent>
                                <Typography>{questions.question}</Typography>
                            </CardContent>
                            <CardContent alignItems="center" justify="center">
                                <Button color="primary" variant="contained" onClick={getQuestions}>質問チェンジ</Button>
                            </CardContent>
                        </Card>
                        <Box className={classes.buttonBox}>
                            {capturing ? (
                                <Button color="secondary" variant="contained" onClick={handleStopCaptureClick} className={classes.button}>停止</Button>
                            ) : (
                                <Button color="primary" variant="contained" onClick={handleStartCaptureClick} className={classes.button}>開始</Button>
                            )}
                            {recordedChunks.length > 0 && (
                                <FormControl>
                                    <input type='hidden' value={props.csrf_token}/>
                                    <Button　color="primary" variant="contained" type='submit' onClick={handleDownload} className={classes.button}>投稿</Button>
                                </FormControl>
                            )}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Practice;
