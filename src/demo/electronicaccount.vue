<template>
	<div class="headBody">

		<header class="header" style="background-color: white;">
			<div class="header__back">
				<img @click="back" src="../assets/back.png" alt="back" class="img" />
			</div>
			<h1 class="header__tit" style="color: black;">{{title}}</h1>
		</header>
		<div class="top_1">
			<div class="font_3">请设置电子账户密码</div>
		</div>
		<div id="pwd1" style="display:inline-blockvertical-align:middlewidth:70%height:20px"></div>
		<div class="top_line"></div>
		<div class="botttom">
			<div class="flex_1">
				<div class="font_1">电子账户密码</div>
				<input type="text" placeholder="请输入6位电子账户密码" v-model="item.TransPwd" class="input_1" id="password" @click="getValue('password')" />
			</div>
			<div>
				<span>密码：</span>
				<div id="pwd1" style="display:inline-blockvertical-align:middlewidth:70%height:20px"></div>
			</div>
			<div class="xinxi_c"></div>
			<div class="xinxi">
				<div class="flex_1">
					<div class="font_1">确认密码</div>
					<input type="text" placeholder="请再次输入电子账户密码" v-model="item.TransPwd" class="input_1" />
				</div>

			</div>
			<div class="xinxi_c"></div>
			<div class="but" @click='submit'>
				<div class="btn_03">下一步</div>
			</div>
			<div class="text_a">
				<div class="text_a_imga">
					<img src="../assets/back.png" class="text_a_img"></img>

				</div>
				<div class="explain">此密码为您将要开立的二类户/三类户的交易</div>

			</div>
		</div>

	</div>

</template>

<script>
	//	import Countdown from '@/components/Countdown'
	export default {
		components: {

			//			Countdown
		},
		data() {
			return {
				item: {
					CifNoName: '',
					TransPwd: '123456',
					LimitPerDay: this.$route.query.LimitPerDay,
					LimitPerTrs: this.$route.query.LimitPerTrs,
					CifName: this.$route.query.CifName,
					Mobile: this.$route.query.Mobile,
					AcNo: this.$route.query.AcNo,
					VerifyCode: this.$route.query.VerifyCode,
					IdType: this.$route.query.IdType,
					IdNo: this.$route.query.IdNo,
					IssuDate: this.$route.query.IssuDate,
					expireDate: this.$route.query.expireDate,
					Address: this.$route.query.Address,
					Profession: this.$route.query.Profession,
					CifIdType: this.$route.query.CifIdType,
				},
				confirmdata: {},
				payeeNoList: [],
				autoCount: true,
				countNum: 120,
				title: "在线开户"
			}
		},
		mounted: function() {
			var key = keyboard()
			key.create('pwd1', 'pwd1_key', '沙海密码软键盘1', 30)
			key.create('pwd2', 'pwd2_key', '沙海密码软键盘2', 30)
		},
		methods: {
			//获取密文
			getValue(id) {
				var key = keyboard()
				var key = keyboard()
				key.create('pwd1', id, '沙海密码软键盘1', 6)
				//				var val = key.getValue(id + '_key')
				//				document.getElementById(id + '_text').value = val
			},
			back() {
				this.$router.back();
			},
			onSubmit() {
				alert(this.$refs.countDown.yzm)
			},

			submit: function() {
				this.$router.push({
					path: './electronicaccount_b',
					query: {
						LimitPerDay: this.item.LimitPerDay,
						LimitPerTrs: this.item.LimitPerTrs,
						TransPwd: this.item.TransPwd,
						CifName: this.item.CifName,
						IdType: this.item.IdType,
						IdNo: this.item.IdNo,
						IssuDate: this.item.IssuDate,
						expireDate: this.item.expireDate,
						Address: this.item.Address,
						Profession: this.item.Profession,
						CifIdType: this.item.CifIdType,
						AcNo: this.item.AcNo,
						Mobile: this.item.Mobile,
						VerifyCode: this.item.VerifyCode,
					},
				})
			},
		},
		mounted() {
			this.confirmdata = this.$route.params;

		},

	}
</script>

<style scoped="scoped">
	.headBody {
		width: 100%;
		height: 100%;
		background-color: white;
	}
	
	.btn_03 {
		width: 100px;
		height: 90px;
		background-image: linear-gradient(to right, #DEE0E5, #DEE0E5);
		border-radius: 10px;
		margin-left: 290px;
		margin-right: 65px;
		color: #FFFFFF;
		text-align: center;
		line-height: 90px;
		font-size: 30px;
	}
	
	.top {
		width: 750px;
		height: 98px;
		color: #FFFFFF;
		border-bottom: 6px solid #CCCCCC;
	}
	
	.bottom {
		width: 750px;
		height: 800px;
	}
	
	.top_line {
		width: 750px;
		height: 30px;
		background-color: #DEE0E5;
	}
	
	.text_a {
		width: 750px;
		height: 100px;
		display: flex;
		flex-direction: row;
	}
	
	.xinxi_c {
		width: 750px;
		height: 2px;
		background-color: #DEE0E5;
	}
	
	.but {
		width: 700px;
		height: 100px;
		margin-left: 26px;
		background-color: #DEE0E5;
		margin-top: 26px;
		border-radius: 10px;
	}
	
	.text_a_img {
		width: 23px;
		height: 23px;
	}
	
	.text_a_imga {
		display: flex;
		flex: row;
		width: 40px;
		height: 40px;
		margin-left: 30px;
		margin-top: 56px;
	}
	
	.xinxi {
		width: 750px;
		height: 98px;
		display: flex;
		flex-direction: row;
	}
	/*卡片头样式*/
	
	.font_3 {
		font-size: 42px;
		font-weight: 600;
		color: #231815;
	}
	
	.top_1 {
		width: 90%;
		height: 98px;
		line-height: 98px;
		background-color: #FFFFFF;
		padding: 100px 5% 0 5%
	}
	
	.flex_1 {
		display: flex;
		flex-direction: row;
		width: 90%;
		padding: 0 5%;
		height: 98px;
		align-items: center;
		margin-top: 1px;
		background-color: #FFFFFF;
		justify-content: center;
		align-items: center;
	}
	
	.font_1 {
		height: 98px;
		line-height: 98px;
		font-size: 30px;
	}
	
	.input_1 {
		outline: none;
		flex: 1;
		font-size: 30px;
		border: 0;
		text-align: right;
		placeholder-color: #9FA6B3;
	}
	
	.explain {
		width: 500px;
		height: 90px;
		font-size: 24px;
		margin-left: 0px;
		margin-top: 53px;
		font-weight: 400;
		color: rgba(57, 130, 213, 1);
		line-height: 33px;
	}
</style>