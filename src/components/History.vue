<template>
<v-layout pa-4>
    <v-flex xs12>
    <h3 class="mb-4">History</h3>
    <v-alert
      class="mb-3"
      :value="true"
      icon="info"
      color="light-blue lighten-2"
    >
      Only will be shown the last 25 registry
    </v-alert>
    <v-data-table
        :headers="headers"
        :items="histories"
        class="elevation-1"
    >
        <template v-slot:items="props">
        <td>{{ props.item.data }}</td>
        <td>{{ props.item.created_at }}</td>
        </template>
    </v-data-table>
</v-flex>
</v-layout>
</template>

<script>
import History from '../services/History';

export default {
  name: 'History',
  data() {
    return {
      headers: [
        {
          text: 'Search Term',
          value: 'data',
        },
        {
          text: 'Date',
          value: 'created_at',
        },
      ],
      histories: [],
      pagination: {},
    };
  },
  async mounted() {
    this.search();
  },
  methods: {
    async search() {
      let { limit = 25, page = 1 } = this.$route.query;

      page = Number(page);
      page = page <= 0 ? 1 : page;
      const searchResult = await History.find({
        limit,
        page,
      });

      this.histories = searchResult.data;

      this.pagination.total = searchResult.total;
      this.pagination.page = page;
    },
  },
  watch: {
    '$route.query': {
      handle(value) {
        this.search();
      },
      deep: true,
    },
  },
};
</script>
