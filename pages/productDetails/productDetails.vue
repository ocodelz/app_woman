<template>
	<view class="w-100 flex align-center justify-center flex-column">
		<block v-for="(item,index) in list" :key="index">
			<view class="w-100 flex justify-center  mt-2">
				<view class="bg-white border rounded" style="width: 686rpx;">
					<view class="flex flex-column py-2 ml-2">
						<text>设备名称: {{item.e_name}}</text>
						<view>
							<text>现价: {{item.e_purchase_price}}元</text>
							<text class="ml-3">租赁价格: {{item.e_rent_price}}元</text>
						</view>
						<text>代理商: {{item.e_agent}}</text>
						<text>厂家: {{item.e_firm}}</text>
						<text>类型: {{item.e_type}}</text>
						<view class="flex">
							<view class="flex-1" @click="handleStartDate" data-opt="0">
								<text>起始时间: {{start_date}}</text>
								<u-picker mode="time" title="请选择起始时间" v-model="is_strat" @confirm="handleConfirm"></u-picker>
							</view>
							<view class="flex-1" @click="handleStartDate" data-opt="1">
								<text>结束时间: {{end_date}}</text>
								<u-picker mode="time" title="请选择结束时间" v-model="is_end" @confirm="handleConfirm"></u-picker>
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<view class="flex w-100 position-fixed  bottom-0">
			<view :data-index="1" @click="howToUseIt" class="bg-primary flex align-center justify-center" style="width: 50%;height: 88rpx;">
				<text class="text-white">租用</text>
			</view>
			<view :data-index="2" @click="howToUseIt" class="bg-danger flex align-center justify-center" style="width: 50%;height: 88rpx;">
				<text class="text-white">购买</text>
			</view>
		</view>
	</view>
</template>

<script>
	import tool from '@/utils/util.js';
	export default {
		data() {
			return {
				is_strat: false,
				is_end: false,
				current: 0,
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
				collectionTime: ''
			}
		},
		onLoad(e) {
			this.equipment_id = e.equipment_id;
			this.e_type = e.e_type;
			this.e_name = e.e_name;
			this.pregnantID = e.pregnantID;
			this.p_Name = e.p_Name;
			this.p_IdCard = e.p_IdCard;
			this.p_Telephone = e.p_Telephone;
			this.equipment_id = e.equipment_id;
			this.collectionTime = tool.getFtSystemTime();
			this.handleGetProductDetail(this.equipment_id)
		},
		mounted() {
			uni.setNavigationBarTitle({
				title: this.e_name
			})
		},
		methods: {
			handleStartDate(e) {
				this.current = e.currentTarget.dataset.opt;
				return (this.current == 0) ? (this.is_strat = true) : (this.is_end = true);
			},
			handleConfirm(e) {
				let year = e.year;
				let month = e.month;
				let day = e.day;
				let date = year + '-' + month + '-' + day;
				return (this.current == 0) ? (this.start_date = date) : (this.end_date = date);
			},
			handleGetProductDetail(equipment_id) {
				this.$u.post('/GetAllDevice', {
					e_id: equipment_id
				}).then(res => {
					let arr = res.data;
					this.list = arr;
				})
			},
			howToUseIt(e) {
				switch (e.currentTarget.dataset.index) {
					case 1:
						this.collectionMethod = '租用';
						break;
					case 2:
						this.collectionMethod = '购买';
						break;
				}
				let data = {
					e_id: this.equipment_id,
					e_name: this.e_name,
					e_type: this.e_type,
					p_id: this.pregnantID,
					idcard: this.p_IdCard,
					tele: this.p_Telephone,
					cm: this.collectionMethod,
					c_name: this.p_Name,
					c_time: this.collectionTime
				}
				if (this.start_date == '---' || this.end_date == '---') {
					return uni.showModal({
						content: this.collectionMethod+'设备的起始时间和结束时间不能为空',
						showCancel:false
					})
				} else {
					this.$u.post('/EquipLease', data).then(res => {
						// console.log(JSON.stringify(res));
						if (res.code == 200 && res.data !== null) {
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
							uni.setStorage({
								key: 'equipment_ids',
								data: res.data
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
	}
</script>

<style>
</style>
