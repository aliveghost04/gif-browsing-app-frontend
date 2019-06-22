<template>
  <v-app>
    <v-toolbar app v-show="showToolbar">
      <v-layout>
        <v-flex xs2>
          <v-toolbar-title class="headline text-uppercase">
            <router-link :to="{
              name: 'home'
            }">
              <img class="d-flex" src="./assets/logo.png" alt="logo">
            </router-link>
          </v-toolbar-title>
        </v-flex>

      <v-flex xs6 align-center justify-center d-flex>
        <v-text-field
          v-show="$route.name !== 'home'"
          hide-details
          solo
          append-icon="search"
          placeholder="Search"
          v-model="searchTerm"
          @keyup.enter="search"
        ></v-text-field>
      </v-flex>
      <v-flex xs4 text-xs-right>
        <div v-if="user">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                color="info"
                v-on="on"
              >
                {{ user.first_name }} {{ user.last_name }}
                <v-icon>arrow_drop_down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-tile @click="$router.push({
                  name: 'favorite'
                })"
              >
                <v-list-tile-title>
                  <v-icon small>favorite</v-icon>&nbsp;
                  Favorites
                </v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="$router.push({
                  name: 'history'
                })"
              >
                <v-list-tile-title>
                  <v-icon small>history</v-icon>&nbsp;
                  History
                </v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="logout"
              >
                <v-list-tile-title>
                  <v-icon small>exit_to_app</v-icon>&nbsp;
                  Log out
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
        <div v-else>
          <v-btn
            flat
            color="teal"
            :to="{
              name: 'login'
            }"
          >
            <span class="mr-2">Iniciar sesión</span>
          </v-btn>
          <v-btn
            raised
            color="info"
            :to="{
              name: 'register'
            }"
          >
            <span class="mr-2">Registrarse</span>
          </v-btn>
        </div>
      </v-flex>
      </v-layout>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
      <v-dialog
        :value="isLoading"
        overlay
        persistent
        width="300"
      >
        <v-card
          color="primary"
          dark
        >
          <v-card-text>
            Loading, please stand by
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-snackbar
        :value="alert.show"
        :color="alert.color"
        :timeout="alert.timeout"
      >
        {{ alert.message }}
      </v-snackbar>
    </v-content>

    <v-footer height="60">
      <v-layout column align-center>
      <v-flex xs12>
        &copy; 2019. All rights reserved
      </v-flex>
      <v-flex xs12>
          Made with <v-icon small color="red">favorite</v-icon> by
          <a href="https://github.com/aliveghost04" target="_blank">Erick Jiménez</a>
      </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      searchTerm: '',
    };
  },
  mounted() {
    this.searchTerm = this.$route.query.q;
  },
  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.push({
        name: 'home',
      });
    },
    search() {
      this.$router.push({
        name: 'search',
        query: {
          q: this.searchTerm,
        },
      });
    },
  },
  computed: {
    showToolbar() {
      return this.$route.name !== 'login' && this.$route.name !== 'login';
    },
    user() {
      return this.$store.state.user;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    alert() {
      return this.$store.state.alert;
    },
  },
};
</script>

<style scoped>
  .headline img {
    max-height: 50px;
  }
</style>
