<template>
	<view>
		<u-cell-group :border="false">
			<!-- 医生编号 -->
			<view :data-index="0" @click="handleDoctorNumberPopup">
				<u-cell-item hover-class="none" :title-style="titleStyle" icon-size="60" icon="/static/image/gerenxinxi/yishengbianhao.png"
				 title="医生编号" :arrow="false">
					<text>编号:{{doctorNumber}} 姓名:{{doctorName}}</text>
					<u-select title="选择您的医生" v-model="add" mode="mutil-column-auto" :list="addlist" @confirm="handleDoctorNumberSelect"></u-select>
				</u-cell-item>
			</view>
			<!-- 姓名 -->
			<u-cell-item :title-style="titleStyle" icon-size="60" icon="/static/image/gerenxinxi/xingming.png" title="姓名" :arrow="false">
				<view class="position-absolute" style="width: 300rpx;top: 18rpx;right: 40rpx;">
					<u-input v-model="list.userName" input-align="right" placeholder="请输入姓名" />
				</view>
			</u-cell-item>
			<!-- 年龄 -->
			<u-cell-item :title-style="titleStyle" icon-size="60" icon="/static/image/gerenxinxi/nianling.png" title="年龄" :arrow="false">
				<view class="position-absolute" style="width: 300rpx;top: 18rpx;right: 40rpx;">
					<u-input v-model="list.userAge" input-align="right" placeholder="请输入年龄" />
				</view>
			</u-cell-item>
			<!-- 孕周 -->
			<view :data-index="1" @click="handleDoctorNumberPopup">
				<u-cell-item hover-class="none" :title-style="titleStyle" icon-size="60" icon="/static/image/gerenxinxi/yunzhou.png"
				 title="孕周" :arrow="false">
					<view class="position-absolute" style="width: 300rpx;top: 30rpx;right: 40rpx;">
						<text>{{gestationalWeekCounter}}</text>
						<u-select title="选择您的孕周" v-model="gestationalWeekCounterShow" mode="single-column" label-name="counter" :list="gestationalWeekList"
						 @confirm="handleStationalWeekConfirm"></u-select>
					</view>
				</u-cell-item>
			</view>
			<!-- 孕天 -->
			<view :data-index="2" @click="handleDoctorNumberPopup">
				<u-cell-item hover-class="none" :title-style="titleStyle" icon-size="60" icon="/static/image/gerenxinxi/yuntian.png"
				 title="孕天" :arrow="false">
					<view class="position-absolute" style="width: 300rpx;top: 30rpx;right: 40rpx;">
						<text>{{pregnantDayCounter}}</text>
						<u-select title="选择您的孕天" v-model="pregnantDayShow" label-name="counter" mode="single-column" :list="pregnantDayList"
						 @confirm="handlePregnantDaySelect"></u-select>
					</view>
				</u-cell-item>
			</view>
			<!-- 高危因素 -->
			<view :data-index="3" @click="handleDoctorNumberPopup">
				<u-cell-item hover-class="none" :arrow="false" :title-style="titleStyle" icon-size="60" icon="/static/image/gerenxinxi/gaoweiyinsu.png"
				 title="高危因素">
					<view class="position-absolute" style="width: 300rpx;top: 30rpx;right: 40rpx;">
						<text>{{ighRiskFactors}}</text>
						<u-select title="选择高危因素" v-model="ighRiskFactorsShow" label-name="txt" mode="single-column" :list="ighRiskFactorsList"
						 @confirm="handleIghRiskFactorsListSelect"></u-select>
					</view>
				</u-cell-item>
			</view>
			<!-- 身份证号 -->
			<u-cell-item :title-style="titleStyle" icon-size="60" icon="/static/image/gerenxinxi/shenfenzhenghao.png" title="身份证号"
			 :arrow="false">
				<view class="position-absolute" style="width: 340rpx;top: 18rpx;right: 40rpx;">
					<u-input v-model="list.userIDCard" input-align="right" placeholder="请输入身份证号" />
				</view>
			</u-cell-item>
			<!-- 绑定手机号 -->
			<u-cell-item :title-style="titleStylePhone" icon-size="60" icon="/static/image/gerenxinxi/bangdingshouji.png" title="绑定手机号"
			 :value="list.userPhone" :arrow="false"></u-cell-item>
			<!-- 紧急联系人 -->
			<u-cell-item :title-style="titleStyle" icon-size="60" icon="/static/image/gerenxinxi/jinjilianxiren.png" title="紧急联系人"
			 :arrow="false">
				<view class="position-absolute" style="width: 300rpx;top: 18rpx;right: 40rpx;">
					<u-input v-model="list.emergencyContact" input-align="right" placeholder="请输入紧急联系人电话" />
				</view>
			</u-cell-item>
		</u-cell-group>
		<!-- 注册下一步 -->
		<!-- <u-button v-if="isShow" :custom-style="customLoginBtnStyle" hover-class="none" :hair-line="false" @click="handleNextSubmitBtn">下一步</u-button> -->
		<u-button :custom-style="customLoginBtnStyle" hover-class="none" :hair-line="false" @click="handleSubmitBtn">提交</u-button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				// 下一步 提交按钮显示控制状态
				// isShow: true,
				// 按钮样式
				customLoginBtnStyle: {
					width: '686rpx',
					background: '#e55a6f',
					marginTop: '100rpx',
					color: '#fff',
					border: '1rpx solid #e55a6f'
				},
				// 左侧文字样式
				titleStyle: {
					marginLeft: '20rpx',
					fontSize: '32rpx'
				},
				titleStylePhone: {
					marginLeft: '20rpx',
					fontSize: '32rpx',
					color: '#a4a4a4'
				},
				// 默认编号
				doctorNumber: '',
				// 医院名称
				hos_name: '',
				// 默认医生姓名
				doctorName: '',
				deptName: '',
				// 医生编号弹出层
				add: false,
				// 孕周弹出层
				gestationalWeekCounterShow: false,
				// 默认孕周
				gestationalWeekCounter: '1',
				// 孕天弹出层
				pregnantDayShow: false,
				// 默认孕天
				pregnantDayCounter: '1',
				// 默认高危因素
				ighRiskFactors: '无',
				// 默认高危因素弹出层
				ighRiskFactorsShow: false,
				// 医生编号数组
				addlist: [],
				// 孕天数组
				pregnantDayList: [{
						value: '1',
						counter: '1'
					},
					{
						value: '2',
						counter: '2'
					},
					{
						value: '3',
						counter: '3'
					},
					{
						value: '4',
						counter: '4'
					},
					{
						value: '5',
						counter: '5'
					},
					{
						value: '6',
						counter: '6'
					},
					{
						value: '7',
						counter: '7'
					},
					{
						value: '8',
						counter: '8'
					},
					{
						value: '9',
						counter: '9'
					},
					{
						value: '10',
						counter: '10'
					},
					{
						value: '11',
						counter: '11'
					},
					{
						value: '12',
						counter: '12'
					},
					{
						value: '13',
						counter: '13'
					},
					{
						value: '14',
						counter: '14'
					},
					{
						value: '15',
						counter: '15'
					},
					{
						value: '16',
						counter: '16'
					},
					{
						value: '17',
						counter: '17'
					},
					{
						value: '18',
						counter: '18'
					},
					{
						value: '19',
						counter: '19'
					},
					{
						value: '20',
						counter: '20'
					},
					{
						value: '21',
						counter: '21'
					},
					{
						value: '22',
						counter: '22'
					},
					{
						value: '23',
						counter: '23'
					},
					{
						value: '24',
						counter: '24'
					},
					{
						value: '25',
						counter: '25'
					},
					{
						value: '26',
						counter: '26'
					},
					{
						value: '27',
						counter: '27'
					},
					{
						value: '28',
						counter: '28'
					}
				],
				// 列表数据
				list: {
					id: '',
					userName: '',
					userAge: 0,
					emergencyContact: '',
					userPhone: '13176008725',
					userIDCard: '',
					pwd: ''
				},
				lists: [],
				// 孕周选择操作列表
				gestationalWeekList: [{
						value: '1',
						counter: '1'
					},
					{
						value: '2',
						counter: '2'
					},
					{
						value: '3',
						counter: '3'
					},
					{
						value: '4',
						counter: '4'
					},
					{
						value: '5',
						counter: '5'
					},
					{
						value: '6',
						counter: '6'
					},
					{
						value: '7',
						counter: '7'
					},
					{
						value: '8',
						counter: '8'
					},
					{
						value: '9',
						counter: '9'
					},
					{
						value: '10',
						counter: '10'
					},
					{
						value: '11',
						counter: '11'
					},
					{
						value: '12',
						counter: '12'
					},
					{
						value: '13',
						counter: '13'
					},
					{
						value: '14',
						counter: '14'
					},
					{
						value: '15',
						counter: '15'
					},
					{
						value: '16',
						counter: '16'
					},
					{
						value: '17',
						counter: '17'
					},
					{
						value: '18',
						counter: '18'
					},
					{
						value: '19',
						counter: '19'
					},
					{
						value: '20',
						counter: '20'
					},
					{
						value: '21',
						counter: '21'
					},
					{
						value: '22',
						counter: '22'
					},
					{
						value: '23',
						counter: '23'
					},
					{
						value: '24',
						counter: '24'
					},
					{
						value: '25',
						counter: '25'
					},
					{
						value: '26',
						counter: '26'
					},
					{
						value: '27',
						counter: '27'
					},
					{
						value: '28',
						counter: '28'
					},
					{
						value: '29',
						counter: '29'
					},
					{
						value: '30',
						counter: '30'
					},
					{
						value: '31',
						counter: '31'
					},
					{
						value: '32',
						counter: '32'
					},
					{
						value: '33',
						counter: '33'
					},
					{
						value: '34',
						counter: '34'
					},
					{
						value: '35',
						counter: '35'
					},
					{
						value: '36',
						counter: '36'
					},
					{
						value: '37',
						counter: '37'
					},
					{
						value: '38',
						counter: '38'
					},
					{
						value: '39',
						counter: '39'
					},
					{
						value: '40',
						counter: '40'
					}
				],
				// 高危因素数组
				ighRiskFactorsList: [{
						value: '1',
						txt: '无'
					},
					{
						value: '2',
						txt: '轻'
					},
					{
						value: '3',
						txt: '重'
					}
				],
				state: ''
			}
		},
		onLoad(e) {
			if (e.detail) {
				this.lists = JSON.parse(e.detail)
				this.list.userPhone = this.lists.userNamePhone;
				this.list.pwd = this.lists.userNamePwd;
			} else {
				this.handleGetStorage();
			}
			this.handleGetDoctorNum();
		},
		methods: {
			getData(arrData) {
				if (arrData.length > 0) {
					let data = [];
					let dataKey = [];
					let that = this;
					arrData.forEach((item, index) => {
						if (!data[item.f_deptid]) {
							dataKey.push(item.f_deptid);
							data[item.f_deptid] = {
								label: item.f_deptname,
								value: item.f_deptid,
								children: []
							};
						}
						data[item.f_deptid].children.push({
							label: item.f_username,
							value: item.f_userid
						})
					})
					dataKey.map((res) => {
						that.addlist.push(data[res]);
					})
				}
			},
			handleGetDoctorNum(){
				let that = this;
				uni.request({
					url: 'http://dev.ajylive.cn:6060/api/eytsystem/getalldocotor',
					success: (res) => {
						console.log(res);
						that.getData(res.data.data);
					}
				});
			},
			// 医生编号弹出层列表
			handleDoctorNumberSelect(e) {
				for (let i in e) {
					this.doctorNumber = e[i].value;
					this.doctorName = e[i].label;
				}
			},
			// 孕周弹出层列表
			handleStationalWeekConfirm(e) {
				for (let i in e) {
					this.gestationalWeekCounter = e[i].label
				}
			},
			// 孕天弹出层列表
			handlePregnantDaySelect(e) {
				for (let i in e) {
					this.pregnantDayCounter = e[i].label
				}
			},
			// 高危因素弹出层列表
			handleIghRiskFactorsListSelect(e) {
				for (let i in e) {
					this.ighRiskFactors = e[i].label
				}
			},
			// 获取本地存储数据
			handleGetStorage() {
				uni.getStorage({
					key: 'user_login',
					success: (res) => {
						this.doctorNumber = res.data.Doctor_Id;
						this.doctorName = res.data.Doctor_Name;
						this.list.userAge = res.data.P_Age;
						this.list.emergencyContact = res.data.P_Husband_Telephone;
						this.list.userIDCard = res.data.P_IdCard;
						this.list.userName = res.data.P_Name;
						this.gestationalWeekCounter = res.data.P_Now_Yunzhou;
						this.list.userPhone = res.data.P_Telephone;
						this.pregnantDayCounter = res.data.P_YunTian;
						this.list.pwd = res.data.PassWord;
						this.list.id = res.data.PregnantID;
					}
				})
				this.isShow = false
			},
			// 弹出层显示状态
			handleDoctorNumberPopup(e) {
				let _index = Number(e.currentTarget.dataset.index);
				switch (_index) {
					case 0: // 医生编号
						this.add = true;
						break;
					case 1: // 孕周
						this.gestationalWeekCounterShow = true;
						break;
					case 2: // 孕天
						this.pregnantDayShow = true;
						break;
					case 3: // 高危因素
						this.ighRiskFactorsShow = true;
						break;
				}
			},
			// 提交修改请求
			handleSubmitBtn() {
				if (this.$u.test.isEmpty(this.doctorNumber || this.doctorName)) {
					this.$lz.toast('请先选择医生');
					return;
				}
				if (this.$u.test.isEmpty(this.list.userName)) {
					this.$lz.toast('姓名不能为空');
					return;
				} else if (!this.$u.test.letter(this.list.userName) && !this.$u.test.chinese(this.list.userName)) {
					this.$lz.toast('只能输入纯中文或纯英文的姓名');
					return;
				}
				if (this.$u.test.isEmpty(this.list.userAge)) {
					this.$lz.toast('年龄不能为空');
					return;
				} else if (!this.$u.test.digits(this.list.userAge) || !this.$u.test.range(this.list.userAge, [1, 120])) {
					this.$lz.toast('年龄错误,请输入1-120之间的整数');
					return;
				}
				if (!this.list.userIDCard) {
					this.$lz.toast('身份证不能为空');
					return;
				}
				if (!this.$u.test.idCard(this.list.userIDCard)) {
					this.$lz.toast('非法身份证');
					return;
				}
				if (!this.list.emergencyContact) {
					this.$lz.toast('紧急联系人不能为空');
					return;
				}
				if (!this.$u.test.mobile(this.list.emergencyContact)) {
					this.$lz.toast('非法手机号');
					return
				}
				if (this.list.emergencyContact == this.list.userPhone) {
					this.$lz.toast('紧急联系人不能于绑定的手机号相同');
					return;
				}
				this.$u.post('/UpdatePreInfo', {
					name: this.list.userName,
					idcard: this.list.userIDCard,
					tel: this.list.userPhone,
					hus_tel: this.list.emergencyContact,
					yuntian: this.pregnantDayCounter,
					yunzhou: this.gestationalWeekCounter,
					hos_name: this.hos_name,
					doc_name: this.doctorName,
					doc_id: this.doctorNumber,
					age: this.list.userAge,
					pw: this.list.pwd,
					state: '2',
					pre_id: this.list.id
				}).then(res => {
					if (res.code == 200) {
						uni.setStorage({
							key: 'user_login',
							data: res.data
						})
						this.$lz.toast('修改成功');
						this.handleGetStorage()
					} else {
						this.$lz.toast(res.info);
					}
				})

			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
