<template>
	<div>
	<div>
		<vue-ueditor ref="ue" v-model="content" :config="ueditor.config"></vue-ueditor>
		<div @click.stop="submit">获取文本</div>
	</div>
	</div>
</template>

<script>
	import vueUeditor from '@/components/ueditor'
	export default {
		components:{
			vueUeditor
		},
		data: function() {
			return {
				content:'',
				ueditor:{
					value:'默认文字',
					config:{
						initalFrameWidth:900,
						initalFrameHeight:420,
					}
				}
			}
		},
		created: function() {},
		methods: {
			submit(){
				this.content=this.$refs.ue.getUEContent();
				console.error(this.$refs.ue.getUEContent());
			}
		},
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
		background: url(../assets/back.png);
		height: 30px;
		width: 30px;
		background-size: cover;
		position: absolute;
		left: 10px;
		top: 30px;
	}
	
	.back-container {
		position: absolute;
		line-height: 90px;
	}
	
	.back-content {
		display: inline-block;
		padding-left: 40px;
		font-size: 1.5rem;
	}
	
	.more-content {
		display: inline-block;
		padding-right: 50px;
		font-size: 1.5rem;
	}
	
	.more-container {
		position: absolute;
		right: 20px;
		top: 5px;
		line-height: 90px;
	}
	
	.more-icon {
		background: url(../assets/more.png);
		height: 30px;
		width: 30px;
		background-size: cover;
		position: absolute;
		right: 10px;
		top: 30px;
	}
</style>