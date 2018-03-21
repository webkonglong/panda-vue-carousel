## panda-vue-carousel

*   基于 Vue2.0 开发，基本满足大部分功能
*   轻量、高性能轮播插件。目前支持 无缝衔接自动轮播、无限轮播、手势轮播等

## demo

```javascript
git clone https://github.com/webkonglong/panda-vue-carousel.git
cd panda-vue-carousel
npm install

更改根目录webpack.config.js第5行第6行
注视第5行(entry: './src/lib/index.js',)
打开第六行(entry: './src/main.js',)
npm run dev
```


🎉 觉得好用给一个 star 哦~ 🎉

## Install

```javascript
npm install panda-vue-carousel --save

## Usage

```javascript
import Carousel from 'panda-vue-carousel';

components: { Carousel }

//异步加载轮播图的情况 props.data是你数组里面的每一个对象
<Carousel :data="list" v-if="list.length">
  <img class="step-1" slot-scope="props" :src="props.data.src" alt="" />
</Carousel>
```

## API

| 属性          | 说明                                     | 默认 |
| ------------- | --------------------------------------- | ----|
| autoPlay      | 是否自动轮播                              | true |
| data          | list数据                                 |     |
| delayed       | 每两次隔多久滚动一次                        | 2500 |
| duration      | 每次滚动一页需要多久时间                    | 500  |
| infinite      |  是否可以无限轮播                          | true |
| padding       | 每一条数据的宽度 =  页面整体宽度 - 此项设置    |   0 |
| margin        | 每一条数据中间的间距                        |  0 |



## Other

*   可以通过覆盖我的样式进行自定义样式
*   如果其他问题可以邮箱沟通，anmingzhe@me.com;
