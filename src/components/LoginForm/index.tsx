import type { APIResponse } from '@/types'
import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
import type { LoginData, LoginValues } from './types'

// import the store for the alert box
import { $alertStore } from '@store/AlertStore'

const API_ENDPOINT = import.meta.env.PUBLIC_BACKEND_ENDPOINT

const LoginForm: Component = () => {
  const [loginValues, setLoginValues] = createSignal<LoginValues>({
    email: '',
    password: '',
    remember: false,
  })

  // handle the form submission
  const handleSubmit = async (event: Event) => {
    event.preventDefault()

    // remove remember from the login values
    const { remember, ...loginData } = loginValues()
    if (loginData.email === '' || loginData.password === '') {
      $alertStore.setKey('message', 'Email and Password are required')
      $alertStore.setKey('type', 'error')
      return
    }

    // send the login request to the API
    const response = await fetch(`${API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(loginData),
    })

    // handle wrong credentials
    if (!response.ok) {
      $alertStore.setKey('message', 'Wrong credentials')
      $alertStore.setKey('type', 'error')
      return
    }

    const { data }: APIResponse<LoginData> = await response.json()
    console.log(data.token.access_token)

    // store the tokens in the local storage
    if (data?.token) {
      localStorage.setItem('access_token', data.token.access_token)
      localStorage.setItem('refresh_token', data.token.refresh_token)
      window.location.href = '/'
    }
  }

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    setLoginValues({
      ...loginValues(),
      [target.name]: target.type === 'checkbox' ? target.checked : target.value,
    })
  }

  return (
    <form onSubmit={handleSubmit} class='w-2/3 mx-auto'>
      <label for='email' aria-label='email' class='text-gray-600'>
        Email
      </label>
      <div class='relative mb-4'>
        <div class='absolute top-1/2 -translate-y-1/2 left-2 i-heroicons:envelope-16-solid text-gray-500 w-1.5em h-1.5em'></div>
        <input
          id='email'
          type='email'
          name='email'
          value={loginValues().email}
          onChange={handleChange}
          placeholder='your_name@example.com'
          onFocus={(e) => e.currentTarget.select()}
          autocomplete='email'
          class='w-full px-10 py-2 my-2 border-2 border-gray-300 rounded-md'
        />
      </div>
      <label for='password' aria-label='password' class='text-gray-600'>
        Password
      </label>
      <div class='relative mb-4'>
        <div class='absolute top-1/2 -translate-y-1/2 left-2 i-heroicons:lock-closed-20-solid w-1.5em h-1.5em text-gray-500'></div>
        <input
          id='password'
          type='password'
          name='password'
          value={loginValues().password}
          onChange={handleChange}
          onFocus={(e) => e.currentTarget.select()}
          placeholder='Password'
          class='w-full px-10 py-2 my-2 border-2 border-gray-300 rounded-md'
        />
      </div>

      <div class='flex space-x-2 mb-4'>
        <input
          type='checkbox'
          id='remember'
          name='remember'
          checked={loginValues().remember}
          onChange={handleChange}
          class='m-2'
        />
        <label for='remember' class='text-gray-600'>
          Remember me
        </label>
      </div>
      <button
        type='submit'
        class='w-full p-2 my-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
        Login
      </button>
    </form>
  )
}

export default LoginForm
