<template>
  <v-container text-center>
    <v-layout>
      <v-flex xs12 offset-md3 md6>
        <v-img
          justify-center
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          max-height="150"
        ></v-img>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12 offset-md3 md6 mb-4>
        <v-text-field
          outline
          hide-details
          label="Search"
          append-icon="search"
          v-model="searchTerm"
          @keyup.enter="search"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 offset-md3 md6 text-xs-center v-if="user">
        <v-btn
          :to="{
            name: 'favorite'
          }"
        >
          <v-icon small>favorite</v-icon>&nbsp;
          Favorites
        </v-btn>
        <v-btn
          :to="{
            name: 'history'
          }"
        >
          <v-icon small>history</v-icon>&nbsp;
          History
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
    };
  },
  methods: {
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
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style>

</style>
