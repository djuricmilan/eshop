const state = {
  appBarState: 0,
  content: {
    0: {
      collapsable: false,
      collapseOptions: [
        //no options for user that has not logged in
      ],
      nonCollapseOptions: [
        {
          optionIndex: 0,
          optionText: 'Login',
          navigable: true,
          componentName: 'Login'
        },
        {
          optionIndex: 1,
          optionText: 'Register',
          navigable: true,
          componentName: 'Register'
        }
      ]
    },
    1: {
      collapsable: true,
      collapseOptions: [
        //all options for user that is logged in
        {name: 'Home', icon: 'mdi-home'},
        {name: 'Profile', icon: 'mdi-account'}
      ],
      nonCollapseOptions: [
        {
          optionIndex: 0,
          hasChild: true,
          child: {
            childName: 'ProgressWrapper'
          }
        },
        {
          optionIndex: 1,
          hasChild: true,
          child: {
            childName: 'Logout'
          }
        }
      ]
    },
  },
  showProgress: false
};

const getters = {
  getContent: (state) => state.content,
  getAppBarState: (state) => state.appBarState,
  getShowProgress: (state) => state.showProgress
};

const actions = {};

const mutations = {
  setAppBarState: (state, appBarState) => state.appBarState = appBarState,
  setShowProgress: (state, showProgress) => state.showProgress = showProgress
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};