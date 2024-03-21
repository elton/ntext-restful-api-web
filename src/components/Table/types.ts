import type { User } from '../../types'

// 用户 响应类型
export declare type UserData = User[] | User

export declare type Claims = {
  token_id: string
  iss: string
  sub: string
  iat: number
  exp: number
}
