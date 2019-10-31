<template>
	<div>
		<script id="editor" type="text/plain"></script>
	</div>
</template>

<script>
	import '../../public/ueditor/ueditor.config.js';
//	import '../../public/ueditor/ueditor.all.js';
	import '../../public/ueditor/ueditor.all.min.js';
	import '../../public/ueditor/lang/zh-cn/zh-cn.js';
	import '../../public/ueditor/ueditor.parse.min.js';
	import '../../public/ueditor/themes/default/css/ueditor.css'
	export default {
		name: 'Ue',
		props: {
			config: {
				type: Object,
				default: () => {}
			},
			value: {
				type: String,
				default: '',
			}
		},
		data: function() {
			return {
				editor: null,
			}
		},
		created: function() {},
		mounted() {
			this.editor = window.UE.getEditor('editor', this.config);
			this.editor.addListener('ready', () => {
				this.editor.setContent(this.value);
			})
		},
		methods: {
			getUEContent() {
				return this.editor.getContent();
			},
		},
		destroyed() {
			this.editor.destroy();
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