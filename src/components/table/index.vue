<template>              <!--把table封装在了这里-->
    <div class="table-common">
<!--     ykj去掉表格斑马条纹      stripe-->
        <el-table
                :empty-text="empty"
                v-loading="loading"
                :data="tableData"
                ref="table"
                @select="handleSelect"
                @select-all="handleSelectAll"
                @row-click="handleRowClick"
                @selection-change="handleSelectionChange"
                :height="tableHeight"
                :highlight-current-row="selfHighlight&&highlight"
                :size="size"
                :row-key="(row)=>{return row.id}"
                :header-row-class-name="headerRowClassName"
                :cell-class-name="cellClassName"
                :header-cell-style="tableHeaderColor"
                :border="border" stripe style="width: 100%">

            <template v-if="judge">
                <el-table-column type="selection" width="40" :reserve-selection="true"></el-table-column>
            </template>

            <template v-else-if="showIndex">
                <el-table-column type="index" :width="indexOption.width||40" :align="indexOption.textAlign=='' || indexOption.textAlign==null ? 'left' : indexOption.textAlign"></el-table-column>
            </template>
            <template v-for="(item, index) in columns" v-if="!item.hidden">
                <!-- v-if 与 slot-scope放一起有bug暂时无法优化 -->
                <el-table-column v-if="item.expand" :fixed="item.fixed" :column-key="index+''" :type="item.type" :prop="item.prop" :label="item.label"
                                 :formatter="formatter" :key="index"
                                 :show-overflow-tooltip="item.showOverflowTooltip"
                                 :align="item.textAlign=='' || item.textAlign==null ? 'left' : item.textAlign "
                                 :sortable="sort&&!item.hiddenSort"
                                 :width="item.width">
                    <template slot-scope="scope" >
                        <node-content :expand="item.expand" :scope="scope"></node-content>
                    </template>
                </el-table-column>
<!--                操作按钮展示-->
                <el-table-column :fixed="item.fixed" v-else-if="item.operationList" :column-key="index+''" :type="item.type" :prop="item.prop" :label="item.label"
                                 :formatter="formatter" :key="index"
                                 :show-overflow-tooltip="item.showOverflowTooltip"
                                 :sortable="sort&&!item.hiddenSort"
                                 :align="item.textAlign=='' || item.textAlign==null ? 'left' : item.textAlign "
                                 :width="item.width">
                    <template slot-scope="scope" >
                        <div>
                            <span
                                    :style="operation.style"
                                    :class="['operation-item',operation.class]"
                                    v-for="operation in item.operationList"
                                    @click="operation.click(scope.row)">
                                {{nameCheck(operation.name,scope.row)}}
                            </span>
                        </div>
                    </template>
                </el-table-column>
<!--                属性图片展示-->
                <el-table-column v-else-if="item.image" :fixed="item.fixed" :column-key="index+''" :type="item.type" :prop="item.prop" :label="item.label"
                                 :formatter="formatter" :key="index"
                                 :show-overflow-tooltip="item.showOverflowTooltip"
                                 :sortable="sort&&!item.hiddenSort"
                                 :align="item.textAlign=='' || item.textAlign==null ? 'left' : item.textAlign "
                                 :width="item.width">
                    <template slot-scope="scope" >
                        <div class="image-container">
                            <img style="width: 34px;height: 18px;" v-for="image in scope.row.attributeList"  :src="'../../../../static/images/'+image"/>
<!--                            <img style="width: 34px;height: 18px;" v-if="scope.row.attributeList.length>0" src="../../../../static/images/114.jpg" v-for="index in 15">-->
                        </div>
                    </template>
                </el-table-column>
<!--                单元格slot-->
                <el-table-column v-else-if="item.slot" :fixed="item.fixed" :column-key="index+''" :type="item.type" :prop="item.prop" :label="item.label"
                                 :key="index"
                                 :show-overflow-tooltip="item.showOverflowTooltip"
                                 :sortable="sort&&!item.hiddenSort"
                                 :align="item.textAlign=='' || item.textAlign==null ? 'left' : item.textAlign "
                                 :width="item.width">
                    <template slot-scope="scope" >
                        <slot :name="item.slot" :data="scope.row" :prop="item.prop"></slot>
                    </template>
                </el-table-column>
<!--                默认单元格展示-->
                <el-table-column v-else :fixed="item.fixed" :column-key="index+''" :type="item.type" :prop="item.prop" :label="item.label"
                                 :formatter="formatter" :key="index"
                                 :show-overflow-tooltip="item.showOverflowTooltip"
                                 :sortable="sort&&!item.hiddenSort"
                                 :align="item.textAlign=='' || item.textAlign==null ? 'left' : item.textAlign "
                                 :width="item.width">
                </el-table-column>
            </template>
        </el-table>

        <template v-if="isPager">
            <el-pagination style="text-align: right" @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :page-size="pageSize" :page-sizes="[5,10, 20, 50]" :current-page="pageNo"
                           layout="total, sizes, prev, pager, next, jumper" :total="totalRows">
            </el-pagination>
        </template>
    </div>
</template>
<script>
//  import moneyUtil from '@/utils/moneyUtil';
//  import bigDecimal from '@/utils/bigDecimal';

    export default {
        name: 'newElxTable',
        components: {
            NodeContent: {
                props: {
                    expand: Function,
                    scope: null
                },
                render(h) {
                    const expand = this.expand;
                    const scope = this.scope;
                    return expand.call(this._renderProxy, h, {scope});
                }
            }
        },
        props: {
            url: {
                type: String,
                required: true
            },
            columns: {
                type: Array,
                required: true
            },
            initParams: {
                type: Object,
                default: {}
            },
            searchParams: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            checkbox: {
                type: Boolean,
                default: false
            },
            height: {
                type: String,
                default: null
            },
            size: {
                type: String,
                default: 'medium'
            },
            selection: {
                type: Boolean,
                default: true
            },
            border: {
                type: Boolean,
                default: true
            },
            orgFileds: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            userFileds: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            judge: {
                type: Boolean,
                default: false
            },
            textAlign: {
                type: String,
                default: 'left'
            },
            isPager: {
                type: Boolean,
                default: true
            },
            cellClassName: {
                type: Function
            },
            pageSize:{
                type : Number,
                default : 10
            },
            isCache: {
                type: Boolean,
                default: true
            },
            selectObj:{
                type:Object,
                default:()=>{
                    return {}
                }
            },
            sort:{
                type:Boolean,
                default:()=>{
                    return true;
                }
            },
            selfHighlight:{
                type:Boolean,
                default:true,
            },
            showIndex:{
                type:Boolean,
                default:()=>{
                    return true;
                }
            },
            indexOption:{
                type:Object,
                default:()=>{
                    return {
                        textAlign:'left',
                    };
                }
            }
        },
        data() {
            return {
                tableLength: '',
                empty: ' ',
                loading: 'true',
                tableData: [],
                rows: [],
                pageNo: 1,
                // pageSize: 10,
                totalRows: null,
                selectedRows: [],
                radioRow: null,
                propSelectKey: {},
                selectTreeIdName: {},
                highlight: false,
                keepSelect:false,
                showList:['DDP','NR','RDV','TBS'],// 研究按钮展示标识
            };
        },
        computed: {
            // 检查给的按钮是字符还是传入的方法进行格式化
            nameCheck(){
              return (name,row)=>{
                  if(typeof(name)==='function'){
                      return name(row);
                  }else{
                      return  name;
                  }
              }
            },
            tableHeight: function () {
                if (this.isPager) {
                    if (this.height) {
                        return this.height;
                    } else {
                        if (this.size === 'mini') {
                            return '408';
                        } else if (this.size === 'small') {
                            return '452';
                        } else {
                            return '485';
                        }
                    }
                }
            },
            defaultCellWidth(){
            },
        },
        watch: {
        },
        mounted: async function() {
            const columns = this.columns;
            for (let column of columns){
                // 如果是下拉，将prop和selectKey的对应关系找到存放起来
                if (column.selectKey) {
                    this.propSelectKey[column.prop] = column.selectKey;
                }
                // 如果是下拉树
                if (column.selectTreeKey) {
                    await this.initSelectTree(column.selectTreeKey);
                }
            }
            this.initTableData();
        },
        methods: {
            timeFormatter(val){
                let time = new Date(val);
                return this.initDate(time);
            },
            // 时间戳转时间
            initDate(timeStamp) {
                let time = new Date(timeStamp);
                let year = time.getFullYear();
                let month = time.getMonth() + 1;
                month = month < 10 ? ('0' + month) : month;
                let date = time.getDate();
                date = date < 10 ? ('0' + date) : date;
                let hour = time.getHours();
                hour = hour < 10 ? ('0' + hour) : hour;
                let minute = time.getMinutes();
                minute = minute < 10 ? ('0' + minute) : minute;
                let second = time.getSeconds();
                second = second < 10 ? ('0' + second) : second;
                let dateString = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
                return dateString;
            },
            getTableLength() {
                return this.tableLength;
            },
            initSelectTree: async function(selectTreeKey){
                const treeUrl = "/loan/treeAction.do?_md=getSelectTreeByCode&code=" + selectTreeKey;
                // 如果启用缓存并且缓存中存在
                if (this.isCache){
                    const listData = this.$sessionStorage.getSelectTreeData(treeUrl);
                    if (listData){
                        for (let item of listData){
                            this.selectTreeIdName[item.id] = item.name;
                        }
                        return;
                    }
                }
                // 如果不启用缓存或者缓存不存在
                const response = await this.$http.post(treeUrl);
                if (!response.success) {
                    console.error(response.msg)
                    return;
                }
                for (let item of response.data){
                    this.selectTreeIdName[item.id] = item.name;
                }
                // 如果启用缓存放入缓存
                if (this.isCache) {
                    this.$sessionStorage.setSelectTreeData(treeUrl, response.data);
                }
            },
            initTableData: function (params) {
                const _this = this;
                const searchParams = params || this.searchParams;
                if (searchParams) {
                    for (let key of Object.getOwnPropertyNames(searchParams)) {
                        if ('' === searchParams[key]) {
                            searchParams[key] = null;
                        }
                    }
                }
                this.axios
                    .post(this.url, {
                        pageNo: _this.pageNo,
                        pageSize: this.isPager ? _this.pageSize : 100,
                        ...this.initParams,
                        ...searchParams,
                    }).then(function (response) {
                    if (response.success) {
                        _this.loading = !(response.success);
                        _this.tableData = response.data.rows;
                        _this.totalRows = response.data.totalRows;
                        _this.highlight=false;
                        if(!_this.keepSelect){
                            _this.selectedRows = [];
                            _this.selectObj.selectedRowsId=[];
                            _this.selectObj.selectedRowsList=[];
                        }
                        _this.radioRow = null;
                        if (response.data.rows) {
                            if (response.data.rows.length === 0) {
                                _this.empty = "暂无数据!";
                            }else{
                                if(_this.selectObj.selectedRowsId.length&&_this.tableData.length){
                                    _this.tableData.forEach((row)=>{
                                        if(_this.selectObj.selectedRowsId.indexOf(row.id)>-1){
                                            _this.$refs.table.toggleRowSelection(row);
                                        }
                                    })
                                }
                            }
                            _this.tableLength = response.data.rows.length;
                        }
                    } else {
                        _this.tableLength = 0;
                        _this.loading = false;
                        _this.empty = "暂无数据!";
                        if (response.msg) {
                        	console.error(response.msg)
                        }
                    }

                }).catch(function (error) {
                    _this.tableLength = 0;
                    _this.loading = false;

                    _this.tableData= [{
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
                    _this.empty = "暂无数据!";
                    console.error(error.msg)

                });

            },
            handleSizeChange: function (pageSize) {
                this.pageSize = pageSize;
                this.initTableData();
            },
            handleCurrentChange: function (pageNo) {
                if(this.checkbox){
                    this.keepSelect=true;
                }
                this.pageNo = pageNo;
				delete this.searchParams.pageNo;
				delete this.initParams.pageNo;
                this.initTableData();
            },

            // 触发多选事件
            handleSelectionChange: function (selection) {
                this.selectedRows=selection;
                if(this.selectedRows.length){
                    this.selectedRows.forEach((item)=>{
                        if(this.selectObj.selectedRowsId.indexOf(item.id)===-1){
                            this.selectObj.selectedRowsId.push(item.id);
                        }
                        let list=this.selectObj.selectedRowsList.filter(inner=>{
                            return item.id===inner.id
                        })
                        if(!list.length){
                            this.selectObj.selectedRowsList.push(item);
                        }
                    })
                }else{
                    this.tableData.forEach((row)=>{
                        if(this.selectObj.selectedRowsId.indexOf(row.id)>-1){
                            this.selectObj.selectedRowsId=this.selectObj.selectedRowsId.filter((item)=>{
                                return item!==row.id;
                            })
                            let list=this.selectObj.selectedRowsList.filter(inner=>{
                                return row.id===inner.id
                            })
                            if(!list.length){
                                this.selectObj.selectedRowsList.push(row);
                            }
                        }
                    })
                }
                this.$emit('selection-change', selection);
            },
            handleSelect: function (selection, row) {
                // 如果是单选
                if (!this.checkbox) {
                    if (this.radioRow) {
                        //this.$refs.table.toggleRowSelection(this.radioRow, false);
                    }
                    if (this.radioRow === row) {
                        this.radioRow = null
                    } else {
                        this.radioRow = row;
                    }
                }else {
                    // 复选
                    if(this.selectedRows.indexOf(row)>-1){
                        this.$refs.table.toggleRowSelection(row, false);
                        this.selectObj.selectedRowsId=this.selectObj.selectedRowsId.filter((item)=>{
                            return item!==row.id;
                        });
                        this.selectObj.selectedRowsList=this.selectObj.selectedRowsList.filter((item)=>{
                            return item.id!==row.id;
                        });
                    }else{
                        this.$refs.table.toggleRowSelection(row, true);
                        if(this.selectObj.selectedRowsId.indexOf(row.id)===-1){
                            this.selectObj.selectedRowsId.push(row.id)
                        }
                       let list=this.selectObj.selectedRowsList.filter(item=>{
                                return item.id===row.id
                        })
                        if(!list.length){
                            this.selectObj.selectedRowsList.push(row);
                        }
                    }
                }
                this.$emit('select', selection);
            },
            handleSelectAll: function (selection) {
                // 如果是单选
                /*if (!this.checkbox) {
                    //this.$refs.table.clearSelection();
                    if (this.radioRow) {
                        this.$refs.table.toggleRowSelection(this.radioRow, true);
                    }
                }*/
                this.$emit('select-all', selection);
            },
            handleRowClick: function (row, event, column) {
                // 如果是单选
                if (!this.checkbox) {
                    if (this.radioRow) {
                        if (this.radioRow === row) {
                            this.highlight = false;
                            this.$refs.table.toggleRowSelection(row);
                            this.radioRow = null;
                        } else {
                            this.highlight = true;
                            this.$refs.table.toggleRowSelection(this.radioRow);
                            this.$refs.table.toggleRowSelection(row);
                            this.radioRow = row;
                        }
                    } else {
                        this.highlight = true
                        this.$refs.table.toggleRowSelection(row);
                        this.radioRow = row;
                    }
                } else {
                    this.highlight = true;
                    this.$refs.table.toggleRowSelection(row);
                }
                this.$emit('row-click', row, event, column);

            },
            // 获取选择行
            getSelectedRows: function () {
                return this.selectedRows;
            },
            toggleAllSelection() {
                return this.$refs.table.toggleAllSelection();
            },
            clearSelection() {
                return this.$refs.table.clearSelection();
            },
            search: function () {
                this.pageNo = 1;
                this.initTableData();
            },
            refresh: function () {
                this.initTableData();
            },
            headerRowClassName: function ({row, rowIndex}) {
                return "default-table-header-row-class";
            },
			formatter: function (row, column, cellValue, index) {

				if(this.columns[column.columnKey].contentType === 'money'){
					this.$set(this.columns[column.columnKey],'textAlign','right');
					return cellValue;
//					return moneyUtil.thuousandsChange(cellValue);
				}
				if(this.columns[column.columnKey].contentType === 'bfh'){
                    if(cellValue !== undefined ){
                        this.$set(this.columns[column.columnKey],'textAlign','right');
                        return cellValue;
//                      return bigDecimal.mul(cellValue, 100) + '%';
                    }
				}
				if(this.columns[column.columnKey].contentType === 'qfh'){
					this.$set(this.columns[column.columnKey],'textAlign','right');
					return cellValue;
//                      return bigDecimal.mul(cellValue, 1000) + '‰';
				}
				if(this.columns[column.columnKey].contentType === 'wfh'){
					this.$set(this.columns[column.columnKey],'textAlign','right');
					return cellValue;
//                      return bigDecimal.mul(cellValue, 10000) + '‱';
				}

                if(this.columns[column.columnKey].selectKey){
				    const formatterValue = this.$sessionStorage.getOptionValue(this.propSelectKey[column.property], cellValue);
					return formatterValue ? formatterValue : cellValue;
				}

                if(this.columns[column.columnKey].selectTreeKey){
                    const formatterValue = this.selectTreeIdName[cellValue];
                    return formatterValue ? formatterValue : cellValue;
                }

				if(this.columns[column.columnKey].formatter){
					return this.columns[column.columnKey].formatter(row, column, cellValue, index);
				}

                return cellValue;

           },
           tableHeaderColor({ row, column, rowIndex, columnIndex }) {
		      if (rowIndex === 0) {
		        return 'background-color:rgba(64,158,255,0.4) ; border:none;text-align:center'
		      }
           }

        },
    };
</script>
<style scoped>
    .operation-item {
        cursor: pointer;
        display: inline-block;
        background: #409EFF;
        color: #3ba1ff;
        background: #FFFFFF;
        border: 1px solid #3ba1ff;
        border-radius: 2px;
        padding: 0px 6px;
        line-height: 20px;
    }
    .operation-container {
        display: flex;
        justify-content: space-around;
    }
    .table-common>>>.image-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .table-common>>>.image-container>img{
        margin: 2px 2px;
    }
</style>
