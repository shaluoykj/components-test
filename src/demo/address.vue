<template>
	<div class="container">
		<div>地址联动</div>
		<div><address-select></address-select></div>
	</div>
</template>

<script>
	import AddressSelect from '@/components/addressVue'
	export default {
		components:{
			AddressSelect,
		},
		data() {
			return {}
		},
	}
</script>

<style>
.container {
	display: flex;
	/*font-size:16px;*/
	align-items: center;
	justify-content: center;
}
</style>