/* eslint-disable camelcase */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import PM_Users from './modules/PM_Users'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    PM_Users
  },
  state,
  getters,
  mutations,
  actions,
  plugins: [createPersistedState()]
})
export default store

// actions 的参数是 store 对象,而 getters 和 mutations 的参数是 state .
// actions 和 mutations 还可以传第二个参数,具体看vuex官方文档
// getters/mutations/actions 都有对应的map,如: mapGetters , 具体看vuex官方文档
// 模块内部如果怕有命名冲突的话,可以使用命名空间, 具体看vuex官方文档
// vuex 其实跟 vue 非常像,有data(state),methods(mutations,actions),computed(getters),还能模块化.
