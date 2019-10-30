import Vue from 'vue'

Vue.filter('datatrans', function (value) {
  if (value != '9999-12-31 00:00:00') {
    let date = new Date(value)
    let y = date.getFullYear()
    let MM = date.getMonth() + 1
    MM = MM < 10 ? '0' + MM : MM
    let d = date.getDate()
    d = d < 10 ? '0' + d : d
    return y + '-' + MM + '-' + d
  } else {
    return ''
  }
})

Vue.filter('person_filter', function (value) {
  var data = vm.$store.state.Persons.PersonsInfo
  var dataresult = data.filter(p => p.PERSON_NO == value)
  if (dataresult.length > 0) {
    return dataresult['0'].NAME
  } else {
    return value
  }
})

Vue.filter('user_filter', function (value) {
  var data = vm.$store.state.PM_Users.Users
  var dataresult = data.filter(p => p.UserID == value)
  if (dataresult.length > 0) {
    return dataresult['0'].UserName
  } else {
    return value
  }
})

Vue.filter('ProjectStatus_filter', function (value) {
  var data = vm.$store.state.ProjectStatusOptions
  var dataresult = data.filter(p => p.value == value)
  if (dataresult.length > 0) {
    return dataresult['0'].label
  } else {
    return value
  }
})

Vue.filter('MAJOR_ClASS_filter', function (value) {
  var data = vm.$store.state.MAJOR_ClASSOptions
  var dataresult = data.filter(p => p.value == value)
  if (dataresult.length > 0) {
    return dataresult['0'].label
  } else {
    return value
  }
})

Vue.filter('sex_filter', function (value) {
  var data = vm.$store.state.sexOptions
  var dataresult = data.filter(p => p.value == value)
  if (dataresult.length > 0) {
    return dataresult['0'].label
  } else {
    return value
  }
})

Vue.filter('DEPT_filter', function (value) {
  var data = vm.$store.state.Depts.DeptsInfo
  var dataresult = data.filter(p => p.DEPT_NO == value)
  if (dataresult.length > 0) {
    return dataresult['0'].DEPT_NAME
  } else {
    return value
  }
})

Vue.filter('UserStatus_filter', function (value) {
  var data = vm.$store.state.UserStatusOptions
  var dataresult = data.filter(p => p.value == value)
  if (dataresult.length > 0) {
    return dataresult['0'].label
  } else {
    return value
  }
})

Vue.filter('OBS_Type_filter', function (value) {
  var data = vm.$store.state.OBS_TypeOptions
  var dataresult = data.filter(p => p.value == value)
  if (dataresult.length > 0) {
    return dataresult['0'].label
  } else {
    return value
  }
})

Vue.filter('WBSStatus_filter', function (value) {
  var data = vm.$store.state.WBSStatusOptions
  var dataresult = data.filter(p => p.value == value)
  if (dataresult.length > 0) {
    return dataresult['0'].label
  } else {
    return value
  }
})

Vue.filter('OBS_filter', function (value) {
  var data = vm.$store.state.OBS.OBSInfo
  var dataresult = data.filter(p => p.OBS_ID == value)
  if (dataresult.length > 0) {
    return dataresult['0'].OBSName
  } else {
    return value
  }
})

Vue.filter('TaskStatus_filter', function (value) {
  var data = vm.$store.state.TaskStatusOptions
  var dataresult = data.filter(p => p.value == value)
  if (dataresult.length > 0) {
    return dataresult['0'].label
  } else {
    return value
  }
})
