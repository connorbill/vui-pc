import Vue from 'vue';
import entry from './app';
import VueRouter from 'vue-router';
import Element from 'main/index.js';
import hljs from 'highlight.js';
import routes from './route.config';
import demoBlock from './components/demo-block';
import MainFooter from './components/footer';
import MainHeader from './components/header';
import SideNav from './components/side-nav';
import FooterNav from './components/footer-nav';
import title from './i18n/title';
import {judgeValue} from '../src/funs/validate';
import * as check from '../src/funs/check-fun';
import 'packages/theme-chalk/src/index.scss';
import './demo-styles/index.scss';
import './assets/styles/common.css';
import './assets/styles/fonts/style.css';
Vue.prototype.$judgeValue = judgeValue;
Vue.prototype.$check = check;
Vue.use(Element);
Vue.use(VueRouter);
Vue.component('demo-block', demoBlock);
Vue.component('main-footer', MainFooter);
Vue.component('main-header', MainHeader);
Vue.component('side-nav', SideNav);
Vue.component('footer-nav', FooterNav);

function addRef(el, binding, vnode) {
  // const ref = binding.arg
  var ref = binding.arg;
  if (binding.value !== '' && binding.value !== null && binding.value !== undefined) {
    ref = binding.value;
  }
  const vm = vnode.context;
  const thing = vnode.componentInstance || vnode.elm;
  if (!vm.$refs.hasOwnProperty(ref)) {
    vm.$refs[ref] = [];
  }
  const index = vm.$refs[ref].indexOf(thing);
  if (index === -1) {
    vnode.context.$refs[ref].push(thing);
  }
}

function removeRef(el, {arg: ref}, {context: vm}, vnode) {
  if (vm.$refs.hasOwnProperty(ref)) {
    const arr = vm.$refs[ref];
    const thing = vnode.componentInstance || vnode.elm;
    const index = arr.indexOf(thing);
    if (index) {
      arr.splice(index, 1);
    }
  }
}

Vue.directive('multi-ref', {
  bind: addRef,
  update: addRef,
  unbind: removeRef
});

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
  const data = title[route.meta.lang];
  for (let val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val];
      return;
    }
  }
  document.title = 'Vui';
});

new Vue({ // eslint-disable-line
  ...entry,
  router
}).$mount('#app');
