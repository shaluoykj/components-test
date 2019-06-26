// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import App from './App'
import router from './demo/router'
import mixin from '../utils/mixins.js'
import '../utils/filter.js'
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