import util from './common'

/**
 * Format a number into a string
 * @param  {number} number       The number to format
 * @param  {{
 *           minFrac, // the minimum number of digits required in the fraction part of the number
 *           maxFrac, // the maximum number of digits required in the fraction part of the number
 *           gSize,   // number of digits in each group of separated digits
 *           lgSize,  // number of digits in the last group of digits before the decimal separator
 *           negPre,  // the string to go in front of a negative number (e.g. `-` or `(`))
 *           posPre,  // the string to go in front of a positive number
 *           negSuf,  // the string to go after a negative number (e.g. `)`)
 *           posSuf   // the string to go after a positive number
 *         }} pattern
 * @param  {string} groupSep     The string to separate groups of number (e.g. `,`)
 * @param  {string} decimalSep   The string to act as the decimal separator (e.g. `.`)
 * @param  {[type]} fractionSize The size of the fractional part of the number
 * @return {string}              The number formatted as a string
 */
let formatNumber = function (number, pattern, groupSep, decimalSep, fractionSize) {
  if (!(util.isString(number) || util.isNumber(number)) || isNaN(number)) return ''

  var isInfinity = !isFinite(number)
  var isZero = false
  var numStr = Math.abs(number) + ''
  var formattedText = ''
  var parsedNumber

  if (isInfinity) {
    formattedText = '\u221e'
  } else {
    parsedNumber = util.parse(numStr)

    util.roundNumber(parsedNumber, fractionSize, pattern.minFrac, pattern.maxFrac)

    var digits = parsedNumber.d
    var integerLen = parsedNumber.i
    var exponent = parsedNumber.e
    var decimals = []
    isZero = digits.reduce(function (isZero, d) {
      return isZero && !d
    }, true)

    // pad zeros for small numbers
    while (integerLen < 0) {
      digits.unshift(0)
      integerLen++
    }

    // extract decimals digits
    if (integerLen > 0) {
      decimals = digits.splice(integerLen, digits.length)
    } else {
      decimals = digits
      digits = [0]
    }

    // format the integer digits with grouping separators
    var groups = []
    if (digits.length >= pattern.lgSize) {
      groups.unshift(digits.splice(-pattern.lgSize, digits.length).join(''))
    }
    while (digits.length > pattern.gSize) {
      groups.unshift(digits.splice(-pattern.gSize, digits.length).join(''))
    }
    if (digits.length) {
      groups.unshift(digits.join(''))
    }
    formattedText = groups.join(groupSep)

    // append the decimal digits
    if (decimals.length) {
      formattedText += decimalSep + decimals.join('')
    }

    if (exponent) {
      formattedText += 'e+' + exponent
    }
  }
  if (number < 0 && !isZero) {
    return pattern.negPre + formattedText + pattern.negSuf
  } else {
    return pattern.posPre + formattedText + pattern.posSuf
  }
}
export default formatNumber
