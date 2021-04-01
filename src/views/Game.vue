<template>
    <div class="game h-full">
      <CenterCard v-if="error">
        <div v-if="error === 'GAME_NOT_FOUND'">
          <h2>No game found</h2>
          <p>There is no game associated with your current session.</p>   
        </div>
        <div v-else-if="error === 'SESSION_EXPIRED'">
          <h2>Session expired</h2>
          <p>Your session has expired. That probably means the game has ended.</p>
        </div>
        <div v-else>
          <h2>An error occured</h2>
          <p>Well something went wrong there.</p>
        </div>
        <p>Do you want to start a new game?</p> 
        <sl-button size="medium" class="green" @click="redirectToHome">
          Sure!
        </sl-button>
      </CenterCard>

      <GameWaiting :gameKey="game.key"  v-if="currentPlayer && game.state === 'WAITING'"></GameWaiting>
      <GameInProgress v-if="currentPlayer && game.state === 'RUNNING'"></GameInProgress>
      <GameFinished v-if="currentPlayer && game.state === 'FINISHED'"></GameFinished>

    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import LayoutDefault from "../components/layout/LayoutDefault.vue";
import WebSocket from "../utils/websocket";
import GameWaiting from '../components/game/GameWaiting.vue';
import GameInProgress from '../components/game/GameInProgess.vue';
import GameFinished from '../components/game/GameFinished.vue';
import CenterCard from '../components/CenterCard.vue';

export default {
  name: "Game",
  components: {
    GameWaiting,
    GameInProgress,
    GameFinished,
    CenterCard
  },
  data: function() {
    return {
        game_id: "",
        error: "",
        loading: false,
        gameState: ''
    }
  },
  methods: {
    ...mapMutations(['setCurrentPlayer', 'updatePlayers', 'setWebsocket', 'updatePlayer', 'updateGame']),
    redirectToHome() {
      localStorage.removeItem('token');
      this.$router.replace({ name: 'home' });
    },
  },
  computed: {
    ...mapGetters(['currentPlayer', 'players', 'websocket', 'game']),
  },
  created: async function () {
    this.$emit("update:layout", LayoutDefault);

    const token = localStorage.getItem('token');

    if(!token) {
      this.error = "SESSION_EXPIRED";
    } else {
      const websocket = new WebSocket();
  
      const onConnect = async () => {
        const {player, game} = await this.websocket.sendToken(token);
  
        if(!game || !player) {
          this.error = "GAME_NOT_FOUND";
        } else {
          console.log(player);
          console.log(game);
          this.updateGame(game);
          this.setCurrentPlayer(player);
          this.updatePlayers(game.players);
          this.gameState = game.state;
    
          this.websocket.registerHandler('player_changed', data => {
            console.log("player changed");
            this.updatePlayer(JSON.parse(data).player);
          });
    
          this.websocket.registerHandler('game_started', game => {
            this.updateGame(game);
            this.updatePlayers(game.players);
            this.gameState = game.state;
          });

          this.websocket.registerHandler('update_game', game => {
            console.log("update game");
            if (game.state === "FINISHED") {
              setTimeout(() => {
                this.updateGame(game)
              }, 3000);
            } else {
              this.updateGame(game);
            }
          });
        }
      }
      this.setWebsocket({websocket, onConnect});
    }

  },
  watch: {
    // call again the method if the route changes
  },
  mounted: function() {
      console.log("Game view mounted");
  }
}
</script>