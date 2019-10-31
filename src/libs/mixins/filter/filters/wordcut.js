
/** 用法
 *  {{18234116049|wordcut(3, 4) ==> '182****6049'}}
 *  {{36222619930124067x|wordcut(0, 4) ==> '***************067x'}}
 */
const wordcutFilter = function (str, prefixlen, suffixlen) {
  if (str && typeof str === 'string') {
    prefixlen = prefixlen || 0
    suffixlen = suffixlen || 0
    if (str.length < prefixlen + suffixlen) {
      return Array(str.length + 1).join('*')
    } else {
      var prefixStr, suffixStr
      if (prefixlen > 0) {
        prefixStr = str.substring(0, prefixlen)
      } else {
        prefixStr = ''
      }
      if (suffixlen > 0) {
        suffixStr = str.substr(-1 * suffixlen)
      } else {
        suffixStr = ''
      }
      var middleStr = Array(str.length - prefixlen - suffixlen + 1).join('*')
      return prefixStr + middleStr + suffixStr
    }
  } else {
    return str
  }
}

let filterObj = {}
filterObj.wordcut = wordcutFilter

export default filterObj
