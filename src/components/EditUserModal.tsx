import type { User, UserResponse } from '@/env'
import { format, parseISO } from 'date-fns'
import type { Component, JSX } from 'solid-js'
import { Show, createSignal, onMount } from 'solid-js'

// 是否预渲染,如果是SSR则为false,如果是CSR则为true
export const prerender = false

const API_ENDPOINT = import.meta.env.PUBLIC_BACKEND_ENDPOINT as string

interface EditUserModalProps {
  userID: number | null
  onClose: () => void
}

const fetchUser = async (id: number) => {
  const response = await fetch(`${API_ENDPOINT}/user/${id}`)
  const { data: user }: UserResponse = await response.json()
  return user as User
}

const handleSave = async (user: User) => {
  await updateUser(user)
}

const updateUser = async (user: User) => {
  const response = await fetch(`${API_ENDPOINT}/user/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  return response.json()
}

const deleteUser = async (id: number) => {
  const response = await fetch(`${API_ENDPOINT}/user/${id}`, {
    method: 'DELETE',
  })
  return response.json()
}

const handleDelete = async (id: number, close: () => void) => {
  await deleteUser(id)
  close()
}

const EditUserModal: Component<EditUserModalProps> = (props) => {
  const [user, setUser] = createSignal<User | null>(null)

  onMount(async () => {
    if (props.userID) {
      setUser(await fetchUser(props.userID))
    }
  })
  return (
    <Show when={user()}>
      <div
        id='editUserModal'
        tabindex='-1'
        aria-hidden='true'
        class='fixed left-1/2 top-1/2 -translate-1/2 z-50 p-4 overflow-x-hidden overflow-y-auto w-3/5'>
        <div class='relative w-full'>
          {/* <!-- Modal content --> */}
          <form class='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            {/* <!-- Modal header --> */}
            <div class='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
              {/* <!-- Modal toggle --> */}
              <a
                href='#'
                type='button'
                data-modal-show='editUserModal'
                class='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
                Edit user
              </a>
              <button
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
                  <div class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    ID
                  </div>
                  <div class='text-stone-400 text-sm'>{user()!.id}</div>
                </div>
                <div class='col-span-6 sm:col-span-3'>
                  <div class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Avatar
                  </div>
                  <img
                    class='w-10 h-10 rounded-full'
                    src={`${user()?.avatar}?u=${user()?.id}`}
                    alt={`${user()?.name} avatar`}
                  />
                </div>
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
                    placeholder={user()?.name}
                    onInput={(e) =>
                      setUser({ ...user()!, name: e.currentTarget.value })
                    }
                    value={user()?.name}
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
                    placeholder={user()?.email}
                    onInput={(e) =>
                      setUser({ ...user()!, email: e.currentTarget.value })
                    }
                    value={user()?.email}
                    onFocus={(e) => e.currentTarget.select()}
                  />
                </div>
              </div>
            </div>
            {/* <!-- Modal footer --> */}
            <div class='flex justify-between items-center p-6 space-x-3 border-t border-gray-200 rounded-b dark:border-gray-600'>
              <button
                type='submit'
                class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:(outline-none ring-blue-300) font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:(bg-blue-600 hover:bg-blue-700 focus:ring-blue-800)'
                onClick={async () => await handleSave(user()!)}>
                Save
              </button>
              <button
                type='button'
                class='text-white bg-red-600 hover:bg-red-700 rounded-lg text-sm px-5 py-2.5 dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-hide='editUserModal'
                onClick={async () =>
                  await handleDelete(user()!.id, props.onClose)
                }>
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </Show>
  )
}

export default EditUserModal
