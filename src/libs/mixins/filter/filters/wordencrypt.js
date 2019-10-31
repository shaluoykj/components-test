
/** 用法
 *  {{18234116049|wordencrypt(3, 4) ==> '182 **** 6049'}}
 *  {{36222619930124067x|wordencrypt(0, 4) ==> '**** 067x'}}
 *  prefixlen 前缀的长度，默认0
 *  suffixlen 后缀的长度，默认0
 *  starLen 中间星的个数，默认4位一格
 *  gap 几个星一格，默认4位一格
 */
const wordencryptFilter = function (str, prefixlen = 0, suffixlen = 0, starLen = 4, gap = 4) {
  if (str && typeof str === 'string') {
    if (str.length < prefixlen + suffixlen) {
      return Array(str.length + 1).join('*')
    } else {
      var prefixStr, suffixStr

      // 截取长度为prefixlen的字符串
      if (prefixlen > 0) {
        prefixStr = str.substring(0, prefixlen)
      } else {
        prefixStr = ''
      }

      // 截取长度为suffixlen的字符串
      if (suffixlen > 0) {
        suffixStr = str.substr(-1 * suffixlen)
      } else {
        suffixStr = ''
      }

      let length = 1

      // 如果是gap的倍数，获得需要间隔的数量
      if (starLen % gap === 0) {
        // 取整
        length = Math.floor(starLen / gap)
      }
      // 获得加密的中间星，gap位一空格,
      let middleStrTemp = Array(gap + 1).join('*')

      // 组装中间的星，gap位一空格
      if (length >= 1) {
        for (let index = 0; index < length - 1; index++) {
          middleStrTemp += ' ' + Array(gap + 1).join('*')
        }
      }

      // 组装成前后空格，并返回格式化后的字符串
      var middleStr = (prefixlen === 0 ? '' : ' ') + middleStrTemp + ' '
      return prefixStr + middleStr + suffixStr
    }
  } else {
    return str
  }
}

let filterObj = {}
filterObj.wordencrypt = wordencryptFilter

export default filterObj
