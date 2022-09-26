import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import httpApis from './http/index'
Vue.prototype.$http=httpApis


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 设置JSCode安全
window._AMapSecurityConfig = {
  securityJsCode:'95293bdeb77be8cab1259803f4679a8f',
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
