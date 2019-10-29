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
    }
  },
  actions: {
    GET_OBS ({ commit }) {
      GetOBSForStoreI().then(res => {
        commit('SET_OBS', res.data)
      })
    }
  }

}
export default OBS
