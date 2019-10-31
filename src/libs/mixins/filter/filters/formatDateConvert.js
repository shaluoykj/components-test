/**
 *日期yyyyMMdd转换成yyyy-MM-dd
 */
import util from '@/libs/utils'

const dateConvertFilter = function (input) {
  if (input !== undefined) {
    let date = util.isDateString(input)
    // 如果不是日期字符串则返回''
    if (!date) {
      return ''
    }
    /**
     * 日期 20191021 格式化时输出 yyyy-10-dd
     * 解决方式:
     * 将 util.getDate(input, null, 'yyyy-MM-dd')
     * 改为 util.getDate(input, null, 'YYYY-MM-DD')
     * 时间 2019年10月21日
     * jinbin@csii.com.cn
     */
    return util.getDate(input, null, 'YYYY-MM-DD')
  }
  return input
}

let filterObj = {}
filterObj.formatDateConvert = dateConvertFilter

export default filterObj
