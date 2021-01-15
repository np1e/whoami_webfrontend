import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api/api';
import VScrollLock from 'v-scroll-lock';
import "tailwindcss/tailwind.css";
import "ldbutton/dist/ldbtn.css";
import "@loadingio/loading.css/dist/loading.min.css";
import './assets/css/index.scss';

Vue.config.productionTip = false
Vue.use(VScrollLock);
Vue.use(Vuex);

new Vue({
  router,
  store,
  api,
  render: h => h(App),
}).$mount('#app')
