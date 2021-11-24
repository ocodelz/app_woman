<template>
	<view>
		<block v-for="(item,index) in content" :key="index">
			<u-parse :html="item.F_CatelogContent" selectable></u-parse>
		</block>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				content:``,
				code:''
			}
		},
		onLoad(e) {
			this.code = e.detail;
			this.handleGetData(this.code);
		},
		methods: {
			handleGetData(code){
				this.$u.post('/GetUsermanuals', {
					code: code
				}).then(res => {
					let arr = res.data;
					this.content = arr;
				})
			}
		}
	}
</script>
<style>
	
</style>
