type LoginValues = {
  email: string
  password: string
  remember: boolean
}

type Token = {
  access_token: string
  refresh_token: string
}

type LoginData = {
  token: Token
  user: User
}
