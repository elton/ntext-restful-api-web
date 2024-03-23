import { apiClient } from '@/request'
import type { APIResponse, TokenResponse } from '@/types'
import { type AxiosRequestConfig } from 'axios'
import { getRefreshToken } from './tokens'

let promise: Promise<boolean> | null = null

export const refresh_token = async () => {
  if (promise) {
    return promise
  }

  promise = new Promise<boolean>(async (resolve, reject) => {
    const response = await apiClient
      .get<APIResponse<TokenResponse>>('/auth/refresh_token', {
        baseURL: import.meta.env.PUBLIC_BACKEND_ENDPOINT,
        headers: {
          Authorization: `Bearer ${getRefreshToken()}`,
        },
        __isRefreshToken: true,
      } as AxiosRequestConfig & { __isRefreshToken?: boolean })
      .catch(() => {
        return reject(false)
      })
    resolve(response?.status === 200)
  })
  promise.finally(() => {
    promise = null
  })
  return promise
}

export const isRefreshToken = (config: any) => {
  return !!config.__isRefreshToken
}
