<template>
	<view>
		<u-cell-group :border="false">
			<block v-for="(item,index) in list" :key="index">
				<u-cell-item @click="handleCellItem(item)" :title="item.F_CatelogName"></u-cell-item>
			</block>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.handleGetCategory();
		},
		methods: {
			handleGetCategory() {
				this.$u.post('/GetUsermanuals', {
					code: ''
				}).then(res => {
					// console.log(res);
					let arr = res.data;
					this.list = arr;
				})
			},
			// 分发列表事件
			handleCellItem(item) {
				switch(item.F_CatelogName){
					case '仪器操作和使用':{
						uni.navigateTo({
							url:'../instructions/instructions?detail='+item.F_CatelogCode
						})
						break;
					}
					case '技术参数和产品规格':{
						this.handleTips();
						break;
					}
					case '常见监护曲线':{
						this.handleTips();
						break;
					}
					case '常见问题':{
						this.handleTips();
						break;
					}
					case '如何寻找胎心':{
						this.handleTips();
						break;
					}
					case '功能与特点':{
						this.handleTips();
						break;
					}
				}
			},
			handleTips(){
				this.$lz.toast('暂未开放')
			}
		}
	}
</script>

<style>
</style>
