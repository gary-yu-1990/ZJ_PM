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
    }
  },
  actions: {
    GET_Persons ({ commit }) {
      GetPersonsForStore().then(res => {
        commit('SET_Persons', res.data)
      })
    }
  }

}
export default Persons
