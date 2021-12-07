<template>
	<view class="wrap">
		<view class="page-style"></view>
		<view class="flex align-center fixed-top" style="height: 90rpx;">
			<view v-for="(item,index) in navItem" :key="index" class="font ml-4" @click="current = index">
				<text :class="current == index ? 'active-nav' : ''">{{item.name}}</text>
			</view>
		</view>
		<scroll-view scroll-y="true" class="position-fixed left-0 right-0 bottom-0"
			style="top: 90rpx;box-sizing: border-box;">
			<free-order-list :list="goodsList" :action="actionBtn" @route="handleTapOrder" @action="handleTapAction"
				status="orderManagement"></free-order-list>
		</scroll-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				customStyle: {
					width: '200rpx'
				},
				navItem: [{
					name: '全部'
				}, {
					name: '待付款'
				}],
				actionBtn: [{
					name: '取消订单',
					purchase_status: 4,
					show: true
				}, {
					name: '付款',
					purchase_status: 0,
					show: true
				}],
				goodsList: [{
						e_firm: '深圳瑞光康泰科技有限公司',
						purchase_status: 0,
						ename: '胎心监护仪0030胎心监护仪胎心监护仪',
						e_type: '胎心监护仪',
						e_buy_price: 159.00,
						e_count: 1,
						picture: 'http://www.ajylive.cn/update/pwguardapp/xueyayi.jpg',
						r_sum: 159.00
					},
					{
						e_firm: '深圳瑞光康泰科技有限公司',
						purchase_status: 1,
						ename: '胎心监护仪0030',
						e_type: '胎心监护仪',
						e_buy_price: 159.00,
						e_buy_price: 159.00,
						e_count: 1,
						picture: 'http://www.ajylive.cn/update/pwguardapp/xueyayi.jpg',
						r_sum: 159.00
					},
					{
						e_firm: '深圳瑞光康泰科技有限公司',
						purchase_status: 0,
						ename: '胎心监护仪0030',
						e_type: '胎心监护仪',
						e_buy_price: 159.00,
						e_count: 1,
						picture: 'http://www.ajylive.cn/update/pwguardapp/xueyayi.jpg',
						r_sum: 159.00
					},
					{
						e_firm: '深圳瑞光康泰科技有限公司',
						purchase_status: 1,
						ename: '胎心监护仪0030',
						e_type: '胎心监护仪',
						e_buy_price: 159.00,
						e_buy_price: 159.00,
						e_count: 1,
						picture: 'http://www.ajylive.cn/update/pwguardapp/xueyayi.jpg',
						r_sum: 159.00
					},
					{
						e_firm: '深圳瑞光康泰科技有限公司',
						purchase_status: 0,
						ename: '胎心监护仪0030',
						e_type: '胎心监护仪',
						e_buy_price: 159.00,
						e_count: 1,
						picture: 'http://www.ajylive.cn/update/pwguardapp/xueyayi.jpg',
						r_sum: 159.00
					},
					{
						e_firm: '深圳瑞光康泰科技有限公司',
						purchase_status: 1,
						ename: '胎心监护仪0030',
						e_type: '胎心监护仪',
						e_buy_price: 159.00,
						e_buy_price: 159.00,
						e_count: 1,
						picture: 'http://www.ajylive.cn/update/pwguardapp/xueyayi.jpg',
						r_sum: 159.00
					},
					{
						e_firm: '深圳瑞光康泰科技有限公司',
						purchase_status: 0,
						ename: '胎心监护仪0030',
						e_type: '胎心监护仪',
						e_buy_price: 159.00,
						e_count: 1,
						picture: 'http://www.ajylive.cn/update/pwguardapp/xueyayi.jpg',
						r_sum: 159.00
					},
					{
						e_firm: '深圳瑞光康泰科技有限公司',
						purchase_status: 1,
						ename: '胎心监护仪0030',
						e_type: '胎心监护仪',
						e_buy_price: 159.00,
						e_buy_price: 159.00,
						e_count: 1,
						picture: 'http://www.ajylive.cn/update/pwguardapp/xueyayi.jpg',
						r_sum: 159.00
					},
				],
				current: 0
			}
		},
		methods: {
			handleTapOrder(status) {
				this.$u.route('/pages/order/order?status=' + status)
			},
			handleTapAction(status) {
				console.log(status);
			}
		}
	}
</script>
<style scoped lang="scss">
	.wrap {
		.page-style {
			position: fixed;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			z-index: -1;
			background-color: #e8e8e8;
		}

		.active-nav {
			color: #e36436;
			font-weight: bold;
			font-size: 32rpx;
		}
	}
</style>
