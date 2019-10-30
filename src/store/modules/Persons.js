/* eslint-disable camelcase */
import { GetPersonsForStore } from '@/api/PersonInfoApi'

const Persons = {
  state: {
    PersonsInfo: []
  },
  getters: {},
  mutations: {
    SET_Persons (state, data) {
      state.PersonsInfo = data
    },
    clear_Persons (state) {
      state.PersonsInfo = []
    }
  },
  actions: {
    GET_Persons ({ commit }) {
      GetPersonsForStore().then(res => {
        commit('SET_Persons', res.data)
      })
    },
    Clear_Persons ({ commit }) {
      commit('clear_Persons')
    }
  }

}
export default Persons
