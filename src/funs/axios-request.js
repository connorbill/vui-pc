/* eslint-disable no-undef */
import axios from 'axios';
import Qs from 'qs';

function axiosRequest(config) {
  // 不建议使用axios.create(), https://github.com/axios/axios/issues/217
  // axios-> ajax 请求封装文件
  // 默认配置
  let defaultConfig = {
    url: '',
    method: 'get',
    token: '',
    contentType: 'json',
    params: {},
    data: ''
  };
  config = Object.assign(defaultConfig, config);
  let contentType = 'application/json;charset=UTF-8';
  if (config.contentType && config.contentType === 'form') {
    config.data = Qs.stringify(config.data);
    contentType = 'application/x-www-form-urlencoded';
  } else if (config.contentType && config.contentType === 'formdata') {
    contentType = 'multipart/form-data';
  }
  let instance = axios.create();
  instance.interceptors.request.use(config => {
    return config;
  }, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  // axios.interceptors.request.eject(myInterceptor);
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

  return instance({
    method: config.method,
    url: config.url,
    data: config.data,
    params: config.params,
    headers: {
      'Content-Type': contentType,
      'Authorization': config.token ? config.token : ''
    }
  });
}

export default axiosRequest;
