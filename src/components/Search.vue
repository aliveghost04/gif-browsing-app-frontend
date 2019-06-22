<template>
<v-container text-center>
    <h3>Search result for "{{ searchTerm }}"</h3>
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
      No search results for you query.
    </v-alert>
</v-container>
</template>

<script>
import GifList from './GifList.vue';
import Search from '../services/Search';

export default {
  name: 'Search',
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
      const offset = page > 1 ? (page - 1) * limit : 0;
      const searchResult = await Search.search({
        limit,
        offset,
        q: this.searchTerm,
      });

      this.gifs = searchResult.data;

      if (searchResult.pagination.count > 0) {
        this.pagination.total = Math.ceil(
          searchResult.pagination.total_count / searchResult.pagination.count,
        );

        this.pagination.page = page;
      } else {
        this.pagination.total = 0;
        this.pagination.page = 1;
      }
    },
  },
  computed: {
    searchTerm() {
      return this.$route.query.q;
    },
  },
  watch: {
    '$route.query': {
      handler(value) {
        this.search();
      },
      deep: true,
    },
  },
};
</script>
