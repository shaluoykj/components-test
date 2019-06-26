import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/industry',
		name: 'industry',
		meta:{
			title:'行业'
		},
		component: () =>
			import('@/demo/industry')
	} ,{
		path: '/HelloWorld',
		name: 'HelloWorld',
		component: HelloWorld
	}, {
		path: '/sassTest',
		name: 'sassTest',
		meta:{
			title:'sass'
		},
		component: () =>
			import('@/views/sass-test')
	}, {
		path: '/',
		name: 'home',
		meta:{
			title:'首页'
		},
		component: () =>
			import('@/views/home')
	}, {
		path: '/checkParams',
		name: 'checkParams',
		meta:{
			title:'参数校验'
		},
		component: () =>
			import('@/demo/checkParams')
	}, {
		path: '/axios',
		name: 'axios',
		meta:{
			title:'axios'
		},
		component: () =>
			import('@/demo/axios')
	}]
})