/* eslint-disable no-fallthrough */
import Axios from 'axios'
import { notice } from './notice'
import * as utils from './utils'
import config from '../../config/config'
// import Cookies from 'js-cookie'
// 定义静态变量
const DECODE = {
    CODE_INVALID: -1, // 失效
    CODE_OK: 0, // 成功
    CODE_FAIL: 1 // 失败
}

const crossDomain = config.crossDomain
let axiosConfig = {}
if (crossDomain) {
    axiosConfig.withCredentials = true
    axiosConfig.crossDomain = true
}

const $http = Axios.create(axiosConfig)

// 拦截器
$http.interceptors.request.use(
    config => {
        // 正在请求更新token时，其他接口等待
        config.url = utils.getApiUrl(config.url)
        config.withCredentials = false
            // if (config.method === 'post') {
            //   const querystring = require('querystring')
            //   config.data = querystring.stringify(config.data)
            // }
            // let tokenList = getStore('tokenList', true)
            // if (tokenList) {
            //   let accessToken = tokenList.accessToken
            //   let tokenType = tokenList.tokenType
            //   config.headers.Authorization = `${tokenType} ${accessToken}`
            // }
            // let organization = getStore('currentOrganization', true)
            // if (organization) {
            //   config.headers.organizationCode = organization.code
            // }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// After request
$http.interceptors.response.use(
    response => {
        Axios.defaults.withCredentials = true
        var resdata = response.data
        response.status = Number(response.status)
        switch (response.status) {
            case 200: // 请求成功
                if (resdata.code != undefined) { // vue返回code
                    if (resdata.code == DECODE.CODE_INVALID) { // 失效
                        vm.$router.push({
                            path: '/login'
                        })
                        console.log(resdata.msg)
                        return Promise.reject(resdata)
                    } else if (resdata.code == DECODE.CODE_OK) { // 成功

                        return Promise.resolve(resdata)
                    } else { // 其他返回失败
                        notice(resdata.msg, 'error')
                        console.log(resdata.msg)
                        return Promise.reject(resdata)
                    }
                } else if (resdata.success != undefined) { // ext返回success
                    if (resdata.success) { resolve(resdata) } else {
                        console.log(resdata.msg)
                        reject(resdata)
                    }
                } else { // ext只返回数据的类型
                    return Promise.reject(resdata)
                }

            case 404: // 请求的资源（网页等）不存在
                return Promise.reject(response.msg)
            case 500: // 内部服务器错误
                notice(response.msg, 'error')
                return Promise.reject(response.msg)
            default:
                return Promise.reject(response.msg)
        }
    },
    error => {
        if (error.response != undefined) {
            const response = error.response.data
            notice(response, 'error')
            console.log(response)
        } else {
            notice('网络错误', 'error')
            console.log(error.message)
        }
    }

)

export default $http