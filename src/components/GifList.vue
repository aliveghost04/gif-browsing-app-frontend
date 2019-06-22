<template>
<v-layout row wrap>
<v-flex xs3 v-for="(gif, index) in gifs" :key="gif.id">
    <v-card
        class="ma-2 open-gif align-center d-flex"
        @click="openGif(gif, index)"
        height="300"
    >
        <v-img
            :src="gif.images.fixed_height_still.url"
            contain
            align-center
            max-height="300"
        >
            <template v-slot:placeholder>
                <v-layout
                    fill-height
                    align-center
                    justify-center
                    ma-0
                >
                    <v-progress-circular
                        indeterminate
                        color="green lighten-2"
                        size="70"
                    ></v-progress-circular>
                </v-layout>
            </template>
        </v-img>
        <!-- <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                flat
                raised
                icon
                color="red"
            >
                <v-icon>favorite</v-icon>
            </v-btn>
        </v-card-actions> -->
    </v-card>
    </v-flex>

    <v-dialog
    v-model="dialogOpen"
    >
    <v-card v-if="gif">
      <v-card-title>
          <span class="headline">{{ gif.title }}</span>
          <v-spacer></v-spacer>
          <v-btn
              icon
              flat
              @click="gif = null"
          >
              <v-icon>close</v-icon>
          </v-btn>
      </v-card-title>
      <v-img
          contain
          class="elevation-1"
          :src="gif.images.fixed_height.url"
          max-height="450"
      >
        <template v-slot:placeholder>
            <v-layout
                fill-height
                align-center
                justify-center
                ma-0
            >
                <v-progress-circular
                    indeterminate
                    color="green lighten-2"
                    size="70"
                ></v-progress-circular>
            </v-layout>
        </template>
      </v-img>
      <v-card-actions>
        <v-layout>
        <v-flex text-xs-left pl-3>
          <v-btn
            :disabled="!hasPrevious"
            @click="previous"
          >
            <v-icon>keyboard_arrow_left</v-icon>
            previous
          </v-btn>
          <v-btn
            :disabled="!hasNext"
            @click="next"
            class="ml-4"
          >
            next
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex align-self-center text-xs-right>
          <v-btn
              flat
              v-show="!gif.isFavorite"
              @click="createFavorite"
          >
              Add to favorites&nbsp;
              <v-icon small color="red">favorite</v-icon>
          </v-btn>
          <v-btn
              flat
              v-show="gif.isFavorite"
              @click="deleteFavorite"
          >
              Remove favorites&nbsp;
              <v-icon small color="yellow">favorite</v-icon>
          </v-btn>
        </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
    </v-dialog>

    <v-flex xs12>
        <v-pagination
            :value="pagination.page"
            @input="changePage"
            :length="pagination.total"
        ></v-pagination>
    </v-flex>
</v-layout>
</template>

<script>
import Favorite from '../services/Favorite';

export default {
  name: 'GifList',
  props: {
    gifs: {
      type: Array,
      required: true,
    },
    pagination: {
      type: Object,
      required: true,
    },
    checkFavorite: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      gif: null,
      index: null,
    };
  },
  methods: {
    async openGif(gif, index) {
      this.gif = gif;
      this.index = index;

      if (this.checkFavorite && this.$store.state.isAuthenticated) {
        const isFavorite = await Favorite.isFavorite(gif.id);
        this.$set(this.gif, 'isFavorite', isFavorite);
      }
    },
    async createFavorite() {
      try {
        await Favorite.create(this.gif.id);
        this.gif.isFavorite = true;
      } catch (e) {
        console.error(e);
      }
    },
    async deleteFavorite() {
      try {
        await Favorite.delete(this.gif.id);
        this.gif.isFavorite = false;
      } catch (e) {
        console.error(e);
      }
    },
    changePage(page) {
      this.$router.push({
        name: 'search',
        query: {
          page,
          q: this.$route.query.q,
        },
      });
    },
    previous() {
      if (this.hasPrevious) {
        this.index -= 1;
        this.gif = this.gifs[this.index];
      }
    },
    next() {
      if (this.hasNext) {
        this.index += 1;
        this.gif = this.gifs[this.index];
      }
    },
  },
  computed: {
    dialogOpen: {
      get() {
        return this.gif !== null;
      },
      set(value) {
        this.gif = null;
        this.index = null;
      },
    },
    hasNext() {
      return this.index >= 0
        ? this.index < (this.gifs.length - 1)
        : false;
    },
    hasPrevious() {
      return this.index 
        ? this.index > 0
        : false;
    }
  },
};
</script>

<style scoped>
    .open-gif {
        cursor: pointer;
    }
</style>
