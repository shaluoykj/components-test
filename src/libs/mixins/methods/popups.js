
function Alert(options, cb) {
  let title = '温馨提示'
  let content = ''
  if (typeof options === 'object') {
    title = options.title || '温馨提示'
    content = options.content
  } else if (typeof options === 'string') {
    content = options
  }
  this.$alert(content, title, {
    confirmButtonText: '确定',
    callback: action => {
      if (cb && typeof cb === 'function') {
        cb()
      }
    }
  })
}

export default {
  Alert: Alert
  // Confirm: Confirm
}
