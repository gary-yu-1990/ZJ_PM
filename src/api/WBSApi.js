/* eslint-disable no-unused-vars */
// eslint-disable-next-line standard/object-curly-even-spacing
import {get, post, patch, put } from './http'

export function GetWBSData (data, config = {}) {
  return post('/PM_WBS/GetWBSData', data, config).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    return Promise.reject(err)
  })
}

export function NewProjectTask (data, config = {}) {
  return post('/PM_WBS/NewProjectTask', data, config).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    return Promise.reject(err)
  })
}

export function DeleteTask (data, config = {}) {
  return post('/PM_WBS/DeleteTask', data, config).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    return Promise.reject(err)
  })
}

export function UpdateProjectTask (data, config = {}) {
  return post('/PM_WBS/UpdateProjectTask', data, config).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    return Promise.reject(err)
  })
}
