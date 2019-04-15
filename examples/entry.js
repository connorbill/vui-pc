import Vue from 'vue';
import entry from './app';
import VueRouter from 'vue-router';
import routes from './route.config';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

new Vue({ // eslint-disable-line
  ...entry,
  router
}).$mount('#app');
