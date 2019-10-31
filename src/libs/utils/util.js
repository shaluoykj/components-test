import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'

const util = {
  cookies,
  db,
  log
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = process.env.VUE_APP_TITLE || 'VXAdmin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'vxadmin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('vxadmin-link-temp'))
}
/**
 * @param {Array} Tree
 */

util.traversalTree = function (list, callback, childrenKey = 'children') {
  if (!list && !Array.isArray(list)) {
    throw new Error('required an Array.')
  }
  for (const item of list) {
    const children = item.children
    if (children) {
      util.traversalTree(children, callback)
    }
    const isBreak = callback(item)
    if (isBreak) {
      break
    }
  }
}
export default util
