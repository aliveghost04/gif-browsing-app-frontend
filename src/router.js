import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Search from './components/Search.vue';
import Favorite from './components/Favorite.vue';
import NotFound from './components/NotFound.vue';
import History from './components/History.vue';
import Register from './components/Register.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        title: 'Search',
      },
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: Favorite,
      meta: {
        title: 'Favorite',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: 'Login',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: 'Register',
      },
    },
    {
      path: '/history',
      name: 'history',
      component: History,
      meta: {
        title: 'Search history',
      },
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
      meta: {
        title: 'Not found',
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (!token) {
    if (
      to.name === 'favorite'
      || to.name === 'history'
    ) {
      next({
        name: 'login',
      });
      return;
    }
  }

  next();
});

router.afterEach((to, from, next) => {
  let title = 'Gif Browsing APP';
  if (to.meta.title) {
    title = `${to.meta.title} | ${title}`;
  }

  document.title = title;
});

export default router;
