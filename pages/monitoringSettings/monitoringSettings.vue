<template>
	<view>
		<u-navbar title="监护设置" :border-bottom="false" :background="background" back-icon-color="#fff" title-color="#fff" back-icon-size="40"></u-navbar>
		<u-cell-group>
			<u-cell-item @click="handleFetalHeartRateCell" title="胎心二偏移" :value="fetalHeartRateValue"></u-cell-item>
			<u-cell-item @click="handlePressureBaseLineCell" title="压力基线" :value="pressureBaseLineValue"></u-cell-item>
			<u-cell-item @click="handleTypesOfFetalMovement" title="胎动类型" :value="typesOfFetalMovementValue"></u-cell-item>
			<u-cell-item title="标注管理"></u-cell-item>
		</u-cell-group>
		<!-- 胎心二偏移弹出层 -->
		<free-popup fixedBottom maskColor ref="fetalHeartRateExtend">
			<view class="bg-white" style="height: 400rpx;">
				<block v-for="(item,index) in fetalHeartRate" :key="index">
					<view class="w-100 flex align-center border-bottom justify-center" style="height: 80rpx;" @click="handleFetalHeartRateItem(item)">
						<text>{{item.counter}}</text>
					</view>
				</block>
				<u-gap height="10" bg-color="#eaecef"></u-gap>
				<view class="flex mt-2 align-center justify-center" @click="handleClosePopup" style="height: 80rpx;">
					<text>取消</text>
				</view>
			</view>
		</free-popup>
		<!-- 压力基线弹出层 -->
		<free-popup fixedBottom maskColor ref="pressureBaseLineExtend">
			<view class="bg-white" style="height: 400rpx;">
				<block v-for="(item1,index1) in pressureBaseLine" :key="index1">
					<view class="w-100 flex align-center border-bottom justify-center" style="height: 80rpx;" @click="handlePressureBaseLineItem(item1)">
						<text>{{item1.counter}}</text>
					</view>
				</block>
				<u-gap height="10" bg-color="#eaecef"></u-gap>
				<view class="flex mt-2 align-center justify-center" @click="handleClosePopup" style="height: 80rpx;">
					<text>取消</text>
				</view>
			</view>
		</free-popup>
		<!-- 胎动类型弹出层 -->
		<free-popup fixedBottom maskColor ref="typesOfFetalMovementExtend">
			<view class="bg-white" style="height: 300rpx;">
				<block v-for="(item2,index2) in typesOfFetalMovement" :key="index2">
					<view class="w-100 flex align-center border-bottom justify-center" style="height: 80rpx;" @click="typesOfFetalMovementItem(item2)">
						<text>{{item2.txt}}</text>
					</view>
				</block>
				<u-gap height="10" bg-color="#eaecef"></u-gap>
				<view class="flex mt-2 align-center justify-center" @click="handleClosePopup" style="height: 80rpx;">
					<text>取消</text>
				</view>
			</view>
		</free-popup>
	</view>
</template>
<script>
	import freePopup from '@/components/free-ui/free-popup/free-popup.vue'
	export default {
		components: {
			freePopup
		},
		data() {
			return {
				background: {
					backgroundColor: '#fc979f'
				},
				// 胎心二偏移默认值
				fetalHeartRateValue: '-20', 
				// 压力基线默认值
				pressureBaseLineValue: '10', 
				// 胎动类型默认值
				typesOfFetalMovementValue: '自动', 
				// 胎心二偏移
				fetalHeartRate: [{
						counter: '-20'
					},
					{
						counter: '-10'
					},
					{
						counter: '-50'
					}
				],
				// 压力基线
				pressureBaseLine: [{
						counter: '10'
					},
					{
						counter: '50'
					},
					{
						counter: '100'
					}
				],
				// 胎动类型
				typesOfFetalMovement: [{
						txt: '自动'
					},
					{
						txt: '手动'
					}
				]
			}
		},
		methods: {
			// 点击胎心二列打开弹出层
			handleFetalHeartRateCell() {
				this.$refs.fetalHeartRateExtend.show();
			},
			// 胎心二偏移
			handleFetalHeartRateItem(item) {
				this.fetalHeartRateValue = item.counter;
				this.$refs.fetalHeartRateExtend.hide();
			},
			// 关闭胎心二偏移弹出层
			handleClosePopup() {
				this.$refs.fetalHeartRateExtend.hide();
			},
			// 打开压力基线弹出层
			handlePressureBaseLineCell() {
				this.$refs.pressureBaseLineExtend.show();
			},
			// 修改压力基线值 关闭弹出层
			handlePressureBaseLineItem(item1) {
				this.pressureBaseLineValue = item1.counter;
				this.$refs.pressureBaseLineExtend.hide();
			},
			// 打开胎动类型弹出层
			handleTypesOfFetalMovement() {
				this.$refs.typesOfFetalMovementExtend.show();
			},
			// 选中胎动类型 关闭弹出层
			typesOfFetalMovementItem(item2) {
				this.typesOfFetalMovementValue = item2.txt;
				this.$refs.typesOfFetalMovementExtend.hide();
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
