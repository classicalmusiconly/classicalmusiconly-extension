

import Vue from 'vue'

import App from './App.vue'
import axios from 'axios'

import App_css from './less/index.less'
const mhttp = axios.create({
  baseURL: 'https://classicalmusiconly.com',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Acces-Control-Allow-Origin': 'https://classicalmusiconly.com',
    'x-requested-with': 'XMLHttpRequest'
  }
})

Vue.prototype.$http = mhttp
new Vue({
  el: '#vue-main',
  // components: { WorkList, T01 },
  render: h => h(App)
})
