export default {
  SET_LOGGED ({ commit }, data) {
    commit('SET_LOGGED', data)
  },
  SET_ProjectID ({ commit }, ProjectID) {
    commit('SET_ProjectID', ProjectID)
  },
  Clear_Store ({ commit }) {
    commit('Clear_Store')
  },
  Init_Store ({ dispatch, commit }) {
    commit('Init_Store')
    dispatch('GET_Depts')
    dispatch('GET_Persons')
    dispatch('GET_OBS')
  }
}
