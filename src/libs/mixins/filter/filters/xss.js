/**
 * 对<过滤为&lt; >过滤为&gt;
 *
 */
const xss = function (value) {
  if (!value) return ''
  value = value.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return value
}

let filterObj = {}
filterObj.xss = xss

export default filterObj
