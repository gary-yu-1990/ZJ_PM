/* eslint-disable camelcase */
import { GetDeptsForStoreI } from '@/api/Depts'

const Depts = {
  state: {
    DeptsInfo: []
  },
  getters: {},
  mutations: {
    SET_Depts (state, data) {
      state.DeptsInfo = data
    }
  },
  actions: {
    GET_Depts ({ commit }) {
      GetDeptsForStoreI().then(res => {
        commit('SET_Depts', res.data)
      })
    }
  }

}
export default Depts
