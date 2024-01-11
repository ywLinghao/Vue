<template>
	<view>
		文章列表

		<uni-fab ref="fab" :pattern="pattern" :horizontal="horizontal" :vertical="vertical"
			  @fabClick="fabClick" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF',
					iconColor: '#fff'
				},
				horizontal: 'right',
				vertical:'bottom'

			}
		},
		methods: {
			fabClick(){
				uni.navigateTo({
					url:"/pages/my/articles/create"
				})
			}

		}
	}
</script>

<style>

</style>