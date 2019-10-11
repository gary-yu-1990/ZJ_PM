/* eslint-disable no-unused-vars */
// eslint-disable-next-line standard/object-curly-even-spacing
import {get, post, patch, put } from './http'

export function SearchRoles (data, config = {}) {
  return post('/PM_Roles/GetRoles', data, config).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    return Promise.reject(err)
  })
}

export function NewRoles (data, config = {}) {
  return post('/PM_Roles/InsertNewRoles', data, config).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    return Promise.reject(err)
  })
}

export function DeleteLists (data, config = {}) {
  return post('/PM_Roles/DeleteRoles', data, config).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    return Promise.reject(err)
  })
}

export function UpdateRole (data, config = {}) {
  return post('/PM_Roles/UpdateRole', data, config).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    return Promise.reject(err)
  })
}
