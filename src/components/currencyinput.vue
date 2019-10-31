<template>
	<div>
		<span>
   <input type="text"style="border: none;" class="currentClass" ref="input" maxlength="18"  placeholder="请输入 " @input="upDateValue($event.target.value)">
		</span>
	</div>
</template>

<script>
	export default {
		props: {
			value: {
				type: [Number, String],
				default: 0,

			},
			inputValue: {
				type: [Number, String],
			},
			initValue:{
				type:[Number,String]
			},
			onConfirm: {
				type: Function
			},
		},
		data() {
			return {
				inputData: '0/',
				showValue: 0,
			}
		},
		watch:{
			inputValue(value){
				this.upDateValue(value+"");
			}
		},
		methods: {
			//输入内容处理函数
			upDateValue(value) {
				var oldValue=value.substr(0,value.length);
				var formateValue = value.split(',').join(''),
					temp = "",
					str;
				//非法输入过滤
				if(!/^([0-9]|\.)*$/.test(formateValue)) {
					this.$refs.input.value = this.value + "".substring(0, formateValue.length - 1);
					return;
				}
				//数据格式化
				if(formateValue.indexOf('.') == -1) {
					while(formateValue.length - 3 > 0) {
						temp = "," + formateValue.substring(formateValue.length - 3, formateValue.length) + temp;
						formateValue = formateValue.substring(0, formateValue.length - 3);
					}
					str = formateValue + temp;
					this.inputData = str == "" ? 0 : str;
				} else {
					str = this.inputData + "." + formateValue.split('.')[1].substring(0, 2) //保留两位小数
				}
				//改变的input值
				this.$refs.input.value = str;
				//触发父组件事件，传递参数
				this.$emit('isinput', str,oldValue);
			},
		},
		mounted() {
			//初始化显示
			this.upDateValue(this.initValue + "");
		},

	}
</script>