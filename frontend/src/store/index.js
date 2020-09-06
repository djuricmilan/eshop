import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import appBar from './modules/appBar';
import productView from './modules/productView';
import shoppingCart from './modules/shoppingCart';
import createPersistedState from 'vuex-persistedstate';
import VuexPersistence from 'vuex-persist';
import localforage from 'localforage';
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    appBar,
    productView,
    shoppingCart
  },
  plugins: [
    //local storage
    createPersistedState({
      reducer: (state) => {
        return {
          auth: {
            token: state.auth.token,
            role: state.auth.role,
            user: state.auth.user
          },
          appBar: {
            appBarState: state.appBar.appBarState
          },
          /*productView: {
            products: state.productView.products,
            categories: state.productView.categories
          }*/
        };
      }
    }),
    //indexeddb storage
    new VuexPersistence({
      storage: localforage,
      reducer: (state) => {
        return{
          productView: {
            cachedProducts: state.productView.cachedProducts
          }
        };
      }
    }).plugin
  ]
});

export default store;