<template>
	<div>
		<div>
			<div v-for="router in routerList" @click="goto(router.path)" class="router-container">{{router.title}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				routerList: [{
						title: 'sass-test',
						path: 'sassTest'
					},
					{
						title: '行业选择',
						path: 'industry'
					},
					{
						title: '参数校验',
						path: 'checkParams'
					},
					{
						title: 'axios',
						path: 'axios'
					},{
						title: 'ueditor',
						path: 'ueditor'
					},{
						title: 'password',
						path: 'password'
					},{
						title: 'iframe',
						path: 'iframe'
					},{
						title: 'electronicaccount',
						path: 'electronicaccount'
					},{
						title: 'wangEditor',
						path: 'wangEditor'
					},{
						title: 'address',
						path: 'address'
					},{
						title: 'websocket',
						path: 'websocket'
					},{
						title: 'headerTest',
						path: 'headerTest'
					},
				]
			}
		},
		created: function() {},
		mounted: function() {
			console.log('test');
		},
		methods: {}
	}
</script>

<style scoped>
	.router-container {
		margin-top: 10px;
		font-size: 30px;
	}
</style>