<template>
	<div>
		<div class="form-row">
			<span>标题</span>
			<input v-model="info.title" placeholder="请输入标题">
		</div>
		<div class="form-row">
			<span>用户名</span>
			<input v-model="info.username" placeholder="请输入用户名">
		</div>
		<div class="form-row">
			<span>手机号</span>
			<input maxlength="11" @input="clearNoNum('mobile',true)" v-model="info.mobile" placeholder="请输入用户名">
		</div>
		<div class="form-row">
			<span>金额测试</span>
			<input maxlength="12" @input="clearNoNum('amount')" v-model="info.amount" placeholder="请输入金额">
		</div>
		<div>
			<button @click="checkParams(paramslist,info,submit)">提交</button>
		</div>
	</div>
</template>

<script>
	import regularList from '../../utils/pattern'
	export default {
		data() {
			return {
				info: {
					title: "", //标题
					username: "", //用户名
					mobile: "", //手机号
					amount: "", //金额
				},
				paramslist: [{
						key: 'title',
						title: '标题不能为空',
						required: true,
					},
					{
						key: 'username',
						title: '用户名不能为空',
						required: true,
					},
					{
						key: 'mobile',
						title: '手机号不能为空',
						required: true,
						pattern: regularList.mobile,
						patternTips: '手机号格式不正确， 请核对后再输入',
					},
					{
						key: 'amount',
						title: '金额不能为空',
						required: true,
						pattern: regularList.decimal,
						patternTips: '金额最多8位整数，2位小数，请核对后再输入',
					}
				], //校验参数列表
			}
		},
		created: function() {
			let info = JSON.parse(sessionStorage.getItem('info'));
			if(info) {
				this.info = info;
			}
		},
		mounted: function() {},
		methods: {
			clearNoNum(key, flag) {
				if(flag) {
					this.info[key] = this.info[key].replace(/[^\d]/g, ''); //剔除所有非数字
				} else {
					//只保留数字和小数点，其余字符剔除
					if(this.info[key].indexOf('.') === 0) {
						this.info[key] = ""; //第一位不能是小数点，否则剔除成空串
					}
					if(this.info[key] && this.info[key].length >= 2 && this.info[key].indexOf('0') === 0 && this.info[key].indexOf('.') !== 1) {
						this.info[key] = "0"; //第一位是0，第二位则必须是小数点，否则只保留第一位0
					}
					this.info[key] = this.info[key].replace(/[^\d.]/g, ''); //只保留数字和小数点
					this.info[key] = this.info[key].replace(/\.{2,}/g, '.'); //如果有连续多个小数点，只保留一个
					this.info[key] = this.info[key].replace(".", '$#$').replace(/\./g, '').replace('$#$', '.'); //去除多余的小数点，1.1.1.1类似这种数
					this.info[key] = this.info[key].replace(/^(\\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //如果有小数部分，只保留小数点后两位
					if(this.info[key].indexOf('.') < 0 && this.info[key] !== "") {
						this.info[key] = `${parseFloat(this.info[key])}`;
					}
				}
			},
			submit(result) {
				console.log('返回参数', result)
				alert('校验通过');
			},

		},
		watch: {
			info: {
				handler() {
					sessionStorage.setItem('info', JSON.stringify(this.info));
				},
				deep: true,
			}
		}
	}
</script>

<style scoped lang="scss">
	.form-row {
		display: flex;
		margin-bottom: 10px;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		span {
			font-size: 16px;
			margin-right: 10px;
			width: 15%;
			text-align: right;
		}
	}
</style>