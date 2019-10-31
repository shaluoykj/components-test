<template>
	<!--<div style="display: flex;" class="container">
		头部测试
		<div flex-box="1" style="width: 500px;height: 20px;border: 1px solid red;"></div>
		<menu-header flex-box="1"></menu-header>
		<div flex-box="1" style="width: 500px;height: 20px;border: 1px solid red;"></div>
	</div>-->
	<div>
		<div>新header</div>
		<new-header></new-header>
	</div>
	
</template>

<script>
import menuHeader from '@/components/menu-header'
import newHeader from '@/components/newHeader'
	export default {
		components:{
			menuHeader,
			newHeader
		},
		data() {
			return {
				
			}
		},
		created: function() {

		},

		mounted: function() {

		},
		methods:{
			
		},
	}
</script>

<style>
.container>>>.ui-theme-header .ui-theme-header-menu.is-scrollable {
	position: relative;
    padding: 0 20px;
}
.container>>>.ui-theme-header .ui-theme-header-menu {
	overflow: hidden;
}
.container>>>.ui-theme-header-menu {
	overflow: hidden;
}
</style>