// 用户类型
export declare type User = {
  id?: number
  avatar?: string
  created_at?: string
  modified_at?: string
  email: string
  name: string
  password: string
  confirmPassword?: string
  role: string
}

// 用户 响应类型
export declare type UserData = User[] | User

// API 响应类型
export declare type APIResponse<T extends object> = {
  count: number
  data: T
}
