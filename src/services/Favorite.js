import http from 'axios';

export default {
  async find(params) {
    return http.get('/favorite', {
      params,
    })
      .then(res => res.data);
  },
  async create(id) {
    return http.post('/favorite', {
      gif_id: id,
    })
      .then(res => res.data);
  },
  async isFavorite(id) {
    return http.get(`/favorite/${id}/is-favorite`)
      .then(res => res.data.isFavorite);
  },
  async delete(id) {
    return http.delete(`/favorite/${id}`)
      .then(res => res.data);
  },
};
