import vue from 'rollup-plugin-vue2'
import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
const version = process.env.VERSION || require('../package.json').version

export default {
  entry: 'lib/index.js',
  dest: 'panda-vue-carousel.js',
  format: 'umd',
  moduleName: 'VuePathTab',

  plugins: [
    vue(),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    }),
    nodeResolve({
      browser: true,
      jsnext: true,
      main: true,
      preferBuiltins: false,
      extensions: [ '.js', '.vue' ]
    }),
    commonjs()
  ],
  banner: `/**
 * panda-vue-carousel v${version}
 * (c) ${new Date().getFullYear()} MAKEBANANA
 * mail: anmingzhe@me.com
 * @license MIT
 */`
}
