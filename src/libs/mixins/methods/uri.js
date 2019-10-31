import util from '@/libs/utils'

// 对地址栏数据进行解密
function getDecodeURI(obj) {
  return util.fromJson(decodeURIComponent(obj))
}
// 对地址栏数据进行加密
function setEncodeURI(obj) {
  return encodeURIComponent(util.toJson(obj))
}

export default {
  setEncodeURI: setEncodeURI,
  getDecodeURI: getDecodeURI
}
