// API 响应类型
export declare type APIResponse<T extends object> = {
  status: string
  message: string
  count: number
  data: T
}

// 用户类型
export declare type User = {
  id?: number
  avatar?: string
  email: string
  name: string
  password: string
  confirmPassword?: string
  role: string
  created_at?: string
  modified_at?: string
}
