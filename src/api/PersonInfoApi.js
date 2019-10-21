/* eslint-disable no-unused-vars */
// eslint-disable-next-line standard/object-curly-even-spacing
import $http from '@/assets/js/http'

export function SearchPersons (data) {
  return $http.post('/PM_Persons/GetPersons', data)
}

export function NewPersons (data) {
  return $http.post('/PM_Persons/InsertNewPersons', data)
}

export function DeleteLists (data) {
  return $http.post('/PM_Persons/DeletePersons', data)
}

export function UpdatePersons (data) {
  return $http.post('/PM_Persons/UpdatePersons', data)
}
