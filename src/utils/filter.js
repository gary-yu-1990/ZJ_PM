import Vue from 'vue'

Vue.filter('datatrans', function(value) {
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

Vue.filter('person_filter', function(value) {
    var userinfos = vm.$store.state.PM_Users.Users;
    var data = userinfos.filter(p => p.UserID == value)
    if (data.length > 0) {
        return data["0"].UserName
    } else {
        return value
    }

})

Vue.filter('ProjectStatus_filter', function(value) {
    var data = vm.$store.state.ProjectStatusOptions
    var dataresult = data.filter(p => p.value == value)
    if (dataresult.length > 0) {
        return dataresult["0"].label
    } else {
        return value
    }
})