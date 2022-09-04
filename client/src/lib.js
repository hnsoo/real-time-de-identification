import { io } from "socket.io-client";

let socket = io("http://서버 IP:서버 포트", { transports: ["websocket"] });
let cbMap = new Map();

// socketio.js
class socketio {
    initSocketConnection() {
        if (socket) return;
        socket.connect();
    };

    // 이벤트 명을 지정하고 데이터를 보냄
    sendSocketMessage(cmd, body = null) {
        if (socket == null || socket.connected === false) {
            this.initiateSocketConnection();
        }
        socket.emit("message", {
            cmd: cmd,
            body: body,
        });
    };

// 해당 이벤트를 받고 콜백 함수를 실행함
    socketInfoReceived(cbType, cb) {
        cbMap.set(cbType, cb);

        if (socket.hasListeners("message")) {
            socket.off("message");
        }

        socket.on("message", ret => {
            for (let [, cbValue] of cbMap) {
                cbValue(null, ret);
            }
        });
    };

// 소켓 연결을 끊음
    disconnectSocket() {
        if (socket == null || socket.connected === false) {
            return;
        }
        socket.disconnect();
        socket = undefined;
    };
}

export default new socketio();