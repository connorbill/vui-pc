import axios from 'axios'; // 引入axios
import Qs from 'qs';
import { commonFunction } from '../common/CommonFunction';
import store from '../store/store';

// const tip = msg => {
// 	Toast({
// 		message: msg,
// 		duration: 1000,
// 		forbidClick: true
// 	});
// };

// const toLogin = () => {
//     // router.replace({
//     // 	path: '/home/main',
//     // 	query: {
//     // 		url: router.currentRoute.fullPath
//     // 	}
//     // });
//     let appData = localStorage.getItem('appInfo');
//     let my = {};
//     if (commonFun.isJSON(appData)) {
//         let getApp = JSON.parse(appData);
//         my = {
//             OSName: getApp.OSName,
//             OSVersion: getApp.OSVersion,
//             AppVersion: getApp.AppVersion,
//             DeviceType: getApp.DeviceType
//         };
//     }
//     if (my.OSName === 'IOS' || my.OSName === 'Android') {
//         console.log('is app');
//         // window.jumpToAppPage('login');
//     } else {
//         let baseUrl = process.env.VUE_APP_REQ_BASE_URL;
//         let loginUrl = baseUrl + '/home/main?url=' + router.history.base + router.history.current.path;
//         window.location.href = loginUrl;
//     }
// };

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
// const errorHandle = (status, other) => {
// 	// 状态码判断
// 	switch (status) {
// 		// 401: 未登录状态，跳转登录页
// 		case 401:
// 			// toLogin();
// 			break;
// 		// 403 token过期
// 		// 清除token并跳转登录页
// 		case 403:
// 			tip('登录过期，请重新登录');
// 			localStorage.removeItem('token');
// 			store.commit('loginSuccess', null);
// 			setTimeout(() => {
// 				toLogin();
// 			}, 1000);
// 			break;
// 		// 404请求不存在
// 		case 404:
// 			tip('请求的资源不存在');
// 			break;
// 		default:
// 			console.log(other);
// 	}
// };

// 创建axios实例
let instance = axios.create({
    // baseURL: 'http://levi.mobile.qianxiangbank.com',
    // baseURL: 'http://levi.wap.qianxiangbank.com',
    // timeout: 2500,
    // headers: {
    //     'Content-type': 'application/x-www-form-urlencoded'
    // }
});
// 设置post请求头
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
    config => {
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作
        // let token = store.state.token;
        let token = localStorage.getItem('token');
        token && (config.headers.token = token);
        return config;
    },
    error => Promise.reject(error));

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    res => {
        // console.log(res);
        if (res.status === 200) {
            // 0 代表成功
            if (res.data.code === '000000') {
                return res.data;
            } else {
                // token失效
                if (res.data.code === '000003') {
                    localStorage.removeItem('token');
                    commonFunction.toLogin();
                    return;
                }
                return Promise.reject(res.data);
            }
        } else {
            return Promise.reject(res.data);
        }
    },
    // 请求失败
    error => {
        const { response } = error;
        // return Promise.reject(response);
        if (response) {
            // 请求已发出，但是不在2xx的范围
            // errorHandle(response.status, response.statusText);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            store.commit('changeNetwork', false);
        }
    }
);

let instanceAxios = {
    get (url, params) {
        return instance.get(url, {
            params: params
        });
    },
    post (url, params) {
        return instance.post(url, Qs.stringify(params));
    }
};
// 专为上传图片定的变量
let originalAxios = {
    get (url, params) {
        return axios.get(url, {
            params: params
        });
    },
    post (url, params) {
        return axios({
            method: 'post',
            url: url,
            data: Qs.stringify(params),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
};

export { instanceAxios, originalAxios };
