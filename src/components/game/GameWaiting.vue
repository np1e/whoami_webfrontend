<template>
<div class="game__waiting flex space-between">
    <Sidebar gameState="waiting">
        <div class="game__status pb-8">
            <div class="game__status-heading flex items-center justify-between">
                <h2>Hello {{ currentPlayer.username }}!</h2>
                <sl-button v-if="currentPlayer.is_creator" :disabled="!allReady" size="medium" class="green" @click="startGame">Start Game</sl-button>
            </div>
            <div v-if="currentPlayer.is_creator" class="game__status-invite">
                <p class="text-base text-center leading-tight pb-5">
                    Send the following link to your friends, so they can join the game.
                </p>
                <sl-tooltip content="Copied to clipboard" trigger="manual" :open="copied">
                    <div class="inline-flex w-full items-center px-5 py-3 border border-gray-300 rounded-md cursor-default text-gray-900">
                        <span class="game-url flex-grow text-center text-sm font-mono">{{ inviteUrl }}</span>
                        <svg @click="copyUrl" class="w-6 h-6 stroke-current hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                    </div>
                </sl-tooltip>
            </div>
        </div>
        <PlayerTable></PlayerTable>
        <div class="game__ready pt-8 text-center">
            <p class="text-base text-center leading-tight pb-5">Let us know when you're ready, so that the game can start. Click the button below when your ready.</p>
            <sl-button v-if="!ready" size="large" class="green" @click="toggleReady">
                I'm ready!
            </sl-button>
            <sl-button v-else size="large" class="info reverse" @click="toggleReady">
                Wait, give me a minute
            </sl-button>
        </div>
    </Sidebar>
    <Placeholder></Placeholder>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import PlayerTable from './PlayerTable.vue';
import Placeholder from '../Placeholder.vue';
import Sidebar from '../layout/Sidebar.vue';

export default {
    name: 'GameWaiting',
    data: function() {
        return {
            inviteUrl: this.$env.VUE_APP_FRONTEND_URL  + "/join/" + this.gameKey,
            copied: false,
            ready: false
        }
    },
    components: {
        PlayerTable,
        Placeholder,
        Sidebar
    },
    props: {
        gameKey: String
    },
    methods: {
        toggleReady: function() {
            this.ready = !this.ready;
            this.websocket.socket.emit('changeReadyStatus', this.ready);
        },
        startGame: function() {
            this.websocket.socket.emit('startGame');
        },
        copyUrl: function() {
            navigator.clipboard.writeText(this.inviteUrl).then(() => {
                this.copied = true;
                setTimeout(() => {
                    this.copied = false;
                }, 2000);
            }, err => {

            });
        }
    },
    created: function(){
        
    },
    computed: {
        ...mapGetters(['currentPlayer', 'players', 'websocket']),
        sortedPlayers() {
            let players = [...this.players]
            return players
        },
        allReady() {
            return this.players.length == this.players.filter(({player}) => player.ready).length
        }
    },
}
</script>

<style lang="scss">
</style>