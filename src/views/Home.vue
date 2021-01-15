<template>
  <div class="homepage">
    <section class="section homepage-hero bg-background py-xl p-sm lg:p-xl">
      <div class="homepage-hero__content mx-auto w-3/4 lg:w-2/3">
        <div class="section-heading">
          <h1 class="text-4xl md:text-6xl font-bold leading-normal md:leading-relaxed mb-8">
            Play remotely with your friends!
          </h1>
        </div>
        <div class="homepage-hero__creategame">
          <form id="create-game_form" method="post" @submit.prevent="submitCreateForm" class="">
            <div class="flex flex-col sm:flex-row sm:space-x-4">
              <div class="flex flex-col sm:w-1/2">
                <input v-model="game_name"
                  placeholder="Enter a name for your game"
                  :class="[ error ? 'border-red-500' : 'border-gray' ]"
                  class="h-14 transition-all flex-1 placeholder-color-dark-accent rounded-md border px-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                />
              </div>
              <custom-button class="mt-4 sm:mt-0" type="submit">Create Game</custom-button>
            </div>
          </form>
          <span v-if="error" class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  Please enter a name for your game!
                </span>
        </div>
      </div>
    </section>
    <section class="section homepage-description bg-secondary p-xl">
      <section class="section">
        <div class="section-heading ">
          <h2 class="text-2xl lg:text-4xl text-gray">
            How to play
          </h2>
        </div>
        <div class="flex flex-col space-y-12 md:space-y-0 md:flex-row justify-between">
          <div class="">
            <div class="block start-block">
              <svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="block__heading heading--4 text-gray">
                Create a game
              </h3>
              <p class="block__content color-white">
                Create a new game for you and your friends. You can set a password, 
                a maximum amount of players and choose out of lots of collections!
              </p>
            </div>
          </div>
          <div
            class="grid__item grid__item--tablet-up-half grid__item--desktop-up-quarter"
          >
            <div class="block start-block">
              <svg class="h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 class="block__heading heading--4 text-gray">
                Ask questions about your character
              </h3>
              <p class="block__content color-white">
                Ask the other players questions about your character to determine its identity. 
                You can take notes so you don't ask a question twice.
              </p>
            </div>
          </div>
          <div
            class="grid__item grid__item--tablet-up-half grid__item--desktop-up-quarter"
          >
            <div class="block start-block">
              <svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              <h3 class="block__heading heading--4 text-gray">
                Answer the other players questions
              </h3>
              <p class="block__content color-white">
                Answer the other players questions about their characters. 
                The character of the player whose turn it is will be displayed for everyone else.
              </p>
            </div>
          </div>
          <div
            class="grid__item grid__item--tablet-up-half grid__item--desktop-up-quarter"
          >
            <div class="block start-block">
              <svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="block__heading heading--4 text-gray">
                Make a guess
              </h3>
              <p class="block__content color-white">
                When you think you know enough you can take a guess at your character identity.
                The game will either approve or disapprive automatically or there can be a vote among all players.
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
    <section class="section homepage-placeholder py-xl p-sm lg:p-xl">
      
    </section>
  </div>
</template>

<script>
import LayoutDefault from "../components/layout/LayoutDefault.vue";
import Button from "../components/Button.vue";

export default {
  name: "Home",
  components: {
    "custom-button": Button,
  },
  data: function() {
    return {
      game_name: "",
      error: false
    }
  },
  created: function () {
    this.$emit("update:layout", LayoutDefault);
  },
  methods: {
    submitCreateForm: function() {
      if (!this.game_name) {
        this.error = true;
        return;
      }

      this.createPlayer();
    },
    createPlayer: function() {
      this.$api.createPlayer(this.createGame, (error_status, error_msg) => {
        console.log(error_status, error_msg);
      });
    },
    createGame: function(player) {
      console.log(player);
      this.$api.createGame(this.game_name, player.id, 
        response => {
          let game = response.game;
          this.$router.push({ path: `/game/${game.id}` });
        },
        (error_status, error_msg) => {
          console.log(error_status, error_msg);
        });
    }
  }
};
</script>

<style lang="scss">
.homepage-description {

    color: var(--light-gray);

    svg {
      stroke: var(--light-gray);
    }
}
</style>