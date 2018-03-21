import Carousel from './Carousel.vue'

const pandaVueCarousel = {
  install (Vue, options) {
    Vue.component(Carousel.name, Carousel)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(pandaVueCarousel)
}

export default pandaVueCarousel
