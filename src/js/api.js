'use strict';

import app from '../main.js'
import axios from 'axios'
import qs from 'qs'
import {MessageBox} from "mint-ui";

export function service(method, url, params = {}) {
  return axios({
    url: '/api' + url,
    method: method,
    data: 'post' === method ? qs.stringify(params) : {},
    params: 'get' === method ? params : {}
  }).then(response => {
      if (response === null || response.status !== 200) {
        MessageBox('提示', response.message);
        console.log('请求失败');
        return null;
      }
      if (response.data.code === 401) {
        MessageBox('提示', '您尚未登录');
        app.$router.push({
          path: '/user-login'
        });
        return {
          code: 200,
          message: '没有登录',
          data: {}
        }
      }
      return response.data;
    },
    error => {
      console.log(error);
    });
}

export function upload(url, params, config) {
  return axios.post('/api' + url, params, config).then(response => {
      if (response === null || response.status !== 200) {
        MessageBox('提示', response.message);
        console.log('请求失败');
        return null;
      }
      if (response.data.code === 401) {
        MessageBox('提示', '您尚未登录');
        app.$router.replace('/user-login');
        return {
          code: 200,
          message: '没有登录',
          data: {}
        }
      }
      return response.data;
    },
    error => {
      console.log(error);
    });
}
