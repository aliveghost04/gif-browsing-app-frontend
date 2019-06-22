import http from 'axios';

export default {
  async search(params) {
    return http.get('/search', {
      params,
    })
      .then(res => res.data);
  },
};
