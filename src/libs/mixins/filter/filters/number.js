import formatNumber from '@/libs/utils/formatNumber'
import formats from '@/libs/utils/formats'

/***
 * 格式化金额，三位一逗号
 * @number 需要格式化的金额
 * @fractionSize 保留的小数位数，默认0
 * 例如保留2位小数： {{ "123456.6"|number(2) }} ==> 123，456.60
 */
const numberFilter = function (number, fractionSize = 0) {
  // if null or undefined pass it through
  return (number == null)
    ? number
    : formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP,
      fractionSize)
}

let filterObj = {}
filterObj.number = numberFilter

export default filterObj
