<template id="mytest">
	<div class="container">
		<div class="back-container">
			<div class="back-icon" @click="goBack()"></div>
			<span class="back-content">返回</span>
		</div>
		<h1>{{headerContent}}</h1>
		<div class="more-container">
			<div class="more-icon" @click="more()"></div>
			<span class="more-content">更多</span>
		</div>
		<div @click="myMethod()" title="组件通信">组件通信</div>
	</div>
</template>

<script>
	export default{
		template:'#mytest',
		props:['headerContent','more','my-event'],
		created:function(){
		},
		data:function(){
			return {
				"message":'hello'
			}
		},
		methods:{
			myMethod(){
				console.log('myMethod执行了');
				this.$emit('my-event',this.myMethod2);
			},
			myMethod2(){
				console.error("myMethod2执行了");
			}
		}
	}
</script>

<style>
	.container {
		width: 100%;
		border: 1px solid black;
		text-align: center;
		align-content: center;
	}
	.back-icon {
		background:url(../assets/back.png);
		height: 30px;
		width: 30px;
		background-size: cover;
		position: absolute;
		left:10px;
		top: 30px;
	}
	.back-container {
		position: absolute;
		line-height: 90px;
	}
	.back-content {
		display: inline-block;
		padding-left: 40px;
		font-size:1.5rem;
	}
	.more-content {
		display: inline-block;
		padding-right: 50px;
		font-size:1.5rem;
	}
	.more-container {
		position: absolute;
		right: 20px;
		top: 5px;
		line-height: 90px;
	}
	.more-icon {
		background:url(../assets/more.png);
		height: 30px;
		width: 30px;
		background-size: cover;
		position: absolute;
		right:10px;
		top: 30px;
	}
</style>