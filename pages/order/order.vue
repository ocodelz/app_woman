<template>
	<view class="wrap">
		<view class="page-style"></view>
		<view class="w-100 flex justify-center flex-wrap">
			<free-order-list :list="goods" :status="status" :goodCount.sync="goodCount" :orderNotes="orderNotes"
				@uploadCount="handleActiongoodCount" @blur="handleGoodCountBlur"></free-order-list>
			<view class="bg-white rounded px-2  py-4" style="width: 96%;box-sizing: border-box;"
				v-if="status == 'order'">
				<radio-group @change="handleRadioChange">
					<label v-for="(item, index) in paymentMethod" :key="item.value"
						class="flex align-center justify-between" :class="index !== 0 ? 'pt-2' : ''">
						<u-image :src="item.url" mode="aspectFit" width="48" height="48" shape="circle"></u-image>
						<view style="width: 300rpx;" class="pl-1">{{item.name}}</view>
						<view class="flex-1 flex justify-end">
							<radio :value="item.value" :checked="index === current" color="#f90" />
						</view>
					</label>
				</radio-group>
			</view>
			<free-order-info :list="showOrderInfo" :status="status" :showAll="showAll" @showAll="handleShowAll">
			</free-order-info>
		</view>
		<view class="w-100 bg-white position-fixed bottom-0 right-0 left-0 flex  justify-end p-2"
			style="height: 160rpx;">
			<view style="line-height: 70rpx;" class="mr-2" v-if="status == 'order'">
				<text style="color: #ccc;">共{{goodCount}}件，</text>
				<text>合计:</text>
				<text style="color: #e36436;">¥ {{goods[0].r_sum | formatPrice}}</text>
			</view>
			<view class="rounded-circle text-white flex align-center justify-center"
				style="width: 180rpx;height: 70rpx;" :style="handleActionBtnStyle" v-if="status != '1'"
				@click="handleOrderBtn">
				<text>{{status == 'order' ? '提交订单' : '付款'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import utils from '@/utils/util.js'
	export default {
		data() {
			return {
				goods: [{
					e_firm: '深圳瑞光康泰科技有限公司',
					ename: '胎心监护仪0030胎心监护仪胎心监护仪',
					e_type: '胎心监护仪',
					e_buy_price: 159.00,
					e_count: 1,
					picture: 'http://www.ajylive.cn/update/pwguardapp/xueyayi.jpg',
					r_sum: 159.00
				}],
				goodCount: 1,
				orderNotes: '',
				orderInfo: [{
						name: '订单编号',
						value: '202111290523192309765'
					},
					{
						name: '创建时间',
						value: '2021-12-02 17:08:00'
					},
					{
						name: '付款时间',
						value: '2021-12-02 17:08:00'
					},
					{
						name: '发货时间',
						value: '2021-12-02 17:08:00'
					},
					{
						name: '成交时间',
						value: '2021-12-02 17:08:00'
					}
				],
				paymentMethod: [{
						icon: '',
						value: 0,
						name: '微信支付',
						checked: true,
						url: '/static/image/order/weChatPay.png'
					},
					{
						icon: '',
						value: 1,
						name: '支付宝支付',
						url: '/static/image/order/payBayAliPay.png'
					}
				],
				current: 0,
				status: 'order',
				showAll: false
			}
		},
		onLoad(e) {
			this.handleSetNavigationBarTitle(e);
		},
		filters: {
			formatPrice(price) {
				if (typeof(price) === 'number') {
					return parseFloat(price).toFixed(2);
				}
				return 0.00
			}
		},
		computed: {
			showOrderInfo() {
				if (this.showAll == false) {
					let showOrderInfo = [];
					if (this.orderInfo.length > 1) {
						for (let i = 0; i < 3; i++) {
							showOrderInfo.push(this.orderInfo[i])
						}
					} else {
						showOrderInfo = this.orderInfo;
					}
					return showOrderInfo;
				} else {
					return this.orderInfo;
				}
			},
			handleActionBtnStyle() {
				if (this.status == 'order') {
					return `background-color: #f90;`
				} else {
					return `border:1rpx solid #f90;color:#f90;`
				}
			}
		},
		methods: {
			handleSetNavigationBarTitle(e) {
				this.status = e.status;
				let title;
				switch (e.status) {
					case 'order':
						title = '确认订单'
						break;
					case '0':
						title = '待付款'
						break;
					case '1':
						title = '支付成功'
						break;
					default:
						title = '订单'
						break;
				}
				uni.setNavigationBarTitle({
					title: title
				})
			},
			handleActiongoodCount(state) {
				if (state == 0 && this.goodCount > 1) {
					this.goodCount--;
				} else if (state == 0 && this.goodCount <= 1) {
					this.$lz.toast('亲,不能再减少了');
				} else {
					this.goodCount++;
				}
			},
			handleGoodCountBlur(e) {
				console.log(e);
				this.goodCount = e == 0 ? 1 : e;
			},
			handleRadioChange(e) {
				console.log(e);
			},
			handleShowAll(showAll) {
				this.showAll = !showAll;
			},
			// 底部订单按钮
			handleOrderBtn() {
				// 下单
				this.handleAppOrder();
			},
			handleAppOrder() {
				let millisecond = String(new Date().getMilliseconds());
				if (millisecond.length == 2) {
					millisecond = millisecond + '0';
				} else if (millisecond.length == 1) {
					millisecond = millisecond + '00';
				}
				let params = {
					appid: '',
					mchid: '',
					description: '',
					out_trade_no: utils.formatTime(new Date()).replace(/[/: ]/g, '') + millisecond,
					notify_url: '',
					amount: {
						total: 124.00
					}
				}
				console.log(params);
				this.$u.post('https://api.mch.weixin.qq.com/v3/pay/transactions/app', params).then(res => {
					// 调起支付
					this.handleRequestPayment();
				}).catch(err => {
					console.log(err);
				})
			},
			handleRequestPayment() {

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
	}
</style>
