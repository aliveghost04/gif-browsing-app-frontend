import http from 'axios';

export default {
  async authenticate(body) {
    return http.post('/auth', body)
      .then(res => res.data);
  },

  async register(body) {
    return http.post('/register', body)
      .then(res => res.data);
  },
};
