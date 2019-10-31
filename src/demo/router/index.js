	import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import {homeTest} from './homeTest'
Vue.use(Router)


const showRouter= new Router({
	routes: [{
		path: '/HelloWorld',
		name: 'HelloWorld',
		component: HelloWorld
	}, {
		path: '/sassTest',
		name: 'sassTest',
		meta: {
			title: 'sass'
		},
		component: () =>
			import('@/views/sass-test')
	}, {
		path: '/',
		name: 'home',
		meta: {
			title: '首页'
		},
		component: () =>
			import('@/views/home')
	}, {
		path: '/checkParams',
		name: 'checkParams',
		meta: {
			title: '参数校验'
		},
		component: () =>
			import('@/demo/checkParams')
	}, {
		path: '/axios',
		name: 'axios',
		meta: {
			title: 'axios'
		},
		component: () =>
			import('@/demo/axios')
	}, ...(homeTest), ]
});
showRouter.afterEach((to)=>{
	const path=(to.path || '').replace(/^\//,'');
	document.body.setAttribute('data-root',path.split('/').join('-'));
//	WeixinJSBridge.call('hideOptionMenu');
//	hideOptionMenu();
})
function hideOptionMenu(){
	if (typeof WeixinJSBridge == "undefined") {
	    if (document.addEventListener) {
	        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	    } else if (document.attachEvent) {
	        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
	        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	    }
	} else {
	    onBridgeReady();
	}
}
function onBridgeReady() {
	    WeixinJSBridge.call('hideOptionMenu');
	}
export default showRouter;