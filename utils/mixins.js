const mixin = {
	methods: {
		goto(flag) {
			if(this.isNotEmpty(flag)) {
				if(flag.indexOf('/') != -1) {
					this.$router.push({
						path: flag
					});
				} else {
					this.$router.push({
						name: flag
					});
				}
			} else {
				return false;
			}
		},
		isNotEmpty(source) {
			if((source && source.length > 0) || source === 0) {
				return true;
			} else {
				return false;
			}
		},
		goBack(source) {
			if(this.isNotEmpty(source)) {
				if(flag.indexOf('/') != -1) {
					this.$router.replace({
						path: flag
					});
				} else {
					this.$router.replace({
						name: flag
					});
				}
			} else {
				this.$router.go(-1);
			}
		},
		/*表单参数校验方法*/
		checkParams(list, info, submitMethod) {
			let checkFlag = true;
			let _this = this;
			let result = {};
			try {
				list.map(item => {
					if(item.required) {
						item.value = info[item.key];
						/*非空校验*/
						if(!_this.isNotEmpty(item.value)) {
							alert(item.title);
							checkFlag = false;
							throw new Error('end');
						}
						/*正则校验*/
						if(item.pattern && !item.pattern.test(item.value)) {
							alert(item.patternTips);
							checkFlag = false;
							throw new Error('end');
						}
					}
					result[item.key] = item.value;
					return item;
				});
			} catch(e) {
				if(e.message !== 'end') throw e;
				//TODO handle the exception
			}
			/*校验通过调回调方法进行下一步操作*/
			if(checkFlag) {
				submitMethod({
					result, //组装的表单数据
					checkFlag //校验结果，如果校验通过则是默认的true，否则校验不过为false
				});
			}

		}
	},
	filters: {
		listFilter(val, listName, arg) {
			let allList = window.allList; //取list列表;
			let showItem = allList[listName].find(item => {
				return item.key == val; //约定取list的key和要过滤的值相同，实际运用可适配修改成id，或者value等字段
			});
			return showItem ? showItem.value : ''; //返回页面过滤后的展示
		}
	}

}
export default mixin;