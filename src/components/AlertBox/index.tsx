import { useStore } from '@nanostores/solid'
import { $alertStore } from '@store/AlertStore'
import { Show, createEffect, createSignal, type Component } from 'solid-js'

const AlertBox: Component = () => {
  const alertStore = useStore($alertStore)
  const [isShow, setIsShow] = createSignal(false)

  createEffect(() => {
    if (alertStore().message) {
      setIsShow(true)
      setTimeout(() => {
        setIsShow(false)
        $alertStore.setKey('message', undefined)
      }, 5000)
    }
  })

  return (
    <Show when={isShow()}>
      <div
        id='alert-box'
        class={`fixed top-2 left-1/2 -translate-x-1/2 flex items-center p-4   shadow-lg z-100 w-fitm ${alertStore().type === 'error' ? ' text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:(bg-gray-800 border-red-800)' : ' text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:(bg-gray-800 border-green-800)'}`}
        role='alert'>
        {alertStore().type === 'error' ? (
          <div class='i-heroicons:exclamation-triangle-16-solid w-1.5em h-1.5em text-red-800'></div>
        ) : (
          <div class='i-heroicons:shield-check-16-solid w-1.5em h-1.5em text-green-800'></div>
        )}

        <div class='ms-3 text-sm font-medium'>{alertStore().message}</div>
        <button
          type='button'
          class={`ml-2 rounded-lg inline-flex items-center justify-center h-8 w-8 p-1.5 ${alertStore().type === 'error' ? ' focus:(ring-2 ring-red-400) bg-red-100 text-red-500 hover:bg-red-200 dark:(bg-gray-800 text-red-400 hover:bg-gray-700)' : 'focus:(ring-2 ring-green-400) bg-green-100 text-green-500 hover:bg-green-200 dark:(bg-gray-800 text-green-400 hover:bg-gray-700)'} `}
          data-dismiss-target='#alert-box'
          aria-label='Close'
          onClick={() => {
            setIsShow(false)
            $alertStore.setKey('message', undefined)
          }}>
          <span class='sr-only'>Dismiss</span>
          <div
            class={`i-heroicons:x-mark-16-solid w-2em h-2em ${alertStore().type === 'error' ? ' text-red-500' : ' text-green-500'}`}></div>
        </button>
      </div>
    </Show>
  )
}

export default AlertBox
