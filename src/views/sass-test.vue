<template>
	<div class="container">
		<div>
			{{msg}}
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				msg: 'sass'
			}
		},
		created: function() {},
		mounted: function() {},
		methods: {}
	}
</script>

<style scoped lang="scss">
	.container {
		div {
			color: red;
		}
	}
</style>