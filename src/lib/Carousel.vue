<template>
  <div class="carousel_cpmponent" @touchmove="preventDefault">
    <section class="carousel_content">
      <div ref="swiper" class="carousel_swiper" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
        <div
          class="carousel_swiper_item"
          ref="container"
          v-for="(item, i) of list"
          :key="i"
          :style="{padding: `0 ${margin / 2}px`}"
        >
          <slot :data="item" :index="i" />
        </div>
      </div>
    </section>
    <div v-if="!crevice" class="carousel_indicator">
      <div v-for="(tag, i) of list.length - 2 * infinite" :class="{ carousel_show_bgcolor: index - 1 + !infinite === i }" class="carousel-indicator-item" :key="i" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'Carousel',
  props: {
    autoPlay: {
      default: true // 是否支持自动播放
    },
    duration: {
      default: 500 // 滚动一次需要的时间
    },
    delayed: {
      default: 2500 // 多久滚动一次
    },
    data: Array, // 这个是数据
    infinite: {
      default: true // 是否可以无限轮播
    },
    padding: {
      default: 0 // 每一个轮播大小控制 = 页面整体宽度 - 此项设置
    },
    margin: {
      default: 0 // 每一个轮播和另一个轮播之间的距离
    }
  },
  data () {
    return {
      width: 0,
      auto: true,
      slideing: true,
      timer1: '',
      dom: {},
      position: 0, // 目前所在位置
      startX: 0, // 手指触到屏幕上的x轴坐标
      moveX: 0, // 手指滑动后 手指所在的x轴坐标
      index: 0
    }
  },
  computed: {
    crevice () {
      if (this.data.length < 3) {
        return false
      }
      return !!this.margin
    },
    list () {
      return this.infinite ? [...this.data.slice(-1 - this.crevice), ...this.data, ...this.data.slice(0, 1 + this.crevice)] : this.data
    }
  },
  created () {
    this.index = +this.infinite
  },
  mounted () {
    setTimeout(() => {
      this.starDom()
      this.dom.webkitTransition = `translate3d(${this.infinite ? this.width * (-this.crevice - 1) + this.crevice * this.padding / 2 : 0}px, 0px, 0px)`
      this.dom.transform = `translate3d(${this.infinite ? this.width * (-this.crevice - 1) + this.crevice * this.padding / 2 : 0}px, 0px, 0px)`
      this.autoPlay && this.infinite && this.setTime()
    }, 50)
  },
  methods: {
    starDom () { // 初始化数据 以及获取必要的数据
      this.width = document.documentElement.clientWidth - this.crevice * this.padding
      this.$refs.container.forEach(item => {
        item.style.width = `${this.width}px`
      })
      this.dom = this.$refs.swiper.style
    },
    touchstart (e) {
      if (this.slideing) {
        this.clearTimeOut()
        this.dom.transition = '0s'
        this.dom.webkitTransition = '0s'
        this.position = this.getTransform()
        this.startX = e.touches[e.touches.length - 1].clientX
      }
    },
    touchmove (e) {
      if (this.slideing && this.startX !== -1) {
        this.clearTimeOut()
        let moveX = e.touches[e.touches.length - 1].clientX - this.startX
        if (this.isTouchmove(moveX)) {
          this.moveX = moveX
          this.setTranslate(this.moveX + this.position)
        }
      }
    },
    touchend () {
      this.clearTimeOut()
      this.setTranslate(this.moveX + this.position)
      if (this.moveX > 0 && this.moveX / this.width > 0.2) {
        this.index--
      }
      if (this.moveX < 0 && this.moveX / -this.width > 0.2) {
        this.index++
      }
      this.move('touch')
    },
    isTouchmove (moveX) {
      return this.infinite ? true : (moveX + this.position <= 0 && moveX + this.position > (this.list.length - 1) * -this.width)
    },
    setTranslate (d) {
      if ('transform' in document.documentElement.style) {
        this.transform(d)
      } else {
        this.webkitTransform(d)
      }
    },
    transform (d) {
      this.dom.transform = `translate3d(${d + this.crevice * this.padding / 2}px, 0, 0)`
      this.dom.transform = `webkikTranslate3d(${d + this.crevice * this.padding / 2}px, 0, 0)`
    },
    webkitTransform (d) {
      this.dom.webkitTransform = `translate3d(${d + this.crevice * this.padding / 2}px, 0, 0)`
      this.dom.webkitTransform = `webkikTranslate3d(${d + this.crevice * this.padding / 2}px, 0, 0)`
    },
    getTransform () { // 获取当前轮播的偏移量
      if ('transform' in document.documentElement.style) {
        let position = this.dom.transform
        position = position.substring(12)
        position = position.match(/(\S*)px/)[1]
        return Number(position)
      } else {
        return this.index * -1 * this.width + this.crevice * this.padding / 2
      }
    },
    preventDefault (e) {
      e.preventDefault()
    },
    move (type) {
      this.slideing = false
      this.dom.transition = type === 'touch' ? '250ms' : this.duration + 'ms'
      this.dom.webkitTransition = type === 'touch' ? '250ms' : this.duration + 'ms'

      this.setTranslate(this.index * -1 * this.width)
      this.moveX = 0
      this.startX = -1 // 保证下次重新赋值
      this.autoPlay && this.infinite && this.setTime()
      let timeDuration = type === 'touch' ? '250' : this.duration
      this.infinite && setTimeout(() => {
        this.dom.transition = '0s'
        this.dom.webkitTransition = '0s'
        if (this.index === this.list.length - this.crevice - 1) {
          this.index = this.crevice + 1
          this.setTranslate(this.index * -1 * this.width)
        }
        if (this.index === +this.crevice) {
          this.index = this.list.length - this.crevice - 2
          this.setTranslate(this.index * -1 * this.width)
        }
        this.auto = true
        this.slideing = true
      }, timeDuration)
      if (!this.infinite) {
        this.auto = true
        this.slideing = true
      }
    },
    setTime () { // 设置轮询定时器
      this.timer1 = window.setTimeout(() => {
        if (this.auto) {
          this.index++
          this.move()
        } else {
          window.clearTimeout(this.timer1)
        }
      }, this.delayed)
    },
    clearTimeOut () { // 取消轮询定时器
      this.auto = false
      window.clearTimeout(this.timer1)
    }
  },
  activated () {
    this.autoPlay && this.infinite && this.setTime()
  },
  deactivated () {
    window.clearTimeout(this.timer1)
  },
  beforeDestroy () {
    window.clearTimeout(this.timer1)
  }
}
</script>

<style>
  .carousel_cpmponent {
    width: 100%;
    height: 100%;
  }
  .carousel_content {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .carousel_swiper {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    transition-duration: 0s linear;
  }
  .carousel_indicator {
    position: absolute;
    bottom: 8px;
    width: 100%;
    text-align: center;
    background: 0 0;
    z-index: 1;
  }
  .carousel-indicator-item {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 1px 7px;
    cursor: pointer;
    border-radius: 100%;
    background: #aaa;
  }
  .carousel_swiper_item {
    width: 100%;
    height: 100%;
  }

</style>

