import { format, parseISO } from 'date-fns'
import type { Component, JSX } from 'solid-js'
import { For, Show, createEffect, createSignal, onMount } from 'solid-js'
import type { APIResponse, User } from '../../types'
import Modal from '../Modal'
import Pagination from '../Pagination'
import type { Claims, UserData } from './types'
// import the store for the alert box
import { apiClient } from '@/request'
import { getAccessToken } from '@/request/tokens'
import { $alertStore } from '@store/AlertStore'
import type { AxiosResponse } from 'axios'
import * as jose from 'jose'

const API_ENDPOINT = import.meta.env.PUBLIC_BACKEND_ENDPOINT

const Table: Component = (): JSX.Element => {
  const [users, setUsers] = createSignal<User[]>([])
  const [loading, setLoading] = createSignal(true)
  const [page, setPage] = createSignal(1)
  const [pageSize, _] = createSignal(10)
  const [amount, setAmount] = createSignal(0)
  const [paginationNumbers, setPaginationNumbers] = createSignal<number[]>([])
  const [showModal, setShowModal] = createSignal(false)
  const [selectedUserId, setSelectedUserId] = createSignal<number | null>(null)
  const [searchInput, setSearchInput] = createSignal('')
  const [searchTerm, setSearchTerm] = createSignal('')

  const fetchUsers = async (searchTerm = '') => {
    setLoading(true)
    // set page to 1 when searching
    searchTerm && setPage(1)

    try {
      const filter = JSON.stringify({
        search_term: searchTerm,
        sort_by: 'modified_at',
        order_by: 'desc',
        page: page(),
        page_size: pageSize(),
      })

      const response: AxiosResponse<APIResponse<UserData>> =
        await apiClient.post('/users/search', filter)
      const { count, data: users }: APIResponse<UserData> = response.data
      setUsers(users as User[])
      setAmount(count)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const prevPage = () => {
    if (page() > 1) {
      setPage(page() - 1)
    }
  }

  const nextPage = () => {
    if (page() * pageSize() < amount()) {
      setPage(page() + 1)
    }
  }

  // 获取分页页码
  const generatePaginationNumbers = (
    currentPage: number,
    range = 5,
    pageSize = 10,
    totalRecords: number,
  ) => {
    // 计算总页数, 向上取整. Math.ceil(11.5) = 12
    const totalPages = Math.ceil(totalRecords / pageSize)
    let startPage = Math.floor((currentPage - 1) / range) * range + 1
    let endPage = Math.min(startPage + range - 1, totalPages)
    const pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    )

    setPaginationNumbers(pages)
  }

  const handleEditClick = (userId?: number) => {
    userId && setSelectedUserId(userId)
    setShowModal(true)
  }

  const handleModalClose = async () => {
    setShowModal(false)
    setSelectedUserId(null)
    // 重新获取用户列表
    await fetchUsers(searchTerm())
  }

  const handleInput = (event: InputEvent) => {
    setSearchInput((event.currentTarget as HTMLInputElement).value)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const trimmedInput = searchInput().trim()
      if (trimmedInput !== '') {
        setSearchTerm(trimmedInput)
      }
    }
  }

  onMount(() => {
    // 显示当前Node环境
    console.log(`当前Node环境: ${import.meta.env.MODE}`)
    console.log(`当前后端地址: ${API_ENDPOINT}`)

    // decode the access token
    const claims = getAccessToken() && jose.decodeJwt<Claims>(getAccessToken()!)
    // check if the token is expired
    const isExpired = claims && claims.exp < Date.now() / 1000

    if (!getAccessToken() || isExpired) {
      $alertStore.setKey(
        'message',
        "You need to login to access this page <a href='/login' style='text-decoration-line: underline; font-weight: 600;' >Login now</a>",
      )
      $alertStore.setKey('type', 'error')

      isExpired && localStorage.removeItem('access_token')

      return
    } else {
      // 设置loading状态为true
      setLoading(true)
    }
  })

  createEffect(async () => {
    await fetchUsers(searchTerm())
    generatePaginationNumbers(page(), 5, pageSize(), amount())
  })

  return (
    <>
      <Show
        when={!loading()}
        fallback={
          <div class='flex space-x-3 w-fit mx-auto items-center '>
            <div class='i-svg-spinners:3-dots-bounce w-1em h-1em text-sky-700'></div>
            <div class='text-sky-700'>Loading...</div>
          </div>
        }>
        <div class='pb-4 bg-white dark:bg-gray-900 flex justify-between items-center'>
          <label for='table-search' class='sr-only'>
            Search
          </label>
          <div class='relative mt-1'>
            <div class='absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none'>
              <svg
                class='w-4 h-4 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'>
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
            </div>
            <input
              type='text'
              id='table-search'
              value={searchInput()}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              onFocus={() => setSearchInput('')}
              class='block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:(bg-light-200ring-blue-500 border-blue-500) dark:(bg-light-400bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500)'
              placeholder='Search for items'
            />
          </div>
          <button
            class='bg-sky-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-sky-700'
            onClick={() => handleEditClick()}>
            Create New User
          </button>
        </div>
        <table class='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead class='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' class='p-4'>
                <div class='flex items-center'>
                  <input
                    id='checkbox-all-search'
                    type='checkbox'
                    class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:(ring-blue-500 ring-2) dark:(focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 bg-gray-700 border-gray-600)'
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
            <For each={users() as User[]}>
              {(user) => (
                <tr class='bg-white border-b dark:(bg-gray-800 border-gray-700 hover:bg-gray-600) hover:bg-gray-50 '>
                  <td class='w-4 p-4'>
                    <div class='flex items-center'>
                      <input
                        id={`user-${user.id}`}
                        type='checkbox'
                        class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:(ring-blue-500 ring-2) dark:(focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800  bg-gray-700 border-gray-600)'
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
                    <div class='flex items-center'>
                      {format(
                        parseISO(user.created_at!),
                        'yyyy/MM/dd HH:mm:ss',
                      )}
                    </div>
                  </td>
                  <td class='px-6 py-4'>
                    <div class='flex items-center'>
                      {user.modified_at &&
                        format(
                          parseISO(user.modified_at!),
                          'yyyy/MM/dd HH:mm:ss',
                        )}
                    </div>
                  </td>
                  <td class='px-6 py-4'>
                    <button
                      data-modal-target='editUserModal'
                      data-modal-show='editUserModal'
                      class='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                      onClick={() => handleEditClick(user.id)}>
                      Edit user
                    </button>
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>

        <Pagination
          currentPage={page()}
          totalPages={amount()}
          pageSize={pageSize()}
          paginationNumbers={paginationNumbers()}
          onPageChange={setPage}
          prevPage={prevPage}
          nextPage={nextPage}
        />

        <Show when={showModal()}>
          <Modal userID={selectedUserId()} onClose={handleModalClose} />
        </Show>
      </Show>
    </>
  )
}

export default Table
