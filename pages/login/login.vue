<template>
	<view class="flex flex-column" :style="'height:'+pageHeight+'px'">
		<u-navbar title="登录" title-color="#000" :is-back="false" :background="background" :border-bottom="false"></u-navbar>
		<view class="flex flex-column align-center justify-center mt-5">
			<view style=" margin-bottom:76rpx;">
				<text style="font-size: 36rpx;font-weight: 500;">*欢迎使用孕婴安*</text>
				<view class="flex justify-center">V{{version}}</view>
			</view>
			<view class="header">
				<image src="http://www.ajylive.cn/update/pwguardapp/timg.jpg"></image>
			</view>
			<view class="mt-5" style="width: 526rpx;">
				<u-form :error-type="errorType" :model="form" ref="uForm">
					<u-form-item label="" prop="userNamePhone">
						<u-input type="number" v-model="form.userNamePhone" placeholder="请输入手机号"
							:adjust-position="false" />
					</u-form-item>
					<u-form-item label="" prop="userPwdPhone">
						<u-input type="password" v-model="form.userPwdPhone" placeholder="请输入手机密码"
							:adjust-position="false" />
					</u-form-item>
				</u-form>
			</view>
			<view class="flex justify-between mt-2 align-center" style="width: 526rpx;">
				<!-- 手机登录 -->
				<!-- 	<view @click="handleSwitchLanding">
					<text class="font-sm" style="color: #909399;">手机登录</text>
				</view> -->
				<!-- 记住密码 -->
				<checkbox-group>
					<label @tap="handleRememberPw" class="font-sm flex align-center">
						<checkbox value="psw" :checked='rememberPw' color="#09CC86" />记住密码
					</label>
				</checkbox-group>
				<!-- 点击注册 -->
				<view class="ml-2" @click="handleRegister"><text class="font-sm" style="color: #1a1da0;">点我注册</text>
				</view>
			</view>
		</view>
		<!-- 孕妇 非孕妇登录选项 -->
		<view class="flex align-center justify-center mt-4">
			<!-- <view class="flex-column align-center justify-center flex" :class="index == 0 ? 'mr-2' : 'ml-2'" v-for="(item,index) in imgList"
			 :key="index" @click="handleBtnClick(index)">
				<u-image :src="item.url" width="100rpx" height="100rpx" shape="circle" :class="current == index ? 'bord' : ''"></u-image>
				<text>{{item.txt}}</text>
			</view> -->
			<u-button hover-class="none" :hair-line="false"
				:class="form.userNamePhone !== '' && form.userPwdPhone !== '' ? 'active' : 'btnClass' "
				@click="handleBtnClick">登录</u-button>
		</view>
		<!-- 用户服务协议 -->
		<u-popup v-model="isPopup" mode="center" border-radius="16" width="660" height="660" :mask-close-able="false">
			<view class="flex align-center justify-center flex-column">
				<text class="font-md font-weight-bold mt-5">用户协议与隐私政策</text>
				<view class="p-3 font-weight-bold">
					感谢您选择“孕婴安”APP！我们非常重视您的个人信息和隐私保护。为了更好地保障您的个人权益，在您使用我们的产品前，
					请务必审慎阅读
					<text class="text-primary" @click="handleUserAgreement(1)">《隐私政策》</text>
					和
					<text class="text-primary" @click="handleUserAgreement(0)">《用户协议》</text>
					内的所有条款，尤其是：我们对您的个人信息的收集/保存/使用/对外提供/保护等规则条款，以及您的用户权力等条款。
					如您同意，请点击“同意”开始接受我们的服务。

				</view>
				<view class="flex align-center w-100 mt-4">
					<u-button class="mr-3" style="width: 160rpx;" shape="circle" type="error" @click="isPopup = false">暂不使用</u-button>
					<u-button class="ml-3" style="width: 160rpx;" shape="circle" type="success" @click="handleTapConsent">同意</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import utils from '@/utils/util.js'
	export default {
		data() {
			return {
				background: {
					background: '#fff'
				},
				isPopup: true,
				agreement: 0,
				rememberPw: true,
				errorType: ['toast'],
				version: '',
				current: 0,
				form: {
					// 账号
					userName: '',
					userPwd: '',
					userNamePhone: '',
					userPwdPhone: ''
				},
				// 登陆方式
				// switchLanding: true,
				// 登陆按钮样式
				customStyle: {
					marginTop: '40rpx',
					width: '526rpx'
				},
				rules: {
					userNamePhone: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur']
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: '请输入合法的手机号',
							trigger: ['change', 'blur']
						}
					],
					userPwdPhone: [{
							required: true,
							message: '请输入手机密码',
							trigger: ['change', 'blur']
						},
						{
							max: 16,
							required: true,
							message: '请输入6-16位手机密码',
							trigger: ['change', 'blur']
						},
						{
							min: 6,
							required: true,
							message: '请输入6-16位手机密码',
							trigger: ['change', 'blur']
						}
					]
				},
				pageHeight: 0,
			};
		},
		onLoad() {
			let _self = this;
			let pageHeight = uni.getSystemInfoSync();
			_self.pageHeight = pageHeight.windowHeight;
			uni.getStorage({
				key: 'user_login',
				success: res => {
					console.log(res);
					this.isPopup = false;
				},
				fail: err => {
					this.isPopup = true;
				}
			})
		},
		mounted() {
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (v) => {
				this.version = v.version;
			})
			// #endif
			let userPhone = uni.getStorageSync('userPhone');
			let userPw = uni.getStorageSync('userPw');
			uni.getStorage({
				key: 'user_login',
				success: (res) => {
					this.form.userNamePhone = res.data.P_Telephone
				}
			})
			if (userPw && userPw) {
				this.form.userNamePhone = userPhone;
				this.form.userPwdPhone = userPw;
			} else {
				this.form.userNamePhone = "";
				this.form.userPwdPhone = "";
			}
		},
		methods: {
			handleTapConsent(){
				uni.setStorageSync('agreement',1);
				this.agreement = 1;
				this.isPopup = false;
			},
			// 切换登陆方式
			// handleSwitchLanding() {
			// 	this.switchLanding = !this.switchLanding;
			// },
			// 登录按钮
			handleBtnClick() {
				if(uni.getStorageSync('agreement') == ''){
					return uni.showModal({
						title: '温馨提示',
						content: '请先同意“用户协议与隐私政策”',
						success: res => {
							if(res.cancel){
								this.isPopup = false;
							}else{
								this.isPopup = true;
							}
						}
					})
				}
				this.$refs.uForm.validate(valid => {
					if (valid) {
						uni.showLoading({
							title: '正在登录请稍后...',
						});
						let data = {
							account: this.form.userNamePhone,
							password: this.form.userPwdPhone,
							type: 2,
							type1: 0
						}
						console.log(data);
						this.$u.post('/AfterLogin', data).then(res => {
							console.log(res);
							let obj = res.data;
							if (obj) {
								if (obj.P_Yuchanqi == null) {
									obj.P_Yuchanqi = '---'
								}
								uni.setStorage({
									key: 'user_login',
									data: obj
								});
								uni.setStorageSync('patID',res.data.patID)
								uni.setStorageSync('userType', obj.Type)
							}
							if (this.rememberPw == true) {
								uni.setStorageSync('userPhone', this.form.userNamePhone)
								uni.setStorageSync('userPw', this.form.userPwdPhone)
							} else {
								uni.removeStorageSync('userPhone')
								uni.removeStorageSync('userPw')
							}
							if (res.code !== 200) {
								this.$lz.toast(res.info);
								// uni.hideLoading();
								return false;
							}
							let p_currenttime = obj.p_currenttime;
							if(uni.getSystemInfoSync().platform == 'ios'){
								p_currenttime = p_currenttime.replace(/-/g,'/');
							}
							let date = utils.formatTime(new Date());
							let newDate = parseInt(Math.abs((new Date(p_currenttime).getTime() - new Date(date).getTime())) /1000/60);
							if(newDate >= 5){
								return this.$lz.hideCancel('提示','手机时间('+date.replace(/\//g,'-') + ')' + '与标准时间(' + p_currenttime.replace(/\//g,'-') + ')' + '不一致，请校准手机系统时间后重试！');
							}
							if(res.code == 200){
								if (uni.getStorageSync('userType') === '0') {
									this.$u.route({
										url: '/pages/tabbar/index/index',
										type: 'tab'
									});
								} else {
									this.$u.route({
										url: '/pages/tabbar/purchaseOrLease/purchaseOrLease',
										type: 'tab'
									});
								}
							}
						}).catch(err => {
							console.log(err);
							console.log(JSON.stringify(err));
							if (err.errMsg == 'request:fail abort statusCode:-1' && uni.getSystemInfoSync()
								.platform == 'android') {
								uni.showModal({
									title: '无法登陆',
									showCancel: false,
									content: '请确认您的手机是否允许App使用网络\n查看方式:\n打开手机设置-找到孕婴安App-允许使用数据'
								})
							}
							if (err.errMsg == 'request:fail abort statusCode:-1' && uni.getSystemInfoSync()
								.platform == 'ios') {
								uni.showModal({
									title: '无法登陆',
									showCancel: false,
									content: '请确认您的手机是否允许App使用网络\n查看方式:\n打开手机设置-找到孕婴安App-无线数据'
								})
							}
							this.$lz.toast(err.errMsg);
						})
					}
				});
			},
			// 点击跳转注册页面
			handleRegister() {
				this.$u.route('/pages/register/register');
				uni.removeStorageSync('userPhone');
				uni.removeStorageSync('userPw');
			},
			handleRememberPw() {
				this.rememberPw = !this.rememberPw;
			},
			// 用户协议
			handleUserAgreement(state) {
				let url = '';
				state == 0 ? url = 'https://ajylive.cn/update/pwguardapp/%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE.html' : url =
					'https://ajylive.cn/update/pwguardapp/%E9%9A%90%E7%A7%81%E5%8D%8F%E8%AE%AE.html';
				uni.navigateTo({
					url: "../userAgreement/userAgreement?url=" + url
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	};
</script>

<style scoped>
	.header {
		width: 161upx;
		width: 161upx;
		background: rgba(63, 205, 235, 0);
		box-shadow: 0upx 10upx 15upx 0upx rgba(63, 205, 235, 0.47);
		border-radius: 50%;
		margin-top: 15upx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161upx;
		height: 161upx;
		border-radius: 50%;
	}

	.btnClass {
		/* margin-top: 40rpx; */
		width: 526rpx;
		background: #7eeeb1;
		border: 1rpx solid #7eeeb1;
		color: #fff;
	}

	.active {
		/* margin-top: 40rpx; */
		width: 526rpx;
		background-color: #00b457;
		border: 1rpx solid #00b457;
		color: #fff;
	}

	.bord {
		border: 2rpx solid #00b457;
		padding: 2rpx;
	}
</style>
