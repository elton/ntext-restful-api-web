import { languages } from '@/i18n/ui'

// API 响应类型
export declare type APIResponse<T extends object> = {
  status: string
  message: string
  count: number
  data: T
}

export declare type TokenResponse = {
  token: {
    access_token: string
    refresh_token: string
  }
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

export declare type LangType = keyof typeof languages
// keyof操作符用于获取languages对象的所有键,生成一个联合类型,等同于 type LangType = 'en' | 'zh';
