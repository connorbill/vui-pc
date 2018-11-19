import './assets/style/common/reset.scss';
import Vue from 'vue';
import App from './App.vue';
import router from './router/BootRouter';
import store from './store/store';
import ApiMainService from './service/api/ApiMainService';
import * as filter from './common/Filter';
import AppCallback from './common/JsWithApp';
import { commonFunction } from './common/CommonFunction';
import './assets/style/common/common.scss';

// app 调用函数
window.QX_AppCallback = AppCallback;
// 请求接口
Vue.prototype.$http = ApiMainService;
// 微信 js sdk
// if (window.wx) {
//     Vue.prototype.$wxSdk = window.wx;
// }
// filter 过滤器
Object.keys(filter).forEach(key => {
    Vue.filter(key, filter[key]);
});

// 主动执行获取app token
commonFunction.isRefreshAppInfo();
commonFunction.isRefreshAppToken();
commonFunction.isRefreshAppPage();

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
