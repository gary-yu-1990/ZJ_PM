/* eslint-disable no-unused-vars */
// eslint-disable-next-line standard/object-curly-even-spacing
import $http from '@/assets/js/http'

export function SearchProjects (data) {
  return $http.post('/PM_Projects/GetProjects', data)
}

export function NewProjects (data) {
  return $http.post('/PM_Projects/InsertNewProject', data)
}

export function DeleteLists (data) {
  return $http.post('/PM_Projects/DeleteProjects', data)
}

export function UpdateProject (data) {
  return $http.post('/PM_Projects/UpdateProject', data)
}

export function getCurrentPageData (data) {
  return $http.post('/PM_Projects/getCurrentPageData', data)
}
