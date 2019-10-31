<template>
	<div class="container">
		<!--遮罩-->
		<div class="bg-shadow" v-show="showSelect" @click="submit(false)"></div>
		<!--选项-->
		<div class="box-select" v-show="showSelect">
			<div class="header">
				<span>{{title}}</span>
				<img src="../assets/close.png" @click="submit(false)">
			</div>
			<div>
				<div class="btn-box">
					<div v-for="(item,index) in showList" :key="index" :class="{'active-select':(multi&&item.selected)||(!multi&&singleSelectKey===item.key),'row-last':(index+1)%4===0}" @click="clickItem(item)">
						{{item.name?item.name:item.value}}
					</div>
				</div>
				<div class="btnChecked" :class="{'unbtnChecked':selectedList.length===0}" @click="submit(true)">
					确定
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import allList from '../../utils/allList.js';
	export default {
		props: {
			callback:{
				type:Function
			},
			showSelect: { //显示标识
				type: Boolean
			},
			title: {
				//显示选择标题
				type: String,
				default: '',
			},
			type: { //行业和地区做区分
				type: String
			},
			multi: { //是否可多选，默认是多选
				type: Boolean,
				default: true
			},
			defaultList: {
				//默认选中项id或者key列表
				type: Array,
			}
		},
		data() {
			return {
				showList: [], //展示数组
				industryList: [...allList.industryList], //默认行业列表
				provinceList: [...allList.provinceList], //默认地区数组
				singleSelectKey: "", //针对单选设定的选中项
				selectedList: [], //选中项对象数组
				selectedIdList: [], //选中项id数组
				selectedTextList: [], //选中项显示文本或者value数组
			}
		},
		created() {
			switch(this.type) {
				case 'industry':
					//行业
					this.initIndustry();
					break;
				case 'region':
					//地区
					this.initRegion();
					break;
				default:
					break;
			}
			//默认未选中状态
			if(!this.defaultList || this.defaultList.length === 0) {
				this.showList.map(item => {
					item.selected = false;
					return item;
				})
			}
		},
		methods: {
			multiSelect(item) {
				/*多选需要判断当前点击项是否刚才被选中，需要剔除，以及是否是全选状态*/
				item.selected = !item.selected; //选中项标识切换
				const index = this.showList.indexOf(item);
				this.$set(this.showList, index.item);
				const selectIndex = this.selectedList.indexOf(item);
				if(selectIndex !== -1) {
					this.selectedList.splice(selectIndex, 1);
					this.selectedIdList.splice(selectIndex, 1);
					this.selectedTextList.splice(selectIndex, 1);
				} else {
					this.selectedList.push(item);
					this.selectedIdList.push(item.key ? item.key : item.id);
					this.selectedTextList.push(item.name ? item.name : item.value);
				}
				if(item.key === 'all') {
					this.selectAll(item.selected);
				}
				this.checkSelectAll();
			},
			singleSelect(item) {
				/*单选方法只处理当前选中项即可*/
				this.singleSelectKey = item.key;
				this.selectedList = [];
				this.selectedIdList = [];
				this.selectedTextList = [];
				this.selectedList.push(item);
				this.selectedIdList.push(item.key ? item.key : item.id);
				this.selectedTextList.push(item.name ? item.name : item.value);
			},
			clickItem(item) {
				/*判断是多选还是单选调用不同的方法*/
				if(this.multi) {
					this.multiSelect(item);
				} else {
					this.singleSelect(item);
				}

			},
			checkSelectAll() {
				//	检测是否是全选状态
				let allItemIndex = "";
				let allItem = {};
				if(this.selectedList.length !== this.showList.length) {
					this.showList.map((item, index) => {
						if(item.key === 'all') {
							allItemIndex = index;
							allItem = item;
						}
						return item;
					});
					if(allItem.selected) {
						const selectedIndex = this.selectedList.indexOf(allItem);
						allItem.selected = false;
						this.$set(this.showList, allItemIndex, allItem);
						this.selectedList.splice(selectedIndex, 1);
						this.selectedIdList.splice(selectedIndex, 1);
						this.selectedTextList.splice(selectedIndex, 1);
					}
				}
				/*处理实际全选，但不是点击全选按钮*/
				if(this.selectedList.length === this.showList.length - 1) {
					if(this.showList[0].selected === false) {
						this.selectAll(true);
					}
				}
			},
			selectAll(flag) {
				/*全选按钮操作，全选或者全取消*/
				this.selectedList = [];
				this.selectedIdList = [];
				this.selectedTextList = [];
				this.showList.map((item) => {
					item.selected = flag;
					if(flag) {
						this.selectedList.push(item);
						this.selectedIdList.push(item.key ? item.key : item.id);
						this.selectedTextList.push(item.name ? item.name : item.value);
					}
					return item;
				});
			},
			initIndustry() {
				/*获取行业列表*/
				this.showList = this.industryList;
				this.addAllItem();
				this.defaultSelect();
			},
			initRegion() {
				/*获取地区列表*/
				this.showList = this.provinceList;
				this.addAllItem();
				this.defaultSelect();
			},
			addAllItem() {
				/*添加全选项*/
				if(this.multi && this.showList[0] && this.showList[0].key !== 'all') {
					const allItem = {
						key: 'all',
						value: '全选',
						id: 'all',
					};
					this.showList.unshift(allItem);
				} else if(!this.multi && this.showList[0] && this.showList[0].key === 'all' && this.typeof === 'region') {
					/*针对单选剔除全选项*/
					this.showList.shift()
				}
				if(this.defaultList && this.showList.length === this.defaultList.length + 1) {
					/*如果是全选状态，全选按钮应该高亮*/
					this.showList[0].selected = true;
				}
			},
			defaultSelect() {
				const _this = this;
				//处理回显项
				if(this.defaultList && this.defaultList.length > 0) {
					this.showList.map((item, index) => {
						_this.defaultList.map(defaultItem => {
							if(_this.multi) {
								/*多选处理*/
								if(item.id === defaultItem || item.key === defaultItem) {
									item.selected = true;
									_this.selectedList.push(item);
									_this.selectedIdList.push(item.key ? item.key : item.id);
									_this.selectedTextList.push(item.name ? item.name : item.value);
									_this.$set(_this.showList, index, item);
								}
							} else if(item.id === defaultItem || item.key === defaultItem) {
								/*单选处理*/
								_this.singleSelect(item);
							}
							return defaultItem;
						});
						return item;
					});
					const firstItem = this.showList[0];
					if(firstItem && firstItem.key === 'all' && firstItem.selected) {
						this.selectedList.unshift(firstItem);
						this.selectedIdList.unshift(firstItem.key ? firstItem.key : firstItem.id);
						this.selectedTextList.unshift(firstItem.name ? firstItem.name : firstItem.value);
					}
					if(this.defaultList && this.defaultList.length > 0) {
						this.submit(true);
					}
				}
			},
			submit(flag) {
				this.callback(this.selectedList, this.selectedIdList, this.selectedTextList, flag);
				//this.$emit("get-value", this.selectedList, this.selectedIdList, this.selectedTextList, flag)
			}
		},
		mounted: function() {},

	}
</script>

<style scoped lang="scss">
	.bg-shadow {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		opacity: .5;
		background-color: #000000;
		z-index: 10;
		-webkit-transition: opacity .2s ease-in;
		transition: opacity .2s ease-in;
	}
	
	.box-select {
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0 1px 0 0 #EEEEEE;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 11;
		/*尝试适配ios问题*/
		-webkit-transition: -webkit-transform .2s;
		transition: -webkit-transform .2s;
		transition: transform .2s, -webkit-transform .2s;
		-webkit-transform: translate(0);
		transform: translate(0);
		/*尝试适配ios问题*/
		.header {
			height: 60px;
			line-height: 60px;
			width: 100%;
			padding: 0 18px;
			display: flex;
			flex-direction: row;
			box-sizing: border-box;
			justify-content: space-between;
			span {
				font-size: 17px;
				color: rgba(0, 0, 0, 0.85);
				font-weight: 600;
			}
			img {
				height: 21px;
				width: 21px;
				margin-top: 19.5px;
			}
		}
		.btn-box {
			width: 100%;
			max-height: 265px;
			padding: 0px 11.5px 5.5px 11.5px;
			border-bottom: 1Px solid rgba(243, 243, 243, 0.85);
			border-top: 1Px solid rgba(243, 243, 243, 0.85);
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			overflow: scroll;
			div {
				height: 30px;
				line-height: 30px;
				text-align: center;
				min-width: 75px;
				padding: 0 5px;
				margin: 10px 6.5px 0 6.5px;
				font-size: 13px;
				color: rgba(0, 0, 0, 0.85);
				border: 1Px solid rgba(0, 0, 0, 0.15);
				border-radius: 1px;
			}
			.checked {
				border: 1PX solid #FF721F !important;
				color: #FF721F;
			}
		}
		.btnChecked,
		.unbtnChecked {
			width: 339px;
			height: 47px;
			line-height: 47px;
			margin: 8px auto;
			background-color: #FF721F;
			border-radius: 2px;
			font-size: 16px;
			color: #FFFFFF;
			text-align: center;
		}
		.unbtnChecked {
			background-color: #BEBEBE !important;
			pointer-events: none !important;
		}
	}
	
	.active-select {
		color: #FF721F !important;
		border: 1PX solid #FF721F !important;
	}
	
	.row-last {
		/*margin-right: 0 !important;*/
	}
</style>