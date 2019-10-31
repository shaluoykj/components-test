import CC2PY from 'public/script/pinyin'
/**
 * 通过拼音过滤数据
 *
 */
const filterPinyinFilter = function (inputArray, key, value) {
  if (!inputArray) return ''
  // 定义返回的新数组；
  var array = []

  if (value === undefined || value === null) {
    // 当过滤条件为空的时候返回全部的内容；
    return inputArray
  } else {
    for (var i = 0; i < inputArray.length; i++) {
      var temp = inputArray[i]
      if (temp[key].indexOf(value) !== -1) {
        // 过滤第一个字段，如果不符合条件则判断第二个字段
        array.push(temp)
      } else {
        if (window.CC2PY && /^[A-z]+$/.test(value)) {
          var pinyin = CC2PY(temp[key])
          var pinyinStr = pinyin[0]
          if (pinyinStr.indexOf(value.toUpperCase()) === 0) {
            array.push(temp)
          }
        }
      }
    }
    return array
  }
}
let filterObj = {}
filterObj.pinyin = filterPinyinFilter

export default filterObj
