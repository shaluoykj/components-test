/**
 * 删除DOM对象指定类名
 *
 * @param {*} dom DOM对象
 * @param {*} className 需要删除的类名
 * @returns 返回DOM对象的类
 *
 * author lss
 */
function deleteClass(dom, className) {
  let classAttr = dom.getAttribute('class')
  let list = classAttr ? classAttr.split(' ') : []
  if (list.length == 0) {
    return ''
  }
  let index = list.indexOf(className)
  if (index > -1) {
    list.splice(index, 1)
  }
  return list.join(' ')
}

/**
 * 为DOM对象添加类
 *
 * @param {*} dom DOM对象
 * @param {*} className 需要添加的类名
 *
 * author lss
 */
function setClass(dom, className) {
  let classAttr = dom.getAttribute('class')
  let list = classAttr ? classAttr.split(' ') : []
  let index = list.indexOf(className)
  if (index < 0) {
    list.push(className)
  }
  dom.setAttribute('class', list.join(' '))
}

export default {
  setClass,
  deleteClass
}
