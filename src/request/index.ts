import type { TokenResponse } from '@/types'
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { APIResponse } from '../types'
import { isRefreshToken, refresh_token } from './refresh_token'
import { getAccessToken, setAccessToken, setRefreshToken } from './tokens'

export const apiClient = axios.create({
  baseURL: import.meta.env.PUBLIC_BACKEND_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${getAccessToken()}`,
  },
})

apiClient.interceptors.request.use((config) => {
  // add access token to the request header if access token exists and the request is not for refreshing token.
  if (getAccessToken() && !isRefreshToken(config)) {
    config.headers['Authorization'] = `Bearer ${getAccessToken()}`
  }
  return config
})

apiClient.interceptors.response.use(
  async (res: AxiosResponse<APIResponse<TokenResponse>>) => {
    // Store the tokens in the local storage when users log in or refresh the token.
    if (res.data.data.token) {
      setAccessToken(res.data.data.token.access_token)
      setRefreshToken(res.data.data.token.refresh_token)
      apiClient.defaults.headers['Authorization'] = `Bearer ${getAccessToken()}`
    }
    return res
  },
  async (error) => {
    // Handle the error response
    // refresh token if access token is expired and the request is not for refreshing Token.
    if (
      error.response.status === 401 &&
      !isRefreshToken(error.response.config)
    ) {
      const isSuccess = await refresh_token()
      if (isSuccess) {
        // update the access token in the axios instance.

        apiClient.defaults.headers['Authorization'] =
          `Bearer ${getAccessToken()}`

        return await apiClient.request(error.response.config)
      } else {
        // if refresh token is expired, redirect to login page.
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)
