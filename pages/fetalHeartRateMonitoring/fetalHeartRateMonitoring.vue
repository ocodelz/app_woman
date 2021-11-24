<template>
	<view class="flex flex-column" :style="'height:' + pageHeight + 'px'">
		<view class="wrap " style="height: 150rpx;" v-if="tapState == 0">
			<u-row gutter="16" justify="around">
				<u-col span="3" class="u-col-item">
					<view class="flex justify-between">
						<text class="font-md font-weight-normal" style="min-height: 43rpx;">胎心一</text>
						<u-icon :name="
								signallevel1 == 1
									? 'https://s1.ax1x.com/2020/10/26/BnBAs0.png'
									: signallevel1 == 2
									? 'https://s1.ax1x.com/2020/10/26/BnBkMq.png'
									: signallevel1 == 3
									? 'https://s1.ax1x.com/2020/10/26/BnBizn.png'
									: signallevel1 >= 4
									? 'https://s1.ax1x.com/2020/10/26/BnBPRs.png'
									: 'wifi-off'
							"
						 size="28"></u-icon>
					</view>
					<view class="flex justify-center u-col-lh">
						<text class="font-lg font-weight-bold" :class="(flash == false) && (taixinlv1 > 160 || taixinlv1 < 120) ? 'flash' : '' ">{{ taixinlv1 !== '' ? taixinlv1 : '---' }}</text>
					</view>
					<view class="flex align-center justify-between">
						<u-icon v-if="isVoice1" @click="tapState == 0 ? handleVoice1() : ''" name="volume-up-fill" size="40" color="#91848b"></u-icon>
						<u-icon v-else @click="handleVoice1" name="volume-off-fill" size="40" color="#91848b"></u-icon>
						<!-- <u-icon name="music" custom-prefix="custom-icon" color="#91848b" size="40"></u-icon> -->
						<text class="iconfont" style="transform: rotate(180deg);color: #91848b;">&#xe652;</text>
					</view>
				</u-col>
				<u-col span="3" class="u-col-item">
					<view class="flex justify-between">
						<text class="font-md font-weight-normal">胎心二</text>
						<u-icon :name="
								signallevel2 == 1
									? 'https://s1.ax1x.com/2020/10/26/BnBAs0.png'
									: signallevel2 == 2
									? 'https://s1.ax1x.com/2020/10/26/BnBkMq.png'
									: signallevel2 == 3
									? 'https://s1.ax1x.com/2020/10/26/BnBizn.png'
									: signallevel2 >= 4
									? 'https://s1.ax1x.com/2020/10/26/BnBPRs.png'
									: 'wifi-off'
							"
						 size="28"></u-icon>
					</view>
					<view class="flex justify-center u-col-lh">
						<text class="font-lg font-weight-bold" :style="taixinlv2 !== '' ? 'color:#9d5a90' : ''">{{ taixinlv2 !== '' ? taixinlv2 : '---' }}</text>
					</view>
					<view class="flex justify-between align-center">
						<u-icon v-if="isVoice2" @click="tapState == 0 ? handleVoice2() : ''" name="volume-up-fill" size="40" color="#91848b"></u-icon>
						<u-icon v-else @click="handleVoice2" name="volume-off-fill" size="40" color="#91848b"></u-icon>
						<text class="iconfont" style="transform: rotate(180deg);color: #91848b;">&#xe652;</text>
					</view>
				</u-col>
				<u-col span="3" class="u-col-item">
					<view class="flex justify-between">
						<text class="font-md font-weight-normal">宫缩压</text>
						<u-icon :name="
								contractionss == 1
									? 'https://s1.ax1x.com/2020/10/26/BnBAs0.png'
									: contractionss == 2
									? 'https://s1.ax1x.com/2020/10/26/BnBkMq.png'
									: contractionss == 3
									? 'https://s1.ax1x.com/2020/10/26/BnBizn.png'
									: contractionss >= 4
									? 'https://s1.ax1x.com/2020/10/26/BnBPRs.png'
									: 'wifi-off'
							"
						 size="28"></u-icon>
					</view>
					<view class="flex justify-center u-col-lh">
						<text class="font-lg font-weight-bold" :style="gongsuoya !== '' ? 'color:#28a745' : ''">{{ gongsuoya !== '' ? gongsuoya : '---' }}</text>
					</view>
				</u-col>
				<u-col span="3" class="u-col-item">
					<text class="font-md font-weight-normal">自动胎动</text>
					<view class="flex justify-center u-col-lh">
						<text class="font-lg font-weight-bold" :style="fetalHeartRate.manualFetalMovement !== '' ? 'color:#007bff' : ''">
							{{ fetalHeartRate.manualFetalMovement != '' ? fetalHeartRate.manualFetalMovement : '---' }}
						</text>
					</view>
				</u-col>
			</u-row>
		</view>
		<!-- 测量结果 -->
		<view v-if="audit">
			<view class="flex" v-if="c_time || exam_result">
				<view>
					<text class="font font-weight-bold">测量时间：</text>
					<text class="font font-weight-bold text-info">{{ c_time }}</text>
				</view>
				<view class="flex align-center ml-2" v-if="exam_result">
					<text class="font font-weight-bold">审核结果：</text>
					<text class="font font-weight-bold text-info">{{ exam_result }}</text>
				</view>
			</view>
			<view v-if="exam_time">
				<text class="font font-weight-bold">审核时间：</text>
				<text class="font font-weight-bold text-info">{{ exam_time }}</text>
			</view>
			<view v-if="yishengjianyi">
				<text class="font font-weight-bold">医生建议：</text>
				<text class="font font-weight-bold text-info">{{ yishengjianyi }}</text>
			</view>
		</view>
		<!-- <view style="height: 35rpx;">{{ testdata }}121</view> -->

		<!-- 胎心 -->
		<view id="chart-taixin" class="flex flex-1" style="position: relative;">
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="chart-size" disable-scroll="true" @touchstart="touchLineA"
			 @touchmove="moveLineA" @touchend="touchEndLineA">
			 </canvas>
		</view>
		<!-- 宫缩压 -->
		<view id="chart-gsy" class="flex flex-1" style="margin-top: -20rpx;">
			<!-- :style="'height:'+chart2Height+'px'", -->
			<canvas canvas-id="canvasLineB" id="canvasLineB" class="chart-size" disable-scroll="true" @touchstart="touchLineB"
			 @touchmove="moveLineB" @touchend="touchEndLineB"></canvas>
		</view>

		<!-- 开始计时-->
		<view v-if="tapState == 0" class="flex rounded-left w-100 align-center justify-center" style="min-height:120rpx;margin-top: -40rpx;">
			<view class="flex align-center " style="border-radius: 50rpx;background-color: #fc979f;">
				<view class="ml-5 flex align-center">
					<!-- <u-icon v-if="isStop" name="play-circle" size="60" @click="tapState == 0 ? handleStartTime() : ''"></u-icon>
					<u-icon v-else name="pause-circle" size="60" @click="handleStartTime"></u-icon> -->
					<view v-if="isStop" @click="tapState == 0 ? handleStartTime() : ''">开始</view>
					<view v-else @click="handleEndTime">停止</view>
				</view>
				<view class="ml-5 flex align-center justify-center mr-5 " style=" border-radius: 12rpx;height: 50rpx;width: 130rpx; background-color: rgba(0,0,0,0.5);">
					<uni-countdown @longTime="longTime" ref="setTime" :showDay="false" @stopChange="stopChange" @submitChange="submitChange"
					 :hour="hour" :minute="minute" :second="second"></uni-countdown>
				</view>
				<view class="flex align-center justify-center mr-5" v-show="isStop == false" @click="isStop == false ? handleClear() : ''">
					<view class="text-white rounded pl-2 pr-2" :class="isStop == false && isSwitchFlash == true && switchFlash == true ? 'switchFlash' : 'bg-success'">{{jianhuzhuantai}}</view>
				</view>
				<view class="ml-2 flex flex-row align-center flex-1" v-show="displays">
					<view class="p-1">实时</view>
					<view class="flex align-center">
						<u-switch size="55" active-color="rgba(0, 170, 0, 0.7)" inactive-color="rgba(237, 224, 231, 1.0)" @change="handleIsSwitch"
						 v-model="checked" :loading="loading" :disabled="disabled"></u-switch>
					</view>
				</view>
			</view>
		</view>
		<view class="flex align-center justify-center" v-if="isStop == false && isSwitchFlash == true && switchFlash == true"
		 style="min-height: 80rpx;margin-top: -20rpx;">
			<text class="text-danger" :class="isStop == false && isSwitchFlash == true && switchFlash == true ? 'flash' : ''">当前未开启实时模式，请点黄色闪动区域开启实时！</text>
		</view>
		<u-top-tips ref="uTips"></u-top-tips>
		<u-modal :show-title="false" :show-confirm-button="false" v-model="show" confirm-color="#000" negative-top="90">
			<view class="flex align-center justify-center flex-column" style="height: 280rpx;">
				<view class="flex align-center justify-center flex-column">
					<view class="mb-3">
						<u-image width="44" height="44" src="../../static/image/probeConnection/login.gif"></u-image>
					</view>
					<view class="ml-3 mr-3 flex align-center flex-column justify-center">
						<text class="mb-3">请拿起探头,等待探头自动连接,连接成功后会提示连接成功......</text>
						<u-count-down @end="handleEnd" :timestamp="timestamp" :show-days="false" :show-hours="false" :show-minutes="false"
						 show-seconds></u-count-down>
					</view>
				</view>
			</view>
		</u-modal>
		<u-popup mode="center" v-model="isPurchase" width="700" height="500" border-radius="12" safe-area-inset-bottom v-if="purchaseState == 0">
			<text class="flex align-center justify-center font-md font-weight-bold mt-4">以下设备即将过期</text>
			<scroll-view scroll-y="true"style="height: 300rpx;">
				<view class="flex flex-column mt-3 ml-3" v-for="(item,index) in updateList" :key="index">
					<text>设备名称: {{item.e_name}}</text>
					<text>设备类型: {{item.e_type}}</text>
					<text>到期时间: {{item.return_time}}</text>
				</view>
			</scroll-view>
			<view class="flex align-center justify-center mt-2">
				<u-button type="error" size="medium" @click="isPurchase = false">我知道了</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import {
		clearStorageList,
		setStorageList
	} from '@/common/storage.js';
	import tool from '@/utils/util.js';
	// #ifndef H5
	var Fts6MgrModule = uni.requireNativePlugin('Fts6MgrPlugin-Fts6MgrModule');
	
	// #endif
	var _self;
	var canvaLineA = null;
	var canvaLineB = null;
	export default {
		data() {
			return {
				purchaseState:0,
				updateList:[],
				jianhuzhuantai: "启动实时监护",
				displays: false,
				status: false,
				timestamp: 30,
				isPurchase:false,
				show: false,
				maindataInsert: false,
				disabled: true,
				// chart1Height: 400,
				// chart2Height: 350,
				checked: false,
				loading: false,
				flash: true,
				isSwitchFlash: false,
				switchFlash: true,
				testdata: '',
				// 胎心1
				taixinlv1: '',
				// 胎心2
				taixinlv2: '',
				openaudio: false,
				//
				c_time: '',
				// 宫缩压
				gongsuoya: '',
				isConnected: false,
				isTocoCleared: false,
				// 孕妇id
				pregnantID: '',
				// 设备id
				equipment_id: '',
				// 测量时长
				clTime: '',
				// 审核时间
				exam_time: '',
				// 审核结果
				exam_result: '',
				// 医生建议
				yishengjianyi: '',
				// 时
				hour: 0,
				// 分
				minute: 0,
				// 秒
				second: 1,
				// 审核结果显示状态
				audit: false,
				// 宫缩压
				fetalHeartRate: {
					manualFetalMovement: ''
				},
				// 胎心
				chartData: {
					scrollPosition: 'right',
					title: 'xx',
					subtitle: {},
					animation: false,
					categories: [0, 1, 2, 3, 4, 5],
					series: [{
							name: 'a1',
							data: [],
							color: '#000000'
						},
						{
							name: 'a2',
							data: [],
							color: '#c077bf'
						}
					]
				},
				// 宫缩压
				chartDataB: {
					scrollPosition: 'right',
					title: 'xx',
					subtitle: {},
					animation: false,
					categories: [0, 1, 2, 3, 4, 5],
					series: [{
						name: '',
						data: [],
						color: '#000000'
					}]
				},
				chatList: [],
				// 图表初始样式
				cWidth: '',
				cHeight: '',
				bWidth: '',
				bHeight: '',
				pixelRatio: 1,
				// 测量结果
				c_result: '待医生诊断',
				// 开始按钮状态
				isStop: true,
				// 结束时间
				stopTime: {},
				// 页面状态 用于区分页面跳转操作
				tapState: 0,
				updataList: [],
				switchUpdataList: [],
				// 测试时间
				nowTime: '',
				// 测量结果显示状态
				isResult: false,
				// 胎心1声音状态
				isVoice1: false,
				// 胎心2声音状态
				isVoice2: false,
				// 胎心1 wifi信号
				signallevel1: 0,
				// 胎心2 wifi信号
				signallevel2: 0,
				// 宫缩压wifi信号
				contractionss: 0,
				isOpenBtn: false,
				taixinId: '',
				pageHeight: 0,
				innerAudioContext: null,
				notice_id: ''
			};
		},
		onBackPress(e) {
			if (this.isOpenBtn && !this.isStop) {
				if (e.from === 'backbutton') {
					uni.showModal({
						title: '提示',
						content: '您正在进行胎心测量，确定要结束吗？',
						success: (res) => {
							if (res.confirm) {
								this.handleUpfateDuration();
								console.log('-------------ssssssssssssssssssss');
								uni.navigateBack({
									delta: 1
								})
							}
						}
					})
					return true;
				}
			} else {
				return false;
			}
		},
		onReady() {
			try {
				let that = this;
				if (that.tapState == 0) {
					//this.$refs.uToast.show
					that.$refs.uTips.show({
						title: '请先找准孕妇胎心和宫缩位置,然后用绑带固定仪器\r\n到相应位置,点按左下角"开始"按钮进行监护!',
						// 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
						type: 'info',
						position: 'center',
						duration: 10000,
						// 如果不需要图标，请设置为false
						icon: true
					});
					uni.showModal({
						title: '提示',
						content: '请点按左下角"开始"按钮进行胎心查找!',
						showCancel: false
					})
				}
				let info = uni.createSelectorQuery().select('#chart-taixin');
				info.boundingClientRect(function(data) {
					//data - 各种参数
					//this.cWidth = uni.upx2px(750);
					that.cHeight = data.height - uni.upx2px(40);
					that.bHeight = data.height - uni.upx2px(40);
					that.cWidth = data.width + uni.upx2px(10);
					//	this.cHeight = uni.upx2px(460);
					that.bWidth = data.width + uni.upx2px(10); //;uni.upx2px(750);

					that.getServerData();
					that.getServerDatas();

					//this.bWidth = uni.upx2px(750);
					//this.bHeight = uni.upx2px(400);
				}).exec();
			} catch (e) {
				console.log(e.message);
				this.testdata = e.message;
			}
		},
		onLoad(e) {
			try {
				let that = this;
				// #ifdef APP-PLUS
				plus.device.setWakelock(true);
				// #endif
				_self = this;
				if(e.purchaseState){
					this.purchaseState = e.purchaseState;
				}
				uni.getSystemInfo({
					success: res => {
						_self.pageHeight = res.windowHeight;
					}
				});
				//		this.cWidth = uni.upx2px(750);
				//	this.cHeight = uni.upx2px(460);
				//	this.bWidth = uni.upx2px(750);
				//this.bHeight = uni.upx2px(400);

				this.tapState = e.tapState || 0;
				//this.chartData.categories = [0, 1, 2, 3, 4, 5];
				this.chartData.series[0].data = [];
				this.chartData.series[1].data = [];
				//this.chartDataB.categories = [0, 1, 2, 3, 4, 5];
				this.chartDataB.series[0].data = [];

				that.chartData.categories = [];
				that.chartDataB.categories = [];

				for (var i = 0; i < 300; i++) {
					//let i=index + 1;

					//let di=(i+1) / 60;
					let xLabel = tool.secoundtoMs(i);

					that.chartData.categories.push(xLabel);
					that.chartDataB.categories.push(xLabel);
				}
				that.getServerData();
				that.getServerDatas();

				canvaLineA.updateData(that.chartData);
				canvaLineB.updateData(that.chartDataB);
				Fts6MgrModule.stop();
				uni.getStorage({
					key: 'user_login',
					success: res => {
						let yf_obj = res.data;
						this.pregnantID = yf_obj.PregnantID;
					}
				});
				uni.$on('equipment_ids',(data) => {
					console.log(data);
					this.equipment_id = data.data.equipment_id;
					this.notice_id = data.data.notice_id;
					console.log(this.equipment_id);
				})
				if (e.detail) {
					let _arr = JSON.parse(e.detail);
					this.clTime = _arr.duration;
					this.nowTime = _arr.t_time;
					this.c_time = _arr.t_time;
					this.audit = true;
					that.isResult = true;
					that.exam_time = _arr.exam_time;
					that.exam_result = _arr.exam_result;
					that.yishengjianyi = _arr.yishengjianyi;
					that.chartData.series[0].data = [];
					that.chartData.series[1].data = [];
					//this.chartDataB.categories = [0, 1, 2, 3, 4, 5];
					that.chartDataB.series[0].data = [];
					that.chartData.categories = [];
					that.chartDataB.categories = [];

					if (_arr.state == 1) {
						uni.getSystemInfo({
							success: res => {
								_self.pageHeight = res.windowHeight;
							}
						});
						let i = 0;
						for (var t = 0; t < 300; t++) {
							let xLabel = tool.secoundtoMs(t);
							//let xLabel = minute.toString(); //+"分"+secound+"秒";
							that.chartData.categories.push(xLabel);
							that.chartDataB.categories.push(xLabel);
						}
						canvaLineA.updateData(that.chartData);
						canvaLineB.updateData(that.chartDataB);
						for (let item of _arr.txarr) {
							//let xLabel = parseInt(i / 60).toString(); //+ '分';
							let xLabel = tool.secoundtoMs(i);
							i++;
							if (i >= 300) {
								that.chartData.categories.push(xLabel);
								that.chartDataB.categories.push(xLabel);
							} else {
								that.chartData.categories[i] = xLabel;
								that.chartDataB.categories[i] = xLabel;
							}
							let t1 = item.t1 == 255 || item.t1 == -1 || item.t1 == 0 || item.t1 == null ? null : item.t1;
							let t2 = item.t2 == 255 || item.t2 == -1 || item.t2 == 0  || item.t2 == null ? null : item.t2;
							let gsy = item.gsy == -1 || item.gsy == 255 || item.gsy == 0  || item.gsy == null ? null : item.gsy + '';
							that.nowTime = item.c_time;
							if(t1 !== null){
								that.chartData.series[0].data.push(Number(t1));
							}else{
								that.chartData.series[0].data.push(t1);
							}
							if(t2 !== null){
								that.chartData.series[1].data.push(Number(t2));
							}else{
								that.chartData.series[1].data.push(t2);
							}
							if(gsy !== null){
								that.chartDataB.series[0].data.push(Number(gsy));
							}else{
								that.chartDataB.series[0].data.push(gsy);
							}
						}
						canvaLineA.updateData(that.chartData);
						canvaLineB.updateData(that.chartDataB);
					} else {
						console.log(_arr.id);
						this.$u
							.post('/DocSSTaixinManyDetails', {
								taixinId: _arr.id
							})
							.then(res => {
								console.log(res);
								let i = 0;
								if (res.code == 200) {
									for (var t = 0; t < 300; t++) {
										let xLabel = tool.secoundtoMs(t);
										//let xLabel = minute.toString(); //+"分"+secound+"秒";
										that.chartData.categories.push(xLabel);
										that.chartDataB.categories.push(xLabel);
									}
									canvaLineA.updateData(that.chartData);
									canvaLineB.updateData(that.chartDataB);
									let arr = res.data;
									for (let item of arr) {
										//let xLabel = parseInt(i / 60).toString(); // + '分';

										let xLabel = tool.secoundtoMs(i);
										i++;
										if (i >= 300) {
											that.chartData.categories.push(xLabel);
											that.chartDataB.categories.push(xLabel);
										} else {
											that.chartData.categories[i] = xLabel;
											that.chartDataB.categories[i] = xLabel;
										}
										var heartrate1 = item.taixinlv1 == 255 || item.taixinlv1 == -1 || item.taixinlv1 == 0 || item.taixinlv1 == null ? null : item.taixinlv1;
										var heartrate2 = item.taixinlv2 == 255 || item.taixinlv2 == -1 || item.taixinlv2 == 0 || item.taixinlv2 == null ? null : item.taixinlv2;
										if(heartrate1 !== null){
											that.chartData.series[0].data.push(Number(heartrate1));
										}else{
											that.chartData.series[0].data.push(heartrate1);
										}
										if(heartrate2 !== null){
											that.chartData.series[1].data.push(Number(heartrate2));
										}else{
											that.chartData.series[1].data.push(heartrate2);
										}
										var contractions = item.gongsuoya == -1 || item.gongsuoya == 255 || item.gongsuoya == 0 || item.gongsuoya == null ? null : item.gongsuoya + '';
										if(contractions !== null){
											that.chartDataB.series[0].data.push(Number(contractions));
										}else{
											that.chartDataB.series[0].data.push(contractions);
										}
									}
									canvaLineA.updateData(that.chartData);
									canvaLineB.updateData(that.chartDataB);
								} else {
									console.log(JSON.stringify(res.info));
									this.$lz.toast(res.info);
								}
							}).catch(err => {
								console.log(err);
								this.$lz.toast(err.errMsg);
							})
					}
				}
			} catch (e) {
				console.log(e.message);
				this.testdata = e.message;
			}
		},
		onShow() {
			this.handleUpdateEquipStatus();
		},
		destroyed() {
			try {
				// #ifdef APP-PLUS
				plus.device.setWakelock(false);
				// #endif
				Fts6MgrModule.stop();
				// if (this.innerAudioContext) {
				// 	this.innerAudioContext.destroy();
				// }
				uni.$off('equipment_ids');
			} catch (e) {
				console.log(e.message);
				this.testdata = e.message;
			}
		},
		methods: {
			handleEnd() {
				this.show = false;
				if (this.status == true) {
					uni.showToast({
						title: '探头连接成功!请找到胎心后观察波形，待波形正常后点击下面"启动实时监护"按钮',
						icon: 'none',
						duration: 8000
					});
				} else {
					uni.showModal({
						content: '连接失败，请把探头放回电源插座重新拿起，再点"开始"按钮重新尝试！',
						showCancel: false
					})
					this.$refs.setTime.endTime();
					this.isStop = true;
				}
				this.isOpenBtn = false;
				this.checked = false;
			},
			
			// 胎心1声音
			handleVoice1() {
				try {
					let that = this;
					that.isVoice1 = !that.isVoice1;
					that.isVoice2 = false;
					// Fts6MgrModule.setProbeAudio({
					// 	probe: 2,
					// 	on: false
					// });

					Fts6MgrModule.setProbeAudio({
						probe: 1,
						on: that.isVoice1
					});
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			// 胎心2声音
			handleVoice2() {
				try {
					let that = this;
					that.isVoice2 = !that.isVoice2;
					that.isVoice1 = false;

					// Fts6MgrModule.setProbeAudio({
					// 	probe: 1,
					// 	on: false
					// });
					Fts6MgrModule.setProbeAudio({
						probe: 2,
						on: that.isVoice2
					});
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			// 测量时长
			longTime(e) {
				try {
					this.clTime = e.time;
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
				//				console.log(this.clTime + '测量时长');
			},
			// 宫缩压
			getServerDatas() {
				try {
					let LineB = {
						categories: [],
						series: []
					};
					LineB.categories = _self.chartDataB.categories;
					LineB.series = _self.chartDataB.series;
					_self.showLineB('canvasLineB', LineB);
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			// 胎心1图表配置
			showLineA(canvasId, chartData) {
				try {
					canvaLineA = new uCharts({
						$this: _self,
						canvasId: canvasId,
						type: 'line',
						fontSize: 11,
						legend: {
							show: false
						},
						enableMarkLine: true,
						dataLabel: false,
						dataPointShape: false,
						background: '#FFFFFF',
						pixelRatio: _self.pixelRatio,
						categories: chartData.categories,
						series: chartData.series,
						animation: false,
						enableScroll: true,
						xAxis: {
							type: 'grid',
							gridColor: '#CCCCCC',
							gridType: 'dash',
							// calibration: true,
							dashLength: 1,
							itemCount: 300, //x轴单屏显示数据的数量，默认为5个 实际个数=设置值×2+8   实际值(60)=设置值30×2
							scrollShow: false, //新增是否显示滚动条，默认false
							scrollAlign: 'left', //滚动条初始位置
							scrollBackgroundColor: '#F7F7FF', //默认为 #EFEBEF
							scrollColor: '#DEE7F7', //默认为 #A6A6A6
							gridEval: 10,
							splitNumber: 30,
							labelCount: 6,
							format: val => {
								return parseInt(val / 60).toString() + '分';
							}
						},
						yAxis: {
							//data:{
							// min:0,
							// max:240,
							//calibration:false,
							//axisLine:true,
							//disabled:false
							//},
							type: 'grid',
							padding: 0,
							gridType: 'dash',
							gridColor: '#CCCCCC',
							dashLength: 2,
							max: 240,
							min: 0,
							splitNumber: 24,
							// data:{disabled: false},
							format: val => {
								if (val % 10 == 0) return val;
								else return '';
								//return val.toFixed(0) + '';
							}
						},
						width: _self.cWidth * _self.pixelRatio,
						height: _self.cHeight * _self.pixelRatio,
						extra: {
							touchMoveLimit: 20,
							line: {
								type: 'straight',
								width: 1
							},
							markLine: {
								areacolor:'#087c00',
								areaopacity:0.15,
								data: [{ value: 110, lineColor: '#087c00' }, { value: 160, lineColor: '#087c00' }]
							}
						}
					});
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			// 胎心1图表回调
			touchLineA(e) {
				try {
					canvaLineA.scrollStart(e);
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			// 胎心1图表回调
			moveLineA(e) {
				try {
					canvaLineA.scroll(e);
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			// 胎心1图表回调
			touchEndLineA(e) {
				try {
					canvaLineA.scrollEnd(e);
					//下面是toolTip事件，如果滚动后不需要显示，可不填写
					canvaLineA.showToolTip(e, {
						format: function(item) {
							return item.data;
						}
					});
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			// 胎心2图表配置
			showLineB(canvasId, chartDataB) {
				try {
					canvaLineB = new uCharts({
						$this: _self,
						canvasId: canvasId,
						type: 'line',
						fontSize: 11,
						legend: {
							show: false
						},
						dataLabel: false,
						dataPointShape: false,
						background: '#FFFFFF',
						pixelRatio: _self.pixelRatio,
						categories: chartDataB.categories,
						series: chartDataB.series,
						animation: false,
						enableScroll: true,
						xAxis: {
							type: 'grid',
							gridColor: '#CCCCCC',
							gridType: 'dash',
							dashLength: 2,
							itemCount: 300, //x轴单屏显示数据的数量，默认为5个
							scrollShow: false, //新增是否显示滚动条，默认false
							scrollAlign: 'left', //滚动条初始位置
							scrollBackgroundColor: '#F7F7FF', //默认为 #EFEBEF
							scrollColor: '#DEE7F7', //默认为 #A6A6A6
							splitNumber: 30,
							labelCount: 6,
							gridEval: 10
						},
						yAxis: {
							gridType: 'dash',
							gridColor: '#CCCCCC',
							dashLength: 2,
							max: 100,
							min: 0,
							splitNumber: 10,
							format: val => {
								return val.toFixed(0) + '';
							}
						},
						width: _self.bWidth * _self.pixelRatio,
						height: _self.bHeight * _self.pixelRatio,
						extra: {
							touchMoveLimit: 20,
							line: {
								type: 'straight',
								width: 1
							}
						}
					});
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
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
								item.status == '已领用' && item.e_type == "胎心监护仪") {
								_arr.push(item)
								this.updateList = _arr
								this.isPurchase = true;
							}
							if (date.getTime() <= time.getTime() &&
								item.status == '已领用' && item.e_type == "胎心监护仪") {
				
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
			// 胎心2图表拖动回调
			touchLineB(e) {
				try {
					canvaLineB.scrollStart(e);
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
				// console.log(e)
			},
			// 胎心2图表拖动回调
			moveLineB(e) {
				try {
					canvaLineB.scroll(e);
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
				// console.log(e)
			},
			// 胎心2图表回调
			touchEndLineB(e) {
				try {
					// console.log(e)
					canvaLineB.scrollEnd(e);
					canvaLineB.showToolTip(e, {
						format: function(item) {
							return item.data;
						}
					});
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			// 胎心
			getServerData() {
				try {
					let LineA = {
						categories: [],
						series: []
					};
					LineA.categories = _self.chartData.categories;
					LineA.series = _self.chartData.series;
					_self.showLineA('canvasLineA', LineA);
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			// 开关状态
			handleIsSwitch(e) {
				try {
					this.isOpenBtn = e;
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			// 设备
			start() {
				let that = this;
				try {
					let i = 0;
					let upxh = 0;
					that.maindataInsert = false;
					let taixinid = '';
					that.show = true;
					that.isSwitchFlash = false;
					that.status = false;
					that.isVoice1 = true;
					that.isVoice2 = false;
					that.isResult = false;
					that.openaudio = false;
					that.chartData.categories = [];
					that.chartDataB.categories = [];
					for (var t = 0; t < 300; t++) {
						let xLabel = tool.secoundtoMs(t);
						that.chartData.categories.push(xLabel);
						that.chartDataB.categories.push(xLabel);
					}
					that.chartData.series[0].data = [];
					that.chartData.series[1].data = [];
					that.chartDataB.series[0].data = [];
					canvaLineA.updateData(that.chartData);
					canvaLineB.updateData(that.chartDataB);
					that.taixinId = '';
					that.updataList = [];
					let datatime = '';
					Fts6MgrModule.start({}, ret => {
						that.testdata = ret;
						let xtObj = JSON.parse(ret);
						console.log(xtObj);
						console.log(JSON.stringify(ret));
						if (typeof xtObj.data == 'object') {
							console.log('-----------------------------start')
							if (!that.status) {
								uni.showToast({
									title: '探头连接成功!请找到胎心后观察波形，待波形正常后点击下面右下角的"启动实时监护"按钮',
									icon: 'none',
									duration: 8000
								});
								that.show = false;
								that.status = true;
							}
							that.isSwitchFlash = true;
							if (datatime != xtObj.data.time) {
								datatime = xtObj.data.time;
								let xLabel = tool.secoundtoMs(i);
								if (i >= 300) {
									that.chartData.categories.push(xLabel);
									that.chartDataB.categories.push(xLabel);
								} else {
									that.chartData.categories[i] = xLabel;
									that.chartDataB.categories[i] = xLabel;
								}
								that.signallevel1 = xtObj.data.signallevel1;
								that.signallevel2 = xtObj.data.signallevel2;
								that.taixinlv1 = xtObj.data.heartrate1 == 255 || xtObj.data.heartrate1 == -1 ? 0 : xtObj.data.heartrate1;
								that.taixinlv2 = xtObj.data.heartrate2 == 255 || xtObj.data.heartrate2 == -1 ? 0 : xtObj.data.heartrate2;
								that.gongsuoya = xtObj.data.contractions == -1 ? '0' : xtObj.data.contractions;
								
								// that.taixinlv1 = xtObj.data.heartrate1 == 255 || xtObj.data.heartrate1 == -1 || xtObj.data.heartrate1 == 0 ? null : xtObj.data.heartrate1;
								// that.taixinlv2 = xtObj.data.heartrate2 == 255 || xtObj.data.heartrate2 == -1 || xtObj.data.heartrate2 == 0 ? null : xtObj.data.heartrate2;
								// that.gongsuoya = xtObj.data.contractions == -1 || xtObj.data.contractions == 255 || xtObj.data.contractions == 0 ? null : xtObj.data.contractions;

								if (that.taixinlv1 > 160 || that.taixinlv1 < 110) {
									this.flash = false;
									// if (!this.innerAudioContext) {
									// 	this.innerAudioContext = uni.createInnerAudioContext();
									// 	this.innerAudioContext.src = '/static/audio/tishi.mp3';
									// 	this.innerAudioContext.play();
									// } else {
									// 	this.innerAudioContext.stop();
									// 	this.innerAudioContext.play();
									// }
								} else {
									this.flash = true;
								}
								if (!that.openaudio) {
									Fts6MgrModule.setProbeAudio({
										probe: 1,
										on: that.isVoice1
									});
									that.openaudio = true;
								}
								if (Number(xtObj.data.isvalids1) == 1 || Number(xtObj.data.isvalids2) == 1 || Number(xtObj.data.isvalidstoco) ==
									1) {
									if (!that.isConnected) {
										that.isConnected = true;
										that.$refs.setTime.startTime();
									}
									if (!that.isTocoCleared && Number(xtObj.data.isvalidstoco) == 1) {
										that.isTocoCleared = true;
										Fts6MgrModule.clearTocoVal();

									}
								}
								that.contractionss = xtObj.data.contractions;
								xtObj.data.heartrate1 = xtObj.data.heartrate1 == 255 || xtObj.data.heartrate1 == -1 || xtObj.data.heartrate1 == 0 ? null : xtObj.data.heartrate1;
								xtObj.data.heartrate2 = xtObj.data.heartrate2 == 255 || xtObj.data.heartrate2 == -1 || xtObj.data.heartrate2 == 0 ? null : xtObj.data.heartrate2;

								that.fetalHeartRate.manualFetalMovement = xtObj.data.movementcount1;
								xtObj.data.contractions = xtObj.data.contractions == -1 || xtObj.data.contractions == 255 || xtObj.data.contractions == 0 ? null : xtObj.data.contractions;

								if (i >= 300) {
									if(xtObj.data.heartrate1 !== null){
										that.chartData.series[0].data.push(Number(xtObj.data.heartrate1));
									}else{
										that.chartData.series[0].data.push(xtObj.data.heartrate1);
									}
									if(xtObj.data.heartrate2 !== null){
										that.chartData.series[1].data.push(Number(xtObj.data.heartrate2));
									}else{
										that.chartData.series[1].data.push(xtObj.data.heartrate2);
									}
									if(xtObj.data.contractions !== null){
										that.chartDataB.series[0].data.push(Number(xtObj.data.contractions));
									}else{
										that.chartDataB.series[0].data.push(xtObj.data.contractions);
									}
								} else {
									if(xtObj.data.heartrate1 !== null){
										that.chartData.series[0].data[i] = Number(xtObj.data.heartrate1);
									}else{
										that.chartData.series[0].data[i] = xtObj.data.heartrate1;
									}
									if(xtObj.data.heartrate2 !== null){
										that.chartData.series[1].data[i] = Number(xtObj.data.heartrate2);
									}else{
										that.chartData.series[1].data[i] = xtObj.data.heartrate2;
									}
									if(xtObj.data.contractions !== null){
										that.chartDataB.series[0].data[i] = Number(xtObj.data.contractions);
									}else{
										that.chartDataB.series[0].data[i] = xtObj.data.contractions;
									}
								}

								canvaLineB.updateData(that.chartDataB);
								canvaLineA.updateData(that.chartData);
								let item = {
									p_id: that.pregnantID,
									e_id: that.equipment_id,
									c_time: that.nowTime,
									t1: xtObj.data.heartrate1,
									t2: xtObj.data.heartrate2,
									gsy: xtObj.data.contractions,
									sdtds: '',
									zdtds: xtObj.data.movementcount1,
									t_result: that.c_result,
									sbcljy: '',
									taixinId: '',
									duration: that.clTime
								};
								that.updataList.push(item);
								upxh++;
								console.log(item);
								let _item = {
									e_id: that.equipment_id,
									p_id: that.pregnantID,
									c_time: that.nowTime,
									t1: xtObj.data.heartrate1,
									t2: xtObj.data.heartrate2,
									gsy: xtObj.data.contractions,
									sdtds: '',
									zdtds: xtObj.data.movementcount1,
									t_result: that.c_result,
									sbcljy: '',
									xh: upxh,
									taixinId: that.taixinId,
									duration: that.clTime
								};
								console.log(_item);
								// console.log(that.nowTime)
								// console.log(_item)
								// console.log('_item.taixinId***************' + _item.taixinId)
								// console.log('maindataInsert***************' + that.maindataInsert)
								// console.log(that.isOpenBtn)
								if (that.isOpenBtn === true) {
									// console.log(that.isOpenBtn)
									if (_item.taixinId == '' && !that.maindataInsert) {
										// console.log('_item.taixinId=============' + _item.taixinId)
										// console.log('maindataInsert=============' + !that.maindataInsert)
										that.switchUpdataList = [];
										that.switchUpdataList.push(_item);
										that.maindataInsert = true;
										that.handleFetalHeartRateData();

									}
									if (_item.taixinId !== '' && that.maindataInsert == true) {
										// console.log('_item.taixinId---------------' + _item.taixinId)
										// console.log('maindataInsert---------------' + that.maindataInsert)
										that.switchUpdataList = [];
										that.switchUpdataList.push(_item);
										
										that.handleFetalHeartRateData();
									}
								}
								i++;
							}
						}
					});
				} catch (e) {
					that.testdata = e.message;
					uni.hideLoading();
					uni.showModal({
						title: 'err',
						content: e.message,
						showCancel: false
					});
				}
			},
			// 开始计时
			handleStartTime() {
				try {
					if (this.isStop) {
						this.nowTime = tool.getFtSystemTime();
						this.hour = this.stopTime.h || 0;
						this.minute = this.stopTime.i || 0;
						this.second = this.stopTime.s || 0;
						this.$refs.setTime.startTime();
						this.taixinId = '';
						// #ifndef H5
						this.start();
						// #endif
						this.isStop = false;
					}
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			handleEndTime() {
				if (this.isOpenBtn == true && this.checked == true) {
					uni.showModal({
						title: '提示',
						content: '正在进行胎心监护，确定要停止吗？',
						success: res => {
							if (res.confirm) {
								this.$refs.setTime.stopTime();
								this.handleUpfateDuration();
								this.isStop = true;
								this.checked = false;
								this.isOpenBtn = false;
								this.jianhuzhuantai = "启动实时监护";
								this.switchFlash = true;
								uni.navigateBack();
							}
						}
					});
				} else {
					this.$refs.setTime.stopTime();
					this.setStorageFun();
					this.isStop = true;
					this.checked = false;
					this.isOpenBtn = false;
					this.jianhuzhuantai = "启动实时监护";
					this.switchFlash = true;
				}
			},
			// 缓存
			setStorageFun() {
				try {
					let _arr = [{
						p_id: this.pregnantID,
						t_time: this.nowTime,
						value: '',
						flag: '',
						result: this.c_result,
						type: '胎心',
						state: 1,
						txarr: this.updataList,
						duration: this.clTime
					}];
					//缓存
					if (this.isOpenBtn == false && this.checked == false) {
						setStorageList(_arr);
						uni.showModal({
							title: '本次测量已结束',
							content: '是否要提交？',
							success: res => {
								if (res.confirm) {
									this.handleFetalHeartRate();
									clearStorageList('胎心');
								} else {
									this.updataList = [];
									uni.navigateBack();
								}
							}
						});
					} else {
						uni.showModal({
							title: '提示',
							// content: '本次实时监护已成功上传,如需再次监护请点左下角"开始"按钮',
							content: '本次实时监护已成功上传',
							showCancel: false,
							success: res => {
								if (res.confirm) {
									// this.handleUpfateDuration();
									uni.navigateBack();
								}
							}
						});
					}
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			//停止的回调
			stopChange(e) {
				try {
					Fts6MgrModule.stop();
					// this.hour = 0;
					// this.minute = 0;
					// this.second = 0;
					this.isResult = true;
					this.isConnected = false;
					this.isTocoCleared = false;
					this.clTime = e.time;
					console.log(this.clTime + '停止时间');
					for (let item of this.updataList) {
						item.duration = this.clTime;
					}
					if (this.isOpenBtn == true && this.checked == true) {
						this.handleUpfateDuration();
					}
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			//超时的回调
			submitChange(e) {
				try {
					Fts6MgrModule.stop();
					this.isResult = true;
					this.setStorageFun();
					// this.stopTime = e.time;
					this.clTime = e.time;
					console.log(this.clTime + '超时');
					// this.disabled = false;
					for (let item of this.updataList) {
						item.duration = this.clTime;
					}
					this.isStop = e.isStop;
					console.log(this.isOpenBtn);
					console.log(this.checked);
					if (this.isOpenBtn == true && this.checked == true) {
						this.handleUpfateDuration();
					}
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
				this.checked = false;
				this.isOpenBtn = false;
				this.jianhuzhuantai = "启动实时监护";
				this.switchFlash = true;
			},
			// 发送网络请求 上传数据 - 非实时 多条
			handleFetalHeartRate() {
				try {
					console.log(JSON.stringify(this.updataList));
					this.$u
						.post('/UploadListJHYInfo', {
							data: this.updataList
						})
						.then(res => {
							if (res.code == 200 && res.data == true) {
								this.updataList = [];
								uni.showToast({
									title: '上传成功',
									icon: 'none',
									duration: 3000
								});
								setTimeout(() => {
									uni.navigateBack();
								}, 3000)
							}
						});
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			// 实时数据 
			handleFetalHeartRateData() {
				let that = this;
				try {
					console.log(that.switchUpdataList);
					setTimeout(() => {
						// console.log('switchUpdataList')
						that.$u
							.post('/SS_UploadJHYInfo', {
								data: that.switchUpdataList
							})
							.then(res => {
								console.log(JSON.stringify(res));
								if (res.code == 200) {
									let arr = res.data;
									if (that.maindataInsert) {
										that.taixinId = arr[0].id;
										uni.setStorageSync('taixinId', that.taixinId)
									}

								} else {
									this.$lz.toast(res.info);
								}
							}).catch(e => {
								this.$lz.toast(e.errMsg);
							})
					}, 200);
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			handleUpfateDuration() {
				try {
					this.$u.post('/Rt_Endtime', {
						taixin_id: this.taixinId
					}).then(res => {
						console.log(res)
					})
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			// 清零
			handleClear() {
				if(this.checked == false && this.isOpenBtn == false){
					this.checked = true;
					this.isOpenBtn = true;
					this.isStop = true;
					this.handleStartTime();
					uni.showToast({
						title: '已开启实时监护,将自动监护30分钟',
						icon: 'none',
						duration: 5000
					})
					this.show = false;
					this.status = true;
					this.jianhuzhuantai = "实时监护中"
					this.switchFlash = false;
				}else{
					uni.showModal({
						title:'提示',
						content:'胎心监护已经开始,是否重新开始?点击确定重新开始,点击取消继续测量',
						success: (res) => {
							if(res.confirm){
								this.checked = true;
								this.isOpenBtn = true;
								this.isStop = true;
								this.$refs.setTime.stopTime();
								this.handleUpfateDuration();
								console.log('1111111');
								this.handleStartTime();
								this.show = false;
								this.status = true;
								this.jianhuzhuantai = "实时监护中"
								this.switchFlash = false;
							}
						}
					})
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		background-color: #ede0e7;
	}

	.u-col-item {
		width: 160rpx;
		height: 150rpx;
		border-right: 2rpx solid #ebebeb;
	}

	.u-col-lh {
		line-height: 70rpx;
	}

	.chart-size {
		height: 100%;
		width: 100%;
	}

	@keyframes flash {
		0% {
			opacity: 0;
		}

		50% {
			opacity: 0.8;
			color: #f00;
			font-size: 32rpx;
		}

		75% {
			opacity: 1;
			color: #f00;
			font-size: 32rpx;
		}

		100% {
			opacity: 0;
		}
	}

	@keyframes switchFlash {
		0% {
			opacity: 0;
		}

		50% {
			opacity: 1;
			background-color: #FFFF00;
			color: #000;
		}

		100% {
			opacity: 0;
		}
	}

	.flash {
		animation: flash 3s linear infinite;
	}

	.switchFlash {
		animation: switchFlash 2s linear infinite;
	}
</style>
