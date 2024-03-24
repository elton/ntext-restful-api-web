import { initCarousels } from '@components/Carousel'
import type { Component, JSX } from 'solid-js'
import { createEffect, createSignal, onMount } from 'solid-js'

import { useTranslations } from '@/i18n/utils'
import { useStore } from '@nanostores/solid'
import { $langStore } from '@store/lang'

type CarouselData = [
  {
    title: string
    content: string
  },
]
const LoginCarousel: Component = (): JSX.Element => {
  const lang = useStore($langStore)
  const [UI, setUI] = createSignal<CarouselData>([] as unknown as CarouselData)
  createEffect(() => {
    const t = useTranslations(lang())
    setUI(t('login.carousel') as unknown as CarouselData)
  })
  onMount(() => initCarousels())
  return (
    <div id='default-carousel' class='relative w-full' data-carousel='slide'>
      {/* <!-- Carousel wrapper --> */}
      <div class='relative overflow-hidden h-48 mx-auto text-center mb-8'>
        {/* <!-- item 1 --> */}
        <div
          id='carousel-item-1'
          class='hidden duration-700 ease-in-out w-full h-48 bg-blue-600'
          data-carousel-item>
          <div class='absolute w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 px-4 space-y-1'>
            <div class='text-white/80 font-medium text-lg'>
              {UI().length > 0 && UI()[0].title}
            </div>
            <div class='text-sm text-white/50'>
              {UI().length > 0 && UI()[0].content}
            </div>
          </div>
        </div>
        {/* <!-- item 2 --> */}
        <div
          id='carousel-item-2'
          class='hidden duration-700 ease-in-out w-full h-48 bg-blue-600'
          data-carousel-item>
          <div class='absolute w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 px-4 space-y-1'>
            <div class='text-white/80 font-medium text-lg'>
              {UI().length > 1 && UI()[1].title}
            </div>
            <div class='text-sm text-white/50'>
              {UI().length > 1 && UI()[1].content}
            </div>
          </div>
        </div>
        {/* <!-- item 3 --> */}
        <div
          id='carousel-item-3'
          class='hidden duration-700 ease-in-out w-full h-48 bg-blue-600'
          data-carousel-item>
          <div class='absolute w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 px-4 space-y-1'>
            <div class='text-white/80 font-medium text-lg'>
              {UI().length > 2 && UI()[2].title}
            </div>
            <div class='text-sm text-white/50'>
              {UI().length > 2 && UI()[2].content}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Slider indicators --> */}
      <div class='absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3'>
        <button
          id='carousel-indicator-1'
          type='button'
          class='w-2 h-2 rounded-full bg-white/50'
          aria-current='true'
          aria-label='Slide 1'
          data-carousel-slide-to='0'></button>
        <button
          id='carousel-indicator-2'
          type='button'
          class='w-2 h-2 rounded-full bg-white/50'
          aria-current='false'
          aria-label='Slide 2'
          data-carousel-slide-to='1'></button>
        <button
          id='carousel-indicator-3'
          type='button'
          class='w-2 h-2 rounded-full bg-white/50'
          aria-current='false'
          aria-label='Slide 3'
          data-carousel-slide-to='2'></button>
      </div>
    </div>
  )
}

export default LoginCarousel
