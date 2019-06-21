<template>
  <v-app>
    <v-toolbar app v-show="showToolbar">
      <v-toolbar-title class="headline text-uppercase">
        <router-link :to="{
          name: 'home'
        }">
          <img src="./assets/logo.png" alt="logo">
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="user">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              color="info"
              v-on="on"
            >
              {{ user.fullName }}
              <v-icon>arrow_drop_down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile @click="$route.push({
                name: 'favorite'
              })"
            >
              <v-list-tile-title>
                <v-icon>star</v-icon>&nbsp;
                Favorite
              </v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="$route.push({
                name: 'history'
              })"
            >
              <v-list-tile-title>
                <v-icon>history</v-icon>&nbsp;
                History
              </v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="logout"
            >
              <v-list-tile-title>
                <v-icon>exit_to_app</v-icon>&nbsp;
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
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
    };
  },
  methods: {
    logout() {
      console.log('logout');
    },
  },
  computed: {
    showToolbar() {
      return this.$route.name !== 'login' && this.$route.name !== 'login';
    },
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style scoped>
  .headline img {
    max-height: 50px;
  }
</style>
