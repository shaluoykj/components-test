/**
 * 账户格式化，四位一空格
 *
 */
const accountNoFilter = function (value) {
  if (!value) return ''
  value = value.replace(/(.{4})/g, '$1 ')
  return value
}

let filterObj = {}
filterObj.formatAcNo = accountNoFilter

export default filterObj
