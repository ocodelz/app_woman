<template>
	<view class="w-100 flex justify-center flex-wrap" :class="status !== 'orderManagement' ? 'mt-2' : ''">
		<view class="bg-white rounded p-2 mb-2 " v-for="(item,index) in list" :key="index" style="width: 96%;"
			@click="handleTapOrder(item.purchase_status)">
			<view class="flex justify-between">
				<text class="font-weight-bold font-md">{{item.e_firm}}</text>
				<text style="color: #e36436;"
					class="font-weight-normal">{{item.purchase_status | formPurchaseStatus}}</text>
			</view>
			<view class="flex py-2">
				<u-image width="180" shape="square" height="180" border-radius="12" :src="item.picture">
				</u-image>
				<view class="pl-2 flex-1">
					<view class="flex justify-between">
						<text class="font-weight-bold text-ellipsis" style="width: 360rpx;">{{item.ename}}</text>
						<text class="font-weight-bold">¥{{item.e_buy_price | formatPrice}}</text>
					</view>
					<view class="flex justify-end" style="color: #ccc;">
						<text>x{{item.e_count}}</text>
					</view>
				</view>
			</view>
			<view v-if="status !== 'order'" class="flex justify-end">
				<view style="color: #ccc;" v-if="status != '1'">
					<text class="font">总价</text>
					<text class="font-small font-weight-bold">¥</text>
					<text class="font-weight-bold font-md">{{item.r_sum | formatPrice}}</text>
				</view>
				<view class="font-weight-bold ml-1">
					<text class="font">{{status != '1' ? '需' : '实'}}付款</text>
					<text class="font-small">¥</text>
					<text class="font-md">{{item.r_sum | formatPrice}}</text>
				</view>
			</view>
			<view class="pl-5 mt-1" v-if="status == 'order'">
				<view class="flex justify-between align-center">
					<text>购买数量</text>
					<view class="flex rounded" style="border: 2rpx solid #DEE2E6;">
						<view class="flex align-center justify-center" style="width: 40rpx;"
							@click="handleActiongoodCount(0)">-</view>
						<u-input v-model="goodCounts" type="number" :custom-style="customStyle" height="20"
							input-align="center" :clearable="false" placeholder="" @blur="handleGoodCountBlur" />
						<view class="flex align-center justify-center" style="width: 40rpx;"
							@click="handleActiongoodCount(1)">+</view>
					</view>
				</view>
				<view class="flex align-center mt-2 py-1">
					<text>订单备注</text>
					<u-input v-model="orderNotes" placeholder="选填" class="ml-2" />
				</view>
			</view>
			<view class="flex justify-end mt-1" v-if="status == 'order'">
				<view style="color: #ccc;">
					<text>共{{goodCounts}}件</text>
					<text class="text-dark ml-1">小计：</text>
					<text class="font-small font-weight-bold" style="color: #e36436;">¥</text>
					<text class="font-weight-bold font-md" style="color: #e36436;">{{item.r_sum | formatPrice}}</text>
				</view>
			</view>
			<view class="flex align-center justify-end mt-2" v-if="item.purchase_status == 0">
				<view class="action-btn ml-2" v-for="(item,index) in action" :key="index"
					@click.stop="handleTapAction(item.purchase_status)">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			status: {
				type: [Number, String],
				default: ''
			},
			goodCount: {
				type: [Number, String],
				default: 1
			},
			orderNotes: {
				type: String,
				default: ''
			},
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			action: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				customStyle: {
					width: '60rpx',
					borderLeft: '2rpx solid #DEE2E6',
					borderRight: '2rpx solid #DEE2E6'
				},
				goodCounts: 1
			}
		},
		mounted() {
			this.goodCounts = this.goodCount;
		},
		watch: {
			goodCount: {
				handler(newVal, oldVal) {
					this.goodCounts = newVal;
					this.list[0].e_count = newVal;
					this.list[0].r_sum = newVal * this.list[0].e_buy_price
				},
				immediate: true
			}
		},
		filters: {
			formPurchaseStatus(status) {
				switch (status) {
					case 0:
						return `等待买家付款`
					case 1:
						return `支付成功`
				}
			},
			formatPrice(price) {
				if (typeof(price) === 'number') {
					return parseFloat(price).toFixed(2);
				}
				return 0.00
			}
		},
		methods: {
			handleTapOrder(status) {
				this.$emit('route', status)
			},
			handleTapAction(status) {
				this.$emit('action', status)
			},
			handleGoodCountBlur(e) {
				this.$emit('blur', e)
			},
			handleActiongoodCount(state) {
				this.$emit('uploadCount', state)
			},
		}
	}
</script>

<style scoped>
	.action-btn {
		width: 160rpx;
		border: 1rpx solid #e36436;
		color: #e36436;
		display: flex;
		justify-content: center;
		border-radius: 100rpx;
		padding: 10rpx 0;
	}
</style>
