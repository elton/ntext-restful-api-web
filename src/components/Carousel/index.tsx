import {
  createSignal,
  onCleanup,
  onMount,
  type Component,
  type JSX,
} from 'solid-js'

const Carousel: Component<CarouselProps> = (
  props: CarouselProps,
): JSX.Element => {
  const [currentIndex, setCurrentIndex] = createSignal(0)
  let intervalId: number

  const goToNext = () => {
    setCurrentIndex((currentIndex() + 1) % props.items.length)
  }

  const goToPrev = () => {
    setCurrentIndex(
      currentIndex() === 0 ? props.items.length - 1 : currentIndex() - 1,
    )
  }

  const goToIndex = (index: number) => {
    setCurrentIndex(index)
  }

  onMount(() => {
    intervalId = setInterval(goToNext, props.interval || 3000)
  })

  onCleanup(() => {
    clearInterval(intervalId)
  })

  return (
    <div id='default-carousel' class='relative w-full' data-carousel='slide'>
      {/* <!-- Carousel wrapper --> */}
      <div class='relative overflow-hidden h-48 mx-auto text-center mb-8'>
        {props.items.map((item, index) => (
          <div
            id={`carousel-item-${index + 1}`}
            aria-current={currentIndex() === index}
            classList={{ hidden: currentIndex() !== index }}
            class='duration-700 ease-in-out w-full h-48 bg-blue-600'>
            <div class='absolute w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 px-4 space-y-1'>
              <div class='text-white/80 font-medium text-lg'>{item.title}</div>
              <div class='text-sm text-white/50'>{item.content}</div>
            </div>
          </div>
        ))}
      </div>
      {/* <!-- Slider indicators --> */}
      <div class='absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3'>
        {props.items.map((_, index) => (
          <button
            id={`carousel-indicator-${index + 1}`}
            type='button'
            class={`w-2 h-2 rounded-full ${currentIndex() === index ? 'bg-white' : 'bg-white/50'} `}
            aria-current={currentIndex() === index}
            aria-label={`Slide ${index + 1}`}
            onclick={() => goToIndex(index)}></button>
        ))}
      </div>
    </div>
  )
}

export default Carousel
