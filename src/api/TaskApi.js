/* eslint-disable no-unused-vars */
// eslint-disable-next-line standard/object-curly-even-spacing
import $http from '@/assets/js/http'

export function getTaskDataI (data) {
  return $http.post('/PM_Task/getTaskData', data)
}

export function DoneClickI (data) {
  return $http.post('/PM_Task/DoneTask', data)
}

export function ConfirmClickI (data) {
  return $http.post('/PM_Task/ConfirmTask', data)
}
