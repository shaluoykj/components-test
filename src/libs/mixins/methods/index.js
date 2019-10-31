// 本地存储sessionStorage
import storage from './storage'

// 路由
import router from './router'

// URI加解密
import uri from './uri'

// 弹窗
import popups from './popups'

const methods = {
  ...storage,
  ...router,
  ...uri,
  ...popups,
  /**
   * 模拟markdown锚点
   * @params {String} id 锚点ID
   * @params {HTMLElement} scrollContainer 滚动容器 默认值: window
   */
  jump: function (id, scrollContainer) {
    var returnEle = document.querySelector('#' + id)
    if (returnEle) {
      // 由于是自定义固定导航，所以滚动的位置需要减去header的高度
      let headerHeight = document.documentElement.style.fontSize.split('px')[0] * 1
      scrollContainer ? scrollContainer.scrollTo(0, returnEle.offsetTop - 10)
        : window.scrollTo(0, returnEle.offsetTop - headerHeight - 10)
    }
  }
}

export default methods
