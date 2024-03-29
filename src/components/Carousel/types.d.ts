// 轮播图项类型
type CarouselItem = {
  title: string
  content: string
}

type CarouselProps = {
  items: Array<CarouselItem>
  interval?: number
}
