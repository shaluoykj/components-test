// 给sessionStorage存值
function setContextData(key, value) {
  if (typeof value === 'string') {
    sessionStorage.setItem(key, value)
  } else {
    sessionStorage.setItem(key, JSON.stringify(value))
  }
}

// 从sessionStorege取值
function getContextData(key) {
  const str = sessionStorage.getItem(key)
  if (typeof str === 'string') {
    try {
      return JSON.parse(str)
    } catch (e) {
      return str
    }
  }
}

export default {
  setContextData: setContextData,
  getContextData: getContextData
}
