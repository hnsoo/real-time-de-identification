import React, {useEffect, useState} from "react";
import io from "socket.io-client";

const socket =  io.connect('http://localhost:5000')

export default function Receive() {
    const [imgSrc, setImgSrc] = useState();
    useEffect(() => {
        socket.on('receive_image', (data) => {
            console.log(data)
            setImgSrc(data)
        });
    }, [socket]);

    return (
        <div>
            <img src={imgSrc} alt='img' />
        </div>
    );
}