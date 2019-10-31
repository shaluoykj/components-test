<template>
	<div>
		<div class="industry-container">
			<div @click="openIndustry">点我行业选择</div>
			<div>{{showIndustrySelectText}}</div>
			<industry-select :callback="callbaclk" :showSelect="showIndustry" :multi='multi' type="industry" :title="selecTitle" @get-value="getIndustry"></industry-select>
			<div @click="openIndustrySecond">点我行业选择2</div>
			<div>{{showIndustrySelectTextSecond}}</div>
			<industry-second :callback="callbaclkSecond" :showSelect="showIndustrySecond" :multi='multi' type="industry" :title="selecTitle" @get-value="getIndustry"></industry-second>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/header'
	//	import IndustrySelect from '@/components/industry'
	import IndustrySecond from '@/components/industry-second'
	import regularList from '../../utils/pattern'
	export default {
		components: {
			'industry-select': () => {
				return import('@/components/industry');
			},
			'my-header': Header,
			'industry-second': IndustrySecond,
		},
		data() {
			return {
				info: {
					title: "", //标题
					username: "", //用户名
					mobile: "", //手机号
					amount: "", //金额
				},
				showIndustry: false,
				showIndustrySecond: false,
				multi: true,
				selecTitle: '请选择行业',
				industrySelect: [],
				industrySelectId: [],
				industrySelectText: [],
				industrySelectSecond: [],
				industrySelectIdSecond: [],
				industrySelectTextSecond: [],
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
				],
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
			testMethod() {
				alert('test');
			},
			callbaclk(list, idList, textList, flag) {
				if(flag) {
					this.industrySelect = [...list];
					this.industrySelectId = [...idList];
					if(this.industrySelectId[0] === 'all') {
						this.industrySelectId.shift();
					}
					this.industrySelectText = [...textList];
				}
				this.showIndustry = false;

			},
			callbaclkSecond(list, idList, textList, flag) {
				if(flag) {
					this.industrySelectSecond = [...list];
					this.industrySelectIdSecond = [...idList];
					if(this.industrySelectIdSecond[0] === 'all') {
						this.industrySelectIdSecond.shift();
					}
					this.industrySelectTextSecond = [...textList];
				}
				this.showIndustrySecond = false;

			},
			openIndustry() {
				this.showIndustry = true;
				this.reinitPage();
			},
			openIndustrySecond() {
				this.showIndustrySecond = true;
			},
			reinitPage() {
				window.scroll(1, Math.max(document.body.clientHeight, document.documentElement.clientHeight));
			},
			getIndustry(list, idList, textList, flag) {
				/*if(flag) {
					this.industrySelect = [...list];
					this.industrySelectId = [...idList];
					if(this.industrySelectId[0] === 'all') {
						this.industrySelectId.shift();
					}
					this.industrySelectText = [...textList];
				}
				this.showIndustry = false;*/
			},
			clearNoNum(key, flag) {
				if(flag) {
					this.info[key] = this.info[key].replace(/[^\d]/g, ''); //剔除所有非数字
				} else {
					setTimeout(function() {}, 4000);
					//只保留数字和小数点，其余字符剔除
					if(this.info[key].indexOf('.') === 0) {
						this.info[key] = ""; //第一位不能是小数点，否则剔除成空串
					}
					if(this.info[key] && this.info[key].length >= 2 && this.info[key].indexOf('0') === 0 && this.info[key].indexOf('.') !== 1) {
						this.info[key] = "0"; //第一位是0，第二位则必须是小数点，否则只保留第一位0
					}
					//this.info[key] = this.info[key].replace(/[^\d.]/g, ''); //只保留数字和小数点
					this.info[key] = this.info[key].replace(/[^\d\.]/g, ''); //只保留数字和小数点

					this.info[key] = this.info[key].replace(/\.{2,}/g, '.'); //如果有连续多个小数点，只保留一个

					this.info[key] = this.info[key].replace(".", '$#$').replace(/\./g, '').replace('$#$', '.'); //去除多余的小数点，1.1.1.1类似这种数
					this.info[key] = this.info[key].replace(/^(\\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //如果有小数部分，只保留小数点后两位
					//					if(this.info[key].indexOf('.') < 0 && this.info[key] !== "") {
					//						this.info[key] = `${parseFloat(this.info[key])}`;						
					//					}
					console.error("key", this.info[key]);
				}
				this.reInitPage();
			},
		},
		computed: {
			showIndustrySelectText() {
				let showText = "";
				const showList = [];
				const temp = [...this.industrySelectText];
				if(temp[0] === '全选') {
					temp.splice(0, 1);
				}
				showText = temp.join(',');
				return showText;
			},
			showIndustrySelectTextSecond() {
				let showText = "";
				const showList = [];
				const temp = [...this.industrySelectTextSecond];
				if(temp[0] === '全选') {
					temp.splice(0, 1);
				}
				showText = temp.join(',');
				return showText;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../style/test.scss';
</style>