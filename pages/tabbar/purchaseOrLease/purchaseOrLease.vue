<template>
	<view class="u-wrap">
		<!-- 顶部轮播 -->
		<view class="w-100" style="height: 440rpx;">
			<u-swiper class="home-data" border-radius="0" height="440" name="img" interval="3000" img-mode="scaleToFill" :list="swiperList"></u-swiper>
		</view>
		<view class="u-search-box" @click="handleTabSearch" v-if="productList.length">
			<view class="u-search-inner">
				<u-icon name="search" color="#909399" :size="28"></u-icon>
				<text class="u-search-text">搜索商品</text>
			</view>
		</view>
		<view class="u-menu-wrap" v-if="productList.length">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item,index) in productList" :key="index" class="u-tab-item" :class="[current==index ? 'u-tab-item-active' : '']"
				 :data-current="index" @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.etype}}</text>
				</view>
			</scroll-view>
			<block v-for="(item,index) in productList" :key="index" v-if="productList.length">
				<scroll-view scroll-y class="right-box" v-if="current==index">
					<view class="bg-white" style="border-radius: 8rpx;">
						<view class="item-title pl-2 pt-2">
							<text>{{item.etype}}</text>
						</view>
						<view @click="handleProductTap(item1)" class="flex py-2" v-for="(item1, index1) in item.body" :key="index1">
							<view class="flex align-center justify-center" style="width: 152rpx;">
								<u-image width="110" shape="square" height="110" border-radius="12" :src="item1.spec[0].picture"></u-image>
							</view>
							<view class="flex flex-column">
								<text class="font font-weight-normal">{{item1.ename}}</text>
								<view>
									<!-- <text class="font-sm" style="color: #F29100;">现价: {{item1.spec[0].e_buy_price}}元</text> -->
									<!-- <text class="font-sm ml-2" style="color: #deb1c8;" v-if="item1.spec[0].e_day_price">租赁价格: {{item1.spec[0].e_day_price}}元</text> -->
									<text class="font-sm" style="color: #deb1c8;" v-if="item1.spec[0].e_day_price">租赁价格: {{item1.spec[0].e_day_price}}元</text>
								</view>
								<text class="font-sm" style="color: #f00;">类型:{{item1.spec[0].e_type}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</block>
			<scroll-view scroll-y class="right-box" v-if="searchList.length && current == -1">
				<view class="bg-white" style="border-radius: 8rpx;" v-for="(item2,index2) in searchList" :key="index">
					<view @click="handleProductTap(jtem2)" class="flex py-2" v-for="(jtem2,jindex) in item2.body" :key="jindex">
						<view class="flex align-center justify-center" style="width: 152rpx;">
							<u-image width="110" shape="square" height="110" border-radius="12" :src="jtem2.spec[0].picture"></u-image>
						</view>
						<view class="flex flex-column">
							<text class="font font-weight-normal">{{jtem2.ename}}</text>
							<view>
								<text class="font-sm" style="color: #F29100;">现价: {{jtem2.spec[0].e_buy_price}}元</text>
								<text class="font-sm ml-2" style="color: #deb1c8;" v-if="jtem2.spec[0].e_day_price">租赁价格: {{jtem2.spec[0].e_day_price}}元</text>
							</view>
							<text class="font-sm" style="color: #f00;">类型:{{item2.etype}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="flex align-center justify-center flex-1" v-if="!productList.length || (!searchList.length && current == -1)">
				<u-empty mode="data"></u-empty>
			</view>
		</view>
		<view class="flex align-center justify-center mt-5" v-else="productList.length">
			<u-empty mode="data"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图
				swiperList: [{
						img: '/static/image/purchaseOrLease/xueya.jpg',
					},
					{
						img: '/static/image/purchaseOrLease/xuetang.jpg',
					},
					{
						img: '/static/image/purchaseOrLease/taixin.png',
					}
				],
				// 分类列表
				productList: [],
				pregnantID: '',
				p_Name: '',
				p_IdCard: '',
				p_Telephone: '',
				scrollTop: 0,
				current: 0,
				menuHeight: 0,
				menuItemHeight: 0,
				searchList: [],
				type: 0
			}
		},
		onLoad(e) {
			uni.getStorage({
				key: 'user_login',
				success: (res => {
					let obj = res.data;
					this.pregnantID = obj.PregnantID;
					this.p_Name = obj.P_Name;
					this.p_IdCard = obj.P_IdCard;
					this.p_Telephone = obj.P_Telephone;
				})
			})
			uni.$on('current', (res) => {
				this.current = res.current;
			})
			uni.$on('search', (res) => {
				this.current = -1;
				this.searchList = res.detail;
				this.type = res.type;
			})
		},
		onShow() {
			this.handleGetProductList();
			this.current = 0;
		},
		onUnload() {
			// 移除监听事件  
			uni.$off('current');
			uni.$off('search');
		},
		methods: {
			handleGetProductList() {
				let that = this;
				this.$u.post('/GetAllDeviceNew',{
					name: '',
					type: '0',
					p_type: '1'
				}).then(res => {
					this.productList = res.data;
					// console.log(this.productList);
					// console.log(this.productList);
				})
			},
			handleTabSearch() {
				uni.navigateTo({
					url: '../../search/search'
				})
			},
			// 点击跳转商品详情
			handleProductTap(item) {
				this.$u.route('/pages/productDetail/productDetail?detail='+encodeURIComponent(JSON.stringify(item)))
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				// if (index == this.current) return;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			}
		}
	}
</script>

<style scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}


	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #000;
		// font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid #dd6161;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}

	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}

	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	/deep/.uni-scroll-view::-webkit-scrollbar {
		display: none
	}
</style>
