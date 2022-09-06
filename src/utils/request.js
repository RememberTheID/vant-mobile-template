import axios from 'axios'

import { Toast } from 'vant'
import { baseUrl } from './../config/index'
import { getStorage } from '../utils/index'
import 'vant/es/toast/style'
import router from '../router'
function exportimg(res) {
  return new Promise((resolve, reject) => {
    const blob = new Blob([res.data], {
      type: res.headers['content-type'],
    })
    const fileReader = new FileReader()
    fileReader.onload = e => {
      resolve(e.target.result)
    }
    fileReader.readAsDataURL(blob)
  })
}

// 添加请求拦截器
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : baseUrl, // api的base_url
  timeout: 15000, // 请求超时时间
})
service.defaults.headers.common['X-Access-Token'] = getStorage()
service.defaults.headers.common['tenant-id'] = 0
service.interceptors.request.use(
  function(config) {
    // Toast.loading({
    //   message: '加载中...',
    //   forbidClick: true,
    //   duration:0
    // })
    // 在发送请求之前做些什么
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function(response) {
    // Toast.clear()
    if (response.data.code !== 200) {
      if (!response.config.toast) {
        if (!response.config.noMesage) {
          Toast(response.data.message || '服务器异常')
        }
        if (response.data.code === 401 || response.data.code === 403) {
          localStorage.removeItem('h5token')
          router.push('/login')
        }
      }
    }
    if (response.config.isImg) {
      return exportimg(response)
    } else {
      return response.data
    }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default service
