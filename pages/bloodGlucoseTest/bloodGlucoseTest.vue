<template>
	<view class="flex flex-column" :style="'height:' + pageHeight + 'px'">
		<u-navbar title="血糖测量" title-color="#fff" back-icon-color="#fff" :background="background"
			:border-bottom="false"></u-navbar>
		<!-- 测量结果正文 -->
		<view class="content flex flex-column" style="height:400rpx;">
			<view class="flex align-center justify-center content-box">
				<view class="content-box-xy font-weight-normal flex align-center justify-center flex-column">
					<!-- 血糖值 -->
					<text style="font-size: 80rpx;color: #80d478;">{{ bloodSugarObj.bloodGlucoseLevel }}</text>
					<!-- 单位 -->
					<text class="position-relative font-sm" style="bottom: 16rpx;color: #cecccf;">mmol/L</text>
					<!-- 血糖测试结果 -->
					<view v-if="isresult" class="flex align-center justify-center rounded-circle"
						:style="xtResultInfo()" style="width: 130rpx;height: 40rpx;">
						<text class="text-white font-md">{{ bloodSugarObj.bloodGlucoseLestResults }}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 血糖时间tabs -->
		<view class="position-relative flex " style="bottom: 16rpx;height: 80rpx;background-color:#fac6b6 ;">
			<u-tabs :list="list" font-size="30" gutter="25" active-color="#2B85E4" inactive-color="#000000"
				bg-color="#fac6b6" :show-bar="false" :current="current" @change="change" :bold="false"></u-tabs>
		</view>
		<view class="flex flex-column">
			<view class="" v-for="(item, index) in sugarControlTarget" :key="index">
				<view v-if="current == index" class="bg-white position-relative flex align-center justify-center border"
					style="bottom: 16rpx; height: 80rpx;">
					<text class="iconfont font">&#xe614;</text>
					<text class="font-md ml-1">控糖目标</text>
					<text class="font-md ml-2" style="color: #94a6b7;">{{ item.jieguozhifanwei1}}</text>
					<text class="font-md ml-1" style="color: #94a6b7;">-{{ item.jieguozhifanwei2}}</text>
				</view>
			</view>
		</view>
		<!-- 分割线 -->
		<!-- 	<view class="w-100 position-relative" style="bottom: 16rpx; height: 10rpx; background-color: #efefef;"></view>
		 -->
		<!-- 标签 -->
		<view class="w-100 position-relative border-bottom" style=" height: 140rpx;">
			<view class="mt-2 ml-2">为此次血糖添加标签</view>
			<block v-for="(item1, index1) in tagList" :key="index1">
				<u-tag class="flex ml-2 mt-2" shape="circle" mode="plain" border-color="#e6e5ea"
					:class="checkTagList.indexOf(item1) != -1 ? 'active' : 'tag'" :text="item1"
					@click="tapState == 0 ? handleTag(item1) : ''" />
			</block>
		</view>
		<!-- 当前感觉 -->
		<view class="mt-2" style=" height: 140rpx;">
			<text class="ml-2">当前感觉</text>
			<view class="flex flex-wrap">
				<block v-for="(item2, index2) in currentFeeling" :key="index2">
					<u-tag class="flex ml-2 mt-2 tag" shape="circle" :index="index2" mode="plain" border-color="#e6e5ea"
						:text="item2" :class="checkCurrentFeeling.indexOf(item2) !== -1 ? 'active' : 'tag'"
						@click="tapState == 0 ? handleTagClick(item2) : ''" />
				</block>
				<!-- <view class="ml-2 mt-2 flex align-center justify-center">
					<u-tag text="+" class="tag" shape="circle" mode="plain" border-color="#e6e5ea" @click="tapState == 0 ? handlePhysicalState() : ''"/>
				</view> -->
			</view>
		</view>

		<!-- 查看结果  上传 -->
		<!-- 	<view class="w-100 flex justify-center" style="margin-top: 200rpx;">
			<u-button shape="circle" class="btn" :hair-line="false" :ripple="false" v-if="tapState == 0 ? true : false" @click="uploadBtn">查看结果</u-button>
		</view> -->
		<!-- 结果 -->
		<!-- 测量结果 -->
		<view class="flex flex-column pl-5">
			<!-- -->
			<view class="flex align-center" v-if="bloodSugarObj.bloodGlucoseLestResults">
				<!-- -->
				<text class="font-md font-weight-bold">检测结果：</text>
				<text class="font-md font-weight-bold text-danger">{{ bloodSugarObj.bloodGlucoseLestResults }}</text>
			</view>
			<!-- -->
			<view class="flex align-center" v-if="bloodSugarObj.time">
				<!-- -->
				<text class="font-md font-weight-bold">检测时间：{{ bloodSugarObj.time }}</text>
				<text class="font-md font-weight-bold text-danger"></text>
			</view>
		</view>
		<!-- 审核结果 -->
		<view class="flex flex-column pl-5">
			<!-- v-if="audit" -->
			<view class="flex align-center" v-if="bloodSugarObj.exam_result">
				<!--  -->
				<text class="font-md font-weight-bold">审核结果：</text>
				<text class="font-md font-weight-bold text-danger">{{ bloodSugarObj.exam_result }}</text>
			</view>
			<view class="flex align-center" v-if="bloodSugarObj.exam_time">
				<!--  -->
				<text class="font-md font-weight-bold">审核时间：{{ bloodSugarObj.exam_time }}</text>
				<text class="font-md font-weight-bold text-danger"></text>
			</view>
			<!-- <view class="flex align-center" v-if="bloodSugarObj.sbcljy">
				<text class="font-lg font-weight-bold">设备建议：</text>
				<text class="font-lg font-weight-bold text-danger">{{bloodSugarObj.sbcljy}}</text>
			</view> -->
			<view class="flex align-center" v-if="bloodSugarObj.yishengjianyi">
				<!--  -->
				<text class="font-md font-weight-bold">医生建议：</text>
				<text class="font-md font-weight-bold text-danger">{{ bloodSugarObj.yishengjianyi }}</text>
			</view>
		</view>
		<!-- 设备连接状态 -->
		<!--  -->
		<view class=" w-100 flex align-center justify-center flex-wrap " style="margin-top: 15rpx;" v-if="tapState == 0">
			<view class="w-100 flex align-center justify-center" :style="equipmentStatus == true ? 'color:#19be6b;' : 'color:#f00;'">{{ deviceStatus }}</view>
		</view>
		<!-- 保存按钮 -->
		<!-- <view class="position-fixed w-100" style="height: 80rpx;bottom: 25rpx;">
			<u-button :disabled="disabled" :style="disabled ? 'background-color:#3dbbff;' : 'background-color: #4089ce;'"
			 :hair-line="false" style="width: 420rpx;color: #fff;" shape="circle" @click="handleBloodGlucoseData">保存</u-button>
		</view> -->
		<!-- 添加状态 -->
		<!-- <u-modal v-model="isShow" show-cancel-button @confirm="handleAddState">
			<view class="slot-content" style="height: 100rpx;">
				<u-input v-model="state" type="text" maxlength="5" placeholder="请输入您当前身体状况" />
			</view>
		</u-modal> -->
		<u-top-tips ref="uTips"></u-top-tips>
		<u-popup mode="center" v-model="show" width="700" border-radius="12" safe-area-inset-bottom
			v-if="purchaseState == 0">
			<view style="height: 400rpx;">
				<text class="flex align-center justify-center font-md font-weight-bold mt-4">以下设备即将过期</text>
				<view class="flex flex-column mt-3 ml-3" v-for="(item,index) in updateList" :key="index">
					<text>设备名称: {{item.e_name}}</text>
					<text>设备类型: {{item.e_type}}</text>
					<text>到期时间: {{item.return_time}}</text>
				</view>
				<view class="flex align-center justify-center" style="margin-top: 70rpx;">
					<u-button type="error" size="medium" @click="show = false">我知道了</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	let bldsgr = null;
	let bldsugarDevice = require('@/utils/BTDevice/ThreeNuoBldSugarBTDevice.js');
	import {
		clearStorageList,
		setStorageList
	} from '@/common/storage.js';
	import tool from '@/utils/util.js';

	export default {
		data() {
			return {
				customStyle: {
					width: '100rpx',
					height: '50rpx'
				},
				deviceStatus: '未就绪,请插入试条.如果等待超过30秒,请返回首页重新进入血糖测量界面...',
				equipmentStatus: false,
				show: false,
				// isShow: false,
				// 按钮状态
				disabled: true,
				// 提示框显示状态
				//	isTips: false,
				// 查看结果显示状态
				audit: false,
				// 血糖测试结果显示状态
				isresult: false,
				// state: '', // 添加当前感觉
				// 时间
				// myDate: '20/09/03 周四 15:15',
				// 自定义导航样式
				background: {
					backgroundColor: '#fc979f'
				},
				// tab列表
				list: [{
						name: '空腹'
					},
					{
						name: '餐后2小时'
					}
				],
				updateList: [],
				current: 1, //下标
				// tagCurrent: -1,
				sugarControlTarget: [],
				tagList: ['已服口服药', '已注射胰岛素', '运动后'],
				checkTagList: [],
				currentFeeling: ['正常', '头晕', '头痛', '心慌', '恶心', '呕吐'],
				checkCurrentFeeling: [],
				bloodSugarObj: {
					// title: '',
					equipment_id: '',
					e_name: '',
					notice_id: '',
					service_id: '',
					write_in_id: '',
					// 孕妇id
					pre_id: '',
					// 检测时间
					time: '',
					// 审核时间
					exam_time: '',
					// 血糖值
					bloodGlucoseLevel: '---',
					// 测试结果
					bloodGlucoseLestResults: '',
					// 设备测量建议
					sbcljy: '',
					// 0有效 1无效
					flag: 0,
					// 控制液
					effect: '',
					// 医生建议
					yishengjianyi: '',
					// 审核结果
					exam_result: ''
				},

				eat: '',
				// 跳转状态
				tapState: 0,
				pageHeight: 0,
				bloodSugarCqList: [],
				bloodSugarChList: [],
				purchaseState: 0
			};
		},
		onLoad(e) {
			try {
				let _self = this;
				let pageHeight = uni.getSystemInfoSync();
				_self.pageHeight = pageHeight.windowHeight;
				this.tapState = e.tapState || 0;
				// #ifdef APP-PLUS
				plus.device.setWakelock(true);
				// #endif
				if (e.purchaseState) {
					this.purchaseState = e.purchaseState;
				}
				let getResult = uni.getStorageSync('result_storage')
				console.log(getResult);
				for (let item of getResult) {
					if (item.classify_name == '血糖' && item.teshutiaojian == '餐前') {
						this.bloodSugarCqList.push(item)
					} else if (item.classify_name == '血糖' && item.teshutiaojian == '餐后') {
						this.bloodSugarChList.push(item)
					}
				}
				for (let item of this.bloodSugarCqList) {
					if (item.jieguopanding == "正常") {
						this.sugarControlTarget.push(item)
					}
				}
				for (let _item of this.bloodSugarChList) {
					if (_item.jieguopanding == "正常") {
						this.sugarControlTarget.push(_item)
					}
				}
				if (e.detail) {
					let xtobj = JSON.parse(e.detail);
					if (xtobj.state == 1) {
						this.eat = xtobj.eat;
						if (this.eat == '餐后2小时') {
							this.current = 1;
						} else if (this.eat == '空腹') {
							this.current = 0;
						}
					} else {
						this.eat = xtobj.is_eat;
						if (this.eat == '餐后2小时') {
							this.current = 1;
						} else if (this.eat == '空腹') {
							this.current = 0;
						}
					}
					this.audit = true;
					this.isresult = true;
					this.bloodSugarObj.yishengjianyi = xtobj.yishengjianyi;
					this.bloodSugarObj.bloodGlucoseLevel = xtobj.celiangzhi;
					this.bloodSugarObj.bloodGlucoseLestResults = xtobj.test_result;
					this.bloodSugarObj.exam_result = xtobj.exam_result;
					this.bloodSugarObj.exam_time = xtobj.exam_time;
					this.bloodSugarObj.time = xtobj.t_time;
					let tapArr = xtobj.current_feeling ? xtobj.current_feeling.split(',') : [];
					let tagArr = xtobj.xuetang_lable ? xtobj.xuetang_lable.split(',') : [];
					for (let item of tagArr) {
						this.handleTag(item);
					}
					for (let item of tapArr) {
						this.handleTagClick(item);
					}
				} else {
					let that = this;
					uni.getStorage({
						key: 'user_login',
						success: res => {
							this.bloodSugarObj.pre_id = res.data.PregnantID;
							this.handleDeviceInformation(res.data.PregnantID)
						}
					});
					bldsgr = new bldsugarDevice.ThreeNuoBldSugarBTDevice();
					//bldsgr.close();
					bldsgr.init();
					setTimeout(() => {
						uni.getStorage({
							key: 'equipment_ids',
							success: res => {
								let arr = res.data,
									_arr = [];
								for (let item of arr) {
									if (item.status === "已领用" && item.e_type === "血糖仪") {
										_arr.push(item)
									}
								}
								if (_arr.length > 1) {
									uni.showModal({
										title: '提示',
										content: '设备绑定过多，请联系管理员',
										showCancel: false
									})
									return;
								}
								let item = _arr.find(function(element) {
									return element.e_type == '血糖仪' && element.status === "已领用";
								});
								if (item == null) {
									uni.showModal({
										title: '提示',
										content: '请联系医院管理员进行设备购买/租用~',
										showCancel: false
									});
									return;
								}
								if (!item.notice_id || !item.write_in_id || !item.service_id || !item
									.e_name) {
									uni.showModal({
										title: '提示',
										content: '请先领用/购买设备哦~',
										showCancel: false
									});
									return;
								}
								that.bloodSugarObj.e_name = item.e_name;
								that.bloodSugarObj.notice_id = item.notice_id;
								that.bloodSugarObj.write_in_id = item.write_in_id;
								that.bloodSugarObj.service_id = item.service_id;
								that.bloodSugarObj.equipment_id = item.equipment_id;
								that.initXtyBlue();
							}
						});
					}, 1000)

				}
			} catch (e) {
				console.log(e.message);
				this.testdata = e.message;
			}
		},
		onShow() {
			this.handleUpdateEquipStatus();
			console.log(this.deviceStatus);
			console.log(this.equipmentStatus);
		},
		destroyed() {
			try {
				// #ifdef APP-PLUS
				plus.device.setWakelock(false);
				// #endif

				console.log('destroyed');
				bldsgr.close();
			} catch (e) {
				console.log(e.message);
				this.testdata = e.message;
			}
		},
		onReady() {
			try {
				let that = this;
				if (that.tapState == 0) {
					//this.$refs.uToast.show
					that.$refs.uTips.show({
						title: "请根据自身情况选择饮食状况,当前默认为'餐后2小时'.\r\n'血糖标签'和您的'当前感觉'可不选!",
						// 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
						type: 'info',
						position: 'bottom',
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
		methods: {
			handleDeviceInformation(y_id) {
				this.$u
					.post('/GetAllEquipmentsByPid', {
						pregnant_id: y_id
					})
					.then(res => {
						let _list = res.data;
						// Arr = [];
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
			btnClick() {
				//this.isTips = false;
				try {
					this.initXtyBlue();
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
							//console.log(str);
							//if (str ==null) continue
							let date = new Date();
							if (uni.getSystemInfoSync().platform == "ios") {
								date = new Date(str.replace(/-/g, '/'));
							} else {
								date = new Date(str);
							}
							let time = new Date();

							if ((date.getTime() - time.getTime()) / (24 * 3600 * 1000) <= 3 &&
								item.status == '已领用' && item.e_type == "血糖仪") {
								_arr.push(item)
								this.updateList = _arr

								this.show = true;
							}
							if (date.getTime() <= time.getTime() &&
								item.status == '已领用' && item.e_type == "血糖仪") {

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
			// 血糖测量显示状态
			xtResultInfo() {
				try {
					let xt = Number(this.bloodSugarObj.bloodGlucoseLevel);
					let index = this.current;
					let _result = '',
						_bg = '';
					switch (index) {
						case 0:
							for (let item of this.bloodSugarCqList) {
								if (item.jieguopanding === '血糖低' && xt >= item.jieguozhifanwei1 && xt < item
									.jieguozhifanwei2) {
									_result = item.jieguopanding;
									_bg = '#5500ff';
									// break;
								}
								if (item.jieguopanding === '正常' && xt >= item.jieguozhifanwei1 && xt <= item
									.jieguozhifanwei2) {
									_result = item.jieguopanding;
									_bg = '#19be6b';
									// break;
								}
								if (item.jieguopanding === '血糖高' && xt > item.jieguozhifanwei1 && xt <= item
									.jieguozhifanwei2) {
									_result = item.jieguopanding;
									_bg = '#f00';
									// break;
								}
							}
							this.bloodSugarObj.bloodGlucoseLestResults = _result;
							return `backgroundColor:` + _bg;
							break;
						case 1:
							for (let item of this.bloodSugarChList) {
								if (item.jieguopanding === '正常' && xt >= item.jieguozhifanwei1 && xt <= item
									.jieguozhifanwei2) {
									_result = item.jieguopanding;
									_bg = '#19be6b';
									break;
								}
								if (item.jieguopanding === '血糖低' && xt >= item.jieguozhifanwei1 && xt < item
									.jieguozhifanwei2) {
									_result = item.jieguopanding;
									_bg = '#5500ff';
									break;
								}
								if (item.jieguopanding === '血糖高' && xt > item.jieguozhifanwei1 && xt <= item
									.jieguozhifanwei2) {
									_result = item.jieguopanding;
									_bg = '#f00';
									break;
								}
							}
							this.bloodSugarObj.bloodGlucoseLestResults = _result;
							return `backgroundColor:` + _bg;
							break;
					}
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			// 血糖设备测
			initXtyBlue() {
				console.log('initXtyBlue 0')
				let that = this;
				try {
					/*uni.showLoading({
						title: '正在加载...'
					});*/
					//that.bloodSugarObj.time=tool.getFtSystemTime()
					// that.tapState = 0;
					let jsonParam = {
						//1D016AE8-9CEF-CD25-CDA2-322770B8C7B0
						//'67171027-243A-6974-3B4F-6D871F918A55',
						deviceName: that.bloodSugarObj.e_name,
						notifyId: that.bloodSugarObj.notice_id,
						writeId: that.bloodSugarObj.write_in_id,
						serviceId: that.bloodSugarObj.service_id
						//callback:
					};
					console.log('initXtyBlue 1')
					bldsgr.conn(
						jsonParam,
						function(d) {
							console.log('Ui receive' + JSON.stringify(d));
							if (d.success == true && d.type == 'result') {
								console.log('Ui receive' + JSON.stringify(d));
								that.bloodSugarObj.time = tool.getFtSystemTime();
								let xtarr = d.data.datas;
								let _arr = [];
								let effect = that.bloodSugarObj == 0 ? '有效' : '无效';
								let kzy = Number(that.bloodSugarObj.flag);
								switch (that.current) {
									case 0:
										that.eat = '空腹';
										break;
									case 1:
										that.eat = '餐后2小时';
										break;
								}
								//处理仪器返回的数据改成列表数据
								for (let item of xtarr) {
									if(item.value == 'L'){
										item.value = '1.0';
									}else if(item.value == 'H'){
										item.value = '33.4';
									}
									_arr.push({
										e_id: that.bloodSugarObj.equipment_id,
										p_id: that.bloodSugarObj.pre_id,
										t_time: that.bloodSugarObj.time,
										flag: item.flag,
										type: '血糖',
										state: 1,
										test_result: item.result,
										xuetang_lable: that.checkTagList.join(','),
										current_feeling: that.checkCurrentFeeling.join(','),
										celiangzhi: item.value,
										sbcljy: that.bloodSugarObj.sbcljy,
										eat: that.eat,
										kzy: kzy,
										effect: effect
									});
								}
								that.bloodSugarObj.flag = _arr[0].flag;
								that.bloodSugarObj.bloodGlucoseLevel = _arr[0].celiangzhi;
								that.bloodSugarObj.bloodGlucoseLestResults = _arr[0].test_result;
								that.bloodSugarObj.time = _arr[0].t_time;
								that.isresult = true;
								// that.disabled = false;
								console.log(_arr);
								setStorageList(_arr);
								setTimeout(() => {
									that.handleBloodGlucoseData();
								}, 500);
								that.$forceUpdate();
							} else {
								if (d.type && d.type == 'connectstate') {
									console.log(4444);
									// console.log("d.type == '_getDevInfo'")
									if (d.msg == "已连接") {
										that.deviceStatus = '已连接,请采血进行测量(' + tool.formatTime(new Date()) + ')...';
										that.equipmentStatus = true;
										console.log(3333);
									} else {
										that.deviceStatus = '未连接,请保持血糖仪开机状态!!(' + tool.formatTime(new Date()) + ')...';
										that.equipmentStatus = false;
										console.log(1111);
									}
								} else {
									that.deviceStatus = d.msg;
									// that.equipmentStatus = d.success;
										console.log(2222);
								}
								/*if (d.type && d.type == 'initBlue') {
									that.deviceStatus = d.msg;
									that.equipmentStatus = false;
								}
								if (d.type && d.type == 'err') {
									that.deviceStatus = d.msg;
									that.equipmentStatus = false;
								}
								if (d.type && d.type == 'startReceive') {
									that.deviceStatus = d.msg;
									that.equipmentStatus = false;
								}*/

								//uni.hideLoading();
							}
							//that.deviceStatus = '设备未就绪,请稍后...';
							//that.equipmentStatus = false;
						},
						2000
					);
				} catch (e) {
					console.log(e.message);
					//uni.hideLoading();
					uni.showModal({
						title: 'err',
						content: e.message,
						showCancel: false
					});
					//TODO handle the exception
				}
			},
			// 上传按钮
			// uploadBtn() {
			// 	this.initXtyBlue();
			// },
			// 发送血糖网络请求
			handleBloodGlucoseData() {
				try {
					let _obj = this.bloodSugarObj;
					switch (this.current) {
						case 0:
							this.eat = '空腹';
							break;
						case 1:
							this.eat = '餐后2小时';
							break;
					}
					let effect = _obj.flag == 0 ? '有效' : '无效';
					let kzy = Number(_obj.flag);
					let data = {
						e_id: _obj.equipment_id,
						p_id: _obj.pre_id,
						c_time: _obj.time,
						kzy: kzy,
						eat: this.eat,
						effect: effect,
						celiangzhi: _obj.bloodGlucoseLevel,
						t_result: _obj.bloodGlucoseLestResults,
						sbcljy: _obj.sbcljy,
						c_feel: this.checkCurrentFeeling.join(','),
						xtlable: this.checkTagList.join(',')
					};
					console.log(data);
					this.$u.post('/UploadXTInfo', data).then(res => {
						console.log(JSON.stringify(res));
						if (res.data == true && res.code == 200) {
							clearStorageList('血糖');
							uni.showToast({
								title: '提交成功',
								icon: 'none',
								duration: 5000
							});
							setTimeout(() => {
								uni.navigateBack()
							}, 5000)
						}
						this.deviceStatus = '自动提交成功,正在准备下一次测量,请稍后...';
						this.equipmentStatus = false;
					}).catch(err => {
						console.log(err);
						uni.showToast({
							title: err,
							icon: 'none',
							duration: 5000
						});
					})
				} catch (e) {
					console.log(22222222222222);
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			// tab切换
			change(index) {
				try {
					this.current = this.tapState == 0 ? index : this.current;
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			// 血糖标签
			handleTag(item) {
				try {
					if (this.checkTagList.indexOf(item) == -1) {
						this.checkTagList.push(item);
					} else {
						this.checkTagList.splice(this.checkTagList.indexOf(item), 1);
					}
				} catch (e) {
					console.log(e.message);
					this.testdata = e.message;
				}
			},
			// 当前感觉
			handleTagClick(item) {
				try {
					if (this.checkCurrentFeeling.indexOf(item) == -1) {
						this.checkCurrentFeeling.push(item);
					} else {
						this.checkCurrentFeeling.splice(this.checkCurrentFeeling.indexOf(item), 1);
					}
				} catch (e) {
					console.log(e.message)
					this.testdata = e.message;
				}
			}
			// 点击显示modal模态框
			// handlePhysicalState() {
			// 	this.isShow = true;
			// }
			// 添加当前身体状况
			// handleAddState() {
			// 	if (!this.state) {
			// 		return uni.showToast({
			// 			title:'内容不能为空',
			// 			icon:'none'
			// 		})
			// 	}
			// 	if (this.currentFeeling.indexOf(this.state) === -1) {
			// 		this.currentFeeling.push(this.state)
			// 	} else {
			// 		uni.showToast({
			// 			title: '此标签已存在了哦~ ',
			// 			icon: 'none'
			// 		})
			// 	}
			// 	this.state = '';
			// },
			// handleTagClick(index2){
			// 	uni.showModal({
			// 		content:'要删除改元素吗？',
			// 		success: (res) => {
			// 			if(res.confirm){
			// 				this.currentFeeling.splice(index2,1)
			// 			}else if(res.cancel){
			// 				return false;
			// 			}
			// 		}
			// 	})
			// }
		}
	};
</script>

<style scoped lang="scss">
	// .titleTop {
	// 	color: #a8eff6;
	// }

	// .container-box {
	// 	background: linear-gradient(180deg, #fc979f 0%, #fac6b6 49%, #fac6b6 51%, #fac6b6 100%);
	// }
	.content {
		//background-color: #4ea2fb;
		background: linear-gradient(180deg, #fc979f 0%, #fac6b6 49%, #fac6b6 51%, #fac6b6 100%);
		width: 100%;
		height: 400rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.content-box {
			width: 300rpx;
			height: 290rpx;
			background-color: #fcfcfb;
			border-radius: 100%;

			.content-box-xy {
				width: 250rpx;
				height: 250rpx;
				background-color: #ffffff;
				border-radius: 100%;
				border: 1rpx solid #eeeeee;
			}
		}
	}

	.tag {
		color: #3dbbff;
	}

	.active {
		color: #f00;
	}

	// .slot-content {
	// 	width: 98%;
	// 	font-size: 28rpx;
	// 	color: $u-content-color;
	// 	margin-top: 20rpx;
	// 	padding-left: 30rpx;
	// }

	// .btn {
	// 	width: 480rpx;
	// 	height: 80rpx;
	// 	background-color: #4ea2fb;
	// 	border: 1rpx solid #4ea2fb;
	// 	color: #fff;
	// }
</style>
