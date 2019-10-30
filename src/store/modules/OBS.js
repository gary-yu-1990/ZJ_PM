/* eslint-disable camelcase */
import { GetOBSForStoreI } from '@/api/OBSApi'

const OBS = {
  state: {
    OBSInfo: []
  },
  getters: {},
  mutations: {
    SET_OBS (state, data) {
      state.OBSInfo = data
    },
    Clear_OBS (state) {
      state.OBSInfo = []
    }
  },
  actions: {
    GET_OBS ({ commit }) {
      GetOBSForStoreI().then(res => {
        commit('SET_OBS', res.data)
      })
    },
    Clear_OBS ({ commit }) {
      commit('Clear_OBS')
    }
  }

}
export default OBS
