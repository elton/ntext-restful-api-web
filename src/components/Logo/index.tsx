import { useTranslations } from '@/i18n/utils'
import { $langStore } from '@/store/lang'
import type { LangType } from '@/types'
import { readCookie } from '@/utils'
import { useStore } from '@nanostores/solid'
import {
  createEffect,
  createSignal,
  onMount,
  type Component,
  type JSX,
} from 'solid-js'

const Logo: Component = (): JSX.Element => {
  const [title, setTitle] = createSignal('')
  const lang = useStore($langStore)
  let t = useTranslations()

  onMount(() => {
    // LanguagePicker组件中的createEffect已经根据cookie中的语言设置更新了langStore
    t = useTranslations(lang())
    setTitle(t('login.title') as string)
  })

  createEffect(() => {
    t = useTranslations(lang())
    setTitle(t('login.title') as string)
  })
  return (
    <div class='w-fit mx-auto grow'>
      <div class='flex w-full items-center justify-center gap-x-4 text-4xl p-2 my-8'>
        {/* <!-- Use any icon with Pure CSS for UnoCSS. https://unocss.dev/presets/icons --> */}
        <div class='i-logos-astro w-6em h-2em transform transition-800'></div>
        <div class='text-4xl font-semibold text-gray-700'>+</div>
        <div class='i-logos-unocss w-2em h-2em'></div>
      </div>
      <div class='text-4xl font-semibold text-center text-blueGray-600'>
        {title()}
      </div>
    </div>
  )
}
export default Logo
