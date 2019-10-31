<template>
	<div>
		<!--<iframe v-model="amount"  src="http://www.baidu.com.cn"width="50%" height="50%" sandbox="allow-scripts"></iframe>-->
		<div>
			<currency-input :inputValue="inputValue" @isinput="isClick" :initValue="amount" maxlength="14"></currency-input>
			<div @click="allDraw">全部支取</div>
			<div>
				<label>用户名</label>
				<input v-model="payeeAccount" @input="testmethod">
				<p>{{formatPayeeAccount}}</p>
			</div>
			<div @click="showValue">
				点我
			</div>
		</div>
	</div>
</template>

<script>
	import vueUeditor from '@/components/ueditor'
	import currencyinput from '@/components/currencyinput'
	export default {
		components: {
			vueUeditor,
			"currency-input": currencyinput
		},
		data: function() {
			return {
				amount: 1000,
				inputValue: 0,
				content: '',
				payeeAccount: 0,
				ueditor: {
					value: '默认文字',
					config: {
						initalFrameWidth: 900,
						initalFrameHeight: 420,
					}
				}
			}
		},

		mounted() {
			this.createScript();
		},
		created: function() {
			console.error("test");
		},
		computed: {
			// 付款账号
			formatPayeeAccount: {
				// 显示格式化
				get() {
					if(this.payeeAccount) {
						return this.payeeAccount
							.replace(/\s/g, '')
							.replace(/(\d{4})(?=\d)/g, '$1 ')
					}

				},
				// 去空格
				set(val) {
					// debugger
					this.payeeAccount = val.replace(/\s/g, '')
				}
			}
		},
		methods: {
			testmethod() {
				let value = ""
				if(this.payeeAccount) {
					value = this.payeeAccount
						.replace(/\s/g, '')
						.replace(/(\d{4})(?=\d)/g, '$1 ')
				}
				return value
			},
			showValue() {
				console.error(this.username);
			},
			isClick(value,oldValue) {
				this.amount = oldValue;
			},
			allDraw() {
				alert(this.amount);
				this.inputValue = this.amount.substr(0, this.amount.length - 1);
			},
			submit() {
				this.content = this.$refs.ue.getUEContent();
			},
			createScript() {
				// 获取反欺诈gid
      var win = window
      var doc = document
      var br = win['BAIRONG'] = win['BAIRONG'] || {}
      var s = doc.createElement('script')
      var url = '//static.100credit.com/ifae/js/brcore-v4.min.js'
      s.type = 'text/javascript'
      s.charset = 'utf-8'
      s.src = url
      br.client_id = '3001351'
      br.config = {
        timeout: 6000,
        islocation: true
      }
      doc.getElementsByTagName('head')[0].appendChild(s)
      br.GidCallBack = function(data) {
        document.getElementById('gid').innerHTML = data.data.gid
        document.getElementById('tokenID').innerHTML = data.data.token_id
      }
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