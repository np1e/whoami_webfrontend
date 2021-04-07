<template>
<div class="game__finished h-full flex justify-center">
    <div class="flex flex-col space-y-6 w-full items-center mt-28">
        <h1 class="text-gray-700">The game has finished!</h1>
        <p class="text-base text-gray-600">See below for the stats of this round.</p>
        <div class="game__finished-player_stats w-1/3 mb-10">
            <table class="divide-y divide-gray-200 min-w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <sl-icon name="trophy"></sl-icon>
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            # of guesses
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            character
                        </th>
                    </tr>
                </thead>
                <transition-group name="player-stats" appear tag="tbody" class="bg-white divide-y divide-gray-200" 
                    v-on:appear="appear" v-on:before-appear="beforeAppear" v-bind:css="false">
                    <tr v-for="({player}, index) in sortedPlayers" :key="player._id" 
                        :data-index="index"
                        class="player-stat transition duration-500 hover:bg-gray-100">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ index + 1 }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ player.username }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ player.guesses }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ player.character.name }}</div>
                        </td>
                    </tr>
                </transition-group>
            </table>
        </div>
        <div class="game__finished-actions flex flex-col items-center space-y-4">
            <p>Can we win you for another round?</p>
            <div class="flex space-x-4">
                <sl-button @click="startNewGame">Yes please!</sl-button>
                <sl-button @click="leave">Nope, I'm done</sl-button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Velocity from 'velocity';
import { mapGetters } from 'vuex';

export default {
    name: 'GameFinished',
    data: function() {
        return {
        }
    },
    components: {
    },
    props: {
    },
    methods: {
        startNewGame: function() {
            this.websocket.socket.emit('startNewRound');
        },
        leave: function() {
            this.websocket.socket.emit('leaveGame');
            localStorage.removeItem("token");
            this.$router.replace({ name: 'home' });
        },
        beforeAppear: function(el) {
            el.style.opacity = 0;
        },
        appear: function(el, done) {
            let delay = el.dataset.index * 450;
            setTimeout(() => {
                Velocity(
                    el,
                    { opacity: 1, transform: 'translateY(50px)' },
                    { complete: done }
                )
            }, delay);
        }
    },
    created: function(){
        
    },
    computed: {
        ...mapGetters(['currentPlayer', 'players', 'websocket']),
        sortedPlayers() {
            let players = [...this.players]
            return players.sort((p1, p2) => {
                if (p1.guessed && p2.guessed) {
                    return p2.guesses - p1.guesses;
                } else if (p1.guessed) {
                    return -1;
                } else {
                    return 1;
                }

            });
        }
    },
}
</script>

<style lang="scss">
.player-stats-enter-active, .player-stats-leave-active {
    transition: all 1s;
}
.player-stats-enter, .player-stats-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
</style>