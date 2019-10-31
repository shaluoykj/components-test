// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import VConsole from 'vconsole'

import App from './App'
import router from './demo/router'
import mixin from '../utils/mixins.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//import '../public/ueditor/ueditor.config.js';
////	import '../../public/ueditor/ueditor.all.js';
//	import '../public/ueditor/ueditor.all.min.js';
//	import '../public/ueditor/lang/zh-cn/zh-cn.js';
//	import '../public/ueditor/ueditor.parse.min.js';
//	import '../public/ueditor/themes/default/css/ueditor.css'
import '../utils/filter.js'
const vConsole = new VConsole();
Vue.mixin(mixin);
Vue.config.productionTip = false;
axios.interceptors.request.use((config) => {	
	if(config.method === 'post') {
		config.headers['Content-Type'] = 'application/json; charset=UTF-8';
		config.transformRequest = [function(data, headers) {
			console.error(data);
			return qs.stringify(data);
		}];
	}
	return config;
}, (err) => {
	return Promise.reject(err);
});
Vue.use(ElementUI);
Vue.prototype.axios = axios;
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})