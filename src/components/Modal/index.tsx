import type { UserData } from '@components/Table/types'
import type { APIResponse, User } from '../types'
import type { EditUserModalProps } from './types'

import type { Component } from 'solid-js'
import { Show, createSignal, onMount } from 'solid-js'

// import the store for the alert box
import { $alertStore } from '@store/AlertStore'

const API_ENDPOINT = import.meta.env.PUBLIC_BACKEND_ENDPOINT as string

// define the enum for the user role
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

const Modal: Component<EditUserModalProps> = (props) => {
  const [user, setUser] = createSignal<User>({
    email: '',
    name: '',
    password: '',
    role: '',
  })
  const [accessToken, setAccessToken] = createSignal('')

  // 定义密码校验规则
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  // define the function to handle the submitting of the form
  const handleSave = async (e: Event, user: User, close: () => void) => {
    e.preventDefault()
    if (!props.userID) {
      // 如果是创建用户,则需要校验密码和确认密码是否一致
      const { password, confirmPassword } = user

      if (!passwordRegex.test(password)) {
        $alertStore.setKey(
          'message',
          'Password should contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
        )
        $alertStore.setKey('type', 'error')
        return
      }

      if (password !== confirmPassword) {
        $alertStore.setKey(
          'message',
          'password and confirm password should be the same',
        )
        $alertStore.setKey('type', 'error')

        return
      }

      if (user.name === '' || user.email === '') {
        $alertStore.setKey('message', 'Name and Email are required')
        $alertStore.setKey('type', 'error')
        return
      }

      //delete the confirmPassword field
      delete user.confirmPassword

      // set the default avatar if the user does not have
      // ??= is the nullish coalescing assignment operator. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment
      user.avatar ??= 'https://i.pravatar.cc/100'
      await createUser(user)
    } else {
      await updateUser(user)
    }
    close()
  }

  const fetchUser = async (id: number) => {
    const response = await fetch(`${API_ENDPOINT}/users?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // Authorization header with Bearer token
        Authorization: `Bearer ${accessToken()}`,
      },
    })
    const { data: user }: APIResponse<UserData> = await response.json()
    return user as User[]
  }

  const updateUser = async (user: User) => {
    const response = await fetch(`${API_ENDPOINT}/users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // Authorization header with Bearer token
        Authorization: `Bearer ${accessToken()}`,
      },
      body: JSON.stringify(user),
    })
    const { status, message, data: new_user } = await response.json()
    $alertStore.setKey('message', message)

    if (status === 'failed') {
      $alertStore.setKey('type', 'error')
      return
    } else {
      $alertStore.setKey('type', 'success')
      return new_user
    }
  }

  const createUser = async (user: User) => {
    const response = await fetch(`${API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // Authorization header with Bearer token
        Authorization: `Bearer ${accessToken()}`,
      },
      body: JSON.stringify(user),
    })
    const { status, message, data: new_user } = await response.json()
    $alertStore.setKey('message', message)

    if (status === 'failed') {
      $alertStore.setKey('type', 'error')
      return
    } else {
      $alertStore.setKey('type', 'success')
      return new_user
    }
  }

  const deleteUser = async (id: number) => {
    const response = await fetch(`${API_ENDPOINT}/users?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // Authorization header with Bearer token
        Authorization: `Bearer ${accessToken()}`,
      },
    })
    return response.json()
  }

  const handleDelete = async (id: number, close: () => void) => {
    await deleteUser(id)
    close()
  }

  onMount(async () => {
    // load access_token from local storage
    const access_token = localStorage.getItem('access_token')
    if (!access_token) {
      $alertStore.setKey(
        'message',
        "You need to login to access this page <a href='/login' style='text-decoration-line: underline; font-weight: 600;' >Login now</a>",
      )
      $alertStore.setKey('type', 'error')
      return
    } else {
      setAccessToken(access_token)
    }

    if (props.userID) {
      const userArray = await fetchUser(props.userID)
      setUser(userArray[0])
    }
  })
  return (
    <Show when={user() || props.userID === null}>
      <div
        id='editUserModal'
        tabindex='-1'
        aria-hidden='true'
        class='fixed left-1/2 top-1/2 -translate-1/2 z-50 p-4 overflow-x-hidden overflow-y-auto w-3/5'>
        <div class='relative w-full'>
          {/* <!-- Modal content --> */}
          <form
            class='relative bg-white rounded-lg shadow dark:bg-gray-700'
            onSubmit={async (e) => await handleSave(e, user(), props.onClose)}>
            {/* <!-- Modal header --> */}
            <div class='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
              <div class='flex items-center space-x-4'>
                <div class='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
                  {props.userID ? <>Edit User</> : <>Create New User</>}
                </div>
                <div class='text-stone-400 text-sm'>
                  {props.userID && <>ID: {user().id}</>}
                </div>
              </div>
              {/* <!-- Modal toggle --> */}
              <button
                id='editUserModalClose'
                type='button'
                class='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-hide='editUserModal'
                onClick={props.onClose}>
                <svg
                  class='w-3 h-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'>
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
                <span class='sr-only'>Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div class='p-6 space-y-6'>
              <div class='grid grid-cols-6 gap-6'>
                <div class='col-span-6 sm:col-span-3'>
                  <label
                    for='role'
                    class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Role
                  </label>
                  <select
                    id='role'
                    class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:(ring-blue-500 border-blue-500) block w-full p-2 dark:(bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500)'
                    value={user().role || UserRole.USER}
                    onChange={(e) =>
                      setUser({
                        ...user(),
                        role: e.currentTarget.value as UserRole,
                      })
                    }>
                    <option value={UserRole.ADMIN}>Admin</option>
                    <option value={UserRole.USER} selected>
                      User
                    </option>
                  </select>
                </div>
                <Show when={user().avatar}>
                  <div class='col-span-6 sm:col-span-3'>
                    <div class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                      Avatar
                    </div>
                    <img
                      class='w-10 h-10 rounded-full'
                      src={`${user().avatar}?u=${user().id}`}
                      alt={`${user().name} avatar`}
                    />
                  </div>
                </Show>
                <div class='col-span-6 sm:col-span-3'>
                  <label
                    for='name'
                    class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    class='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:(ring-blue-600 border-blue-600) block w-full p-2.5 dark:(bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500)'
                    placeholder={user().name}
                    onInput={(e) =>
                      setUser({ ...user()!, name: e.currentTarget.value })
                    }
                    value={user().name}
                    onFocus={(e) => e.currentTarget.select()}
                  />
                </div>
                <div class='col-span-6 sm:col-span-3'>
                  <label
                    for='email'
                    class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    class='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:(ring-blue-600 border-blue-600) block w-full p-2.5 dark:(bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500)'
                    placeholder={user().email}
                    onInput={(e) =>
                      setUser({ ...user()!, email: e.currentTarget.value })
                    }
                    value={user().email}
                    onFocus={(e) => e.currentTarget.select()}
                  />
                </div>

                <div class='col-span-6 sm:col-span-3'>
                  <label
                    for='password'
                    class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    class='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:(ring-blue-600 border-blue-600) block w-full p-2.5 dark:(bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500)'
                    onInput={(e) =>
                      setUser({ ...user()!, password: e.currentTarget.value })
                    }
                    onFocus={(e) => e.currentTarget.select()}
                  />
                </div>
                <div class='col-span-6 sm:col-span-3'>
                  <label
                    for='confirmPassword'
                    class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Confirm Password
                  </label>
                  <input
                    type='password'
                    name='confirmPassword'
                    id='confirmPassword'
                    class='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:(ring-blue-600 border-blue-600) block w-full p-2.5 dark:(bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500)'
                    onInput={(e) =>
                      setUser({
                        ...user()!,
                        confirmPassword: e.currentTarget.value,
                      })
                    }
                    onFocus={(e) => e.currentTarget.select()}
                  />
                </div>
              </div>
            </div>
            {/* <!-- Modal footer --> */}
            <div class='flex justify-between items-center p-6 space-x-3 border-t border-gray-200 rounded-b dark:border-gray-600'>
              <button
                id='saveUser'
                type='submit'
                class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:(outline-none ring-blue-300) font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:(bg-blue-600 hover:bg-blue-700 focus:ring-blue-800)'>
                {props.userID ? 'Update' : 'Create'}
              </button>
              {props.userID && (
                <button
                  id='deleteUser'
                  type='button'
                  class='text-white bg-red-600 hover:bg-red-700 rounded-lg text-sm px-5 py-2.5 dark:hover:bg-gray-600 dark:hover:text-white'
                  data-modal-hide='editUserModal'
                  onClick={async () =>
                    await handleDelete(props.userID!, props.onClose)
                  }>
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Show>
  )
}

export default Modal
