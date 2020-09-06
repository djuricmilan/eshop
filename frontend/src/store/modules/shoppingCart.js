import shoppingCartApi from '../../api/shoppingCart';

const state = {
  shoppingCart: null
};

const getters = {
  getShoppingCart: (state) => state.shoppingCart
};

const actions = {
  async fetchShoppingCart({commit}, shoppingCartId){
    try{
      let {success, message, shoppingCart} = await shoppingCartApi.fetchShoppingCart(shoppingCartId);
      if(success){
        commit("setShoppingCart", shoppingCart);
      }else{
        return Promise.reject(message);  
      }
    }catch(error){
      return Promise.reject(error);
    }
  },
  async addToCart({commit, state}, obj){
    try{
      const {success, message, productItem} = await shoppingCartApi.addToCart(state.shoppingCart.userId, obj);
      if(success)
        commit("addToCart", productItem);
      else
        return Promise.reject(message);
    }catch(error){
      return Promise.reject(error);
    }
  },
  async removeFromCart({commit, state}, productId){
    try{
      const {success, message, shoppingCart} = await shoppingCartApi.removeFromCart(state.shoppingCart.userId, productId);
      if(success)
        commit("setShoppingCart", shoppingCart);
      else
        return Promise.reject(message);
    }catch(error){
      return Promise.reject(error);
    }
  }
};

const mutations = {
  setShoppingCart: (state, shoppingCart) => state.shoppingCart = shoppingCart,
  addToCart: (state, productItem) => {
    let index = state.shoppingCart.productItems.findIndex(x => x.id == productItem.id);
    if(index != -1){
      state.shoppingCart.productItems[index] = productItem;
    }else{
      state.shoppingCart.productItems.push(productItem);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}