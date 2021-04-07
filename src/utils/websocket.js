import io from 'socket.io-client';

class WebSocket {

    constructor() {
        this.socket = io(process.env.VUE_APP_SOCKET_URL);
    }

    async sendToken(token) {
        this.socket.open();
        return new Promise(resolve => {
            this.socket.emit('authenticate', {
                token: token
            }, (player, game) => {
                resolve({player, game})
            });
        });
    }    

    registerHandler(eventName, eventCallback) {
        this.socket.on(eventName, eventCallback);
    }

    async disconnect() {
        if(this.socket) await this.socket.disconnect();
    }

    async reconnect() {
        await this.socket.disconnect();
        this.socket.connect();
    }
}

export default WebSocket;