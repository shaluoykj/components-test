<template>
	<div>
		<div @click="download">点我</div>
		<div @click="getInfo">查看设备信息</div>
		<div @click="getInfo2">查看设备信息2</div>
		<div @click="getUserInfo">查询个人信息</div>
		<div @click="getUserInfo">查询个人信息</div>
		<div @click="getUserInfo">查询个人信息</div>
	</div>
</template>

<script>
	import { wxIosInputHack } from '../../utils/wechat'
	export default {
		data() {
			return {
				dataList: [{
						"id": "001",
						"pid": '000',
						"name": '中文1',
					},
					{
						"id": "002",
						"pid": '001',
						"name": '中文1',
					},
					{
						"id": "003",
						"pid": '001',
						"name": '中文1',
					},
					{
						"id": "004",
						"pid": '002',
						"name": '中文1',
					},
					{
						"id": "005",
						"pid": '004',
						"name": '中文1',
					},
					{
						"id": "006",
						"pid": '003',
						"name": '中文1',
					},
					{
						"id": "007",
						"pid": '004',
						"name": '中文1',
					},
				],
				userList: [{
						username: '1323',
						userId: 'sss',
						loginName: '测试1'
					},
					{
						username: '13234',
						userId: 'sss4',
						loginName: '测试2'
					},
					{
						username: '132344',
						userId: 'sss4',
						loginName: '测试3'
					}
				],
				treeList: [],
			}
		},
		created: function() {
			const params = {
				'LoginType': 'P',
				'Username': 'admin1',
				'Password': 'admin1'
			}
			var cookies = document.cookie;

			//			this.axios.get('/spring/test', params)
			//				.then(res => {
			//					console.error('res=>', res);
			//			})

		},

		mounted: function() {
			//			this.createTree(this.dataList);
			this.init();
		},
		methods: {
			async init() {
				await this.getUserInfo();
				this.getUserInfo2();
				console.error('都执行了');
			},
			download() {

				//				window.location.href="http://localhost:8080/download?list="+encodeURI(list);
				//				let url = "http://localhost:8080/download?list=" + encodeURI(JSON.stringify(this.userList));
				window.location.href = "http://localhost:8080/download/" + encodeURI(JSON.stringify(this.userList));

			},
			getUserInfo() {
			
				return new Promise((resolve, reject) => {
					let _this = this;
					const params = {
						'LoginType': 'P',
						'Username': 'admin1',
						'Password': 'admin1'
					};
					this.axios.get('http://localhost:8080/test', params)
						.then(res => {
							console.error('res=>1111', res);
							this.firstValue='11111';
							debugger
							resolve(res);
						}).catch(() => {
							reject(res);
						})
				})

			},
			getUserInfo2() {
				let _this = this;
				const params = {
					'LoginType': 'P',
					'Username': 'admin1',
					'Password': 'admin1'
				};
				this.axios.get('http://localhost:8080/test', params)
					.then(res => {
						console.error('res=>2222', res);
						console.error(this.firstValue);
					})
			},
			getInfo() {
				wxIosInputHack();
			},
			getInfo2() {
				let u = navigator.userAgent;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
				if(isAndroid) {
					//我是android终端
					console.error('isAndroid', isAndroid);
				} else if('isiOS', isiOS) {
					console.error("ios");
					//我是ios终端
				} else {
					//我是wap
					console.error('wap');
				}
			},

			//递归生成树结构
			createTree(list) {
				const _this = this;
				if(list && list.length) {
					for(let index = 0; index < list.length; index++) {
						if(list[index].id === '001') {
							list[index].children = [];
							_this.treeMethod(list[index], list);
							_this.treeList.push(list[index]);
							break;
							//						}
						}
					}
					//					list.forEach(item=>{
					//						if(item.id===item.pid){
					//							item.children=[];
					//							_this.treeMethod(item,list);
					//							_this.treeList.push(item);
					//						}
					//					})
				}
				console.error(this.treeList);
			},
			treeMethod(parantItem, list) {
				const _this = this;
				if(list && list.length) {
					list.forEach(item => {
						if(item.pid === parantItem.id) {
							item.children = [];
							_this.treeMethod(item, list);
							parantItem.children.push(item);
						}
					})
				}
				//递归生成树结构
			},
		}
	}
</script>

<style>

</style>