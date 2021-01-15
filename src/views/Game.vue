<template>
    <div class="game">
        <join-game-overlay :game_id="game_id" v-if="!state.hasJoinedGame"></join-game-overlay>
        <game-header :game="game"></game-header>
        <ul @player_joined="addPlayer">
            <li v-for="(player, index) in players" :key="index">
                {{ player }}
            </li>
        </ul>
    </div>
</template>

<script>
import LayoutDefault from "../components/layout/LayoutDefault.vue";
import GameHeader from "../components/GameHeader.vue"
import JoinGameOverlay from "../components/JoinGameOverlay.vue";
import axios from "../mixins/axios.js";

export default {
  name: "Game",
  components: {
      GameHeader,
      JoinGameOverlay
  },
  mixins: [axios],
  data: function() {
    return {
        state: this.$store.state,
        game_id: "",
        game: {},
        players: [],
        error: false,
        loading: false
    }
  },
  methods: {
    addPlayer: function(data) {
        console.log(data);
        this.players.append(data);
    },
    fetchGame: function() {
        this.game_id = this.$route.params.id;
        this.get(`/game/${this.game_id}`, response => {
            console.log(response);
            this.game = response;
            this.players = this.game.players.map(player => player.username)
        }, (error_status, error_msg) => {
            this.error = true;
            console.log(error_status, error_msg);
        });
    }
  },
  created: function () {
    this.$emit("update:layout", LayoutDefault);
    this.fetchGame();
  },
  watch: {
    // call again the method if the route changes
    $route: "fetchGame",
  },
  mounted: function() {
      
  }
}
</script>