import type { Component, JSX } from 'solid-js'
import { createEffect, createSignal } from 'solid-js'

import { useTranslations } from '@/i18n/utils'
import { useStore } from '@nanostores/solid'
import { $langStore } from '@store/lang'
import Carousel from '../Carousel'

const LoginCarousel: Component = (): JSX.Element => {
  const lang = useStore($langStore)
  const [UI, setUI] = createSignal<CarouselItem[]>([] as CarouselItem[])

  createEffect(() => {
    const t = useTranslations(lang())
    setUI(t('login.carousel') as unknown as CarouselItem[])
  })

  return <Carousel items={UI()} interval={3000} />
}

export default LoginCarousel
