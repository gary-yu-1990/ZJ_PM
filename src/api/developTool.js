/* eslint-disable no-unused-vars */
// eslint-disable-next-line standard/object-curly-even-spacing
import $http from '@/assets/js/http'

export function GenerateCode (data) {
  return $http.post('/GenCode/GenerateCode', data)
}
