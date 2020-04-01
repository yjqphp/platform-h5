import axios from 'axios'
import {BASE_URL, LOCAL_BASE_URL} from '@/lib/URL.js'
import Vue from 'vue';
import { Notify } from 'vant';

Vue.use(Notify);

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCredentials = true

console.log(BASE_URL)

// 记录和显示错误
function errorLog (error) {

  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    console.log(error)
  }
  Notify({type: 'danger', message: error.message})
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? LOCAL_BASE_URL : BASE_URL,
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 处理POST请求
    if (config.method === 'post') { //多个参数form提交
      //config.data = qs.stringify(config.data)
    }
    if (config.method === 'normal_post') { //单个单数form提交
      config.method = 'post'
    }
    // 在请求发送之前做一些处理
    //const token = cookies.get('token')
    if (localStorage.getItem('userInfo') != null) {
      const token = JSON.parse(localStorage.getItem('userInfo')).token
      console.log(token)
      if (token) {
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        config.headers['Authorization'] = token
      }
    }

    return config
  },
  error => {
    // 发送失败
    console.log(error)
    Promise.reject(error)
  }
)

// 重新授权确认
function reAuthorize () {
  // MessageBox.confirm('您的授权已过期或在其他地方登录，是否重新登录？', '授权过期', {
  // 		confirmButtonText: '确定',
  // 		cancelButtonText: '取消',
  // 		type: 'warning'
  // 	})
  // 	.then(() => {
  // 		cookies.remove('token')
  // 		cookies.remove('uuid')
  // 		location.reload()
  // 	})
  // 	.catch(() => {})
  //跳转登录页
  // uni.reLaunch({
  //   url: '../login/login'
  // })
}

// 响应拦截器
service.interceptors.response.use(
  response => {
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const {
      code
    } = dataAxios
    console.log(dataAxios)
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
      return dataAxios
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case 0:
          // [ 示例 ] code === 0 代表没有错误
          return dataAxios
        case -1:
          // [ 示例 ] 其它和后台约定的 code
          errorLog(` ${dataAxios.message}`)
          break
        default:
          // 不是正确的 code
          errorLog(`${dataAxios.msg}: ${response.config.url}`)
          break
      }
    }
  },
  error => {
    let showErrorToast = true
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          reAuthorize()
          showErrorToast = false
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          break
      }
    }
    if (showErrorToast === true) {
      errorLog(error)
    }
    return Promise.reject(error)
  }
)

export default service
