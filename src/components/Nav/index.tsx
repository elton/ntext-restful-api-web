import { useTranslations } from '@/i18n/utils'
import { $langStore } from '@/store/lang'
import type { LangType } from '@/types'
import { readCookie } from '@/utils'
import { useStore } from '@nanostores/solid'
import { createEffect, createSignal, type Component, type JSX } from 'solid-js'

const Nav: Component = (): JSX.Element => {
  const [home, setHome] = createSignal('Home')
  const lang = useStore($langStore)
  let t = useTranslations()

  createEffect(() => {
    t = useTranslations((readCookie('lang') || lang()) as LangType)
    setHome(t('nav.home') as string)
  })

  return (
    <nav class='w-4/5 mx-auto my-8 group'>
      <ol class='flex text-white/60 items-center space-x-2 text-sm'>
        <li class='i-heroicons:home-solid w-1em h-1em group-hover:text-white'></li>
        <li>
          <a href='/' class='group-hover:text-white'>
            {home()}
          </a>
        </li>
      </ol>
    </nav>
  )
}
export default Nav
