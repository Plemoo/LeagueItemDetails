import axios from 'axios'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import App from './App.vue'
import LeagueItemDetails from "./components/LeagueItemDetails.vue"

//import ItemsByCategory from "./components/ItemsByCategory.vue"
import Game from "./components/Game.vue";
//import HowItWorks from "./components/HowItWorks.vue"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueGtag from "vue-gtag";

//import "./service/meinHuhn.js"

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


// Optionally install the BootstrapVue icon components plugin
//Vue.use(IconsPlugin)
Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(IconsPlugin);
Vue.use(VueGtag, {
    config: { id: "G-8J8LYM2H6S" }
});

export const EventBus = new Vue();


// const routes = [
//     { path: '/ItemsByCategory', component: ItemsByCategory },
//     { path: '', component: HowItWorks },
//     { path: '/', component: HowItWorks },
//     { path: '*', redirect: '/' }
// ]
const routes = [
    //    { path: '/ItemsByCategory', component: ItemsByCategory },
    { path: '', component: LeagueItemDetails },
    { path: '/', component: LeagueItemDetails },
    { path: '/meinHuhn', component: Game },
    { path: '*', redirect: '/' }
]

const router = new VueRouter({
    mode: 'history',
    routes
})


new Vue({
    router,
    render: h => h(App),
}).$mount('#app')