// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// import {get, post, patch, put } from './api/http'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'

// Vue.prototype.$api = api
// Vue.prototype.$axios = Axios
// Vue.prototype.$get = get
// Vue.prototype.$post = post
// Vue.prototype.$patch = patch
// Vue.prototype.$put = put

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
