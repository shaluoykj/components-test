const homeTest = [{
	path: '/industry',
	name: 'industry',
	meta: {
		title: '行业'
	},
	component: () =>
		import('@/demo/industry')
},{
	path: '/ueditor',
	name: 'ueditor',
	meta: {
		title: '行业'
	},
	component: () =>
		import('@/demo/ueditor')
},{
	path: '/password',
	name: 'password',
	meta: {
		title: '密码控件'
	},
	component: () =>
		import('@/demo/password')
},{
	path: '/iframe',
	name: 'iframe',
	meta: {
		title: 'iframe'
	},
	component: () =>
		import('@/demo/iframe')
},{
	path: '/electronicaccount',
	name: 'electronicaccount',
	meta: {
		title: 'electronicaccount'
	},
	component: () =>
		import('@/demo/electronicaccount')
},{
	path: '/wangEditor',
	name: 'wangEditor',
	meta: {
		title: 'wangEditor'
	},
	component: () =>
		import('@/demo/wangEditor')
},{
	path: '/wangEditor',
	name: 'wangEditor',
	meta: {
		title: 'wangEditor'
	},
	component: () =>
		import('@/demo/wangEditor')
},{
	path: '/address',
	name: 'address',
	meta: {
		title: 'address'
	},
	component: () =>
		import('@/demo/address')
},{
	path: '/websocket',
	name: 'websocket',
	meta: {
		title: 'websocket'
	},
	component: () =>
		import('@/demo/websocket')
},{
	path: '/headerTest',
	name: 'headerTest',
	meta: {
		title: 'headerTest'
	},
	component: () =>
		import('@/demo/headerTest')
}];
export {
	homeTest,
};