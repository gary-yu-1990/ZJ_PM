import { conststatus } from './conststatus'

export default {
  SET_LOGGED (state, userInfo) {
    state.userInfo = userInfo
  },
  SET_ProjectID (state, ProjectID) {
    state.ProjectID = ProjectID
  },
  Clear_Store (state) {
    for (let i in conststatus) {
      delete state[i]
    }
  },
  Init_Store (state) {
    var statedata = Object.assign({}, conststatus)
    for (let i in statedata) {
      var value = statedata[i]
      state[i] = value
    }
  }
}
