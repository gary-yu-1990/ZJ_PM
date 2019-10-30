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
    },
    Clear_Depts (state) {
      state.DeptsInfo = []
    }
  },
  actions: {
    GET_Depts ({ commit }) {
      GetDeptsForStoreI().then(res => {
        commit('SET_Depts', res.data)
      })
    },
    Clear_Depts ({ commit }) {
      commit('Clear_Depts')
    }
  }

}
export default Depts
