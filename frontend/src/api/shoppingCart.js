import axios from 'axios';
import authApi from './auth';

export default{
  async fetchShoppingCart(shoppingCartId){
    const header = authApi.prepareRequestConfig()
    try{
      const retval = await axios.get(
        `${process.env.VUE_APP_API_ROOT}/cart/${shoppingCartId}`,
        header
      );
      return retval.data;
    }catch(error){
      return Promise.reject(error);
    }
  },
  async addToCart(shoppingCartId, obj){
    const header = authApi.prepareRequestConfig()
    try{
      const retval = await axios.put(
        `${process.env.VUE_APP_API_ROOT}/cart/${shoppingCartId}/add`,
        obj,
        header
      );
      return retval.data;
    }catch(error){
      return Promise.reject(error);
    }
  },
  async removeFromCart(shoppingCartId, productId){
    const header = authApi.prepareRequestConfig()
    try{
      const retval = await axios.put(
        `${process.env.VUE_APP_API_ROOT}/cart/${shoppingCartId}/remove/${productId}`,
        {},
        header
      );
      return retval.data;
    }catch(error){
      return Promise.reject(error);
    }
  }
};