import axios from 'axios';
import store from '../store';

export default {
  async register(body){
    try{
      await axios.post(
        `${process.env.VUE_APP_API_ROOT}/auth/register`,
        body
      );
    }catch(error){
      throw new Error(error.response.data.message);
    }
  },

  async login(body){
    try{
      const response = await axios.post(
        `${process.env.VUE_APP_API_ROOT}/auth/login`,
        body
      );
      return response.data;
    }catch(error){
      if(error.response.status == 404 || error.response.status == 401)
        throw new Error('Invalid username or password');
      else
        throw new Error('An unknown error occurred');
    }
  },

  async changePassword(body){
    try{
      await axios.post(
        `${process.env.VUE_APP_API_ROOT}/auth/changePassword`,
        body
      );
    }catch(error){
      throw new Error(error.response.data.message);
    }
  },

  async fetchUsernames(){
    try{
      const response = await axios.get(
        `${process.env.VUE_APP_API_ROOT}/auth/usernames`
      );
      return response.data;
    }catch{
      throw new Error('Some error occurred');
    }
  },

  prepareRequestConfig(){
    return {
      headers: {
        Authorization: `Bearer ${store.getters['auth/getToken']}`
      }
    };
  }
}