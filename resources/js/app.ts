import './bootstrap';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueApexCharts from 'vue3-apexcharts';

import App from './App.vue';
import router from './router';

if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
}

const app = createApp(App);

app.use(createPinia());
app.use(VueApexCharts);
app.use(router);
app.mount('#app');
