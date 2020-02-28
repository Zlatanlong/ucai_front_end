import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import iView from 'iview'
import Store from './store'
// 如果忽略的打包iviewcss要注释掉
// import 'iview/dist/styles/iview.css'

// axios.defaults.baseURL = 'http://39.97.102.59:8080/qi_back_end'
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true

Vue.use(VueAxios, axios)
Vue.use(iView)

Vue.config.productionTip = false

router.beforeEach(function (to, from, next) {
  // 路由层面控制访问
  var loggedIn = true
  if (loggedIn) { next() }
})

router.beforeEach(function (to, from, next) {
  // 路由层面控制访问
  if (to.path.indexOf('manager-dish') >= 0) {
    Store.navState = 1
  } else {
    Store.navState = 0
  }
  next()
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})

router.afterEach(route => {
  iView.LoadingBar.finish()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
