
// vx2.0的一些常用方法封装
import common from './common'

// vx2.0中格式化数字
import formatNumber from './formatNumber'

// 框架的公共方法
import util from './util'
import dateUtil from './dateUtil'
export default {
  formatNumber,
  ...common,
  ...util,
  ...dateUtil
}
