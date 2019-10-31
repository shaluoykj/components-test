let navigator = window.navigator
export default {
  webkit: !!navigator.userAgent.match(/WebKit\/([\d.]+)/),
  android: !!(navigator.userAgent.match(/(Android)\s+([\d.]+)/) || navigator.userAgent.match(/Silk-Accelerated/)),
  androidICS: !!(window.android && navigator.userAgent.match(/(Android)\s4/)),
  ipad: !!navigator.userAgent.match(/(iPad).*OS\s([\d_]+)/),
  iphone: !!(!(navigator.userAgent.match(/(iPad).*OS\s([\d_]+)/)) && navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/)),
  ios: (!!navigator.userAgent.match(/(iPad).*OS\s([\d_]+)/)) || (!!(!(navigator.userAgent.match(/(iPad).*OS\s([\d_]+)/)) && navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/))),
  ios5: (!!navigator.userAgent.match(/(iPad).*OS\s([5_]+)/)) || (!!(!(navigator.userAgent.match(/(iPad).*OS\s([5_]+)/)) && navigator.userAgent.match(/(iPhone\sOS)\s([5_]+)/))),
  wphone: !!navigator.userAgent.match(/Windows Phone/i),
  firefox: !!navigator.userAgent.match(/Firefox/i),
  isWin: (navigator.platform == 'Win32') || (navigator.platform == 'Windows'),
  isMac: (navigator.platform == 'Mac68K') || (navigator.platform == 'MacPPC') || (navigator.platform == 'Macintosh') || (navigator.platform == 'MacIntel')
}
