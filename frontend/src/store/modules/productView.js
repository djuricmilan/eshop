import productApi from '@/api/product';
import categoryApi from '@/api/category';

const state = {
  products: [],
  quantity: 12,
  chunkIndex: 0,
  categories: [],
  categoryNames: [],
  priceRange: [0, Number.MAX_SAFE_INTEGER],
  maxPrice: Number.MAX_SAFE_INTEGER,
  amountOfChunks: 0,

  //for indexeddb
  cachedProducts: {

  }
};

const getters = {
  getProducts: (state) => state.products,
  getProduct: (state) => (id) => state.products.filter(x => x.id == id)[0],
  getQuantity: (state) => state.quantity,
  getChunkIndex: (state) => state.chunkIndex,
  getCategories: (state) => state.categories,
  getCategoryNames: (state) => state.categoryNames,
  getPriceRange: (state) => state.priceRange,
  getMaxPrice: (state) => state.maxPrice,
  getAmountOfChunks: (state) => state.amountOfChunks,
  getCachedProducts: (state) => state.cachedProducts
};

const actions = {
  async getCategories({commit}){
    try{
      const categories = await categoryApi.getAll();
      commit('_categories', categories);
    }catch{
      return Promise.reject('Some error occurred...');
    }
  },
  async getProducts({commit, state}){
    let categoryNames = state.categoryNames;
    if(categoryNames.length == 0)
      categoryNames = state.categories.map(x => x.name);
    const urlExtension = `product?quantity=${state.quantity}&chunkIndex=${state.chunkIndex}&categoryNames=${categoryNames}&lowerPrice=${state.priceRange[0]}&upperPrice=${state.priceRange[1]}`;
    try{
      if(state.cachedProducts[urlExtension]){
        const products = state.cachedProducts[urlExtension];
        commit("_products", products);
      }else{
        const {products, amount} = await productApi.getAll(urlExtension);
        commit("_products", products);
        commit("_cachedProducts", {urlExtension, products});
        commit("_amountOfChunks", Math.ceil(amount / state.quantity));
      }
    }catch{
      return Promise.reject('Some error occurred...');
    }
  },
  async getMaxPrice({commit}){
    try{
      const maxPrice = await productApi.getMaxPrice();
      commit("_maxPrice", maxPrice);
    }catch{
      return Promise.reject('Some error occurred...');
    }
  }
};

const mutations = {
  _categories: (state, categories) => state.categories = categories,
  _products: (state, products) => state.products = products,
  _categoryNames: (state, categoryNames) => state.categoryNames = categoryNames,
  _priceRange: (state, priceRange) => state.priceRange = priceRange,
  _maxPrice: (state, maxPrice) => state.maxPrice = maxPrice,
  _amountOfChunks: (state, amountOfChunks) => state.amountOfChunks = amountOfChunks,
  _chunkIndex: (state, chunkIndex) => state.chunkIndex = chunkIndex,
  _cachedProducts: (state, {urlExtension, products}) => state.cachedProducts[urlExtension] = products,
  _resetCachedProducts: (state) => state.cachedProducts = {}
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};