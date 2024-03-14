import { initCarousels } from '@components/Carousel'
import type { Component, JSX } from 'solid-js'
import { onMount } from 'solid-js'

// 是否预渲染,如果是SSR则为false,如果是CSR则为true
export const prerender = true

const LoginCarousel: Component = (): JSX.Element => {
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
              Connect with everyone and every application
            </div>
            <div class='text-sm text-white/50'>
              Everything you need in an easily customizable dashboard.
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
              Intelligent analytics and AI-powered insights
            </div>
            <div class='text-sm text-white/50'>
              Intelligent analytics and AI-assisted decision-making help you
              uncover endless opportunities and conquer new business heights.
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
              Streamline your workflow, maximize efficiency
            </div>
            <div class='text-sm text-white/50'>
              Consolidate disparate tools and processes into one centralized
              platform, eliminating redundancies and streamlining your daily
              operations for maximum productivity.
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