<template>
  <div class="home content h-full">
    <CenterCard>
      <sl-form v-if="invite_key" class="join-game__form" @sl-submit="submitJoinForm">
        <h1 class="text-gray-800 pb-4">Join a game</h1>
        <div class="text-base">This is just a basic card. No image, no header, and no footer. Just your content.</div>
        <div class="flex flex-row justify-between space-x-2 w-full py-6">
          <sl-input required v-sl-model="username" name="username" type="text"></sl-input><sl-button submit>Join</sl-button>
        </div>
      </sl-form>
      
      <sl-form v-else class="create-game__form" v-on:sl-submit="submitCreateForm">
        <h1 class="text-gray-800 pb-4">Create a game</h1>
        <div class="text-base">This is just a basic card. No image, no header, and no footer. Just your content.</div>
        <div class="flex flex-row justify-between space-x-2 w-full py-6">
          <sl-input required v-sl-model="username" name="username" type="text"></sl-input>
          <sl-button submit>Create</sl-button>
        </div>
        <div class="options flex flex-col mb-6">
          <div class="mx-auto"> 
            <sl-button size="small" @click="showOptions = !showOptions">
              {{ showOptions ? 'Show less options' : 'Show more options' }}
            </sl-button>
          </div>
          <transition name="slide">
            <div v-if="showOptions" class="options__form py-6"> 
              <label for="max_players" class="text-base leading-tight"> 
                Change the maximum amount of players
              </label>
              <sl-range v-sl-model="max_players" name="max_players" min="2" max="15" step="1"></sl-range>

              <div class="text-base leading-tight my-4"> 
                Choose the collections from which each players character will be chosen
              </div>
              <div class="collections grid sm:grid-cols-2 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
                <label v-for="collection in available_collections" :key="collection.name" class="flex items-center">
                  <input class="focus:ring-blue-400 h-4 w-4 text-blue-600 border-gray-200 rounded hover:border-gray-600" :id="collection.name" type="checkbox" :value="collection" v-model="collections"/>
                  <span class="ml-2 leading-tight text-base">{{ collection.name }}</span>
                </label>
              </div>
            </div>
          </transition>
        </div>

      </sl-form>
      <sl-alert v-if="hasToken" type="warning" open>
        <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
        <strong>There seems to be an existing session</strong><br>
        Do you want to return to you last session?
        <div class="inline-flex ml-3 space-x-2">
          <sl-button @click="redirectToGame" type="warning" size="small">Yes, please!</sl-button>
          <sl-button @click="updateToken(undefined)" type="default" size="small">No, not interested in that</sl-button>
        </div>
      </sl-alert>

      <sl-alert v-if="error" type="danger" open>
        <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
          <strong>{{errorMessage}}</strong><br>
          
      </sl-alert>
    </CenterCard>
  </div>
</template>

<script>
import LayoutDefault from "../components/layout/LayoutDefault.vue";
import CenterCard from "../components/CenterCard.vue";

export default {
  name: "Home",
  components: {
    CenterCard
  },
  props: ['invite_key'],
  data: function() {
    return {
      username: "",
      max_players: 4,
      error: false,
      errorMessage: "",
      available_collections: [],
      collections: [],
      showOptions: false,
      hasToken: Boolean(localStorage.getItem("token"))
    }
  },
  created: function () {
    this.$emit("update:layout", LayoutDefault);
  },
  mounted: function() {
    this.fetchCollections();
  },
  methods: {
    fetchCollections: function() {
      this.$api.getCollections(data => {
        this.available_collections = data;
        this.collections = this.available_collections.filter(collection => collection.default);
      }, (error_status, error_msg) => {
        this.error = true;
        console.log(error_status, error_msg);
      });
    },
    submitCreateForm: function(event) {
      this.$api.createGame(this.username, this.max_players, this.collections,
        response => {
          let token = response.token;
          console.log(token);
          this.updateToken(token);
          this.redirectToGame();
        }, (error_status, error_msg) => {
          console.log(error_status, error_msg);
          this.error = true;
          this.errorMessage = error_msg;
        });
    },
    submitJoinForm: function() {
      this.$api.joinGame(this.username, this.invite_key,
        response => {
          console.log(response.token)
          this.updateToken(response.token);
          this.redirectToGame();
        }, (error_status, error_msg) => {
          this.error = true;
          if (error_status == 404) {
            this.errorMessage = "There was no game found with that invite key. Are you sure you got the right link?";
          }
          console.log(error_status, error_msg);
        });
    },
    updateToken: function(token) {
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
        this.hasToken = false;
      }
    },
    redirectToGame: function() {
      this.$router.push({ name: 'game' })
    }
  }
};
</script>

<style lang="scss">
.card {
  width: 70%;
  max-width: 700px;

  sl-button {
    margin: 0 auto;
  }

  .options__form {
    overflow: hidden;
  }
}

sl-input {
  flex-grow: 2;
}

.slide-enter, .slide-leave-to {
  transform: translateY(-50%);
  opacity: 0;
}

.slide-leave, .slide-enter-to {
  transform: translateY(0%);
}

.slide-enter-active {
  transition: all .3s ease;
}

.slide-leave-active {
  transition: all .3s ease;
}

</style>