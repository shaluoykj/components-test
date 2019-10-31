import Vue from 'vue'
// 配置哪些过滤器为局部过滤器
import config from '@/libs/mixins/config'

const filters = config.filters
const files = require.context('./filters', true, /\.js$/)

files.keys().forEach(key => {
  let obj = files(key).default
  Object.keys(obj).forEach(name => {
    // 判断全局过滤器则进行全局注册，
    for (let index = 0; index < filters.length; index++) {
      const element = filters[index]
      if (element === name) {
        Vue.filter(name, obj[name])
        break
      }
    }
  })
})
