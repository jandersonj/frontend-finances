import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@/plugins/vuelidate'
import VueChartkick from 'vue-chartkick'
import '@/plugins/moment'
import Chart from 'chart.js'

Chartkick.options = {
  colors: ["#4CAF50", "#F44336", "#FFEB3B"]
}

Vue.use(VueChartkick.use(Chart))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
