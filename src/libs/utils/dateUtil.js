/**
 * @author wanglanglang
 * 日期相关工具
 * */
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
let dateUtil = {}
dateUtil.dayjs = dayjs
/**
 * 要返回的提示信息
 */

dateUtil.flagStr = ''

/**
 * 判断是否日期格式
 * @author wanglanglang
 * @param  {[type]} dateString [传入的要解析的日期参数，类型可为string | number | Date | Dayjs]
 * @param  format   [传入的自定义日期解析格式， 可不传, 例如'YYYY-MM-DD']
 * @return {Boolean} 如果传入的参数为dayjs可以解析的合法参数，返回true，否则，为false
 */
dateUtil.isDateString = function (dateString, format) {
  if (arguments.length > 0) {
    return dateUtil.dayjs(dateString, format).isValid()
  }
}
/**
 * 判断日期区间是否合法(后两个参数不传时，默认判断的是传入的两个日期参数区间是否为3个月)
 * @author wanglanglang
 * @param  {[type]}  startDate [起始时间，类型可为string | number | Date | Dayjs]
 * @param  {[type]}  endDate   [结束时间，类型可为string | number | Date | Dayjs]
 * @param  {[type]}  interval  [月份限制，类型为number类型,可不传，默认为3 两个日期超过这个限制则返回false]
 * @param  {[type]}  type      [差值单位，可不传，默认为月， 参数类型有 day|天，month|月，year|年，second|秒,minute|分,millisecond|毫秒]
 * @param  {[Boolean]}  bool   [类型为Boolean类型，在比较日期区间是否合法时，是否要求开始时间小于结束时间，可不传，默认true需要，也可传值false， 值为false时，只要两日期差值在要求区间内就会返回true]
 * @return {Boolean}           [结果]
 */
dateUtil.isCorrectDateInterval = function (startDate, endDate, interval, type, bool) {
  if (arguments.length >= 2) {
    if (startDate === undefined) {
      this.flagStr = '开始日期不能为空!'
      throw new Error('dateUtil.isCorrectDateInterval() invalid parameter')
    } else if (endDate === undefined) {
      this.flagStr = '结束日期不能为空!'
      throw new Error('dateUtil.isCorrectDateInterval() invalid parameter')
    }
    var intervalMonth = 3
    var intervalType = 'month'
    var intervalBool = true
    if (interval !== undefined && interval !== '') {
      try {
        intervalMonth = Number(interval)
        if (isNaN(intervalMonth)) {
          this.flagStr = '间隔日期不能解析!'
          throw new Error('dateUtil.isCorrectDateInterval() invalid parameter')
        }
        if (intervalMonth <= 0) {
          this.flagStr = '间隔日期值必须大于0！'
          throw new Error('dateUtil.isCorrectDateInterval() invalid parameter')
        }
      } catch (err) {
        this.flagStr = '间隔日期不能解析'
        throw new Error('dateUtil.isCorrectDateInterval() invalid parameter')
      }
    }
    if (this.isDateString(startDate) === false) {
      this.flagStr = '开始时间格式错误，请重新输入！'
      throw new Error('dateUtil.isCorrectDateInterval() invalid parameter')
    } else if (this.isDateString(endDate) === false) {
      this.flagStr = '结束时间格式错误，请重新输入！'
      throw new Error('dateUtil.isCorrectDateInterval() invalid parameter')
    }
    if (type !== undefined && type !== '') {
      intervalType = type
      var typeList = ['day', 'month', 'year', 'second', 'minute', 'millisecond']
      if (!(typeList.toString().indexOf(intervalType) > -1)) {
        this.flagStr = '间隔日期单位不能解析'
        throw new Error('dateUtil.isCorrectDateInterval() invalid parameter')
      }
    }
    if (bool !== undefined) {
      intervalBool = bool
    }
    if (intervalBool) {
      if (!dateUtil.isBefore(startDate, endDate)) {
        this.flagStr = '开始日期不能大于结束时间'
        throw new Error('dateUtil.isCorrectDateInterval() invalid parameter')
      }
    }
    var realInterval = Math.abs(dateUtil.dayjs(startDate).diff(dateUtil.dayjs(endDate), intervalType, true))
    if (realInterval < Math.abs(intervalMonth)) {
      return true
    } else {
      return false
    }
  } else {
    this.flagStr = '参数传递不对！'
    throw new Error('dateUtil.isCorrectDateInterval() invalid parameter')
  }
}

/**
 * 获得错误原因
 * @author wanglanglang
 * @return {string} 返回校验错误的原因
 */
dateUtil.getErrorReason = function () {
  return this.flagStr
}

/**
 * 比较一个日期是否比另一个时间早
 * @author wanglanglang
 * @param  startDate [传入的要解析的日期参数，类型可为string | number | Date | Dayjs]
 * @param  endDate   [传入的要解析的日期参数，类型可为string | number | Date | Dayjs]
 * @return {Boolean} 返回校验值
 */
dateUtil.isBefore = function (startDate, endDate) {
  if (dateUtil.isDateString(startDate) && dateUtil.isDateString(startDate)) {
    return dateUtil.dayjs(startDate).isBefore(dateUtil.dayjs(endDate))
  } else {
    this.flagStr = '参数传递不对！'
    throw new Error('dateUtil.isBefore() invalid parameter')
  }
}

/**
 * 可对日期进行格式化并返回，如果三个参数全为空，则返回当前日期对象(Date对象)，如果设置了rf，则返回以rf为标准格式的日期数据
 * @author wanglanglang
 * @param  t [传入的要解析的日期参数，类型可为string | number | Date | Dayjs,可不传，不传的返回当前时间对象]
 * @param  f [传入的自定义日期解析格式， 可不传]
 * @param  rf [设置方法返回日期对象的格式,可不传， 不传的话默认返回一个date对象，如果传了的话，返回值变为对应的格式,例如'YYYY-MM-DD']
 * @return  [ 方法返回的日期对象]
 */
dateUtil.getDate = function (t, f, rf) {
  if (!t) {
    if (!rf) {
      return new Date()
    } else {
      return dateUtil.dayjs(new Date()).format(rf)
    }
  }
  if (dateUtil.dayjs(t, f).isValid()) {
    if (!rf) {
      return dateUtil.dayjs(t, f).toDate()
    } else {
      return dateUtil.dayjs(t, f).format(rf)
    }
  } else if (!(dateUtil.dayjs(t, f).isValid())) {
    this.flagStr = '传入参数有误，请重新输入！'
    throw new Error('DateUtil.getDate() invalid parameter')
  }
}

/**
 * 计算某一时间偏移后的时间
 * @author wanglanglang
 * @param  {[type]} num          [偏移量,可不传，默认为天,向后偏移不需要加'+'号，例如向后偏移300天可传'300d',向前偏移请加'-'号，例如向前偏移300天可传'-300d', y|年，M|月，w|周，d|天，h|小时，m|分钟，s|秒，ms|毫秒]
 * @param  {[type]} standardDate [起始时间 ,可不传，不传的话默认基于当前日期进行日期偏移]
 * @param  {[type]} format       [返回值的格式，可不传，不传时默认为YYYY-MM-DD ]
 * @return {[type]}              返回时间
 */
dateUtil.changeDate = function (num, standardDate, format) {
  format = format || 'YYYY-MM-DD'
  if (num && !standardDate) {
    var group = num.match(/(-?\d+)([yMwdhms]s?)/)
    var value = parseInt(group[1], 10)
    var type = group[2]
    if (value.toString().indexOf('-') > -1) {
      if (format && format !== undefined && format !== '') {
        return dayjs(new Date()).subtract(value.toString().substring(1), type).format(format)
      } else {
        return dayjs(new Date()).subtract(value.toString().substring(1), type)
      }
    } else {
      if (format && format !== undefined && format !== '') {
        return dayjs(new Date()).add(value, type).format(format)
      } else {
        return dayjs(new Date()).add(value, type)
      }
    }
  } else if (num && standardDate) {
    var group2 = num.match(/(-?\d+)([yMwdhms]s?)/)
    var value2 = parseInt(group2[1], 10)
    var type2 = group2[2]
    var returnVal
    if (!dayjs(standardDate).isValid()) {
      throw new Error('getRealDate() invalid parameter')
    } else {
      if (value2.toString().indexOf('-') > -1) {
        if (format && format !== undefined && format !== '') {
          returnVal = dayjs(standardDate).subtract(value2.toString().substring(1), type2).format(format)
        } else {
          returnVal = dayjs(standardDate).subtract(value2.toString().substring(1), type2)
        }
        return returnVal
      } else {
        if (format && format !== undefined && format !== '') {
          returnVal = dayjs(standardDate).add(value2, type2).format(format)
        } else {
          returnVal = dayjs(standardDate).add(value2, type2)
        }
        return returnVal
      }
    }
  } else {
    if (format && format !== undefined && format !== '') {
      return dateUtil.dayjs(new Date()).format(format)
    } else {
      return dateUtil.dayjs(new Date())
    }
  }
}

/**
 * 计算两个日期之间的相差日期
 * @author wanglanglang
 * @param  {[type]} beginDate [起始时间,类型可为string | number | Date | Dayjs]
 * @param  {[type]} endDate   [结束时间,类型可为string | number | Date | Dayjs]
 * @param  {[type]} unit      [两个日期相差日期的计算单位，可不传，默认为天，  day|天，month|月，year|年，second|秒,minute|分,millisecond|毫秒]
 * @param  {[type]} bool      [差值是否保留小数，默认false取整，为true时保留小数 ]
 * @param  {[return]}         []
 */
dateUtil.daysBetween = function (beginDate, endDate, unit, bool) {
  if (!beginDate || !endDate) {
    this.flagStr = '传入参数有误，请重新输入！'
    throw new Error('DateUtil.daysBetween() invalid parameter')
  }
  function getRealDate(t) {
    if (dateUtil.dayjs(t).isValid()) {
      return dateUtil.dayjs(t)
    } else if (!(dateUtil.dayjs(t).isValid())) {
      dateUtil.flagStr = '传入参数有误，请重新输入！'
      throw new Error('getRealDate() invalid parameter')
    }
  }
  var defaultUnit = 'day'
  if (unit) {
    defaultUnit = unit
  }
  var difference = getRealDate(beginDate).diff(getRealDate(endDate), defaultUnit, bool)
  return difference
}
export default dateUtil
