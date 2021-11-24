<template>
	<view>
		<u-navbar title="绑定的设备清单" title-color="#fff" :border-bottom="false" :background="background"
			back-icon-color="#fff">
			<view class="flex align-center  w-100">
				<view class="position-absolute" style="right: 30rpx;">
					<u-button hover-class="none" :custom-style="customStyle" plain size="mini" :hair-line="false"
						@click="handleBtnClick">查看设备信息</u-button>
				</view>
			</view>
		</u-navbar>
		<view class="w-100 flex justify-center flex-column" v-if="list.length">
			<view class="w-100 flex justify-center mt-2" v-for="(item,index) in list" :key="index">
				<view @click="handleItem(index)" :class="{active:index == isActive}"
					class="flex align-center rounded border bg-white" style="width: 686rpx;height: 240rpx;">
					<view class="ml-2" style="width: 30%;height: 200rpx;">
						<u-image border-radius="8rpx" width="100%" height="200rpx"
							:src="item.e_type == '胎心监护仪' ? imgList[0] : item.e_type == '血糖仪' ? imgList[1] : item.e_type == '血压仪' ? imgList[2] : ''">
						</u-image>
					</view>
					<view class="flex flex-column ml-2" style="width: 70%;">
						<text>设备名称：{{item.e_name}}</text>
						<text>设备类型：{{item.e_type}}</text>
						<text
							:style="item.status == '已领用' ? 'color:#71d5a1' : 'color:#c8c9cc'">状态：{{item.status}}</text>
						<!-- <text>异常：无</text> -->
					</view>
				</view>
			</view>
		</view>
		<view class="mt-5" v-else>
			<u-empty mode="list"></u-empty>
		</view>
	</view>
</template>
<script>
	import tool from '../../utils/util.js';
	export default {
		data() {
			return {
				isActive: -1,
				customStyle: {
					background: '#fc7d8e',
					border: '1rpx solid #fc7d8e',
					color: '#fff'
				},
				background: {
					backgroundColor: '#fc979f',
				},
				// 数据渲染
				imgList: [
					'http://www.ajylive.cn/update/pwguardapp/jianhuyi.jpg', // 胎心
					'http://www.ajylive.cn/update/pwguardapp/xuetang.jpg', // 血糖
					'http://www.ajylive.cn/update/pwguardapp/xueyayi.jpg' // 血压
				],
				list: []
			}
		},
		onLoad() {
			//获取本地信息
			this.handleGetLocalStorage();
			this.handleTest();
		},
		methods: {
			// 获取本地信息
			handleGetLocalStorage() {
				uni.getStorage({
					key: 'user_login',
					success: (res => {
						this.handleDeviceInformation(res.data.PregnantID);
					})
				})
			},
			// 发起网络请求 获取设备信息
			handleDeviceInformation(y_id) {
				console.log(y_id);
				this.$u.post('/GetAllEquipmentsByPid', {
					pregnant_id: y_id,
				}).then(res => {
					console.log(res);
					// console.log(res);
					// let _list = res.data,
					// 	Arr = [];
					// for (let i in _list) {
					// 	Arr.push({
					// 		deviceName: res.data[i].e_name,
					// 		howToUseIt: res.data[i].e_type,
					// 		state: res.data[i].status,
					// 		id: res.data[i].PregnantID
					// 	})
					// }
					// this.list = this.list.concat(Arr);
					let arr = res.data;
					this.list = arr;
				}).catch(e => {
					uni.showModal({
						title: '提示',
						content: '未知错误',
						showCancel: false
					})
				})
			},
			handleTest() {

			},
			// 点击切换
			handleItem(index) {
				this.isActive = index;
			},
			// 列表点击判断
			handleBtnClick() {
				if (this.isActive == -1) {
					this.$lz.toast('请先选择设备');
				} else {
					uni.showModal({
						content: '开始时间:\n' + this.list[this.isActive].collection_time + '\n结束时间:\n' + this.list[
								this.isActive].return_time +
							'\n押金:' + this.list[this.isActive].rent_deposit + '元' + '\t费用/天:' + this.list[this
								.isActive].rent_price + '元',
						showCancel: false
					})
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.active {
		background-color: #f8f9fa;
	}
</style>
