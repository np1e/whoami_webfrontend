import rest from './axios';

class Api {

    async ping() {
        await rest.get('/ping', response => {
            console.log(response);
        }, (error_status, error_msg) => {
            console.log(error_status, error_msg);
        });
    }
    
    createPlayer(sucess_callback, error_callback, username = "") {
        rest.post('/player', {username: username}, sucess_callback, error_callback);
    }
    createGame(username, max_players, collections, success_callback, error_callback) {
        rest.post('/game', {
            username: username,
            max_players: max_players,
            collections: collections
        }, success_callback, error_callback);
    }

    joinGame(username, game_key, success_callback, error_callback) {
        rest.post('game/join', {
            username: username,
            key: game_key
        }, success_callback, error_callback);
    }

    leaveGame() {
    }

    getCollections(success, error) {
        rest.get('/collections', success, error);
    }
}

export default new Api();