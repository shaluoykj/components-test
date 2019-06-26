<template>
	<div>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		created: function() {
			const params = {
				'LoginType': 'P',
				'Username': 'admin1',
				'Password': 'admin1'
			}
			this.axios.post('http://localhost:8080/apigate/login.do', params)
				.then(res => {
					console.log('res=>', res);
				})
		},
		mounted: function() {},
		methods: {}
	}
</script>

<style>

</style>