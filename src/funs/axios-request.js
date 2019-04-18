/* eslint-disable no-undef */
import axios from 'axios';
import Qs from 'qs';

function axiosRequest(config) {
  // axios-> ajax 请求封装文件
  // 默认配置
  let defaultConfig = {
    url: '',
    type: 'get',
    token: '',
    contentType: 'json',
    params: {}
  };
  config = Object.assign(defaultConfig, config);
  let url = config.url;
  let params = config.params;
  let instance = axios.create();
  // 响应拦截器
  let instanceToken = config.token ? config.token : '';

  if (config.contentType && config.contentType === 'form') {
    instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  } else {
    instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
  }

  instance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    if (instanceToken) {
      config.headers.Authorization = instanceToken;
    }
    return config;
  }, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  instance.interceptors.response.use(res => {
    // 请求成功
    if (res.status === 200) {
      return Promise.resolve(res.data);
    } else {
      return Promise.reject(res.data);
    }
  }, error => {
    // 请求失败
    let response = error.response;
    return Promise.reject(response);
  });
  let instanceAxios = {
    get: function() {
      return instance.get(url, {
        params: params
      });
    },
    // Qs-> 字段序列化库 /js/qs.js
    post: function() {
      if (config.contentType && config.contentType === 'form') {
        return instance.post(url, Qs.stringify(params));
      } else {
        return instance.post(url, params);
      }
    },
    all: function() {
      return axios.all(config.all);
    }

  };
  if (config.type === 'post') {
    return instanceAxios.post();
  } else if (config.type === 'get') {
    return instanceAxios.get();
  } else if (config.type === 'all') {
    return instanceAxios.all(config.all);
  }
}

export default axiosRequest;
