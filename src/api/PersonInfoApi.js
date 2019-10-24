/* eslint-disable no-unused-vars */
// eslint-disable-next-line standard/object-curly-even-spacing
import $http from '@/assets/js/http'

export function SearchPersons(data) {
    return $http.post('/Persons/GetPersons', data)
}

export function GetPersonsForStore(data) {
    return $http.post('/Persons/GetPersons', data)
}

export function NewPersons(data) {
    return $http.post('/Persons/InsertNewPersons', data)
}

export function DeletePerson(data) {
    return $http.post('/Persons/DeletePerson', data)
}

export function UpdatePersons(data) {
    return $http.post('/Persons/UpdatePersons', data)
}