<template>
	<view class="w-100 flex align-center justify-center flex-column">
		<block v-for="(item,index) in list" :key="index">
			<view class="w-100 flex justify-center  mt-2">
				<view class="bg-white border rounded" style="width: 686rpx;">
					<view class="flex flex-column py-2 ml-2">
						<text>设备名称: {{item.ename}}</text>
						<view>
							<!-- <text>现价: {{item.spec[0].e_buy_price}}元</text> -->
							<!-- <text class="ml-3">费用/天: {{item.spec[0].e_day_price}}元</text> -->
							<text>费用/天: {{item.spec[0].e_day_price}}元</text>
						</view>
						<text>代理商: {{item.spec[0].e_agent}}</text>
						<text>厂家: {{item.spec[0].e_firm}}</text>
						<text>类型: {{item.spec[0].e_type}}</text>
					</view>
				</view>
			</view>
		</block>
		<view class="flex w-100 position-fixed  bottom-0">
			<view @click="howToUseIt(0)" class="bg-primary flex align-center justify-center"
				style="height: 88rpx;width: 100%;">
				<text class="text-white">租用</text>
			</view>
		<!-- 	<view @click="howToUseIt(1)" class="bg-danger flex align-center justify-center"
				style="width: 50%;height: 88rpx;">
				<text class="text-white">购买</text>
			</view> -->
		</view>
		<u-popup mode="center" v-model="isShow" width="700" height="400" border-radius="12" safe-area-inset-bottom
			@open="handlePopupShow">
			<scroll-view scroll-y="true">
				<block v-for="(item,index) in list" :key="index">
					<view class="flex p-2">
						<text class="flex-1">押金: {{item.spec[0].e_deposit}}元</text>
						<text class="flex-1">费用/天: {{item.spec[0].e_day_price}}元</text>
					</view>
					<view class="flex p-2">
						<text @click="handleStartDate(0)" class="flex-1">起始时间: {{start_date}}</text>
						<text @click="handleStartDate(1)" class="flex-1">结束时间: {{end_date}}</text>
					</view>
					<text class="p-2" v-show="start_date && end_date !== '---'">总价: {{handResult()}}元</text>
				</block>
			</scroll-view>
			<view class="flex align-center justify-center mt-5">
				<u-button type="error" size="medium" @click="handleOrderInfo">租用</u-button>
			</view>
		</u-popup>
		<u-picker mode="time" v-model="isShowCalendar" :params="params" @confirm="handleChangeCalendar"></u-picker>
		<!-- <u-calendar v-model="isShowCalendar" :mode="mode" @change="handleChangeCalendar" max-date="2030-12-31"></u-calendar> -->
	</view>
</template>

<script>
	import tool from '@/utils/util.js';
	export default {
		data() {
			return {
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true
				},
				isShow: false,
				isShowCalendar: false,
				current: 0,
				result_money: 0,
				mode: 'date',
				start_date: '---',
				end_date: '---',
				list: [],
				// 领用设备ID
				equipment_id: '',
				// 领用设备类型
				e_type: '',
				// 领用设备名称
				e_name: '',
				// 领用人ID
				pregnantID: '',
				// 领用人姓名
				p_Name: '',
				// 领用人身份证号
				p_IdCard: '',
				// 领用电话
				p_Telephone: '',
				// 领用方式
				collectionMethod: '',
				// 领用时间
				collectionTime: '',
				// 使用天数
				day: 0
			}
		},
		onLoad(e) {
			let arr = JSON.parse(decodeURIComponent(e.detail));
			this.list.push(arr);
			uni.setNavigationBarTitle({
				title: this.list[0].ename
			})
			uni.getStorage({
				key: 'user_login',
				success: (res => {
					let obj = res.data;
					this.p_Telephone = obj.P_Telephone;
					this.p_IdCard = obj.P_IdCard;
					this.pregnantID = obj.PregnantID;
					this.p_Name = obj.P_Name;
				})
			})
			this.collectionTime = tool.getFtSystemTimes();
			let Time = new Date();
			let y = Time.getFullYear() + 1;
			let m = (Time.getMonth() + 1) < 10 ? '0' + (Time.getMonth() + 1) : (Time.getMonth() + 1);
			let d = Time.getDate() < 10 ? '0' + Time.getDate() : Time.getDate();
			let hh = Time.getHours() < 10 ? '0' + Time.getHours() : Time.getHours();
			let mm = Time.getMinutes() < 10 ? '0' + Time.getMinutes() : Time.getMinutes();
			let ss = Time.getSeconds() < 10 ? '0' + Time.getSeconds() : Time.getSeconds();
			this.end_date = y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':00';
		},
		methods: {
			handleChangeCalendar(e) {
				let date = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute + ':' + '00';
				if (this.current == 0) {
					this.start_date = date
				} else {
					this.end_date = date
				}
			},
			howToUseIt(index) {
				if (index == 0) {
					this.isShow = true;
					this.collectionMethod = '租用';
				} else {
					this.collectionMethod = '购买';
					uni.showToast({
						title: '暂未开放',
						icon: 'none'
					})
				}
			},
			handleStartDate(index) {
				this.isShowCalendar = true;
				this.current = index;
			},
			handlePopupShow() {
				// let time = this.collectionTime;
				this.start_date = this.collectionTime;
				console.log(this.start_date);
			},
			handResult() {
				let arr = this.list[0].spec[0];
				console.log(arr);
				if (this.start_date && this.end_date) {
					if (uni.getSystemInfoSync().platform == "android") {
						this.day = parseInt((new Date(this.end_date).getTime() - new Date(this.start_date).getTime()) / (
							24 * 60 * 60 * 1000)) + ((new Date(this.end_date).getTime() - new Date(this.start_date)
							.getTime()) % (24 * 60 * 60 * 1000) > 0 ? 1 : 0);
					} else {
						this.day = parseInt((new Date(this.end_date.replace(/-/g, '/')).getTime() - new Date(this
							.start_date.replace(/-/g, '/')).getTime()) / (24 * 60 * 60 * 1000)) + ((new Date(this
							.end_date.replace(/-/g, '/')).getTime() - new Date(this.start_date.replace(/-/g,
							'/')).getTime()) % (24 * 60 * 60 * 1000) > 0 ? 1 : 0);
					}

					if (this.day == 0) {
						return this.result_money = this.day * +arr.e_day_price + +arr.e_deposit + +arr.e_day_price;
					} else {
						return this.result_money = this.day * +arr.e_day_price + +arr.e_deposit
					}
				}
			},
			handleOrderInfo() {
				let val1 = this.start_date.replace(/-/g, '/');
				let val2 = this.end_date.replace(/-/g, '/');
				let time1 = new Date(val1);
				let time2 = new Date(val2);
				let start_date = time1.getTime();
				let end_date = time2.getTime();
				if (this.start_date == '---' || this.end_date == '---') {
					return uni.showToast({
						title: '请选择起始时间/结束时间',
						icon: 'none'
					})
				}
				let arr = this.list[0];
				let obj = {
					e_id: arr.equipment_id,
					e_name: arr.ename,
					e_type: arr.spec[0].e_type,
					p_id: this.pregnantID,
					idcard: this.p_IdCard,
					tele: this.p_Telephone,
					cm: this.collectionMethod,
					c_name: this.p_Name,
					c_time: this.start_date,
					r_time: this.end_date,
					r_days: this.day,
					r_price: arr.spec[0].e_day_price,
					r_sum: this.result_money,
					r_deposit: arr.spec[0].e_deposit
				}
				console.log(obj);
				this.$u.post('/EquipLeaseNew', obj).then(res => {
					console.log(res);
					if (res.code == 200 && res.data !== null) {
						this.isShow = false;
						uni.showModal({
							title: '提示',
							content: '设备' + this.collectionMethod + '成功!\n请联系管理员，领用设备。',
							showCancel: false,
							success: (res) => {
								if (res.confirm) {
									uni.$emit('current', {
										current: 0
									});
									uni.navigateBack();
								}
							}
						})
					} else {
						uni.showModal({
							title: '提示',
							content: '未知错误',
							showCancel: false
						})
					}
				}).catch(e => {
					console.log(e);
					uni.showToast({
						title: '提示',
						content: '错误',
						icon: 'none'
					})
				})
			}
		}
	}
</script>

<style>
</style>
