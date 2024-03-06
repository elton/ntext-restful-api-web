import type { User, UserResponse } from '@/env'
import type { Component, JSX } from 'solid-js'
import { For, Show, createSignal, onMount } from 'solid-js'

// 是否预渲染,如果是SSR则为false,如果是CSR则为true
export const prerender = false

const API_ENDPOINT = import.meta.env.PUBLIC_BACKEND_ENDPOINT as string

const UserTable: Component = (): JSX.Element => {
  const [users, setUsers] = createSignal<User[]>([])
  const [loading, setLoading] = createSignal(true)

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/users`)
      const { data: users }: UserResponse = await response.json()
      // 按照 user.id 升序排序
      users.sort((a, b) => a.id - b.id)
      setUsers(users)
      // console.log(users)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  onMount(() => {
    // 显示当前Node环境
    console.log(`当前Node环境: ${import.meta.env.MODE}`)
    console.log(`当前后端地址: ${API_ENDPOINT}`)

    // 设置loading状态为true
    setLoading(true)
    // 获取用户列表
    fetchUsers()
  })

  return (
    <Show
      when={!loading()}
      fallback={
        <div class='flex space-x-3 w-fit mx-auto items-center'>
          <div class='i-svg-spinners:3-dots-bounce w-1em h-1em text-sky-700'></div>
          <div class='text-sky-700'>Loading...</div>
        </div>
      }>
      <table class='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead class='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' class='p-4'>
              <div class='flex items-center'>
                <input
                  id='checkbox-all-search'
                  type='checkbox'
                  class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <label for='checkbox-all-search' class='sr-only'>
                  checkbox
                </label>
              </div>
            </th>
            <th scope='col' class='px-6 py-3'>
              ID
            </th>
            <th scope='col' class='px-6 py-3'>
              Name
            </th>
            <th scope='col' class='px-6 py-3'>
              Created at
            </th>
            <th scope='col' class='px-6 py-3'>
              Updated at
            </th>
            <th scope='col' class='px-6 py-3'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <For each={users()}>
            {(user) => (
              <tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <td class='w-4 p-4'>
                  <div class='flex items-center'>
                    <input
                      id={`user-${user.id}`}
                      type='checkbox'
                      class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label for={`user-${user.id}`} class='sr-only'>
                      checkbox
                    </label>
                  </div>
                </td>

                <td class='px-6 py-4'>{user.id}</td>
                <td class='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'>
                  <img
                    class='w-10 h-10 rounded-full'
                    src={`${user.avatar}?u=${user.id}`}
                    alt={`${user.name} avatar`}
                  />
                  <div class='ps-3'>
                    <div class='text-base font-semibold'>{user.name}</div>
                    <div class='font-normal text-gray-500'>{user.email}</div>
                  </div>
                </td>
                <td class='px-6 py-4'>
                  <div class='flex items-center'>{user.created_at}</div>
                </td>
                <td class='px-6 py-4'>
                  <div class='flex items-center'>{user.modified_at}</div>
                </td>
                <td class='px-6 py-4'>
                  <a
                    href='#'
                    type='button'
                    data-modal-target='editUserModal'
                    data-modal-show='editUserModal'
                    class='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
                    Edit user
                  </a>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </Show>
  )
}

export default UserTable
