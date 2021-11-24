<template>
	<view>
		<view class="info" v-if="title == '辣妈日记'">
			<text class="item">姓名：{{info.name}}</text>
			<text class="item">年龄：{{info.age}}</text>
			<text class="item">分娩日期：{{info.date}}</text>
			<text class="item">分娩方式：{{info.method}}</text>
			<text class="item">联系电话：{{info.tel}}</text>
			<text class="item">分娩天数：{{info.deliveryDays}}</text>
		</view>
		<view @click="handleIsDiary" class="flex align-end">
			<text class="text-primary font-md" style="text-decoration: underline;" >我要咨询</text>
			<text class="text-hover-warning">(点击“我要咨询”可不限时间，随时咨询)</text>
		</view>
		<view ></view>
		<scroll-view scroll-y v-if="title == '辣妈日记'" @scrolltolower="handleScrolltolower"
		:style="'height:' + scrollHeight + 'px'">
			<view class="category">
				<view class="category-item" v-for="(item,index) in list" :key="index" @click="handleTabItem(item,'0')">
					<u-image src="https://z3.ax1x.com/2021/07/30/WOLX11.png" width="60" height="65"></u-image>
					<view style="margin-left: 10rpx;">
						<!-- <text v-if="item.num && item.num>0">{{item.answer_type}}-{{item.num}}</text> -->
						<text>{{item.answer_type}}</text>
						<view class="flex">
							<text
								:style="handleStatusStyle(item.sub_status)">{{handleSubStatus(item.sub_status)}}</text>
							<text class="ml-1 text-danger" v-if="item.evaluate_results == '异常'">{{item.evaluate_results}}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y style="height: calc(100vh - 400rpx);" v-if="title == '萌宝日记'"
		@scrolltolower="handleScrolltolower">
			<block v-for="(item,index) in list" :key="index">
				<view class="category">
					<view class="category-item" v-for="(jtem,jndex) in item.answerList" :key="jndex"
						@click="handleTabItem(item,jtem)" v-if="current == index">
						<u-image src="https://z3.ax1x.com/2021/07/30/WOLX11.png" width="60" height="65"></u-image>
						<view style="display: flex;flex-direction: column;margin-left: 10rpx;">
							<text>{{jtem.answer_type}}</text>
							<view class="flex">
								<text :style="handleStatusStyle(jtem.sub_status)">{{handleSubStatus(jtem.sub_status)}}</text>
								<text class="ml-1 text-danger" v-if="jtem.evaluate_results == '异常'">{{jtem.evaluate_results}}</text>
							</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<view class="flex align-center " v-if="title == '萌宝日记'" style="height: 200rpx;">
			<view v-if="item.child_Name" @click="handleTapSwitchCurrett(index)" v-for="(item,index) in list"
				:key="index" class="ml-2 flex align-center justify-center flex-column rounded-circle"
				style="width: 180rpx;height: 180rpx;" :style="current == index ? 'border: 4rpx solid #19be6b;' : ''">
				<u-image width="100" height="100rpx"
					:src="item.child_Sex == '男'? 'https://z3.ax1x.com/2021/07/30/WO5kp8.png' : 'https://z3.ax1x.com/2021/07/30/WOLGwD.png'">
				</u-image>
				<text>{{item.child_Name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			state: {
				type: String,
				default: ''
			},
			list: {
				type: [Array, Object],
				default: () => {
					return []
				}
			},
			info: {
				type: [Object, Array],
				default: () => {
					return {}
				}
			},
			title: {
				type: String,
				default: ''
			},
			current: {
				type: [Number, String],
				default: 0
			}
		},
		data() {
			return {
				scrollHeight: 0
			}
		},
		computed: {
			handleSubStatus() {
				return function(status) {
					if (status == 0) {
						return `已保存`
					}
					if (status == 1) {
						return `已提交`
					}
					if (status == 2) {
						return `已审核`
					}
					if (status == 3) {
						return `未填写`
					}
				}
			},
			handleStatusStyle() {
				return function(status) {
					if (status == 3) {
						return `color: #ccc`;
					}
					if (status == 0) {
						return `color: #2979ff`;
					}
					if (status == 2) {
						return `color: #19be6b`;
					}
					if (status == 1) {
						return `color: #ff9900`;
					}
				}
			}
		},
		mounted() {
			let height = uni.getSystemInfoSync().windowHeight;
			this.scrollHeight = uni.upx2px(height + 180);
		},
		methods: {
			handleTabItem(item, jtem) {
				this.$emit('click', item, jtem);
			},
			handleTapSwitchCurrett(index) {
				// this.current = index;
				this.$emit('switchCurrent', index)
			},
			handleScrolltolower(e){
				// console.log(e);
				this.$emit('scrolltolower')
			},
			handleIsDiary(){
				this.$emit('handleIsDiary');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.category {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		// border: 1rpx solid #E1E1E1;
		.category-item {
			border: 1rpx solid #dee2e6;
			width: 49%;
			display: flex;
			flex-shrink: 0;
			justify-content: center;
			// justify-content: space-between;
			// flex-direction: column;
			// justify-content: center;
			align-items: center;
			margin-top: 10rpx;
			padding: 20rpx;
			border-radius: 8rpx;
		}
	}

	.info {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 20rpx 0;
		height: 180rpx;

		.item {
			flex-shrink: 0;
			margin-right: 20rpx;
		}
	}
</style>
