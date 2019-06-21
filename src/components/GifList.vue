<template>
    <v-layout>
      <v-flex xs4 v-for="gif in gifs" :key="gif.id">
        <v-card class="ma-2">
            <v-img
                :src="gif.images.fixed_height_still.url"
                contain
            ></v-img>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    flat
                    raised
                    icon
                    color="red"
                >
                    <v-icon>favorite</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'GifList',
    props: {
        gifs: {
            type: Array,
            required: true,
        },
    },
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
