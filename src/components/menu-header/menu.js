import util from '@/libs/utils/util.js'
export default {
  methods: {
    handleMenuSelect(index, indexPath) {
      if (/^ui-menu-empty-\d+$/.test(index) || index === undefined) {
        this.$message.warning(this.$t('layout.header-aside.message.warning.temporary-menu'))
      } else if (/^https:\/\/|http:\/\//.test(index)) {
        util.open(index)
      } else {
        /**
         * [fix] 点击当前选中菜单时页面不刷新bug
         * 方法
         *    1. 先跳转到一个特定的Redirect页面
         *    2. 再跳回当前页面
         * @date 2019-10-25 10:30:31
         * @autor jinbin
         */
        if (this.$route.path === index) {
          this.$router.replace({
            path: '/blank'
          }).then(() => {
            this.$router.replace(index)
          })
        } else {
          this.$router.push({
            path: index
          })
        }
      }
    }
  }
}
