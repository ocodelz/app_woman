<template>
	<view class="wrap">
		<free-category 
			:current="current" 
			:title="title" 
			:state="state" 
			:list="list" 
			:info="info" 
			@click="handleTabItem"
			@switchCurrent="handleTapSwitchCurrett" 
			@handleIsDiary="handleIsDiary"
			>
		</free-category>
	</view>
</template>

<script>
	const apiUrl = 'http://app.jnthinksoft.cn:6060/api/postpartum/';
	import freeCategory from '@/components/free-category/free-category.vue';
	export default {
		components: {
			freeCategory
		},
		data() {
			return {
				// diary: '',
				// isDiary: false,
				background: {
					background: '#fc979f'
				},
				current: 0,
				state: '',
				title: '',
				info: {
					name: '',
					age: '',
					date: '',
					method: '',
					tel: '',
					deliveryDays: 0
				},
				list: [],
				detail: '',
				PregnantID: '',
				nbID: '',
				fillinID: '',
				paginationobjYF: {
					rows: 100,
					page: 1,
					sidx: '',
					sord: 'desc',
					records: 0,
					total: 0
				},
				paginationobjXSE: {
					rows: 100,
					page: 1,
					sidx: '',
					sord: 'desc',
					records: 0,
					total: 0
				},
			}
		},
		onLoad(e) {
			this.detail = e;
			console.log(e);
			// 初始化数据
		},
		onShow() {
			this._init(this.detail);
			console.log(this.info.deliveryDays);
		},
		methods: {
			handleIsDiary(){
				// this.isDiary = true;
				let res = uni.getStorage({
					key: 'user_login',
					success:res => {
						this.diary = res.data.Delivery_days;
						this.handleTapAddDiary();
					}
				})
			},
			handleBack() {
				uni.navigateBack();
			},
			handleTapSwitchCurrett(index) {
				this.current = index;
				this.nbID = this.list[this.current].nbID;
				// console.log(this.nbID);
				if (this.list[this.current].answerList.length > 0) {

				} else {
					// this.handleChildAnswerList(this.nbID, this.info.deliveryDays);
					this.handleWomanChildrenList(this.fillinID, this.info.deliveryDays)
				}
				console.log(this.list);
			},
			// 初始化数据
			_init(e) {
				let res = uni.getStorage({
					key: 'user_login',
					success: res => {
						// console.log(res);
						let data = res.data;
						this.PregnantID = data.PregnantID;
						let survey_id = data.awiId;
						this.fillinID = data.awiId;
						let info = this.info;
						info.name = data.P_Name;
						info.age = data.P_Age;
						info.date = data.Delivery_Date;
						info.tel = data.P_Telephone;
						info.method = data.Delivery_Mode == 0 ? '顺产' : '剖腹产';
						info.deliveryDays = data.Delivery_days;
						// 根据分娩方式判断是产后 还是术后
						// this.handleChildbirthWay();
						// 查询孕妇问卷列表
						this.title == '辣妈日记' ? this.handleSearchWAnswerSheetList(survey_id, info
								.deliveryDays) : this
							.handleWomanChildrenList(this.fillinID, info.deliveryDays);
						// console.log(this.title);
						if (this.title == '辣妈日记') {
							this.list = [];
							this.list.push({
								answer_type: '产后3天',
								sub_status: 3,
								fate: 3
							}, {
								answer_type: '产后7天',
								sub_status: 3,
								fate: 7
							}, {
								answer_type: '产后15天',
								sub_status: 3,
								fate: 15
							}, {
								answer_type: '产后30天',
								sub_status: 3,
								fate: 30
							}, {
								answer_type: '产后42天',
								sub_status: 3,
								fate: 42
							})
							this.handleChildbirthWay();
						} else {
							this.list = [];
						}
					}
				})
				if (e) {
					// console.log(e);
					this.title = e.detail;
				}
				uni.setNavigationBarTitle({
					title: this.title
				})
			},
			// 根据分娩方式判断是产后 还是术后
			handleChildbirthWay() {
				// console.log(this.title);
				for (let item of this.list) {
					if (this.title == '辣妈日记') {
						if (this.info.method == '剖腹产') {
							item.answer_type = item.answer_type.replace(/产后/, '术后');
							this.state = '术后';
							if (item.answer_type == '术后3天') {
								item.answer_type = '术后5天';
								item.fate = 5
							}
						}
						if (this.info.method == '顺产') {
							this.state = '产后';
						}
						// console.log(this.list);
					}
					if (this.title == '萌宝日记') {
						// console.log(item);
						for (let jtem of item.answerList) {
							jtem.answer_type = jtem.answer_type.replace(/产后/, '生后');
							this.state = '生后';
						}
					}
				}
			},
			// 添加问卷
			handleTapAddDiary() {
				let diary = this.diary;
				let answer_type = this.state + diary + '天';
				let answer_type1 = this.state + diary + '天';
				let index = 0;
				if (diary > 99 || diary <= 0 || this.$u.test.isEmpty(diary)) {
					return this.$lz.toast('请输入符合条件的数字');
				} else {
					if (this.title == '辣妈日记') {
						this.handleAddDiaryLM(diary, answer_type, answer_type1, index);
					}
					if (this.title == '萌宝日记') {
						this.handleDiaryMB(diary, answer_type, answer_type1, index);
					}
				}
			},
			handleAddDiaryLM(diary, answer_type, answer_type1, index) {
				let obj = {
					state: this.state,
					title: answer_type,
					tap: 0,
					survey_Name: this.info.name,
					survey_id: this.fillinID,
					survey_type: 0,
					answer_type: answer_type1,
					fate: this.returnFloat(diary),
					fillin_Name: this.info.name,
					fillin_ID: this.fillin_ID,
					nbID: this.nbID,
					PregnantID: this.PregnantID,
					sub_status: 3
				}
				if (obj.answer_type !== '产后42天' && obj.answer_type !== '生后42天' && obj.answer_type !== '术后42天') {
					obj.tap = 0;
				} else {
					obj.tap = 1;
				}
				console.log(obj);
				for (let item of this.list) {
					if (item.answer_type == answer_type && item.sub_status == 3) {
						// this.$u.post(apiUrl + 'SaveWAnswerSheetSave', obj).then(res => {
						// 	console.log(res);
						// 	this.$u.route(
						// 		'/pages/postpartumOrPostoperativeQuestionnaireSurvey/postpartumOrPostoperativeQuestionnaireSurvey?detail=' +
						// 		JSON.stringify(obj));
						// }).catch(err => {
						// 	console.log(err);
						// })
						this.$u.route(
							'/pages/postpartumOrPostoperativeQuestionnaireSurvey/postpartumOrPostoperativeQuestionnaireSurvey?detail=' +
							JSON.stringify(obj));
					}
					if (item.answer_type.indexOf(answer_type) > -1 && item.sub_status !== 3) {
						index++;
					}
				}
				if (index > 0 || index == 0) {
					let fate = ''
					if(index !== 0){
						answer_type1 = this.state + diary + '天-' + index
					}else{
						answer_type1 = this.state + diary + '天'
					}
					fate = diary + '.' + (index < 10 ? '0' + index : index)
					this.list.push({
						answer_type: answer_type1,
						sub_status: 3,
						fate: fate,
					})
					obj.answer_type = answer_type1;
					obj.title = answer_type1;
					obj.fate = fate;
					// this.$u.post(apiUrl + 'SaveWAnswerSheetSave', obj).then(res => {
					// 	console.log(res);
					// 	this.$u.route(
					// 		'/pages/postpartumOrPostoperativeQuestionnaireSurvey/postpartumOrPostoperativeQuestionnaireSurvey?detail=' +
					// 		JSON.stringify(obj));
					// }).catch(err => {
					// 	console.log(err);
					// })
					this.$u.route(
						'/pages/postpartumOrPostoperativeQuestionnaireSurvey/postpartumOrPostoperativeQuestionnaireSurvey?detail=' +
						JSON.stringify(obj));
				}
				this.list.sort((a, b) => {
					return a.fate - b.fate
				})
			},
			handleDiaryMB(diary, answer_type, answer_type1, index){
				let list = this.list[this.current];
				let obj = {
					child_answerinfo: {
						state: this.state,
						title: answer_type,
						tap: 0,
						survey_Name: list.child_Name,
						survey_id: this.nbID,
						survey_type: 1,
						answer_type: answer_type1,
						fate: this.returnFloat(diary),
						fillin_Name: this.info.name,
						nbID: this.nbID,
						sub_status: 3,
						fillin_ID: this.PregnantID
					}
				}
				if (obj.child_answerinfo.answer_type !== '产后42天' && obj.child_answerinfo.answer_type !== '生后42天' && obj.child_answerinfo.answer_type !== '术后42天') {
					obj.child_answerinfo.tap = 0;
				} else {
					obj.child_answerinfo.tap = 1;
				}
				console.log(obj);
				for (let item of this.list[this.current].answerList) {
					if (item.answer_type == answer_type && item.sub_status == 3) {
						// this.$u.post(apiUrl + 'CAnswerSheetSave', obj).then(res => {
						// 	console.log(res);
						// 	this.$u.route(
						// 		'/pages/postpartumOrPostoperativeQuestionnaireSurvey/postpartumOrPostoperativeQuestionnaireSurvey?detail=' +
						// 		JSON.stringify(obj.child_answerinfo));
						// }).catch(err => {
						// 	console.log(err);
						// })
						this.$u.route(
							'/pages/postpartumOrPostoperativeQuestionnaireSurvey/postpartumOrPostoperativeQuestionnaireSurvey?detail=' +
							JSON.stringify(obj.child_answerinfo));
					}
					if (item.answer_type.indexOf(answer_type) > -1 && item.sub_status !== 3) {
						index++;
					}
				}
				if (index > 0 || index == 0) {
					let fate = ''
					if(index !== 0){
						answer_type1 = this.state + diary + '天-' + index
					}else{
						answer_type1 = this.state + diary + '天'
					}
					fate = diary + '.' + (index < 10 ? '0' + index : index)
					this.list[this.current].answerList.push({
						answer_type: answer_type1,
						sub_status: 3,
						fate: fate,
					})
					obj.child_answerinfo.answer_type = answer_type1;
					obj.child_answerinfo.title = answer_type1;
					obj.child_answerinfo.fate = fate;
					// this.$u.post(apiUrl + 'CAnswerSheetSave', obj).then(res => {
					// 	console.log(res);
					// 	this.$u.route(
					// 		'/pages/postpartumOrPostoperativeQuestionnaireSurvey/postpartumOrPostoperativeQuestionnaireSurvey?detail=' +
					// 		JSON.stringify(obj.child_answerinfo));
					// }).catch(err => {
					// 	console.log(err);
					// })
					this.$u.route(
						'/pages/postpartumOrPostoperativeQuestionnaireSurvey/postpartumOrPostoperativeQuestionnaireSurvey?detail=' +
						JSON.stringify(obj.child_answerinfo));
				}
				this.list[this.current].answerList.sort((a, b) => {
					return a.fate - b.fate
				})
			},
			// 点击列表
			handleTabItem(item, jtem) {
				console.log(item);
				console.log(jtem);
				// console.log(jtem);
				// this.handleChildbirthWay();
				let fate = item.fate || jtem.fate;
				console.log(fate);
				let obj = {
					state: this.state,
					title: item.answer_type || jtem.answer_type,
					tap: 0,
					sub_status: item.sub_status || jtem.sub_status,
					num: item.num,
					fate: this.returnFloat(fate),
					pre_answerID: item.pre_answerID,
					survey_id: item.survey_id || item.nbID,
					survey_Name: item.child_Name,
					fillin_Name: this.info.name,
					fillin_ID: this.fillin_ID,
					child_answerID: jtem.child_answerID,
					nbID: this.nbID,
					PregnantID: this.PregnantID
				}
				if(this.title == '辣妈日记'){
					 obj.survey_type = '0'
				}else{
					obj.survey_type = '1';
				}
				// console.log(item.answer_type);
				if (obj.title !== '产后42天' && obj.title !== '生后42天' && obj.title !== '术后42天') {
					obj.tap = 0;
				} else {
					obj.tap = 1;
				}
				if(parseInt(fate) <= this.info.deliveryDays)
					this.$u.route(
						'/pages/postpartumOrPostoperativeQuestionnaireSurvey/postpartumOrPostoperativeQuestionnaireSurvey?detail=' +
						JSON.stringify(obj));
				else{
					return this.$lz.toast('当前不能填写此问卷');
				}
			},
			// 查询孕妇问卷列表
			handleSearchWAnswerSheetList(survey_id, deliveryDays) {
				this.handleChildbirthWay();
				let obj = {
					survey_id,
					paginationobj: JSON.stringify(this.paginationobjYF)
				}
				// console.log(obj);
				let newArr = [];
				this.$u.post(apiUrl + 'SearchWAnswerSheetList', obj).then(res => {
					console.log(res);
					// this.paginationobjYF.total = res.data.pagenumber;
					let arr = res.data.pagedatas;
					for (let item of arr) {
						if (item.fate.toString().indexOf('.') == -1) {
							item.fate = item.fate.toFixed(2);
						}
						if (item.fate.toString().split('.')[1].length == 1) {
							item.fate = item.fate + '0';
						}
					}
					if (res.code == 200 && arr.length) {
						arr = [...arr, ...this.list];
						this.list = this.unique(arr);
						this.list.sort((a, b) => {
							return a.fate - b.fate
						})
					} else {

					}
				}).catch(err => {
					this.$lz.toast(err.errMsg);
				})
			},
			// 小数处理
			returnFloat(fate) {
				var str = fate.toString().split(".");
				let len = fate.toString().replace(/\d+\.(\d*)/, "$1");
				if (str.length == 1) {
					fate = fate.toString() + ".00";
					return fate;
				}
				if (str.length > 1) {
					if (str[1].length < 2) {
						if (len < 10) {
							fate = fate.toString();
							fate = fate.slice(0, 3) + '0' + fate.slice(3);
						} else {
							return fate.toFixed(2);
						}
					}
					return fate;
				}
			},
			// 查询新生儿信息列表
			handleWomanChildrenList(awiID, deliveryDays) {
				this.handleChildbirthWay();
				this.$u.post(apiUrl + 'WomanChildrenList', {
					awiID
				}).then(res => {
					this.list = [];
					console.log(res);
					if (res.code == 200 && res.data.userInfo.length) {
						this.nbID = res.data.userInfo[this.current].nbid;
						let hoscardno = res.data.userInfo[this.current].hoscardno;

						for (let item of res.data.userInfo) {
							this.list.push({
								nbID: item.nbid,
								child_Name: item.child_name,
								child_Sex: item.child_sex,
								hoscardno: item.hoscardno,
								answerList: []
							})
						}
						uni.setStorageSync('hoscardno', hoscardno);
						this.handleChildAnswerList(this.nbID, deliveryDays);
					}
				}).catch(err => {
					this.$lz.toast(err.errMsg);
				})
			},
			// 数组去重
			unique(arr) {
				const res = new Map();
				return arr.filter((arr) => !res.has(arr.answer_type) && res.set(arr.answer_type, 1))
			},
			// 查询新生儿问卷列表
			handleChildAnswerList(survey_id, deliveryDays) {
				let obj = {
					survey_id,
					paginationobj: JSON.stringify(this.paginationobjXSE)
				}
				if (this.list[this.current].answerList.length > 0) {

				} else {
					this.list[this.current].answerList = [];
					this.list[this.current].answerList.push({
						answer_type: '生后5天',
						sub_status: 3,
						fate: 5
					}, {
						answer_type: '生后7天',
						sub_status: 3,
						fate: 7
					}, {
						answer_type: '生后15天',
						sub_status: 3,
						fate: 15
					}, {
						answer_type: '生后30天',
						sub_status: 3,
						fate: 30
					}, {
						answer_type: '生后42天',
						sub_status: 3,
						fate: 42
					})
				}
				this.handleChildbirthWay();
				this.$u.post(apiUrl + 'childAnswerList', obj).then(res => {
					console.log(res);
					// this.paginationobjXSE.total = res.data.pagenumber;
					// this.$lz.toast(res.info);
					let arr = res.data.pagedatas,
						newArr = this.list[this.current].answerList;
					for (let item of newArr) {
						if (item.fate.toString().indexOf('.') == -1) {
							item.fate = item.fate.toFixed(2);
						}
						if (item.fate.toString().split('.')[1].length == 1) {
							item.fate = item.fate + '0';
						}
					}
					if (res.code == 200) {
						if (arr.length) {
							this.list[this.current].answerList = this.unique(arr.concat(newArr));
						} else {

						}
					}
				}).catch(err => {
					this.$lz.toast(err.errMsg);
				})
			},
			// 滑动分页
			// handleScrolltolower() {
			// 	this.title == '辣妈' ? this.handleScrolltolowerLM() : this.handleScrolltolowerMB();
			// },
			// handleScrolltolowerLM() {
			// 	if (this.paginationobjYF.page < this.paginationobjYF.total) {
			// 		this.paginationobjYF.page++;
			// 		this.handleSearchWAnswerSheetList(this.fillinID, this.info.deliveryDays);
			// 	} else {
			// 		return this.$lz.toast('没有更多数据了')
			// 	}
			// },
			// handleScrolltolowerMB() {
			// 	if (this.paginationobjXSE.page < this.paginationobjXSE.total) {
			// 		this.paginationobjXSE.page++;
			// 		this.handleChildAnswerList(this.fillinID, this.info.deliveryDays);
			// 	} else {
			// 		return this.$lz.toast('没有更多数据了')
			// 	}
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		width: 100%;
		padding: 0 20rpx;
	}
</style>
