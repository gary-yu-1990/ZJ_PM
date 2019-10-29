export default {
  install (Vue) {
    Vue.prototype.dateFormat = function (row, column, cellValue) {
      if (cellValue != '9999-12-31 00:00:00') {
        let date = new Date(cellValue)
        let y = date.getFullYear()
        let MM = date.getMonth() + 1
        MM = MM < 10 ? '0' + MM : MM
        let d = date.getDate()
        d = d < 10 ? '0' + d : d
        return y + '-' + MM + '-' + d
      } else {
        return ''
      }
    },
    Vue.prototype.array_diff = function (beforData, afterData) {
      var c = []
      for (let i in beforData) {
        var value = beforData[i]
        if (afterData[i] != value) {
          c.push(i)
        }
      }
      return c
    }
  }

}
