import $http from '@/assets/js/http'

export function GetOBSData (data) {
  return $http.post('/PM_OBS/GetOBSData', data)
}

export function NewOBS (data) {
  return $http.post('/PM_OBS/NewOBS', data)
}

export function DeleteOBS (data, config = {}) {
  return $http.post('/PM_OBS/DeleteOBS', data)
}

export function UpdateOBS (data) {
  return $http.post('/PM_OBS/UpdateOBS', data)
}
