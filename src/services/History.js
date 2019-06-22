import http from 'axios';

export default {
  async find(params) {
    return http.get('/history', {
      params,
    })
      .then(res => res.data);
  },
};
