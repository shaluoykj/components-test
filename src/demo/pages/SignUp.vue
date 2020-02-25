<template>
	<div class="login">
		密码
	</div>
</template>
<script>
	export default {
		name: 'SignUp',
		data() {
			return {
				routeParams: {

				}
			}
		},
		created() {
			this.getParams();
		},
		methods: {
			testMethod() {
				let params = {
					name: '测试',
					username: 'afsadasf..///',
					password: '2323',
					test4: '>=='
				};
				// 加密后的参数,先变json,然后encodeURI，主要针对参数中有中文时
				let encyptParams = window.btoa(window.encodeURI(JSON.stringify(params)));
				// 解密
				console.error('加密后', encyptParams);
				let oldPrams = window.atob(encyptParams);
				// 解密后decodeURI，去掉参数序列化时的符号
				let newParams = window.decodeURI(oldPrams);
				let paramsObj = JSON.parse(newParams)
				console.error('解密后，解析成对象', paramsObj);
				console.error('取对象的属性值username', paramsObj.username);
				console.error('取对象的属性值password', paramsObj.password);
			},
			getParams() {
				debugger
				let info = this.$route.query.info
				var oldParams=window.atob(info);
				var newParams = window.decodeURI(oldParams);
				var paramsObj = JSON.parse(newParams)
				console.error('解密后，解析成对象', paramsObj);
				console.error('取对象的属性值name', paramsObj.name);
			}
		}
	}
</script>
<style scoped>
	.login-form-layout {
		/*position: absolute;*/
		/*left: 0;*/
		/*right: 0;*/
		width: 360px;
		margin: 100px auto 500px auto;
		border-top: 10px solid #409EFF;
	}
</style>