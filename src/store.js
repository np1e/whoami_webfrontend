import api from './api/api';'

export default new Vuex.Store({
    state: {
        count: 0,
        username: "",
        sessions_id: "",
        game_id: ""
      },
      mutations: {
        increment (state) {
          state.count++
        },
        joinGame(state, player, game) {

        },
        storeSession(state, session) {

        }
      },
      actions: {
        increment (context) {
          context.commit('increment')
        },
        joinGame({ commit, state }, player, game) {
            commit('joinGame', player, game);
            api.joinGame(player, game,
                // handle success
                () => commit('joinGame', player, game),
                // handle failure
                () => commit(types.CHECKOUT_FAILURE, savedCartItems))
        }
      }
})