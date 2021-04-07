import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentPlayer: null,
        players: [],
        websocket: null,
        game: null
      },
      mutations: {
        async setWebsocket(state, { websocket, onConnect }) {
          if(state.websocket) await state.websocket.disconnect();
          websocket.socket.on('connect', onConnect);
          state.websocket = websocket;
        },
        setCurrentPlayer(state, player) {
          state.currentPlayer = player;
        },
        updatePlayers(state, players) {
          state.players = players;
        },
        updateGame(state, game) {
          state.game = game;
        },
        updatePlayer(state, playerToUpdate) {
          const player = state.players.find(( {player} ) => player._id === playerToUpdate._id)
          if (player) {
              player.player = playerToUpdate
          } else {
              state.players.push({ player: playerToUpdate })
          }
        }
      },
      actions: {},
      getters: {
        currentPlayer: state => state.currentPlayer,
        players: state => state.players,
        game: state => state.game,
        websocket: state => state.websocket
    },
});