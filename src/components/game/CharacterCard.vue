<template>
<sl-card class="character-card">
    <img class="image " v-if="!guessing"
        slot="image" 
        :src="imageUrl" 
        :alt="character.name"
    >
    <div v-else class="image flex justify-around items-center">
      <span class="text-9xl">
      ?
      </span>
    </div>
    <div v-if="guessing">
      <h1 class="text-md">
        Who Am I?
      </h1>
    </div>
    <div v-else>
      <p class="text-base text-gray-500 tracking-tight">
        {{ player.username }} is
      </p>
      <h1 class="text-md">
        {{ player.character.name }}
      </h1>
    </div>
    <div v-if="guessingPlayers.length == 1" slot="footer" class="flex justify-between items-center">
      <sl-button v-if="guessing" size="small" type="success" @click="advanceGame">Next player</sl-button>
      <div v-else-if="nextVotes >= 1 || !guessing" class="flex items-center space-x-2">
        <sl-button :disabled="voted" size="small" @click="voteNext">Vote next</sl-button>
        <sl-rating style="--symbol-color-active: var(--primary); --symbol-size: 1.5rem;" 
          :value="nextVotes" disabled class="next-votes" :max="this.players.length-1"></sl-rating>
      </div>
    </div>
</sl-card>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name: 'CharacterCard',
    props: ['player', 'character', 'guessing', 'game'],
    data: function() {
        return {
          voted: false,
          default_image: "https://via.placeholder.com/250"
        }
    },
    components: {
    },
    computed: {
      ...mapGetters(['websocket', 'players']),
      voteSuccessful: function() {
        return this.game.nextVotes == this.players.length - 1;
      },
      nextVotes: function() {
        return this.game.nextVotes;
      },
      imageUrl: function() {
        return this.character?.image ?? this.default_image;
      },
      guessingPlayers: function() {
        return this.players.filter(player => !player.guessed);
      }
    },
    methods: {
      voteNext() {
        this.websocket.socket.emit('voteNextPlayer', counted => {
          if (counted) {
            this.voted = true;
          } else {
            this.voted = false;
          }
        });
      },
      advanceGame() {
        this.websocket.socket.emit('advanceGame');
        this.voted = false;
      }
    },
    mounted: function() {
      if (!this.guessing) {
        const votesSymbol = document.querySelector('.next-votes');
        votesSymbol.getSymbol = () => '<sl-icon name="person-fill"></sl-icon>';
      }
    },
    ready: function() {
      
    }    
}
</script>

<style lang="scss">
.character-card {
    width: 100%;

}
</style>