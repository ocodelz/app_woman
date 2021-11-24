<template>
	<view class="flex align-center justify-center">
		<view style="width: 96%;" class="mt-2">
			<u-form :error-type="errorType" :model="form" ref="uForm">
				<u-form-item :label-style="labelStyle" :border-bottom="false" label="wifi名称:" label-width="120"
					prop="wifiName">
					<u-input style="border-bottom: 1rpx solid #d7d7d7;" v-model="form.wifiName" height="100"
						placeholder="请输入WiFI名称" />
				</u-form-item>
				<u-form-item :label-style="labelStyle" :border-bottom="false" label="wifi密码:" label-width="120"
					prop="wifiPwd" style="margin-top: 30rpx;">
					<u-input style="border-bottom: 1rpx solid #d7d7d7;" type="password" v-model="form.wifiPwd"
						height="100" placeholder="请输入WiFi密码" />
				</u-form-item>
			</u-form>
			<u-button hover-class="none" :hair-line="false" type="success" :custom-style="customBtnStyle"
				@click="handleBtnClick">配置探头</u-button>
		</view>
		<!-- 探头连接提醒 -->
		<u-modal :show-title="false" :show-confirm-button="false" v-model="show" confirm-color="#000" negative-top="90">
			<view class="flex align-center justify-center flex-column" style="height: 280rpx;">
				<view class="flex align-center justify-center flex-column">
					<view class="mb-3">
						<u-image width="44" height="44" src="../../static/image/probeConnection/login.gif"></u-image>
					</view>
					<view class="ml-3 mr-3 flex align-center flex-column justify-center">
						<text class="mb-3">请拿起电源插座上的探头,等待探头自动连接,连接成功后会提示连接成功......</text>
						<u-count-down @end="handleEnd" :timestamp="timestamp" :show-days="false" :show-hours="false"
							:show-minutes="false" show-seconds></u-count-down>
					</view>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	var Fts6MgrModule = uni.requireNativePlugin('Fts6MgrPlugin-Fts6MgrModule');
	// var Fts6MgrModule = uni.requireNativePlugin('Fts6MgrPlugin');
	export default {
		data() {
			return {
				timestamp: 30,
				show: false,
				retData: '',
				onProbe1Audio: false,
				state: false,
				// 错误提示方式
				errorType: ['toast'],
				// 表单默认值
				form: {
					wifiName: '',
					wifiPwd: '',
					pre_id: ''
				},
				// 按钮样式
				customBtnStyle: {
					width: '98%',
					marginTop: '100rpx',
					background: '#e2354b',
					border: '1rpx solid #e2354b'
				},
				// 左侧字体
				labelStyle: {
					fontSize: '24rpx'
				},
				// 验证规则
				rules: {
					wifiName: [{
						required: true,
						message: '请输入wifi名称',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					wifiPwd: [{
							required: true,
							message: '请输入wifi密码',
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change', 'blur'],
						},
						{
							min: 8,
							message: '请输入至少8位数的wifi密码',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.enOrNum(value);
							},
							message: '不能是中文'
						}
					]
				}
			}
		},
		onLoad() {
			setTimeout(() => {
				this.start();
			}, 500)
			uni.getStorage({
				key: 'user_login',
				success: (res) => {
					let obj = res.data
					this.form.pre_id = obj.PregnantID;
				}
			})
			uni.showModal({
				title: '提示',
				content: "请先把胎心和宫缩探头放回电源插座，输入网络连接密码,最后点'配置探头'按钮，进行探头网络设置!",
				showCancel: false
			})
		},
		onShow() {
			clearInterval(getApp().globalData.timers);
		},
		mounted() {
			let wifiStorage = uni.getStorageSync('wifi_storage')
			let wifiName = wifiStorage.wifiName;
			let wifiPwd = wifiStorage.wifiPwd;
			if (this.form.pre_id === wifiStorage.pre_id && wifiName && wifiPwd) {
				this.form.wifiName = wifiName;
				this.form.wifiPwd = wifiPwd;
			} else {
				this.form.wifiName = "";
				this.form.wifiPwd = "";
			}
			let name = Fts6MgrModule.getCurrentWifiName();
			this.form.wifiName = name;
			if (this.form.wifiName == '') {
				setTimeout(() => {
					let name = Fts6MgrModule.getCurrentWifiName();
					this.form.wifiName = name;
				}, 2000)
			}
		},
		destroyed() {
			Fts6MgrModule.closeSettingSSID();
			Fts6MgrModule.stop();
			uni.hideLoading();
			// Fts6MgrModule.close();
		},
		methods: {
			// 启动监听
			start() {
				this.state = false;
				let that = this;
				this.onProbe1Audio = false;
				Fts6MgrModule.start({}, ret => {
					console.log(JSON.stringify(ret));
					// this.$lz.hideCancel('ret', JSON.stringify(ret))
					that.retData += (new Date()).toLocaleString() + ':' + ret + '<br>';
					let xtObj = JSON.parse(ret);
					console.log(xtObj);
					// this.$lz.hideCancel('xtObj', xtObj)
					console.log(typeof xtObj.data);
					// this.$lz.hideCancel('typeof xtObj.data', typeof xtObj.data)
					if (typeof xtObj.data == 'object') {
						console.log('-----------1');
						uni.setStorageSync('wifi_storage', this.form)
						uni.hideLoading();
						if (!that.state) {
							uni.showModal({
								title: '提示',
								content: '连接成功',
								showCancel: false
							})
							that.show = false;
							that.state = true;
						}
					}
				});
			},
			// 设置wifi
			handleSetWifi() {
			    Fts6MgrModule.configWifiInfo({
			     ssname: this.form.wifiName,
			     sspw: this.form.wifiPwd
			    },ret=>{
			     console.log(ret)
			     
			    });
			   },
			// handleSetWifi() {
			// 	Fts6MgrModule.configWifiInfo({
			// 		ssname: this.form.wifiName,
			// 		sspw: this.form.wifiPwd
			// 	});
			// },
			// 按钮
			handleBtnClick() {
				this.state = false;
				this.$refs.uForm.validate(valid => {
					if (valid) {
						Fts6MgrModule.closeSettingSSID();
						this.handleSetWifi();
						uni.showLoading({
							title: '正在配置请稍后...',
							mask: true,
						})
						setTimeout(() => {
							uni.hideLoading();
						}, 15 * 1000);
						setTimeout(() => {
							this.show = true;
						}, 15 * 1000)
					} else {
						console.log('验证失败');
					}
				});
			},
			handleEnd() {
				this.show = false;
				if (this.state == true) {
					uni.showModal({
						title: '提示',
						content: '连接成功',
						showCancel: false
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '连接失败，请放回探头，核对WiFi名称和密码后重新尝试连接.',
						showCancel: false
					})
				}
			},
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style>
</style>
