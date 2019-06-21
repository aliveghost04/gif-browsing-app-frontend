<template>
  <v-container text-center>
    <v-layout xs12>
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
      <v-flex xs12 offset-md3 md6>
        <v-text-field
          outline
          label="Search"
          append-icon="search"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 offset-md3 md6 text-xs-center v-if="user">
        <v-btn>
          <v-icon>star</v-icon>&nbsp;
          Favorites
        </v-btn>
        <v-btn>
          <v-icon>history</v-icon>&nbsp;
          History
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {};
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
