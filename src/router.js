import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import Game from './views/Game.vue';
import About from './views/About.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home},
    { path: '/game/:id', component: Game},
    { path: '/about', component: About}
]

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})