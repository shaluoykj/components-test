<template>
	<div>
		<div id="editor"></div>
	</div>
</template>

<script>
	import Editor from 'wangeditor'
	import 'wangeditor/release/wangEditor.min.css'
	export default {
		data: function() {
			return {
				fileList: [],
				editor: {},
				content: '',
				ueditor: {
					value: '默认文字',
					config: {
						initalFrameWidth: 900,
						initalFrameHeight: 420,
					}
				}
			}
		},
		created: function() {},
		mounted() {
			var editor = new Editor("#editor");
			editor.customConfig.uploadImgServer = 'http://localhost:8080/test/upload';
			//			this.editor.customConfig.customUploadImg = function(files, insert) {
			//				console.error(files);
			//				insert(imgUrl)
			//			};
			editor.customConfig.uploadFileName = 'file';
			editor.customConfig.uploadImgHooks = {
				customInsert: function(insertImg, result, editor) {
					var url = result &&result.data&& (result.url ? result.url:result.data.url);
					insertImg(url);
				}
			}
			editor.create();
		},
		methods: {
			submit() {
				this.content = this.$refs.ue.getUEContent();
				console.error(this.$refs.ue.getUEContent());
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			//将用户数据导入数据库
			submitUpload() {
				if(this.fileName == "") {
					alert('请选择要上传的文件！')
					return false
				}
				let fileFormData = new FormData();
				fileFormData.append('file', this.files, this.fileName); //filename是键，file是值，就是要传的文件，test.zip是要传的文件名
				let requestConfig = {
					headers: {
						'Content-Type': 'multipart/form-data'
					},
				}
				let thisObj = this;
				this.$http.post(
						"UserDetailUpload.do", fileFormData, requestConfig)
					.then(res => {
						if(res.body.ReturnCode == "9999") {
							thisObj.$message({
								type: "success",
								message: "批量导入成功"
							});
							thisObj.query();
						} else {
							thisObj.$message({
								type: "error",
								message: "批量导入失败,请稍后再试!"
							});
						}
					}).catch(() => {
						this.$message({
							type: "info",
							message: "已取消批量导入"
						});
					});
			},
		},
	}
</script>

<style>
	#editor>>>.w-e-text-container {
		height: 700px;
		background: white;
	}
</style>