/* eslint-disable no-unused-vars */
// eslint-disable-next-line standard/object-curly-even-spacing
import $http from '@/assets/js/http'

export function GetDeptsI(data) {
    return $http.post('/Depts/GetDepts', data)
}

export function GetDeptsForStoreI(data) {
    return $http.post('/Depts/GetDeptsForStore', data)
}

export function addDeptI(data) {
    return $http.post('/Depts/InsertNewDept', data)
}


export function DeleteDeptI(data) {
    return $http.post('/Depts/DeleteDept', data)
}

export function UpdateDeptI(data) {
    return $http.post('/Depts/UpdateDept', data)
}