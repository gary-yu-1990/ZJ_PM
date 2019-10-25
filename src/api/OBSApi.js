import $http from '@/assets/js/http'

export function GetOBSDataI (data) {
  return $http.post('/PM_OBS/GetOBSData', data)
}

export function NewOBS (data) {
  return $http.post('/PM_OBS/NewOBS', data)
}

export function DeleteOBS (data) {
  return $http.post('/PM_OBS/DeleteOBS', data)
}

export function UpdateOBS (data) {
  return $http.post('/PM_OBS/UpdateOBS', data)
}

export function GetOBSMemberI (data) {
  return $http.post('/PM_OBS/GetOBSMember', data)
}

export function SaveOBSMemberI (data) {
  return $http.post('/PM_OBS/SaveOBSMember', data)
}

export function DeleteOBSMemerI (data) {
  return $http.post('/PM_OBS/DeleteOBSMemer', data)
}
