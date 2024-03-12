/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_BACKEND_ENDPOINT: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 用户类型
export type User = {
  avatar?: string
  created_at?: string
  modified_at?: string | null
  email: string
  id?: number
  modified_at: string
  name: string
  password: string
  confirmPassword?: string
  role: string
}

// 用户 响应类型
export type UserData = User[] | User

// API 响应类型
export type APIResponse<T extends object> = {
  count: number
  data: T
}
