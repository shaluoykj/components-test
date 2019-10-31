import Vue from 'vue'

// 混入全局服务
import { $locale, $os } from '@/libs/mixins/service'

// 混入全局方法
import methods from './methods'

// 定义全局过滤器
import './filter'

Vue.mixin({
  data() {
    return {
      // 判断浏览器
      $os: $os
    }
  },
  methods: {
    // 相当于定义全局方法
    $field: function (key) {
      return $locale.FIELDS[key]
    },
    $msg: function (key) {
      return $locale.MESSAGES[key]
    },
    $filter: function (key) {
      return this.$options.filters[key]
    },

    // 重新获得验证码图片
    switchCode(verifyid) {
      document.getElementById(verifyid).setAttribute('src', 'eweb-common.GenTokenImg.do?timestrap=' + Date.now())
    },

    // 获得防重复提交token
    getToken: function (callback) {
      // 获得token
      this.$axios.post('eweb-common.SingleGetToken.do', {}).then(function (data) {
        // 成功后执行回调函数
        if (callback && typeof callback === 'function') {
          callback(data)
        }
      })
    },
    ...methods
  }
})
