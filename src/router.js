import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import Game from './views/Game.vue';
import About from './views/About.vue';
import NotFound from './views/NotFound.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home, name: "home"},
    { path: '/game', component: Game, name: "game"},
    { path: '/about', component: About},
    { path: '/join/:invite_key', component: Home, props: true},
    { path: '/404', component: NotFound},
    { path: '*', redirect: '/404'}
]

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})