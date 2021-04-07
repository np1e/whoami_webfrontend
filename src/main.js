import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api';
import VScrollLock from 'v-scroll-lock';
import ShoelaceModelDirective from '@shoelace-style/vue-sl-model';
import "tailwindcss/tailwind.css";
import './assets/css/index.scss';

Vue.config.productionTip = false
Vue.use(VScrollLock);
Vue.use(ShoelaceModelDirective);
Vue.config.ignoredElements = [/^sl-/];
Vue.prototype.$api = api;
Vue.prototype.$env = process.env;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
