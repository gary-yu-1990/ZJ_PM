export default {
  SET_LOGGED ({ commit }, data) {
    commit('SET_LOGGED', data)
  },
  SET_ProjectID ({ commit }, ProjectID) {
    commit('SET_ProjectID', ProjectID)
  },
  Clear_Store ({ dispatch, commit }) {
    commit('Clear_Store')
    dispatch('Clear_Depts')
    dispatch('Clear_Persons')
    dispatch('Clear_OBS')
    dispatch('Clear_USERS')
  },
  Init_Store ({ dispatch, commit }) {
    commit('Init_Store')
    dispatch('GET_Depts')
    dispatch('GET_Persons')
    dispatch('GET_OBS')
    dispatch('GET_USERS')
  }
}
