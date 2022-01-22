import React from 'react';
import Webcam from "react-webcam";
import NavBar from './NavBar';

const WebcamComponent = () => <Webcam />;

function Practice(props) {
    axios.defaults.headers.common['X-CSRF-Token'] = props.csrf_token;
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);

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



    const handlePost = React.useCallback(() => {  //recordedChunksが変化した時に再計算
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {   //Blobはバイナリを扱う
                type: "video/webm"
            });
            const url = URL.createObjectURL(blob);  //メモリに保存されたblobにアクセス可能なURLを生成
            const data = new FormData();
            data.append('video', blob);
            const axiosPost = axios.create({
                xsrfHeaderName: props.csrf_token,
                withCredentials: true
            })
            axiosPost.post('/api/upload', data, {
                headers: { 'content-type': 'multipart/form-data'}
            })
                .then(res => {
                    console.log('success')
                }).catch(response => {
                console.log(response)
            });
            window.URL.revokeObjectURL(url);  //メモリの解放
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    return (
        <div>
            <NavBar />
            <h1>面接練習</h1>
            <Webcam audio={true} muted={true} ref={webcamRef} width="60%"/>
            {capturing ? (
                <button onClick={handleStopCaptureClick}>Stop Capture</button>
            ) : (
                <button onClick={handleStartCaptureClick}>Start Capture</button>
            )}
            {recordedChunks.length > 0 && (
                <button onClick={handlePost}>Upload</button>
            )}
        </div>
    );
}

export default Practice;
