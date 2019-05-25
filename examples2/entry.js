import Vue from 'vue';
import entry from './app';
import VueRouter from 'vue-router';
import routes from './route.config';
import Vui from 'main/index.js';
import '../packages/theme-chalk/src/index.scss';
// import VuiInput from '../lib/input';

Vue.use(Vui);
Vue.use(VueRouter);
// Vue.use(VuiInput);

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

new Vue({ // eslint-disable-line
  ...entry,
  router
}).$mount('#app');
