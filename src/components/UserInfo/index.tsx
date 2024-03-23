import { clearTokens, getAccessToken } from '@/request/tokens'
import * as jose from 'jose'
import { createSignal, onMount, type Component, type JSX } from 'solid-js'

const UserInfo: Component = (): JSX.Element => {
  const [showUserDetail, setShowUserDetail] = createSignal(false)

  const logout = () => {
    clearTokens()
    window.location.href = '/'
  }
  let username = ''
  onMount(() => {
    const claims = getAccessToken() && jose.decodeJwt(getAccessToken()!)
    username = claims?.sub as string
  })
  return (
    <div>
      <div
        class='flex h-fit space-x-2 items-center mr-4 pt-4 shrink cursor-grab'
        onClick={() => setShowUserDetail(!showUserDetail())}>
        <div class='text-center space-y-2'>
          <img
            class='w-10 h-10 rounded-full block w-fit mx-auto'
            src={`https://i.pravatar.cc/100`}
            alt={`avatar`}
            id='avatar'
          />
        </div>
        {showUserDetail() ? (
          <div class='i-heroicons:chevron-up-16-solid w-1em h-1em text-gray-500'></div>
        ) : (
          <div class='i-heroicons:chevron-down-16-solid w-1em h-1e text-gray-500'></div>
        )}
      </div>
      <div
        id='user-detail'
        class='relative mt-2 '
        // classList 接受一个对象作为值,对象的键是要应用的 CSS 类名,值是一个布尔值或者 Signal。当值为 true 或者 Signal 的值为 true 时,对应的 CSS 类就会被添加到元素上;当值为 false 或者 Signal 的值为 false 时,对应的 CSS 类就会从元素上移除。
        classList={{ hidden: !showUserDetail() }}>
        <div class='absolute right-2 bg-indigo-100 min-w-40 rounded-lg overflow-hidden text-center space-y-2 backdrop-blur-sm text-gray-800 z-10 shadow-lg'>
          <div class='bg-indigo-200 w-full p-4 space-y-2'>
            <img
              class='w-14 h-14 rounded-full w-fit mx-auto'
              src={`https://i.pravatar.cc/100`}
              alt={`avatar`}
            />
            <div class='text-xs text-nowrap' id='username'>
              {username}
            </div>
          </div>
          <div class='px-4 pb-4 space-y-2'>
            <a class='text-xs block' href='#'>
              Setting
            </a>
            <a class='text-xs block' href='#'>
              Help
            </a>
            <a id='logout' class='text-xs block' href='#' onclick={logout}>
              {' '}
              Logout{' '}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
