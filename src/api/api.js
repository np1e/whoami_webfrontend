import rest from './axios';
import sio from './socketio';

export default {
    createPlayer(sucess_callback, error_callback, username = None) {
        rest.post('/player', {username: username}, sucess_callback, error_callback);
    },
    createGame(name, creator, success_callback, error_callback) {
        rest.post('/game', {
            name: name,
            creator: creator
        }, success_callback, error_callback);
    },
    joinGame(player, game, success_callback, error_callback) {
        // join game (REST and WebSocket)
        // store username and sessionid in state
    },
    leaveGame() {
    }
}