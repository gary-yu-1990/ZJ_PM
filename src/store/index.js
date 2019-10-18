/* eslint-disable camelcase */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import PM_Users from './modules/PM_Users'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    PM_Users
  },
  state,
  mutations,
  actions,
  plugins: [createPersistedState()]
})
export default store
