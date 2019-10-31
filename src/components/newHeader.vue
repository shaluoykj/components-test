<template>
	<div class="main-container">
		<div @click="scroll('left')" class="left-icon" v-show="isScroll">左边</div>
		<div class="menu-container" ref="content">
			<div class="menu-scroll" ref="scroll" :style="{ transform: `translateX(${this.currentTranslateX}px)` }">
				<div v-for="index in 6" class="menu-item">菜单栏{{index}}</div>
			</div>
		</div>
		<div class="right-icon"  @click="scroll('right')" v-show="isScroll">右边</div>
	</div>

</template>
<script>
	export default {
		data() {
			return {
				"message": 'hello',
				isScroll: false,
				scrollWidth: 0,
				contentWidth: 0,
				currentTranslateX: 0,
			}
		},
		created() {},
		mounted() {
			this.checkScroll()
			// 全局窗口变化监听，判断父元素和子元素的大小，从而控制isScroll的开关
		},
		methods: {
			scroll(direction) {
				/**
				 * 解决滑动时content内容width变化后无法滑动到最后一个菜单的bug
				 * add by lss
				 */
				this.contentWidth = this.$refs.content.clientWidth
				this.scrollWidth = this.$refs.scroll.clientWidth
				if(direction === 'left') {
					// 向右滚动
					if((this.contentWidth + this.currentTranslateX) > 0) {
						this.currentTranslateX = 0
					} else {
						this.currentTranslateX += this.contentWidth;
					}
				} else {
					// 向左滚动
					if(this.contentWidth * 2 - this.currentTranslateX <= this.scrollWidth) {
						this.currentTranslateX -= this.contentWidth
					} else {
						this.currentTranslateX = this.contentWidth - this.scrollWidth
					}
				}
			},
			checkScroll() {
				let contentWidth = this.$refs.content.clientWidth
				let scrollWidth = this.$refs.scroll.clientWidth
				if(this.isScroll) {
					// 页面依旧允许滚动的情况，需要更新width
					if(this.contentWidth - this.scrollWidth === this.currentTranslateX) {
						// currentTranslateX 也需要相应变化【在右端到头的情况时】
						this.currentTranslateX = contentWidth - scrollWidth
						// 快速的滑动依旧存在判断和计算时对应的contentWidth变成正数，所以需要限制一下
						if(this.currentTranslateX > 0) {
							this.currentTranslateX = 0
						}
					}
					// 更新元素数据
					this.contentWidth = contentWidth
					this.scrollWidth = scrollWidth
					// 判断何时滚动消失: 当scroll > content
					if(contentWidth > scrollWidth) {
						this.isScroll = false
					}
				}
				// 判断何时滚动出现: 当scroll < content
				if(!this.isScroll && contentWidth < scrollWidth) {
					this.isScroll = true
					// 注意，当isScroll变为true，对应的元素盒子大小会发生变化
					this.$nextTick(() => {
						contentWidth = this.$refs.content.clientWidth
						scrollWidth = this.$refs.scroll.clientWidth
						this.contentWidth = contentWidth
						this.scrollWidth = scrollWidth
						this.currentTranslateX = 0
					})
				}
			}
		}
	}
</script>

<style>
	.main-container {
		display: flex;
	}
	
	.left-icon {
		color: red;
		margin-right: 20px;
	}
	
	.menu-container {
		display: flex;
		width: 800px;
		overflow: hidden;
	}
	
	.menu-scroll {
		display: flex;
	}
	
	.menu-item {
		padding: 5px 10px;
		border: 1px solid red;
		min-width: 150px;
	}
	
	.right-icon {
		color: red;
		margin-left: 20px;
	}
</style>