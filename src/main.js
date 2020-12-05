import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import store from './store/index';
import VueAxiosPlugin from './plugins/vue-axios';

Vue.config.productionTip = false

// APIサーバのURLを.envファイルから設定
axios.defaults.baseURL = process.env.Django_API_URL;

new Vue({
  router,
  vuetify,
  axios,
  store,
  VueAxiosPlugin,
  render: h => h(App)
}).$mount('#app')
