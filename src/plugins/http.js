import axios from 'axios';

import context from '../main.js'

axios.defaults.timeout = 1000 * 60 ;
axios.defaults.baseURL = 'http://localhost:8888';

//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/json'
    }
    // if(token){
    //   config.params = {'token':token}
    // }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code == 0) {
      context.$alert(response.data.message, '提示', {
        showClose: false,//不显示右上角关闭符号
      })
    } else if (response.data.code == 3) {
      router.push({
        path: "/login",
        querry: {redirect: router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    const param = {};
    param.body = data;
    param.timeStr = new Date();
    param.signature = 'token';
    axios.post(url, param)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}
