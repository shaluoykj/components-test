<template>
	<div class="container">
		<div>websocket</div>
		<div>
			<div>
				<div>
					<button id="connect" @click="init">连接</button>
					<button id="disconnect" @click="close">断开连接</button>
				</div>
				<div id="conversationDiv">
					<label>输入你的名字</label> <input type="text" id="name" v-model="name" />
					<br>
					<label>输入消息</label> <input type="text" id="messgae" v-model="message" />
					<button id="send" @click="send">发送</button>
					<p id="response"></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// WebSocket配置
				path: 'ws://localhost:8080/myUrl?token=4567&start=2018-01-14', // WebSocket 地址
				socket: '',
				name:'',
				message:'',
				start:'2018-01-12'
			}
		},
		created() {},
		mounted() {
			//			this.init()
			// 定时器请求耗时分布折线图数据
		},
		methods: {
			init: function() {
				if(typeof WebSocket === 'undefined') {
					alert('您的浏览器不支持socket')
				} else {
					// 实例化socket
					this.socket = new WebSocket(this.path)
					// 监听socket连接
					this.socket.onopen = this.open
					// 监听socket错误信息
					this.socket.onerror = this.error
					// 监听socket消息
					this.socket.onmessage = this.getMessage
				}
			},
			open: function(event) {
				let start =this.start;
//				this.socket.send(start);
				console.log('socket连接成功')
//				this.axios.get('http://localhost:8080/sendTopic', {})
//				.then(res => {
//					console.error('res=>', res);
//				})
			},
			error: function() {
				console.log('连接错误')
			},
			getMessage: function(msg) {
				console.log(msg.data)
			},
			send: function() {
				console.error(this.socket);
				let params = {}
				this.socket.send('/sendTopic');
			},
			close: function() {
				this.socket.close();
				console.log('socket已经关闭')
			}
		},
		destroyed() {
			// 销毁监听
			this.socket.onclose = this.close
		}
	}
</script>

<style>
	.container {
		display: flex;
		/*font-size:16px;*/
		align-items: center;
		justify-content: center;
	}
</style>