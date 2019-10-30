/* eslint-disable camelcase */
import { SearchUsers } from '@/api/UsersInfoApi'

const PM_Users = {
  state: {
    Users: []
  },
  getters: {},
  mutations: {
    SET_USERS (state, data) {
      state.Users = data
    },

    Clear_USERS (state) {
      state.Users = []
    }
  },
  actions: {
    GET_USERS ({ commit }) {
      SearchUsers().then(res => {
        commit('SET_USERS', res.data)
      })
    },
    Clear_USERS ({ commit }) {
      commit('Clear_USERS')
    }
  }

}
export default PM_Users
