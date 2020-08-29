import authApi from '../../api/auth';
import jsonwebtoken from 'jsonwebtoken';

const state = {
  token: null,
  role: null,
  user: null,
  takenUsernames: []
};

const getters = {
  getToken: (state) => state.token,
  getRole: (state) => state.role,
  getUsername: (state) => state.user.username,
  takenUsernames: (state) => state.takenUsernames
};

const actions = {
  async register(context, body){
    try{
      await authApi.register(body);
    }catch(error){
      return Promise.reject(error.message);
    }
  },

  async login({commit}, body){
    try{
      const {token, role} = await authApi.login(body);
      commit('_login', {token, role});
    }catch(error){
      return Promise.reject(error.message);
    }
  },

  async changePassword(context, body){
    try{
      await authApi.changePassword(body);
    }catch(error){
      return Promise.reject(error.message);
    }
  },

  async fetchUsernames({commit}){
    try{
      const usernames = await authApi.fetchUsernames();
      commit('_takenUsernames', usernames);
    }catch{
      return Promise.reject('Some error occurred');
    }
  }

};

const mutations = {
  _login: (state, {token, role}) => {
    state.user = jsonwebtoken.decode(token);
    state.token = token;
    state.role = role;
  },
  _takenUsernames: (state, usernames) => {
    state.takenUsernames = usernames;
  },
  _logout: (state) => {
    state.user = null;
    state.token = null;
    state.role = null;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};