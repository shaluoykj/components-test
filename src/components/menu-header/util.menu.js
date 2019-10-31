import { uniqueId } from 'lodash'

// 创建 el-menu-item
export function elMenuItem(createElement, menu, hasId) {
  return createElement('el-menu-item', {
    props: { index: menu.path || uniqueId('ui-menu-empty-') },
    key: menu.path,
    class: { 'demo-menu-js': hasId },
    attrs: {
      id: hasId ? menu.path.replace(/\//, '').replace(/\//, '-') : uniqueId('ui-menu-id-empty-')
    }
  }, [
    ...menu.icon ? [
      createElement('i', { attrs: { class: `fa fa-${menu.icon}` } })
    ] : [],
    ...menu.icon === undefined & !menu.iconSvg ? [
      createElement('i', { attrs: { class: 'fa fa-file-o' } })
    ] : [],
    ...menu.iconSvg ? [
      createElement('ui-icon-svg', { props: { name: menu.iconSvg } })
    ] : [],
    createElement('span', { slot: 'title', class: { 'menu-badge': !!menu.badge }, attrs: { 'data-badge': menu.badge } }, menu.title || this.$t('layout.header-aside.menu-item.label-default'))
  ])
}

// 创建 el-submenu
export function elSubmenu(createElement, menu) {
  return createElement('el-submenu', { props: { index: menu.path || uniqueId('ui-menu-empty-') }, key: menu.path }, [
    ...menu.icon ? [
      createElement('i', { slot: 'title', attrs: { class: `fa fa-${menu.icon}` } })
    ] : [],
    ...menu.icon === undefined & !menu.iconSvg ? [
      createElement('i', { slot: 'title', attrs: { class: 'fa fa-file-o' } })
    ] : [],
    ...menu.iconSvg ? [
      createElement('ui-icon-svg', { slot: 'title', props: { name: menu.iconSvg } })
    ] : [],
    createElement('span', { slot: 'title', class: { 'menu-badge': !!menu.badge }, attrs: { 'data-badge': menu.badge } }, menu.title || this.$t('layout.header-aside.menu-item.label-default')),
    ...menu.children.map((child, childIndex) => (child.children === undefined ? elMenuItem : elSubmenu).call(this, createElement, child))
  ])
}
