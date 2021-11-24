<template>
	<view class="w-100 flex flex-column " :style="'height:' + pageHeight + 'px'">
		<u-navbar title="血压测量" title-color="#fff" back-icon-color="#fff" :background="background" :border-bottom="false"></u-navbar>
		<view style="height: 300rpx" class="flex flex-column  flex align-center justify-center">
			<u-image width="96%" height="100%" src="/static/image/takeBloodPressure/xueyabanner.jpg"></u-image>
		</view>
		<u-line style="height: 1rpx;" color="#22b14c" margin="20rpx 0" />
		<!-- 测量结果 -->
		<view class="flex flex-column">
			<view class="ml-2"><text class="flex font-weight-bold" style="color: #ff7f27;">测量结果</text></view>
			<view class="flex flex-column align-center justify-center">
				<view class="flex justify-center flex-column align-center">
					<!-- 血压 -->
					<view class="flex align-center justify-start mt-4" style="width:100%">
						<view class="bloodPressureBox"><text class="font-weight-bold">血压</text></view>
						<view class="ml-2">
							<u-image width="150" height="240" src="/static/image/takeBloodPressure/xueya.png"></u-image>
						</view>
						<view class="flex align-center flex-column justify-center">
							<view class="flex align-center ml-2" style="min-width: 210rpx;">
								<view class="flex flex-column">
									<text class="font-md font-weight-bold">收缩压</text>
									<text class="font-small text-muted">mmHg</text>
								</view>
								<view class="ml-3" style="width: 100rpx;display: block;">
									<text v-if="info.systolicPressure > 0" :style="systolicPressureFontStyle" class="sfont">{{ info.systolicPressure}}</text>
									<text v-else class="font-lg font-weight-bold">---</text>
								</view>
							</view>
							<view class="flex align-center ml-2" style="min-width: 210rpx;">
								<view class="flex flex-column mt-2">
									<text class="font-md font-weight-bold">舒张压</text>
									<text class="font-small text-muted">mmHg</text>
								</view>
								<view class="ml-3" style="width: 100rpx;display: block;">
									<text v-show="isDiastolicPressureValue == false" class="sfont" :style="diastolicPressureFontStyle">{{ info.diastolicPressure }}</text>
									<text v-show="isDiastolicPressureValue == true" class="font-lg font-weight-bold">---</text>
								</view>
							</view>
						</view>
						<view v-if="isShowXy" class="flex align-center justify-center" :style="bloodPressureResultBgStyle" style="text-align: center; width: 40rpx;height: 160rpx;
					border-radius: 25rpx;">
							<text class="text-white">{{ info.bloodPressureResult }}</text>
						</view>
						<view class="ml-2">
							<view>
								<text class="font-weight-bold font-sm">理想标准</text>
								<text class="font-small font-weight-bold">(mmHg):</text>
							</view>
							<view class="font-sm">收缩压&lt;120</view>
							<view class="font-sm">舒张压&lt;80</view>
						</view>
					</view>
					<!-- 心率 -->
					<view class="flex align-center justify-start mt-3" style="width:100%">
						<view class="bloodPressureBox"><text class="font-weight-bold ">心率</text></view>
						<view class="ml-2">
							<u-image width="180" height="160" src="/static/image/takeBloodPressure/xinlv.png"></u-image>
						</view>
						<view class="flex align-center flex-column justify-center" style="min-width: 210rpx">
							<view class="flex align-center">
								<text v-show="isHeartValue == false" class="sfont">{{ info.heartRate }}</text>
								<text v-show="isHeartValue == true" class="font-lg font-weight-bold">---</text>
								<text class="font-lg font-weight-bold">/分钟</text>
							</view>
						</view>
						<view v-if="isShowXl" class="flex align-center justify-center" style="width: 40rpx;height: 160rpx;
					border-radius: 25rpx;"
						 :style="heartRateBgStyle">
							<text class="text-white text-center">{{ info.heartRateResult }}</text>
						</view>
						<view class="ml-2">
							<view>
								<text class="font-weight-bold font-sm">正常标准</text>
								<text class="font-small font-weight-bold">(分钟):</text>
							</view>
							<view class="font-sm">心率:60-100</view>
						</view>
					</view>
				</view>
			</view>
			<u-line style="height: 2rpx;" color="#22b14c" margin="60rpx 0 30rpx 0" />
			<view class="flex flex-column ml-2">
				<!-- 测量结果 v-if="tapState == 0"-->
				<view class="flex align-center">
					<text class="font-lg font-weight-bold">测量结果：</text>
					<text class="font-lg font-weight-bold" :class="info.t_result == '---' ? 'text-dark' : 'text-danger'" v-if="info.t_result">{{ info.t_result }}</text>
					<text v-else class="font-lg font-weight-bold">---</text>
				</view>
				<!-- 测量时间 v-if="tapState == 0"-->
				<view class="flex align-center">
					<text class="font-lg font-weight-bold">测量时间：</text>
					<text v-if="info.c_time !== ''" class="font-lg font-weight-bold text-danger">{{ info.c_time }}</text>
					<text v-else class="font-lg font-weight-bold">---</text>
				</view>
				<view v-if="audit">
					<view class="flex align-center" v-if="info.exam_result">
						<text class="font-lg font-weight-bold">审核结果：</text>
						<text class="font-lg font-weight-bold text-danger">{{ info.exam_result }}</text>
					</view>
					<view class="flex align-center" v-if="info.exam_time">
						<text class="font-lg font-weight-bold">审核时间：</text>
						<text class="font-lg font-weight-bold text-danger">{{ info.exam_time }}</text>
					</view>
					<view class="flex align-center" v-if="info.yishengjianyi">
						<text class="font-lg font-weight-bold">医生建议：</text>
						<text class="font-lg font-weight-bold text-danger">{{ info.yishengjianyi }}</text>
					</view>
					<!-- <view class="flex align-center">
					<text class="font-lg font-weight-bold">设备建议：</text>
					<text class="font-lg font-weight-bold text-danger">{{list.sbcljy}}</text>
				</view> -->
				</view>
			</view>
		</view>
		<u-line class="flex " style="height: 1rpx;" color="#22b14c" margin="40rpx 0 60rpx 0" />
		<!-- <view>{{testdata}}</view> -->
		<!-- 底部操作按钮 -->
		<view v-if="btnBox" style="height: 140rpx;" class="flex align-center justify-center">
			<view v-if="operationButton" @click="tapState == 0 ? handleOperationStartButton() : ''">
				<u-image src="/static/image/takeBloodPressure/kaishi.png" width="140" height="140"></u-image>
			</view>
			<view v-else class="ml-2">
				<u-image src="/static/image/takeBloodPressure/zanting.png" width="140rpx" height="140rpx"></u-image>
			</view>
		</view>
		<u-top-tips ref="uTips"></u-top-tips>
		<u-popup mode="center" v-model="show" width="700" height="500" border-radius="12" safe-area-inset-bottom v-if="purchaseState == 0">
			<text class="flex align-center justify-center font-md font-weight-bold mt-4">以下设备即将过期</text>
			<scroll-view scroll-y="true"style="height: 300rpx;">
				<view class="flex flex-column mt-3 ml-3" v-for="(item,index) in updateList" :key="index">
					<text>设备名称: {{item.e_name}}</text>
					<text>设备类型: {{item.e_type}}</text>
					<text>到期时间: {{item.return_time}}</text>
				</view>
			</scroll-view>
			<view class="flex align-center justify-center mt-2">
				<u-button type="error" size="medium" @click="show = false">我知道了</u-button>
			</view>
		</u-popup>
	</view>
</template>
<script>
	import {
		clearStorageList,
		setStorageList
	} from '@/common/storage.js';
	let bldprs = null;
	let bldPressDevice = require('@/utils/BTDevice/BldPressBTDevice.js');
	import tool from '@/utils/util.js';
	export default {
		data() {
			return {
				background: {
					background:'#fc979f'
				},
				testdata: '',
				// 底部操作按钮
				operationButton: true,
				// 舒张压显示状态
				isDiastolicPressureValue: true,
				// 心率显示状态
				isHeartValue: true,
				purchaseState: 0,
				// 血压
				info: {
					// 设备ID
					e_id: '',
					e_name: '',
					notice_id: '',
					service_id: '',
					write_in_id: '',
					// 孕妇ID
					p_id: '',
					// 测量时间
					c_time: '',
					// 收缩压
					systolicPressure: '',
					// 舒张压
					diastolicPressure: '',
					// 脉搏
					heartRate: '',
					// 血压结果
					bloodPressureResult: '',
					// 心率结果
					heartRateResult: '',
					// 测量结果
					t_result: '',
					// 设备建议
					sbcljy: '',
					// 审核时间
					exam_time: '',
					// 审核结果
					exam_result: '',
					// 医生建议
					yishengjianyi: ''
				},
				btnBox: true, // 开始 暂停 按钮
				audit: false, // 审核结果
				isShowXy: false,
				isShowXl: false,
				xydata: {},
				tapState: 0,
				pageHeight: 0,
				szyList: [],
				ssyList: [],
				xlList: [],
				updateList: [],
				show: false
			};
		},
		onLoad(e) {
			let _self = this;
			try {
				let pageHeight = uni.getSystemInfoSync();
				_self.pageHeight = pageHeight.windowHeight - 30;

				// #ifdef APP-PLUS
				plus.device.setWakelock(true);
				// #endif
				if(e.purchaseState){
					this.purchaseState = e.purchaseState
				}

				let result = uni.getStorageSync('result_storage');
				console.log(result)
				for (let item of result) {
					if (item.classify_name === '收缩压') {
						this.ssyList.push(item)
					} else if (item.classify_name === '舒张压') {
						this.szyList.push(item)
					} else if (item.classify_name === '心率') {
						this.xlList.push(item)
					}
				}
				console.log(this.ssyList);
				console.log(this.szyList);
				console.log(this.xlList);
				if (e.detail) {
					setTimeout(() => {
						this.btnBox = false;
						let xy = this.info;
						let _xyobj = JSON.parse(e.detail);
						// console.log(JSON.stringify(_xyobj));
						this.isDiastolicPressureValue = false;
						this.isHeartValue = false;
						this.audit = true;
						xy.c_time = _xyobj.t_time;
						xy.exam_result = _xyobj.exam_result;
						xy.exam_time = _xyobj.exam_time;
						xy.yishengjianyi = _xyobj.yishengjianyi;
						xy.systolicPressure = _xyobj.high_pressure;
						xy.diastolicPressure = _xyobj.low_pressure;
						xy.heartRate = _xyobj.pulse;
						this.tapState = 1;
						this.info.t_result = _xyobj.test_result;
						this.$forceUpdate();
					}, 500);
				} else {
					let that = this;
					uni.getStorage({
						key: 'user_login',
						success: res => {
							this.info.p_id = res.data.PregnantID;
							this.handleDeviceInformation(res.data.PregnantID)
						}
					});
					bldprs = new bldPressDevice.BldPressBTDevice();
					bldprs.close();
					bldprs.init();
					setTimeout(() => {
						uni.getStorage({
							key: 'equipment_ids',
							success: res => {
								let arr = res.data,
									_arr = [];
								for (let item of arr) {
									if (item.status === "已领用" && item.e_type === "血压仪") {
										_arr.push(item)
									}
								}
								if (_arr.length > 1) {
									uni.showModal({
										title: '提示',
										content: '设备绑定过多，请联系管理员',
										showCancel: false
									})
									that.tapState = 1;
									return;
								}
								var item = _arr.find(function(element) {
									return element.e_type == '血压仪';
								});
								if (item == null) {
									uni.showModal({
										title: '提示',
										content: '请联系医院管理员进行设备购买/租用~',
										showCancel: false
									});
									that.tapState = 1;
									return;
								}
								if (!item.notice_id || !item.write_in_id || !item.service_id || !item.e_name) {
									uni.showModal({
										title: '提示',
										content: '请先领用/购买设备哦~',
										showCancel: false
									});
									that.tapState = 1;
									return;
								}
								that.info.e_name = item.e_name;
								that.info.notice_id = item.notice_id;
								that.info.write_in_id = item.write_in_id;
								that.info.service_id = item.service_id;
								that.info.e_id = item.equipment_id;
							}
						});
					}, 1000)
				}
			} catch (e) {
				console.log(e.message);
				this.testdata = e.message;
			}
		},
		destroyed() {
			try {
				// #ifdef APP-PLUS
				plus.device.setWakelock(false);
				// #endif
				bldprs.close();
			} catch (e) {
				console.log(e.message);
				this.testdata = e.message;
			}
			//bldprs.stop();
		},
		onShow() {
			this.handleUpdateEquipStatus();
		},
		onReady() {
			let that = this;
			try {
				if (that.tapState == 0) {
					//this.$refs.uToast.show
					that.$refs.uTips.show({
						title: "请把绑带绑扎到上肢,打开电源开关,\r\n点按底部的'三角形按钮',开始血压测量!",
						// 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
						type: 'info',
						position: 'center',
						duration: 10000,
						// 如果不需要图标，请设置为false
						icon: true
					});
				}
			} catch (e) {
				console.log(e.message);
				this.testdata = e.message;
			}
		},
		computed: {
			// 动态显示血压测试结果样式
			bloodPressureResultBgStyle() {
				let ssyVal = Number(this.info.systolicPressure);
				let szyVal = Number(this.info.diastolicPressure);
				let _result = '',
					_bg = '';
				for (let item of this.ssyList) {
					for (let _item of this.szyList) {
						if (item.jieguopanding === '低血压（收缩压）' && _item.jieguopanding === '低血压（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2) && (szyVal >= _item.jieguozhifanwei1 &&
									szyVal < _item.jieguozhifanwei2)) {
								_result = '低压';
								_bg = '#ccc';
							}
						} else if (item.jieguopanding === '理想（收缩压）' && _item.jieguopanding === '理想（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2) && (szyVal >= _item.jieguozhifanwei1 &&
									szyVal < _item.jieguozhifanwei2)) {
								_result = '理想';
								_bg = '#399561';
							}
						} else if (item.jieguopanding === '正常（收缩压）' && _item.jieguopanding === '正常（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2) && (szyVal >= _item.jieguozhifanwei1 &&
									szyVal < _item.jieguozhifanwei2)) {
								_result = '正常';
								_bg = '#71d5a1';
							}
						} else if (item.jieguopanding === '高限（收缩压）' && _item.jieguopanding === '高限（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1 && ssyVal <= item.jieguozhifanwei2) && (szyVal >= _item.jieguozhifanwei1 &&
									szyVal <= _item.jieguozhifanwei2)) {
								_result = '高限';
								_bg = '#dea234';
							}
						} else if (item.jieguopanding === '高血压（收缩压）' && _item.jieguopanding === '高血压（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1) && (szyVal >= _item.jieguozhifanwei1)) {
								_result = '高压';
								_bg = '#f00';
							}
						} else if (item.jieguopanding === '高限（收缩压）' && _item.jieguopanding === '低血压（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1 && ssyVal <= item.jieguozhifanwei2) && (szyVal >= _item.jieguozhifanwei1 &&
									szyVal < _item.jieguozhifanwei2)) {
								_result = '低压';
								_bg = '#ccc';
							}
						} else if (item.jieguopanding === '低血压（收缩压）' && _item.jieguopanding === '高限（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2) && (szyVal >= _item.jieguozhifanwei1 &&
									szyVal <= _item.jieguozhifanwei2)) {
								_result = '低压';
								_bg = '#ccc';
							}
						} else if (item.jieguopanding === '高限（收缩压）' && _item.jieguopanding === '理想（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1 && ssyVal <= item.jieguozhifanwei2) && (szyVal >= _item.jieguozhifanwei1 &&
									szyVal < _item.jieguozhifanwei2)) {
								_result = '高限';
								_bg = '#dea234';
							}
						} else if (item.jieguopanding === '理想（收缩压）' && _item.jieguopanding === '高限（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2) && (szyVal >= _item.jieguozhifanwei1 &&
									szyVal <= _item.jieguozhifanwei2)) {
								_result = '高限';
								_bg = '#dea234';
							}
						} else if (item.jieguopanding === '高限（收缩压）' && _item.jieguopanding === '高血压（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1 && ssyVal <= item.jieguozhifanwei2) && (szyVal >= _item.jieguozhifanwei1)) {
								_result = '高压';
								_bg = '#f00';
							}
						} else if (item.jieguopanding === '高血压（收缩压）' && _item.jieguopanding === '高限（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1) && (szyVal >= _item.jieguozhifanwei1 && szyVal <= _item.jieguozhifanwei2)) {
								_result = '高压';
								_bg = '#f00';
							}
						} else if (item.jieguopanding === '低血压（收缩压）' && _item.jieguopanding === '理想（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2) && (szyVal >= _item.jieguozhifanwei1 &&
									szyVal < _item.jieguozhifanwei2)) {
								_result = '低压';
								_bg = '#ccc';
							}
						} else if (item.jieguopanding === '理想（收缩压）' && _item.jieguopanding === '低血压（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2) && (szyVal >= _item.jieguozhifanwei1 &&
									szyVal < _item.jieguozhifanwei2)) {
								_result = '低压';
								_bg = '#ccc';
							}
						} else if (item.jieguopanding === '低血压（收缩压）' && _item.jieguopanding === '高血压（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2) && (szyVal >= _item.jieguozhifanwei1)) {
								_result = '异常';
								_bg = '#f00';
							}
						} else if (item.jieguopanding === '高血压（收缩压）' && _item.jieguopanding === '低血压（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1) && (szyVal >= _item.jieguozhifanwei1 && szyVal < _item.jieguozhifanwei2)) {
								_result = '异常';
								_bg = '#f00';
							}
						} else if (item.jieguopanding === '理想（收缩压）' && _item.jieguopanding === '正常（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2) && (szyVal >= _item.jieguozhifanwei1 &&
									szyVal < _item.jieguozhifanwei2)) {
								_result = '正常';
								_bg = '#71d5a1';
							}
						} else if (item.jieguopanding === '正常（收缩压）' && _item.jieguopanding === '理想（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2) && (szyVal >= _item.jieguozhifanwei1 &&
									szyVal < _item.jieguozhifanwei2)) {
								_result = '正常';
								_bg = '#71d5a1';
							}
						} else if (item.jieguopanding === '理想（收缩压）' && _item.jieguopanding === '高血压（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2) && (szyVal >= _item.jieguozhifanwei1)) {
								_result = '高压';
								_bg = '#f00';
							}
						} else if (item.jieguopanding === '正常（收缩压）' && _item.jieguopanding === '低血压（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2) && (szyVal >= _item.jieguozhifanwei1 &&
									szyVal < _item.jieguozhifanwei2)) {
								_result = '低压';
								_bg = '#ccc';
							}
						} else if (item.jieguopanding === '低血压（收缩压）' && _item.jieguopanding === '正常（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2) && (szyVal >= _item.jieguozhifanwei1 &&
									szyVal < _item.jieguozhifanwei2)) {
								_result = '低压';
								_bg = '#ccc';
							}
						} else if (item.jieguopanding === '正常（收缩压）' && _item.jieguopanding === '高限（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2) && (szyVal >= _item.jieguozhifanwei1 &&
									szyVal <= _item.jieguozhifanwei2)) {
								_result = '高限';
								_bg = '#dea234';
							}
						} else if (item.jieguopanding === '高限（收缩压）' && _item.jieguopanding === '正常（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1 && ssyVal <= item.jieguozhifanwei2) && (szyVal >= _item.jieguozhifanwei1 &&
									szyVal < _item.jieguozhifanwei2)) {
								_result = '高限';
								_bg = '#dea234';
							}
						} else if (item.jieguopanding === '正常（收缩压）' && _item.jieguopanding === '高血压（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2) && (szyVal >= _item.jieguozhifanwei1)) {
								_result = '高压';
								_bg = '#f00';
							}
						} else if (item.jieguopanding === '高血压（收缩压）' && _item.jieguopanding === '正常（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1) && (szyVal >= _item.jieguozhifanwei1 && szyVal < _item.jieguozhifanwei2)) {
								_result = '高压';
								_bg = '#f00';
							}
						} else if (item.jieguopanding === '高血压（收缩压）' && _item.jieguopanding === '理想（舒张压）') {
							if ((ssyVal >= item.jieguozhifanwei1) && (szyVal >= _item.jieguozhifanwei1 && szyVal < _item.jieguozhifanwei2)) {
								_result = '高压';
								_bg = '#f00';
							}
						} else {
							_result = '正常';
							_bg = '#71d5a1';
							console.log('---------------else')
						}
					}
				}
				this.info.bloodPressureResult = _result;
				this.measurementResult();
				return `backgroundColor:` + _bg;
			},
			// 动态显示心率样式
			heartRateBgStyle() {
				try {
					let heartVal = this.info.heartRate;
					for (let item of this.xlList) {
						if (item.jieguopanding === '正常') {
							if (heartVal >= item.jieguozhifanwei1 && heartVal <= item.jieguozhifanwei2) {
								this.info.heartRateResult = '正常';
								return `background:#399561`;
							}
						} else if (item.jieguopanding === '心率快') {
							if (heartVal > item.jieguozhifanwei1) {
								this.info.heartRateResult = '快';
								return `background:#f00`;
							}
						} else if (item.jieguopanding === '心率慢') {
							if (heartVal >= item.jieguozhifanwei1 && heartVal < item.jieguozhifanwei2) {
								this.info.heartRateResult = '慢';
								return `background:#e1a12f`;
							}
						}
					}
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			// 收缩压
			systolicPressureFontStyle() {
				try {
					let ssyVal = Number(this.info.systolicPressure);
					for (let item of this.ssyList) {
						if (item.jieguopanding === '低血压（收缩压）') {
							if (ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2) {
								return `color:#ccc`; // 低
							}
						} else if (item.jieguopanding === '正常（收缩压）') {
							if (ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2) {
								return `color:#71d5a1`; // 正常
							}
						} else if (item.jieguopanding === '理想（收缩压）') {
							if (ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2) {
								return `color:#399561`; // 理想
							}
						} else if (item.jieguopanding === '高限（收缩压）') {
							if (ssyVal >= item.jieguozhifanwei1 && ssyVal <= item.jieguozhifanwei2) {
								return `color:#dea234`; // 高限
							}
						} else if (item.jieguopanding === '高血压（收缩压）') {
							if (ssyVal >= item.jieguozhifanwei1) {
								return `color:#f00`; // 高
							}
						}
					}
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			// 舒张压
			diastolicPressureFontStyle() {
				try {
					let szyVal = this.info.diastolicPressure;
					for (let item of this.szyList) {
						if (item.jieguopanding === '低血压（舒张压）') {
							if (szyVal >= item.jieguozhifanwei1 && szyVal < item.jieguozhifanwei2) {
								return `color:#ccc`; //低
							}
						} else if (item.jieguopanding === '理想（舒张压）') {
							if (szyVal >= item.jieguozhifanwei1 && szyVal < item.jieguozhifanwei2) {
								return `color:#399561`; //理想
							}
						} else if (item.jieguopanding === '正常（舒张压）') {
							if (szyVal >= item.jieguozhifanwei1 && szyVal < item.jieguozhifanwei2) {
								return `color:#71d5a1`; //正常
							}
						} else if (item.jieguopanding === '高限（舒张压）') {
							if (szyVal >= item.jieguozhifanwei1 && szyVal <= item.jieguozhifanwei2) {
								return `color:#dea234`; //高限
							}
						} else if (item.jieguopanding === '高血压（舒张压）') {
							if (szyVal >= item.jieguozhifanwei1) {
								return `color:#f00`; //高
							}
						}
					}
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			}
		},
		methods: {
			handleUpdateEquipStatus() {
				uni.getStorage({
					key: 'equipment_ids',
					success: res => {
						console.log(res);
						let arr = res.data,
							_arr = [];
						for (let item of arr) {
							let str = item.return_time;
							console.log(str);
							let date = new Date();
							if (uni.getSystemInfoSync().platform == "ios") {
								date = new Date(str.replace(/-/g, '/'));
							} else {
								date = new Date(str);
							}
							let time = new Date();
				
							if ((date.getTime() - time.getTime()) / (24 * 3600 * 1000) <= 3 &&
								item.status == '已领用' && item.e_type == "血压仪") {
								_arr.push(item)
								this.updateList = _arr
								this.show = true;
							}
							if (date.getTime() <= time.getTime() &&
								item.status == '已领用' && item.e_type == "血压仪") {
				
								// uni.hideTabBar();
								let obj = {
									e_id: item.equipment_id,
									lease_id: item.id,
									status: '已过期',
									r_time: item.return_time,
									r_days: item.rent_times,
									r_price: item.rent_price,
									r_deposit: item.rent_deposit,
									r_sum: item.rent_accountprice
								}
								console.log(obj);
								this.$u.post('/UpdateEquipStatus', obj).then(res => {
									console.log(JSON.stringify(res));
								}).catch(err => {
									console.log(err);
								})
							}
						}
					}
				})
			},
			handleDeviceInformation(y_id) {
				this.$u
					.post('/GetAllEquipmentsByPid', {
						pregnant_id: y_id
					})
					.then(res => {
						let _list = res.data;
						// 	Arr = [];
						// for (let i in _list) {
						// 	Arr.push({
						// 		e_type: res.data[i].e_type,
						// 		equipment_id: res.data[i].equipment_id,
						// 		notice_id: res.data[i].notice_id,
						// 		service_id: res.data[i].service_id,
						// 		write_in_id: res.data[i].write_in_id,
						// 		e_name: res.data[i].e_name,
						// 		status: res.data[i].status
						// 	});
						// }
						uni.setStorage({
							key: 'equipment_ids',
							data: _list
						})
					});
			},
			// 血压测量结果显示状态
			measurementResult() {
				try {
					let xyResult = this.info.bloodPressureResult;
					let xlResult = this.info.heartRateResult;
					let _result = '';
					if (xyResult == '正常' && xlResult == '正常') {
						_result = '正常';
					} else if (xyResult == '正常' && xlResult == '快') {
						_result = '血压正常,心率过快!';
					} else if (xyResult == '正常' && xlResult == '慢') {
						_result = '血压正常，心率过慢!';
					} else if (xyResult == '理想' && xlResult == '正常') {
						_result = '正常';
					} else if (xyResult == '理想' && xlResult == '慢') {
						_result = '理想血压,心率过慢!';
					} else if (xyResult == '理想' && xlResult == '快') {
						_result = '理想血压,心率过快!';
					} else if (xyResult == '高限' && xlResult == '正常') {
						_result = '正常';
					} else if (xyResult == '高限' && xlResult == '慢') {
						_result = '正常高限,心率过慢!';
					} else if (xyResult == '高限' && xlResult == '快') {
						_result = '正常高限,心率过快!';
					} else if (xyResult == '低压' && xlResult == '正常') {
						_result = '心率正常,低血压了！';
					} else if (xyResult == '低压' && xlResult == '慢') {
						_result = '低血压了,心率过慢！';
					} else if (xyResult == '低压' && xlResult == '快') {
						_result = '低血压了,心率过快！';
					} else if (xyResult == '高压' && xlResult == '正常') {
						_result = '心率正常,高血压了！!';
					} else if (xyResult == '高压' && xlResult == '快') {
						_result = '心率过快,高血压了！!';
					} else if (xyResult == '高压' && xlResult == '慢') {
						_result = '心率过慢,高血压了！!';
					} else if (xyResult == '异常' && xlResult == '正常') {
						_result = '心率正常,血压异常！!';
					} else if (xyResult == '异常' && xlResult == '快') {
						_result = '心率过快,血压异常！!';
					} else if (xyResult == '异常' && xlResult == '慢') {
						_result = '心率过慢,血压异常！!';
					}
					this.info.t_result = _result;
					return _result;
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			// 点击底部开始按钮
			handleOperationStartButton() {
				let that = this;
				try {
					uni.showLoading({
						title: '正在加载...'
					});
					that.isShowXy = false;
					that.isShowXl = false;
					that.isHeartValue = true;
					that.isDiastolicPressureValue = true;
					that.info.t_result = '---';
					that.info.diastolicPressure = '---';
					let param = {
						//deviceId: 'D26252C3-8210-DE2B-9561-550B992836D1',
						deviceName: that.info.e_name,
						notifyId: that.info.notice_id,
						writeId: that.info.write_in_id,
						serviceId: that.info.service_id
						//callback: this.blcallback
					};
					//bldprs.initBlue(param);
					//that.operationButton = false;
					bldprs.start(
						param,
						function(d) {
							that.testdata = JSON.stringify(d);
							if (d.success == true) {
								that.tapState = 1;
								that.info.c_time = tool.getFtSystemTime();
								let xy_obj = d.data;
								that.xydata = d.data;
								if (xy_obj.sysVal) {
									that.isShowXy = true;
									that.isShowXl = true;
									that.isDiastolicPressureValue = true;
									that.isHeartValue = true;
								}
								if (xy_obj.diaVal) {
									that.isDiastolicPressureValue = false;
									that.isHeartValue = false;
								}
								that.info.systolicPressure = xy_obj.sysVal ? xy_obj.sysVal : xy_obj.replace(/mmHg/g, '');
								that.info.diastolicPressure = xy_obj.diaVal;
								that.info.heartRate = xy_obj.pulVal;

								if (that.operationButton) {
									that.operationButton = false;
									uni.hideLoading();
								}

								if (d.msg == '最终血压值') {
									setTimeout(() => {
										let obj = that.info;
										let _arr = [{
											t_time: obj.c_time,
											value: '',
											flag: '',
											result: '',
											type: '血压',
											state: 1,
											duration: '',
											expert_opinion: '',
											low_pressure: obj.diastolicPressure,
											high_pressure: obj.systolicPressure,
											pulse: obj.heartRate,
											test_result: obj.t_result,
											e_id: that.info.e_id,
											p_id: that.info.p_id,
											sbcljy: that.info.sbcljy
										}];
										setStorageList(_arr);
										that.handleBtnUploadData();
										that.operationButton = true;
									}, 200);
								}
							} else {
								if (d.type && d.type == 'initBlue') {
									uni.showModal({
										showCancel: false,
										title: '注意',
										content: d.msg
									});
									that.operationButton = true;
								}
								if (d.type == '_getDevInfo') {
									uni.showModal({
										showCancel: false,
										title: '注意',
										content: "请把绑带按说明书要求绑扎到胳膊上,打开血压计电源开关后,再按'开始测量'按钮!"
									});
									that.operationButton = true;
								}

								if (d.type && d.type !== '_getDevInfo') {
									uni.showModal({
										showCancel: false,
										title: '注意',
										content: d.msg
									});
									that.operationButton = true;
								}
								if (d.type && d.type == 'err') {
									uni.showModal({
										showCancel: false,
										title: '发生错误',
										content: d.msg
									});
									that.operationButton = true;
								}
								if (d.type && d.type == 'startReceive') {
									uni.showModal({
										showCancel: false,
										title: '发生错误',
										content: d.msg
									});
									that.operationButton = true;
								}

								uni.hideLoading();
							}
						},
						2000
					);
				} catch (e) {
					console.log(e.message);
					that.testdata = e.message;
					that.operationButton = true;
					uni.hideLoading();
					uni.showModal({
						title: 'err',
						content: e.message,
						showCancel: false
					});
				}
				//that.operationButton = false;
			},
			// 上传数据
			handleBtnUploadData() {
				let obj = this.info;
				try {
					let xy_data = {
						e_id: obj.e_id,
						p_id: obj.p_id,
						c_time: obj.c_time,
						lp: obj.diastolicPressure,
						hp: obj.systolicPressure,
						pulse: obj.heartRate,
						t_result: obj.t_result,
						sbcljy: obj.sbcljy
					};
					console.log(xy_data)
					this.operationButton = true;
					this.$u.post('/UploadXYInfo', xy_data).then(res => {
						if (res.code == 200 && res.data == true) {
							clearStorageList('血压');
							uni.showToast({
								title: '提交成功',
								icon: 'none',
								duration: 5000
							});
							setTimeout(() => {
								uni.navigateBack()
							}, 5000)
						}
					});
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			}
		}
	};
</script>
<style scoped>
	.qiun-charts {
		width: 750rpx;
		height: 200rpx;
		background-color: #ffffff;
	}

	.charts {
		width: 750rpx;
		height: 200rpx;
		background-color: #ffffff;
	}

	.bloodPressureBox {
		width: 40rpx;
		line-height: 40rpx;
		text-align: center;
	}

	.sfont {
		font-size: 52rpx;
	}
</style>
