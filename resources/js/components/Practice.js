import React, {useEffect, useState} from 'react';
import Webcam from "react-webcam";
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

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
            data.append('questionId', questions.id);
            axios.post('/api/upload', data, {
                headers: { 'content-type': 'multipart/form-data'},
            })
                .then(res => {
                    console.log('success')
                    navigate('/mypage')
                }).catch(response => {
                console.log(response)
            });
            window.URL.revokeObjectURL(url);  //メモリの解放
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    return (
        <div>
            <h1>面接練習</h1>
            <Webcam audio={true} muted={true} ref={webcamRef} width="60%"/>
            <button onClick={getQuestions}>質問チェンジ</button>
            {capturing ? (
                <button onClick={handleStopCaptureClick}>ストップ</button>
            ) : (
                <button onClick={handleStartCaptureClick}>スタート</button>
            )}
            {recordedChunks.length > 0 && (
                <form>
                    <input type='hidden' value={props.csrf_token}/>
                    <input type='submit' onClick={handleDownload} value="アップロード"/>
                </form>
            )}
            <p>{questions.question}</p>
        </div>
    );
}

export default Practice;
