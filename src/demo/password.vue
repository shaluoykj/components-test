<template>
	<div>
		密码控件
		<div>
			<span>密码：</span>
			<div id="pwd1" style="display:inline-block;vertical-align:middle;width:70%;height:20px;"></div>
		</div>
		<div>
			<input class="button" type="button" value="密码长度" @click="getLength('pwd1')" />
			<input class="button" type="button" value="获得密文" @click="getValue('pwd1')" />
			<input class="button" type="button" value="清空密码" @click="clean('pwd1')" />
		</div>
		<div>
			<span>密文：</span>
		</div>
		<div>
			<textarea id="pwd1_text" class="pwd_text"></textarea>
		</div>
		<div>
			<span>服务器的ip:</span>
			<input id="pwd1_ip" class="ipp" type="text" value="192.168.192.7" />
		</div>
		<div>
			<input class="button decrypt" type="button" value="解密" @click="decrypt('pwd1')" />
			<input id="pwd1_val" class="text" type="text" readonly="readonly" />
		</div>

		<br>
		<h2>第二个密码</h2>

		<div>
			<span>密码：</span>
			<div id="pwd2" style="display:inline-block;vertical-align:middle;width:70%;height:20px;"></div>
		</div>
		<div>
			<input class="button" type="button" value="密码长度" @click="getLength('pwd2')" />
			<input class="button" type="button" value="获得密文" @click="getValue('pwd2')" />
			<input class="button" type="button" value="清空密码" @click="clean('pwd2')" />
		</div>
		<div>
			<span>密文：</span>
		</div>
		<div>
			<textarea id="pwd2_text" class="pwd_text"></textarea>
		</div>
		<div>
			<span>服务器的ip:</span>
			<input id="pwd2_ip" class="ipp" type="text" value="192.168.192.7" />
		</div>
		<div>
			<input class="button decrypt" type="button" value="解密" @click="decrypt('pwd2')" />
			<input id="pwd2_val" class="text" type="text" readonly="readonly" />
		</div>

	</div>
</template>

<script>
//	import '@/static/keyboard/iconfont/iconfont.css';
//	import '@/static/keyboard/keyboard.css';
//	import '@/static/keyboard/jquery-1.7.2.min.js';
//	import '@/static/keyboard/keyboard.min.js'
	export default {
		data() {
			return {}
		},
		created: function() {},
		mounted: function() {
			var key = keyboard();
			//create( arg1	//密码显示框父节点id
			//		 ,arg2	//密码显示框id
			//		 ,arg3	//键盘标题
			//		 ,arg4	//允许输入的最大长度（长度包涵arg4）
			//		 );
			key.create("pwd1", "pwd1_key", '沙海密码软键盘1', 30);
			key.create("pwd2", "pwd2_key", '沙海密码软键盘2', 30);
		},
		methods: {
			decrypt(id) {
				var key = keyboard();
				var pwd = key.getValue(id + '_key');
				var len = key.getLength(id + '_key');
				var ip = document.getElementById(id + "_ip").value;
				if(pwd.length == 0) {
					return;
				}
				var pass = encodeURIComponent(pwd);
				var v_url = "data.jsp?pwd=" + pass + "&ip=" + ip + "&len=" + len;
				$.ajax({
					url: v_url,
					success: function(res) {
						document.getElementById(id + "_val").value = $.trim(res);
					}
				});
			},
			//			$(document).ready(function() {
			//				var key = keyboard();
			//				//create( arg1	//密码显示框父节点id
			//				//		 ,arg2	//密码显示框id
			//				//		 ,arg3	//键盘标题
			//				//		 ,arg4	//允许输入的最大长度（长度包涵arg4）
			//				//		 );
			//				key.create("pwd1", "pwd1_key", '沙海密码软键盘1', 30);
			//				key.create("pwd2", "pwd2_key", '沙海密码软键盘2', 30);
			//			});
			getLength(id) {
				var key = keyboard();
				alert(key.getLength(id + '_key'));
			},
			getValue(id) {
				var key = keyboard();
				var val = key.getValue(id + '_key');
				document.getElementById(id + '_text').value = val;
			},
			clean(id) {
				var key = keyboard();
				key.clean(id + '_key');
			}
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0
	}
	
	span {
		display: inline-block;
		width: 100px;
		margin-top: 10px;
		margin-bottom: 5px;
	}
	
	.pwd_text {
		border: solid 1px #000;
		background: #FFF;
	}
	
	.button {
		height: 28px;
		margin-left: 5px;
		margin-top: 10px;
		padding: 0 3px;
	}
	
	.decrypt {
		padding: 0 5px;
		margin-right: 10px;
	}
	
	.pwd_text {
		width: 95%;
		height: 100px;
	}
	
	.text {
		width: 70%;
		height: 28px;
	}
	
	.ipp {
		width: 65%;
		height: 28px;
	}
</style>