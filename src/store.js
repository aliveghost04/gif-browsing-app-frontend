import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    searchTerm: '',
  },
  mutations: {
    updateSearchTerm(state, value) {
      state.searchTerm = value;
    },
  },
  actions: {

  },
});
