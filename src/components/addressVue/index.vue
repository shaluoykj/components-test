<template>
	<div id="address-container">
	</div>
</template>

<script>
	import '@/components/addressVue/css/public.css'
	import '@/components/addressVue/css/mobileSelect.css'
	import addressData from '@/components/addressVue/js/data'
	import MobileSelect from '@/components/addressVue/js/mobileSelect'
	export default {
		data() {
			return {}
		},
		mounted() {
			this.initAddress();
		},
		methods: {
			initAddress() {
				var mobileSelect4 = new MobileSelect({
					trigger: '#address-container',
					title: '地区选择',
					wheels: addressData.wheels,
					transitionEnd: function(indexArr, data) {
						console.log(data);
					},
					callback: function(indexArr, data) {
						console.log(data);
					}
				});
			}
		}
	}
</script>

<style>
	
	#address-container {
		min-height: 50px;
		min-width: 200px;
		display: flex;
		align-items: center;
    justify-content: center;
    padding: 0 5px;
    border: 1px solid #DEDEDE;
    margin-left: 5px;
	}
</style>