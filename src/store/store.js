import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0,
        navBarShow: true,
        sideBarShow: true
    },
    mutations: {
        goToLogin(state) {
            sessionStorage.removeItem('token');
            window.location.reload();
        }
    },
    modules
});

export default store;
