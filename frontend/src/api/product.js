import authApi from './auth';
import axios from 'axios';

export default{
  async getAll(url){
    const header = authApi.prepareRequestConfig();
    try{
      const response = await axios.get(
        `${process.env.VUE_APP_API_ROOT}/${url}`,
        header
      );
      return response.data;
    }catch{
      return Promise.reject('Some error occurred...');
    }
  },
  async getOne(productId){
    const header = authApi.prepareRequestConfig();
    try{
      let response = await axios.get(
        `${process.env.VUE_APP_API_ROOT}/product/${productId}`,
        header
      );
      return response.data;
    }catch{
      return Promise.reject('Some error occurred...');
    }
  },
  async getMaxPrice(){
    const header = authApi.prepareRequestConfig();
    try{
      let response = await axios.get(
        `${process.env.VUE_APP_API_ROOT}/product/stats/maxPrice`,
        header
      );
      return response.data.maxPrice;
    }catch{
      return Promise.reject('Some error occurred...');
    }
  }
}