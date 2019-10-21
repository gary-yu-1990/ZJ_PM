/* eslint-disable standard/object-curly-even-spacing */
import $http from '@/assets/js/http'
// 用户登录
export function userLogin (data) {
  return $http.post('/web_user/login.do', data)
}
