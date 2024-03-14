import { initCarousels } from './Carousel'

export function initFlowbite() {
  initCarousels()
}

if (typeof window !== 'undefined') {
  window.initFlowbite = initFlowbite
}
