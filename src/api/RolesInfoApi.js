/* eslint-disable no-unused-vars */
// eslint-disable-next-line standard/object-curly-even-spacing
import $http from '@/assets/js/http'

export function SearchRoles (data) {
  return $http.post('/PM_Roles/GetRoles', data)
}

export function NewRoles (data) {
  return $http.post('/PM_Roles/InsertNewRoles', data)
}

export function DeleteLists (data) {
  return $http.post('/PM_Roles/DeleteRoles', data)
}

export function UpdateRole (data) {
  return $http.post('/PM_Roles/UpdateRole', data)
}
