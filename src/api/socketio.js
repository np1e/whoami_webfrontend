import io from 'socket.io-client';

const socket = io(process.env.VUE_APP_SOCKET_URL, {
    autoConnect: false
});

socket.on('connect', function() {
    console.log("connected");
});

socket.on('disconnect', function() {
    console.log("disconnected");
});

export default {
    sendToken: function(token, callback) {
        socket.open();
        socket.emit('authenticate', {
            token: token
        }, callback);
    },
    registerHandler(eventName, eventCallback) {
        socket.on(eventName, eventCallback);
    }
}