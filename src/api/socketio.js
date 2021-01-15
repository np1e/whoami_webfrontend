import io from 'socket.io-client';

const socket = io(process.env.VUE_APP_APP_URL, {
    autoConnect: false
});

socket.on('connect', function() {
    console.log("connected");
    console.log(socket.id);
});

socket.on('disconnect', function() {
    console.log("disconnected");
});

socket.on('player_joined', function(data) {
    console.log("Player Joined!");
    this.$emit('player_joined', data);
})

export default {
    join: function(player_id, game_id) {
        socket.open();
        socket.emit('join', {
            player_id: player_id,
            game: game_id
        });
    },
    registerHandler(eventName, eventCallback) {
        socket.on(eventName, eventCallback);
    }
}