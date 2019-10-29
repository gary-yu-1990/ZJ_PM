/* eslint-disable no-unused-vars */
// eslint-disable-next-line standard/object-curly-even-spacing
import $http from '@/assets/js/http'

export function GetWBSData (data) {
  return $http.post('/PM_WBS/GetWBSData', data)
}

export function NewProjectTask (data) {
  return $http.post('/PM_WBS/NewProjectTask', data)
}

export function DeleteTask (data, config = {}) {
  return $http.post('/PM_WBS/DeleteTask', data)
}

export function UpdateProjectTask (data) {
  return $http.post('/PM_WBS/UpdateProjectTask', data)
}

export function ReleaseWBSI (data) {
  return $http.post('/PM_WBS/ReleaseWBS', data)
}
