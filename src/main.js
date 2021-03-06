
import Vue from 'vue'
import App from './App'
import router from './plugins/router.js'
import store from './plugins/store.js'
import VCharts from 'v-charts'
import '../theme/index.css'
import {post} from './plugins/http.js'

import "./assets/aliicon/iconfont.css"


Vue.config.productionTip = false
Vue.prototype.$post=post;
Vue.use(VCharts);

router.beforeEach((to, from, next) => {
  document.title=to.meta.title;//让页面显示路由对应的name值。
  next()
});

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
	store,
  components: { App },
  template: '<App/>'
})

