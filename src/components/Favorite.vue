<template>
<v-container text-center>
    <h3>Favorites</h3>

    <gif-list
        v-if="gifs.length > 0"
        :gifs="gifs"
        :pagination="pagination"
    ></gif-list>
    <v-alert
      v-else
      :value="true"
      type="info"
    >
      You don't have favorites gifs.
    </v-alert>
</v-container>
</template>

<script>
import GifList from './GifList.vue';
import Favorite from '../services/Favorite';

export default {
  name: 'Favorite',
  components: {
    GifList,
  },
  async mounted() {
    await this.search();
  },
  data() {
    return {
      gifs: [],
      pagination: {},
    };
  },
  methods: {
    async search() {
      let { limit = 25, page = 1 } = this.$route.query;

      page = Number(page);
      page = page <= 0 ? 1 : page;
      const searchResult = await Favorite.find({
        limit,
        page,
      });

      this.gifs = searchResult.data;
      this.gifs = this.gifs.map((favorite) => {
        favorite.gif = JSON.parse(favorite.gif);
        this.$set(favorite.gif, 'isFavorite', true);
        return favorite.gif;
      });

      this.pagination.total = searchResult.last_page;
      this.pagination.page = page;
    },
  },
  watch: {
    '$route.query.page': function (value) {
      this.search();
    },
  },
};
</script>
