import 'babel-polyfill';
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/normalize.css';
import '@/assets/css/common.scss';
import httpRequest from '@/assets/js/service/http.js';
import '@/assets/js/service/mock.js';
// import pieChart from '@/components/echarts/pie-chart.vue';

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.prototype.$http = httpRequest;

// Vue.component('pieChart', pieChart);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
