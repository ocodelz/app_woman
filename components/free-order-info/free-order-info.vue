<template>
	<view class="bg-white rounded px-2 m-2 py-3" style="width: 96%;box-sizing: border-box;"
		v-if="status == '0' || status == '1'">
		<view class="font-weight-bold">订单信息</view>
		<view class="flex align-center justify-between pt-2" v-for="(item,index) in list" :key="index">
			<text>{{item.name}}:</text>
			<text style="color: #ccc;">{{item.value}}</text>
		</view>
		<view class="flex align-center justify-center mt-3" style="color: #ccc;" @click="handleisShoaAll">
			{{text}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			status: {
				type: [Number, String],
				default: '0'
			},
			showAll: {
				type: Boolean,
				default: false
			}
		},
		name: "free-order-info",
		data() {
			return {

			};
		},
		computed: {
			text() {
				if (this.showAll == false) {
					return '查看更多'
				} else {
					return '收起'
				}
			}
		},
		methods:{
			handleisShoaAll(){
				this.$emit('showAll',this.showAll)
			}
		}
	}
</script>

<style>

</style>
