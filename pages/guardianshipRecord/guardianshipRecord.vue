<template>
	<view class="content">
		<u-navbar title="监护记录" title-color="#fff" :border-bottom="false" :background="background"
			back-icon-color="#fff">
			<view class="flex align-center  w-100">
				<view class="position-absolute" style="right: 120rpx;" @click="handleFreePopup">
					<text class="text-white position-relative">筛选</text>
				</view>
			</view>
		</u-navbar>
		<view class="nav-box">
			<view class="nav">
				<view class="nav-item" v-for="(item,index) in navList" :key="index" @tap="navTap(index)"
					:class="currentTab == index?'active':''">{{item}}</view>
			</view>
			<view class="nav cell-box">
				<view class="nav-item" v-for="(item,index) in titleList" :key="index">{{item}}</view>
			</view>
		</view>
		<swiper class="swiper" disable-touch :current="currentTab">
			<swiper-item v-for="(itemL,indexL) in list" :key="indexL">
				<scroll-view scroll-y="true" style="height: 100%;" @touchstart="start" @touchend="end">
					<uni-swipe-action>
						<uni-swipe-action-item v-for="(item,index) in itemL" :key="index"
							:right-options="item.state == 1 ? options2 : null" :show="isOpened" :auto-close="true"
							@click="bindClick($event,item,index)">
							<view @click="handleItemClick(item)" class="cell-box"
								:style="item.state == 1 ? 'background:#d9d9d9;' : 'background:#ffffff'">
								<view class="cell">{{item.t_time}}</view>
								<view class="cell" v-show="item.type == '胎心'">{{item.duration}}</view>
								<view class="cell" v-show="item.type == '血糖'">{{item.celiangzhi}}</view>
								<view class="cell" v-show="item.type == '血压'">{{item.low_pressure}} -
									{{item.high_pressure}}
								</view>
								<view class="cell u-line-1">{{item.expert_opinion}}</view>
								<view class="cell">{{item.type}}</view>
							</view>
						</uni-swipe-action-item>
					</uni-swipe-action>
				</scroll-view>
			</swiper-item>
		</swiper>
		<free-popup ref="extend">
			<view class="bg-white position-fixed flex align-center pl-3"
				style="border: 1rpx solid #dee2e6; border-radius: 12rpx; right: 120rpx; top: 140rpx; width: 200rpx;height: 200rpx;">
				<u-checkbox-group>
					<u-checkbox @change="checkboxChange" v-model="item.checked" v-for="(item, index) in menus"
						:key="index" :name="item.name">{{item.name}}</u-checkbox>
				</u-checkbox-group>
			</view>
		</free-popup>
	</view>
</template>

<script>
	import tool from '@/utils/util.js';
	import uniSwipeAction from '../../components/uni-swipe-action/uni-swipe-action.vue';
	import uniSwipeActionItem from '../../components/uni-swipe-action-item/uni-swipe-action-item.vue';
	import freePopup from '@/components/free-ui/free-popup/free-popup.vue';
	import {
		clearStorageList,
		setStorageList
	} from '@/common/storage.js';
	export default {
		components: {
			uniSwipeAction,
			uniSwipeActionItem,
			freePopup
		},
		data() {
			return {
				show: false,
				isOpened: 'none',
				touchStartX: 0,
				touchStartY: 0,
				// options1: [{
				// 	text: '删除',
				// 	style: {
				// 		backgroundColor: '#dd524d'
				// 	}
				// }],
				options2: [{
						text: '上传',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
				background: {
					backgroundColor: '#fc979f'
				},
				currentTab: 0,
				navList: ['全部', '专家意见', '未上传'],
				titleList: ['时间', '时长/测量值', '专家意见', '类型'],
				list: [
					[],
					[],
					[]
				],
				// 筛选列表
				menus: [{
						name: '胎心',
						checked: true
					},
					{
						name: '血糖',
						checked: true
					},
					{
						name: '血压',
						checked: true
					}
				],
				// 孕妇id
				pre_id: '',
				// 开始时间
				start_time: '2020-01-01',
				// 结束时间
				end_time: '',
				typeArray: [],
				pagination: {
					rows: 15,
					page: 1,
					sidx: '',
					sord: '',
					records: 0,
					total: 0
				}
			}
		},
		onLoad(e) {
			uni.getStorage({
				key: 'user_login',
				success: (res) => {
					let obj = res.data
					this.pre_id = obj.PregnantID;
				}
			})
			this.getList();
		},
		methods: {
			// 点击返回
			// handleTapBack() {
			// 	uni.navigateBack({
			// 		delta: 1
			// 	})
			// },
			// 获取本地存储
			handleGetLocalCache() {
				return new Promise(function(resolve, reject) {
					uni.getStorage({
						key: 'xt_info',
						success: res => {
							resolve(res);
						}
					});
				});
			},
			// 存储
			handleSetStorage(data) {
				uni.setStorage({
					key: 'xt_info',
					data: data,
				})
			},
			bindClick(e, item, index) {
				if (e.content.text == '删除') {
					if (item.state == 1) {
						this.handleDeleteNotUploaded(item, index)
					}
				} else if (e.content.text == '上传') {
					this.handleUpload(item, index)
				}
			},
			// 重置本地数据
			resetData(item, index) {
				this.handleGetLocalCache().then(res => {
					let arr = res.data;
					arr.forEach((_item, _index) => {
						if (Object.is(JSON.stringify(_item), JSON.stringify(item))) {
							arr.splice(_index, 1);
						}
					})
					this.handleSetStorage(arr);
					this.getList();
				})
			},
			// 删除未上传
			handleDeleteNotUploaded(item, index) {
				uni.showModal({
					content: '确定要删除吗?',
					success: (res) => {
						if (res.confirm == true) {
							this.resetData(item, index);
						}
					}
				})
			},
			// 分发 本地上传
			handleUpload(item, index) {
				switch (item.type) {
					case '胎心':
						this.handleUploadTX(item, index)
						break;
					case '血压':
						this.handleUploadXY(item, index)
						break;
					case '血糖':
						this.handleUploadXT(item, index)
						break;
				}
			},
			// 上传血压
			handleUploadXY(item, index) {
				uni.showModal({
					content: '是否要上传?',
					success: (res) => {
						if (res.confirm == true) {
							let xy_data = {
								e_id: item.e_id,
								p_id: item.p_id,
								c_time: item.t_time,
								lp: item.low_pressure,
								hp: item.high_pressure,
								pulse: item.pulse,
								t_result: item.test_result,
								sbcljy: item.sbcljy,
							};
							this.$u.post('/UploadXYInfo', xy_data).then(res => {
								if (res.code == 200 && res.data == true) {
									this.$lz.toast(res.info);
									this.resetData(item, index);
								}
							})
						}
					}
				})
			},
			// 上传血糖
			handleUploadXT(item, index) {
				uni.showModal({
					content: '是否要上传?',
					success: (res) => {
						if (res.confirm == true) {
							let data = {
								e_id: item.e_id,
								p_id: item.p_id,
								c_time: item.t_time,
								kzy: item.kzy,
								eat: item.eat,
								effect: item.effect,
								celiangzhi: item.celiangzhi,
								t_result: item.test_result,
								sbcljy: item.sbcljy,
								c_feel: item.current_feeling,
								xtlable: item.xuetang_lable,
							};
							this.$u.post('/UploadXTInfo', data).then(res => {
								console.log(JSON.stringify(res));
								if (res.data == true && res.code == 200) {
									uni.showToast({
										title: res.info,
										icon: 'none',
									});
									this.resetData(item, index);
								}
							});
						}
					}
				})
			},
			// 上传胎心
			handleUploadTX(item, index) {
				console.log(item.txarr);
				uni.showModal({
					content: '是否要上传?',
					success: (res) => {
						if (res.confirm == true) {
							this.$u
								.post('/UploadListJHYInfo', {
									data: item.txarr
								})
								.then(res => {
									console.log(JSON.stringify(res));
									if (res.code == 200 && res.data == true) {
										this.$lz.toast(res.info);
										this.resetData(item, index);
									}
								}).catch(err => {
									this.$lz.toast(err.errMsg);
								})
						}
					}
				})
			},
			// 点击显示蒙版
			handleFreePopup() {
				this.$refs.extend.show();
			},
			navTap(index) {
				this.currentTab = index;
				this.getList();
			},
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				console.log(e);
				for (let item of this.menus) {
					if (item.name == e.name) {
						item.checked = !e.value;
						// console.log(item.checked == !e.value);
					}
				}
				this.getList();
			},
			getList() {
				this.handleGetLocalCache().then(res => {
					let arr = res.data,
						_arr = [];
					for (let item of arr) {
						if (this.pre_id == item.p_id) {
							_arr.push(item)
						}
					}
					this.handleGetQueryYfclInfo(_arr)
				})
			},
			// 发送网络请求获取信息
			handleGetQueryYfclInfo(_arr) {
				this.list[this.currentTab] = [];
				let typeArr = [];
				for (let item of this.menus) {
					if (item.checked == true) {
						typeArr.push(item.name)
					}
				}
				// console.log(typeArr);
				if (typeArr == this.typeArray) {
					return false
				}
				let listArr = [];
				for (let item of _arr) {
					for (let itemL of typeArr) {
						if (item.type == itemL) {
							listArr.push(item)
						}
					}
				}
				// console.log(listArr);
				this.$forceUpdate()
				this.list[2] = listArr;
				if (typeArr.length == 0) {
					return false;
				}
				// let Time = new Date();
				// let y = Time.getFullYear();
				// let m = Time.getMonth() - 1 < 10 ? '0'+ Time.getMonth() - 1 : Time.getMonth() - 1;
				// let d = Time.getDate() < 10 ? '0' + Time.getDate() : Time.getDate();
				// let hh = Time.getHours() < 10 ? '0' + Time.getHours() : Time.getHours();
				// let mm = Time.getMinutes() < 10 ? '0' + Time.getMinutes() : Time.getMinutes();
				// let ss = Time.getSeconds() < 10 ? '0' + Time.getSeconds() : Time.getSeconds();
				// this.start_time =  y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
				this.end_time = tool.getFtSystemTime();
				let item = JSON.stringify(this.pagination)
				let data = {
					pre_id: this.pre_id,
					start_time: this.start_time,
					end_time: this.end_time,
					type: typeArr.join(','),
					pagination: item
				}
				console.log(data);
				// console.log(JSON.stringify(data));
				this.$u.post('/QueryYFCLInfoNew', data).then(res => {
					console.log(res);
					if (res.code == 200 && res.data.rows.length) {
						this.pagination.total = res.data.total;
						let arr = res.data.rows,
							lArr = [],
							newList = [],
							eList = [];
						for (let item of this.list[2]) {
							for (let jtem of typeArr) {
								if (item.type == jtem) {
									lArr.push(item);
								}
							}
						}
						arr = lArr.length == 0 ? arr : arr.concat(lArr)
						if (arr.length > 0) {
							arr.forEach(item => {
								if (newList.indexOf(item) == -1) {
									newList.push(item)
								} else {
									newList.splice(newList.indexOf(item), 1);
								}
							})
						}
						this.list[0] = newList;
						for (let item of this.list[0]) {
							for (let jtem of typeArr) {
								if (item.type == jtem && item.expert_opinion) {
									if (eList.indexOf(item) == -1) {
										eList.push(item)
									} else {
										eList.splice(eList.indexOf(item), 1);
									}
								}
							}
						}
						this.list[1] = eList
						this.$forceUpdate()
					}
				}).catch(e => {
					console.log('catch');
					console.log(e);
				})
			},
			// 分发监护记录列表点击事件
			handleItemClick(item) {
				console.log(item);
				switch (item.type) {
					case '胎心':
						let path = item.e_firm == '深圳市理邦精密仪器股份有限公司' ?
							"/pages/fetalHeartRateMonitoring/fetalHeartRateMonitoring?tapState=1&purchaseState=1&detail=" +
							JSON.stringify(item) : this.$lz.toast('非法跳转！');

						uni.navigateTo({
							url: path
						})
						break;
					case '血糖':
						uni.navigateTo({
							url: "/pages/bloodGlucoseTest/bloodGlucoseTest?tapState=1&purchaseState=1&detail=" +
								JSON.stringify(item)
						})
						break;
					case '血压':
						uni.navigateTo({
							url: '/pages/takeBloodPressure/takeBloodPressure?tapState=1&purchaseState=1&detail=' +
								JSON.stringify(item)
						})
						break;
				}
			},
			start(e) {
				if (this.currentTab == 0 || this.currentTab == 1) {
					this.touchStartX = e.touches[0].clientX;
					this.touchStartY = e.touches[0].clientY;
				}
			},
			end(e) {
				if (this.currentTab == 0 || this.currentTab == 1) {
					// console.log(e)
					const subX = e.changedTouches[0].clientX - this.touchStartX;
					const subY = e.changedTouches[0].clientY - this.touchStartY;
					if (subY > 50 || subY < -50) {
						console.log('上下滑')
					} else {
						if (subX > 100) {
							if (this.pagination.page == this.pagination.total) {
								return this.$lz.toast('没有更多数据了');
							} else {
								this.pagination.page++;
								this.getList();
							}
						} else if (subX < -100) {
							console.log('左滑')
							if (this.pagination.page == 1) {
								return this.$lz.toast('已经是第一页了');
							} else {
								this.pagination.page--;
								this.getList();
							}
						} else {
							console.log('滑动幅度过小');
						}
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		.nav-box {
			.nav {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-flow: nowrap;
				background: #bbb4be;
				height: 90rpx;

				.nav-item {
					// padding: 0rpx 60rpx;
					box-sizing: border-box;
					width: 33.33%;
					font-size: 30rpx;
					color: #333;
					text-align: center;
				}

				.active {
					font-size: 32rpx;
					font-weight: bold;
					color: #000;
				}
			}

			.cell-box {
				height: 80rpx;
				background: #FFFFFF;
				border-bottom: 1px solid #F5F5F5;

				.nav-item {
					font-size: 28rpx;
					color: #333;
				}
			}

		}

		.swiper {
			position: fixed;
			left: 0;
			width: 100%;
			/* #ifdef H5 */
			top: calc(170rpx + 44px);
			height: calc(100vh - 156rpx - 44px);
			/* #endif */
			/* #ifndef H5 */
			top: 340rpx;
			height: calc(100vh - 340rpx);

			/* #endif */
			.cell-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-flow: nowrap;
				width: 100%;

				.cell {
					border-bottom: 1px solid #F5F5F5;
					box-sizing: border-box;
					width: 25%;
					height: 100rpx;
					font-size: 30rpx;
					color: #333;
					text-align: center;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}

	/deep/::-webkit-scrollbar {
		display: none;
	}
</style>
