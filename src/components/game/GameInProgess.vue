<template>
<div class="game__in-progress w-full h-full flex mb-16">
    <Sidebar gameState="running">
        <div class="game__status pb-6">
            <div class="game__status-description text-sm text-center p-3 m-5 border rounded border-yellow-400">
                <p v-if="playersTurn._id === currentPlayer._id">
                    It's your turn
                </p>
                <p v-else>
                    Answer the other players question
                </p>
            </div>
        </div>
        <PlayerTable :playersTurn="playersTurn" :showScore="true"></PlayerTable>       
    </Sidebar>
    <div class="game__wrapper h-full w-3/4 flex flex-col justify-center">
        <div class="game__current-player flex flex-col justify-center mx-auto space-y-6 w-72 xl:w-96">
            <CharacterCard :player="playersTurn" :character="playersTurn.character" :guessing="ownTurn && !guessed" :game="game">
            </CharacterCard>
            <sl-card v-if="ownTurn || game.awaitingGuessVote || playersTurn.guessed" class="game__guess guess-card">
                <div>
                    <div v-if="game.awaitingGuessVote">
                        <h2 class="text-base mt-2 mb-2">
                            {{ ownTurn ? 'You' : playersTurn.username }} guessed {{ guess }}.
                        </h2>
                        <p v-if="!ownTurn" class="text-base leading-tight mb-4">
                            Is that correct?
                        </p>
                        <p v-else class="text-base leading-tight mb-4">
                            We couldn't automatically verfiy your guess, but the other players will vote whether your guess is correct.
                        </p>
                        <div class="flex-col">
                            <div v-if="!ownTurn" class="inline-flex space-x-2">
                                <sl-button size="small" @click="voteGuess(true)">Yep, sure is!</sl-button>
                                <sl-button size="small" @click="voteGuess(false)">Nope, not even close</sl-button>
                            </div>
                            <div class="guess-votes">
                                <sl-icon v-for="vote in game.guessVotes" 
                                    :class="vote.result ? 'text-green-500' : 'text-red-500'" :key="vote.id" name="person-fill"></sl-icon>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="playersTurn.guessed">
                        <div v-if="ownTurn">
                            <p class="text-base leading-tight mb-4">Congratulations! That was correct!</p>
                        </div>
                        <div v-else>
                            <p class="text-base leading-tight mb-4">{{ playersTurn.username }} made a correct guess!</p>
                        </div>
                    </div>
                    <div v-else-if="ownTurn && !playersTurn.guessed">
                        <p class="text-base leading-tight mb-4">Do you think you gathered enough information to take a guess?</p>
                        <div class="guess__input flex space-x-2">
                            <sl-input @keyup.enter="makeGuess" v-sl-model="guess"></sl-input>
                            <sl-button @click="makeGuess">Guess</sl-button>
                        </div>
                    </div>
                    <div v-else-if="guessVoteEnded && !guessVoteSuccessful">
                        <div v-if="ownTurn">
                            <p class="text-base leading-tight mb-4">The other players decided, that that vote was not correct. Try harder next time!</p>
                        </div>
                        <div v-else>
                            <p class="text-base leading-tight mb-4">You collectively voted down {{ playersTurn.username }}'s guess.</p>
                        </div>
                    </div>
                </div>
            </sl-card>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Sidebar from '../layout/Sidebar.vue';
import PlayerTable from './PlayerTable.vue';
import CharacterCard from './CharacterCard'

export default {
    name: 'GameInProgress',
    components: {
        Sidebar,
        PlayerTable,
        CharacterCard
    },
    data: function() {
        return {
            playersTurn: Object,
            guess: "",
            guessed: false,
            guessVoteSuccessful: false,
            guessVoteEnded: false,
            testCharacter: {
                name: "Samuel L. Jackson",
                image: {
                    image_url: "http://d1rer5t2ltiwl5.cloudfront.net/characters/images/samuel_l_jackson.jpg",
                    license: "CC BY-NC-SA 2.0",
                    creator: "Nathan Congleton"
                }
            }
        }
    },
    methods: {
        ...mapMutations(['setCurrentPlayer', 'updatePlayers', 'updatePlayer', 'updateGame']),
        fetchGameData: function() {
            this.websocket.socket.emit("requestGameData", game => {
                this.playersTurn = game.current_player;
                this.updateGame(game);
                this.updatePlayers(game.players);
            });
        },
        makeGuess: function() {
            if (this.ownTurn) {
                this.websocket.socket.emit('makeGuess', this.guess);
            }
        },
        voteGuess: function(correct) {
            this.websocket.socket.emit('voteGuess', correct);
        },
        advanceGame: function(game) {
            setTimeout(() => {
                this.playersTurn = game.current_player;
                this.updateGame(game);
                this.updatePlayers(game.players);
                this.guess = "";
            }, 3000);
        },
    },
    created: function() {
        this.fetchGameData();

        this.websocket.registerHandler('advance_game', game => {
            this.advanceGame(game);
        });
        
        this.websocket.registerHandler('made_guess', guess => this.guess = guess);

        this.websocket.registerHandler('guess_vote_successful', () => {
            this.guessVoteEnded = true;
            this.guessVoteSuccessful = true;
        });

        this.websocket.registerHandler('guess_vote_unsuccessful', () => {
            this.guessVoteEnded = true;
        });
      
    },
    computed: {
        ...mapGetters(['currentPlayer', 'players', 'websocket', 'game']),
        sortedPlayers() {
            let players = [...this.players]
            return players
        },
        votingPlayers() {
            return this.players.filter(player => player._id !== this.playersTurn._id);
        },
        ownTurn() {
            return this.currentPlayer._id === this.playersTurn._id;
        },
        guessedCorrectly() {
            return this.game.initialGuess || this.game.correctGuessVotes == this.players.length;
        },
        secondsLeft() {
            return 3;
        }
    },
}
</script>

<style lang="scss">

.game__current-player {
    .guess-card {
        width: 100%;
    }
}

.advance-enter-active {
  transition: all .3s ease;
}
.advance-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.advance-enter, .advance-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>