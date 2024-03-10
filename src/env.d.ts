/// <reference types="astro/client" />

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

// 用户响应类型
export type UserResponse = {
  count: number
  data: User[] | User
}
