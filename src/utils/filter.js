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
