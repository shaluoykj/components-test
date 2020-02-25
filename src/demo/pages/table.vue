<template>
	<div>

		<el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
			<el-table-column prop="date" label="日期" sortable width="180">
			</el-table-column>
			<el-table-column prop="name" label="姓名" sortable width="180">
			</el-table-column>
			<el-table-column prop="address" label="地址" :formatter="formatter">
			</el-table-column>
			<el-table-column prop="amount" label="余额" sortable :sort-method="sortString">
				<template slot-scope="scope">
					<span>{{scope.row.amount}}</span>
					<span>{{typeof(scope.row.amount)}}</span>
				</template>
			</el-table-column>
		</el-table>
		<el-form>
			<el-form-item label="用户名">
				<el-input v-model="username" class="container"></el-input>
			</el-form-item>
		</el-form>
		<div class="test-sass">321312</div>
		<!-- :showIndex="false" -->
		<new-table ref="table" class="list-table" url="/test/dsdsd.do" :columns="column" :checkbox="false" fixed="right" :indexOption="indexOption" :selfHighlight="false" :initParams="initParams" :searchParams="searchParams" :border="false"></new-table>

	</div>
</template>

<script>
	import newTable from '@/components/table/index'
	export default {
		components: {
			newTable
		},
		data() {
			return {
				username: '',
				indexOption: {
					textAlign: 'center',
					width: 50,
				},
				searchParams: {},
				initParams: {},
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					amount: '123.34',
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄',
					amount: '34.34',
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄',
					amount: '67.4324'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
					amount: '9.424'
				}],
				column: [{
					prop: 'date',
					label: '日期'
				}, {
					prop: 'name',
					label: '姓名'
				}, {
					prop: 'date',
					label: '地址'
				}, {
					prop: 'amount',
					label: '余额'
				}]
			}
		},
		methods: {
			formatter(row, column) {
				return row.address;
			},
			sortString(a, b) {
				if(Number(a.amount) - Number(b.amount) > 0) {
					return 1
				} else {
					return Number(a.amount) - Number(b.amount) === 0 ? 0 : -1
				}
			}
		}
	}
</script>
<style scoped lang="scss">
	.container {
		/deep/ input[type=text]:focus {
			border: 1px solid green;

		}
	}
	
	.container {
		.test-sass {
			color: red;
		}
		/deep/.el-input.is-active .el-input__inner,
		.el-input__inner:focus {
			background: red !important;
		}
	}
	/*input[type=text]:focus, input[type=password]:focus {

}*/
</style>