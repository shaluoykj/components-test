<template>
	<div>
		<div @click="showIndustry=true">点我行业选择</div>
		<div>{{showIndustrySelectText}}</div>
		<industry-select :callback="callbaclk" :showSelect="showIndustry" :multi='multi' type="industry" :title="selecTitle" @get-value="getIndustry"></industry-select>
	</div>
</template>

<script>import IndustrySelect from '@/components/industry'
export default {
	components: {
		'industry-select': IndustrySelect
	},
	data() {
		return {
			showIndustry: false,
			multi: true,
			selecTitle: '请选择行业',
			industrySelect: [],
			industrySelectId: [],
			industrySelectText: [],
		}
	},
	created: function() {},
	mounted: function() {},
	methods: {
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
		}
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
		}
	}
}</script>

<style></style>