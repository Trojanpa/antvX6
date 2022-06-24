import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import commonComponents from "./components";
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/icons/index'

Vue.use(ElementUI)
Vue.use(commonComponents);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
