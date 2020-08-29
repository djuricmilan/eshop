import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Unauthorized from '../components/auth/Unauthorized';
import Home from '../components/user/Home';
import ProductDetails from '../components/user/product/ProductDetails'
import utility from '../utility';
import store from '../store';

//const admin = utility.admin;
const user = utility.user;

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        authentication: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        authentication: false,
      }
    },
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: Unauthorized,
      meta: {
        authentication: false
      }
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        authentication: true,
        authorization: [user]
      }
    },
    {
      path: '/product/:id',
      name: 'ProductDetails',
      component: ProductDetails,
      props: true,
      meta: {
        authentication: true,
        authorization: [user]
      }
    },
  ]
});

router.beforeEach((to, from , next) => {
  console.log(store);
  if(to.meta.authentication){
    //authentication required
    const token = store.getters['auth/getToken'];
    if(!token){
      //user is not authenticated
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
      return;
    }
    const role = store.getters['auth/getRole'];
    if(to.meta.authorization.indexOf(role) == -1){
      //user is not authorized
      next({
        path: '/unauthorized',
      });
      return;
    }
  }
  else{
    if((to.name == 'Login' || to.name == 'Register' || to.name == 'Unauthorized') && !!store.getters['auth/getToken']){
      next({
        path: from.path
      });
      return;
    }
  }

  if(from.name == 'Home' && to.name != 'ProductDetails'){
    //clear indexeddb cache
    store.commit('productView/_resetCachedProducts', null, {root: true});
  }
  next();
})

export default router;