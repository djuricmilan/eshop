import authApi from './auth';
import axios from 'axios';

export default{
  async getAll(){
    const header = authApi.prepareRequestConfig();
    try{
      const response = await axios.get(
        `${process.env.VUE_APP_API_ROOT}/category`,
        header
      );
      return response.data.categories;
    }catch{
      return Promise.reject('Some error occurred...');
    }
  }
}