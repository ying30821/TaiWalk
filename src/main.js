import { createApp } from 'vue';
// bootstrap icon
import 'bootstrap-icons/font/bootstrap-icons.css';
// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// loading
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

import App from './App.vue';
import router from './router';
import { date, allCity } from './methods/filters';

const app = createApp(App);
app.config.globalProperties.$filters = {
  date, allCity,
};
app.use(VueAxios, axios);
app.component('Loading', Loading);
app.use(router);
app.mount('#app');
