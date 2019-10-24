/* eslint-disable no-unused-vars */
// eslint-disable-next-line standard/object-curly-even-spacing
import $http from '@/assets/js/http'

export function UserLogin (data) {
  return $http.post('/PM_Users/Login', data)
}

export function SearchUsers (data) {
  return $http.post('/PM_Users/GetUsers', data)
}

export function NewUsers (data) {
  return $http.post('/PM_Users/InsertNewUsers', data)
}

export function DeleteLists (data) {
  return $http.post('/PM_Users/DeleteUsers', data)
}

export function UpdateUser (data) {
  return $http.post('/PM_Users/UpdateUser', data)
}
