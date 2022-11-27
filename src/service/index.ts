import HYRequest from './request'
import ipConfig from './request/ipConfig'

import localCache from '@/utils/cache'

import { ElMessage } from 'element-plus'

const lyRequest = new HYRequest({
  baseURL: ipConfig.baseUrl,
  timeout: 1000,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        if (config && config?.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      if (res.data.code !== 0) {
        ElMessage.error(res.data.data)
      }
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default lyRequest
