import { defaultLang, languages } from '@/i18n/ui'
import { $langStore } from '@/store/lang'
import type { LangType } from '@/types'
import { readCookie } from '@/utils'
import { useStore } from '@nanostores/solid'
import { createEffect, createSignal, type Component, type JSX } from 'solid-js'

const LanguagePicker: Component = (): JSX.Element => {
  const lang = useStore($langStore)
  const [showLangMenu, setShowLangMenu] = createSignal(false)

  createEffect(() => {
    // 如果cookie中有语言设置，则使用cookie中的语言设置，以cookie中的语言设置为准
    // 如果cookie中没有语言设置，则使用默认的语言设置
    // 因为LanguagePicker组件是应用的公共组件，每个页面都会使用。所以在这里设置langStore语言是最合适的
    $langStore.set((readCookie('lang') as LangType) || defaultLang)
  })
  return (
    <div class='flex-col'>
      <div
        class='flex space-x-2 items-center text-gray-500 text-sm cursor-pointer min-w-26'
        onclick={() => setShowLangMenu(!showLangMenu())}>
        <div class='i-heroicons:language-16-solid w-1em h-1em'></div>
        <div>{languages[lang() as LangType]}</div>
        {showLangMenu() ? (
          <div class='i-heroicons:chevron-up-16-solid w-1em h-1em text-gray-500'></div>
        ) : (
          <div class='i-heroicons:chevron-down-16-solid w-1em h-1e text-gray-500'></div>
        )}
      </div>
      <div class='relative mt-2 z-60' classList={{ hidden: !showLangMenu() }}>
        <ul class='absolute bg-gray-50 backdrop-blur-lg py-4 px-1 rounded-lg text-gray-500 text-sm space-y-2 overflow-hidden text-nowrap shadow-lg '>
          {Object.entries(languages).map(([language, label]) => (
            <li
              class='flex items-center space-x-1 cursor-pointer hover:(text-gray-800 bg-slate-400 text-white) px-4 py-1 rounded'
              onclick={() => {
                $langStore.set(language as LangType)
                // write the selected language to cookie
                document.cookie = `lang=${language};`
                setShowLangMenu(false)
              }}>
              {lang() === language ? (
                <div class='i-heroicons:check-16-solid w-1em h-1em'></div>
              ) : (
                <div class='w-1em'></div>
              )}
              <div class=''>{label}</div>
              {/* <a href={`/${lang}/`}>{label}</a> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default LanguagePicker
