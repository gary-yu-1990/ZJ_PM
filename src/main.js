// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// import {get, post, patch, put } from './api/http'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import './assets/css/base.css'
import '@/utils/filter' // global filter//添加全部的过滤器
import method from './utils/method'
import store from './store/index'

// Vue.prototype.$api = api
// Vue.prototype.$axios = Axios
// Vue.prototype.$get = get
// Vue.prototype.$post = post
// Vue.prototype.$patch = patch
// Vue.prototype.$put = put

Vue.use(ElementUI)
Vue.use(method) // 注册全局方法
Vue.use(store)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
