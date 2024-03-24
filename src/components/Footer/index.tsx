import { defaultLang } from '@/i18n/ui'
import { useStore } from '@nanostores/solid'
import { $langStore } from '@store/lang'
import { createEffect, createSignal } from 'solid-js'

// 获取指定slug的文档的url
const getDocLink = (slug: string): string => {
  const [lang, slugOnly] = slug.split('/')

  return lang === defaultLang
    ? `/docs/${slugOnly}`
    : `/docs/${lang}/${slugOnly}`
}

const Footer = () => {
  // 获取当前年份
  const year = new Date().getFullYear()
  const lang = useStore($langStore)
  const [link, setLink] = createSignal('')

  createEffect(() => {
    setLink(getDocLink(`${lang()}/ntex-restful-api-server-prd`))
  })

  return (
    <footer class='text-xs text-neutral-500 text-center my-10 space-y-2'>
      <div>Copyright &copy; {year} PWR.ink</div>
      <div>
        <a href={link()}>Document</a>
      </div>
    </footer>
  )
}

export default Footer
