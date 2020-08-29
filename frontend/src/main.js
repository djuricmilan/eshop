import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './vuetify';
import utility from './utility';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.prototype.$utility = utility;

axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401 && !error.response.config.url.includes('login')){
    store.commit('auth/_logout', {}, {root: true});
    store.commit("appBar/setAppBarState", 0, {root:true});
    router.push({name: 'Login'});
  }
  return Promise.reject(error);
});


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
