const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app)
const cors = require('cors')
const io = require('socket.io')(server,{
    cors : {
        origin :"*",
        credentials :true
    }
});

io.on('connection', (socket) => {

    //* 연결 종료 시
    socket.on('disconnect', () => {
        console.log('클라이언트 접속 해제');
    });

    //* 에러 시
    socket.on('error', (error) => {
        console.error(error);
    });

    //* 클라이언트로부터 메시지 수신
    socket.on('send_image', (data) => {
        io.emit('receive_image', data)
    });

    //* 클라이언트로 메세지 송신
    socket.emit('news', 'Hello Socket.IO'); // news라는 이벤트로 문자열을 포함하여 송신
});

server.listen(5000);