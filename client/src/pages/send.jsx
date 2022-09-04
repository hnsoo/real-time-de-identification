import Webcam from "react-webcam";
import React, {useEffect} from "react";
import io from "socket.io-client";

const socket =  io.connect('http://localhost:5000')

export default function Send() {
    useEffect(() => {
        let id = setInterval(() => {
            capture();
        }, 1000 / FPS);
        return () => clearInterval(id);
    }, []);

    const FPS = 30
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
        () => {
            socket.emit("send_image", webcamRef.current.getScreenshot());
        },
        [webcamRef]
    );
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    return (
        <>
            <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
            />
        </>
    );
}