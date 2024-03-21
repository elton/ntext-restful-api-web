// package user request to the API by axios.

import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { APIResponse, TokenResponse } from '../types'

const access_token = localStorage.getItem('access_token')
console.log('access_token: ', access_token)

export const apiClient = axios.create({
  baseURL: import.meta.env.PUBLIC_BACKEND_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${access_token}`,
  },
})

apiClient.interceptors.response.use(
  async (res: AxiosResponse<APIResponse<TokenResponse>>) => {
    console.log('res in the interceptor: ', res.data)
    if (res.data.data.token) {
      localStorage.setItem('access_token', res.data.data.token.access_token)
      localStorage.setItem('refresh_token', res.data.data.token.refresh_token)
      apiClient.defaults.headers['Authorization'] =
        `Bearer ${res.data.data.token.access_token}`
    }
    return res
  },
  (error) => {
    // 处理错误响应
    return Promise.reject(error)
  },
)
