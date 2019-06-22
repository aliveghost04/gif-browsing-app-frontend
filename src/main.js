import Vue from 'vue';
import axios from 'axios';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

axios.interceptors.request.use(
  (config) => {
    if (store.state.token) {
      config.headers.common.Authorization = `Bearer ${store.state.token}`;
    }

    store.commit('isLoading', true);

    return config;
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => {
    store.commit('isLoading', false);
    return response;
  },
  (error) => {
    store.commit('isLoading', false);
    store.commit('alert', {
      message: error.response.data.error || 'An error has occurred'
    });
    return Promise.reject(error);
  },
);

Vue.prototype.$http = axios;

store.commit('init');

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
