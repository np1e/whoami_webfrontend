import Vue from 'vue'
import App from './App.vue'
import router from './router';
import VScrollLock from 'v-scroll-lock';
import "tailwindcss/tailwind.css"
import './assets/css/index.scss';

Vue.config.productionTip = false
Vue.use(VScrollLock);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
