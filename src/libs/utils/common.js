import parse from './parse'
import roundNumber from './roundNumber'

let util = {}
/**
 * * @description
 * Determines if a reference is a `String`.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `String`.
 */
util.isString = function (value) {
  return typeof value === 'string'
}

util.isNumber = function (value) {
  return typeof value === 'number'
}

/**
 *
 * @description
 * Determines if a reference is undefined.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is undefined.
 */
util.isUndefined = function (value) {
  return typeof value === 'undefined'
}

util.isEmpty = function (value) {
  return util.isUndefined(value) || value === '' || value === null
}
util.parse = parse

util.roundNumber = roundNumber
/**
 * Checks if `obj` is a window object.
 *
 * @private
 * @param {*} obj Object to check
 * @returns {boolean} True if `obj` is a window obj.
 */
util.isWindow = function (obj) {
  return obj && obj.window === obj
}
/**
 * @description
 * Deserializes a JSON string.
 *
 * @param {string} json JSON string to deserialize.
 * @returns {Object|Array|string|number} Deserialized JSON string.
 */
util.fromJson = function (json) {
  return util.isString(json) ? JSON.parse(json) : json
}

function toJsonReplacer(key, value) {
  var val = value

  if (typeof key === 'string' && key.charAt(0) === '$' && key.charAt(1) === '$') {
    val = undefined
  } else if (util.isWindow(value)) {
    val = '$WINDOW'
  } else if (value && document === value) {
    val = '$DOCUMENT'
  }

  return val
}
/**
 * @ngdoc function
 * @name angular.toJson
 * @module ng
 * @kind function
 *
 * @description
 * Serializes input into a JSON-formatted string. Properties with leading $$ characters will be
 * stripped since angular uses this notation internally.
 *
 * @param {Object|Array|Date|string|number} obj Input to be serialized into JSON.
 * @param {boolean|number=} pretty If set to true, the JSON output will contain newlines and whitespace.
 *    If set to an integer, the JSON output will contain that many spaces per indentation (the default is 2).
 * @returns {string|undefined} JSON-ified string representing `obj`.
 */
util.toJson = function (obj, pretty) {
  if (typeof obj === 'undefined') return undefined
  if (!util.isNumber(pretty)) {
    pretty = pretty ? 2 : null
  }
  return JSON.stringify(obj, toJsonReplacer, pretty)
}

export default util
