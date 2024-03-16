import type { User } from '../types'
export declare type LoginValues = {
  email: string
  password: string
  remember: boolean
}

export declare type Token = {
  access_token: string
  refresh_token: string
}

export declare type LoginData = {
  token: Token
  user: User
}
