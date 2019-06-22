import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isLoading: false,
    token: null,
    isAuthenticated: false,
    alert: {
      message: '',
      show: false,
      color: 'red',
      timeout: 3500,
    },
  },
  mutations: {
    isLoading(state, isLoading = false) {
      state.isLoading = isLoading;
    },
    init(state) {
      try {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
          state.token = token;
          state.user = JSON.parse(user);
          state.isAuthenticated = true;
        }
      } catch (e) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        console.error(e);
      }
    },
    login(state, token) {
      state.token = token;
      localStorage.setItem('token', token);

      const [, tokenData] = token.split('.');
      try {
        const payload = JSON.parse(atob(tokenData));
        state.user = payload.user;
        localStorage.setItem('user', JSON.stringify(payload.user));
        state.isAuthenticated = true;
      } catch (e) {
        console.error(e);
      }
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    alert(state, alert) {
      Object.assign(state.alert, alert);
      state.alert.show = true;
      
      setTimeout(() => {
        state.alert = {
          message: '',
          show: false,
          color: 'red',
          timeout: 3500,
        };
      }, 3500);
    },
  },
  actions: {

  },
});
