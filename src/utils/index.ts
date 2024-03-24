import { createSignal } from 'solid-js'

export const readCookie = (name: string): string | null => {
  const [lang, setLang] = createSignal('')
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  match && setLang(match[2])
  return lang()
}
