import axios from 'axios'
import { app } from '../main'
import { getCookie } from '../assets/js/cookie'

// 创建axios实例
const instance = axios.create({
  baseURL: '/api/v2/crm',
  withCredentials: true
  // 一些默认的header头配置
  // headers: {'Authorization': localStorage.getItem('token')?localStorage.getItem('token'):''}
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let headers = {
    Authorization: getCookie('token') ? getCookie('token') : "",
  };
  if (config.headers) {
    config.headers = Object.assign({}, headers, config.headers);
  } else {
    config.headers = headers;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log(error);
  // Notify('程序异常，请联系客服');
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  if (response.status === 502) {
    app.$message.error('系统更新中');
    return false;
  }
  // 对响应数据做点什么
  if (response.data.code && Number(response.data.code) !== 0) {
    if (Number(response.data.code) === 401) {
      window.sessionStorage.clear();
      window.localStorage.clear();
      app.$store.commit('setUserInfo', null);
      app.$store.commit('setToken', null);
      app.$store.commit('setPermissions', null);
      app.$store.commit('setRoles', null);
      window.location.href = `#/login`;
    }
    app.$message.error(response.data.msg);
    return Promise.reject(response.data.msg);
  } else {
    return response.data.data ? response.data.data : response.data;
  }
}, function (error) {
  if(error){
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 502:
          app.$message.error('系统更新中');
          break;
        default:
          app.$message.error(error.response && error.response.data ? error.response.data : '网络异常');
          break;
      }
    } else {
      app.$message.error(error.response && error.response.data ? error.response.data : '网络异常');
    }
  }
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance
