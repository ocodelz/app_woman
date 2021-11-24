<template>
	<view class="wrap w-100">
		<free-questionnaire :list="list" @click="handleDistributionInterface" :evaluate="evaluate" :infant="infant"
			:pregnantWoman="pregnantWoman" :surveyType="survey_type" @input="handleChangeInput" :subStatus="sub_status"
			:state="state">
		</free-questionnaire>
	</view>
</template>

<script>
	const apiUrl = 'http://app.jnthinksoft.cn:6060/api/postpartum/';
	import freeQuestionnaire from '@/components/free-questionnaire/free-questionnaire.vue';
	import util from "../../utils/util.js";
	export default {
		components: {
			freeQuestionnaire
		},
		data() {
			return {
				pregnantWoman: {
					Delivery_Date: '',
					hos_depName: '',
					P_Telephone: '',
					P_Name: '',
					P_Age: 0,
					P_Now_Yunzhou: '',
					P_Chanci: 0,
					Initial_regular: '',
					Delivery_Mode: '',
					P_Highrisk_Level: '',
					P_Highrisk_Factor: '',
					is_painless: '',
					perineal_condition: '',
					natural_cut: '',
					non_medical_indication: '',
					complication: '',
					emerg_operation: '',
				},
				infant: {
					child_birth_Date: '',
					child_Name: '',
					child_Sex: '',
					birth_date: '',
					birth_week: '',
					gestation_ending: '',
					delivery_Mode: '',
					transfer: '',
					birth_weight: ''
				},
				evaluate: '',
				tap: 0,
				state: '',
				title: '',
				list: [],
				survey_Name: '',
				survey_id: '',
				fillin_ID: '',
				fillin_Name: '',
				Review_Name: '',
				whether_receive: 0,
				pre_answerID: '',
				child_Name: '',
				child_answerID: '',
				sub_status: 0,
				fate: 3,
				nbID: '',
				PregnantID: '',
				userid: '',
				num: 0,
				survey_type: '',
			}
		},
		onLoad(e) {
			console.log(e);
			if (e.detail) {
				let detail = JSON.parse(e.detail)
				this.state = detail.state;
				this.title = detail.title;
				this.tap = detail.tap;
				this.pre_answerID = detail.pre_answerID;
				this.sub_status = detail.sub_status;
				this.child_Name = detail.survey_Name;
				this.survey_id = detail.survey_id;
				this.fillin_Name = detail.fillin_Name;
				this.fillin_ID = detail.fillin_ID;
				this.child_answerID = detail.child_answerID;
				this.nbID = detail.nbID;
				this.PregnantID = detail.PregnantID;
				this.userid = detail.userid;
				this.fate = detail.fate;
				this.survey_type = detail.survey_type;
				console.log(this.fate);
				console.error(this.state);
				// console.log(this.PregnantID);
				// console.log(this.fillin_ID);
				if (detail.num) {
					this.num = detail.num;
				}
			}
			this._init();
			this.handleGetData();
			this.setNavigationBarTitle();
			this.handleHCSearchNewborn();
		},
		methods: {
			// onLoad
			_init() {
				console.log(this.sub_status);
				if (this.state == '产后' || this.state == '术后') {
					this.handleSearchWAnswerSheetInfo(this.pre_answerID);
				} else {
					// uni.getStorage({
					// 	key: 'user_login',
					// 	success: res => {
					// 		console.log(res);
					// 	}
					// })
					this.handleCAnswerSheetDetail(this.child_answerID);
				}
			},
			// 动态设置导航栏标题
			setNavigationBarTitle() {
				let title = '';
				if (this.title.substring(0, 2) == '术后' || this.title.substring(0, 2) == '产后') {
					title = '辣妈'
				} else {
					title = '萌宝'
				}
				if (this.num) {
					title = title + this.title + this.num + '日记'
				} else {
					title = title + this.title + '日记'
				}
				uni.setNavigationBarTitle({
					title: title
				})
			},
			// 初始化数据
			handleGetData() {
				if (this.tap == 0 && (this.state == '产后' || this.state == '术后')) {
					this.list.push({
						name: '病历号：',
						key: 'patId',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
							type: 'input',
							value: ''
						}],
						answer: '',
						checked: '',
						required: true,
						disabled: true
					}, {
						name: '体温℃：',
						key: 'temperature',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
							type: 'input',
							value: ''
						}],
						answer: '',
						checked: '',
						required: true,
						disabled: false
					}, {
						name: '恶露量：',
						key: 'lochia_amonut',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '多',
								disabled: false
							},
							{
								type: 'radio',
								value: '少',
								disabled: false
							},
							{
								type: 'radio',
								value: '无',
								disabled: false
							}
						],
						answer: '',
						checked: '无',
						required: true
					}, {
						name: '颜色：',
						key: 'lochia_color',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '鲜红',
								disabled: false
							},
							{
								type: 'radio',
								value: '暗红',
								disabled: false
							},
							{
								type: 'radio',
								value: '白色或粉色',
								disabled: false
							}
						],
						answer: '',
						checked: '鲜红',
						required: true
					}, {
						name: '会阴切口：',
						key: 'incision',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '痛',
								disabled: false
							},
							{
								type: 'radio',
								value: '不痛',
								disabled: false
							}
						],
						answer: '',
						checked: '不痛',
						required: true
					}, {
						name: '乳头：',
						key: 'Nipple_condition',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '有皲裂',
								disabled: false
							},
							{
								type: 'radio',
								value: '无皲裂',
								disabled: false
							}
						],
						answer: '',
						checked: '无皲裂',
						required: true
					}, 
					{
						name: '乳房：',
						key: 'Nipple_swelling',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '有胀痛',
								disabled: false
							},
							{
								type: 'radio',
								value: '无胀痛',
								disabled: false
							}
						],
						answer: '',
						checked: '无胀痛',
						required: true
					},
					{
						name: '奶量：',
						key: 'Milk_quantity',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '充足',
								disabled: false
							},
							{
								type: 'radio',
								value: '不充足',
								disabled: false
							},
							{
								type: 'radio',
								value: '无',
								disabled: false
							}
						],
						answer: '',
						checked: '充足',
						required: true
					}, {
						name: '大便：',
						key: 'stool_condition',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '正常',
								disabled: false
							},
							{
								type: 'radio',
								value: '便秘',
								disabled: false
							},
							{
								type: 'radio',
								value: '腹泻',
								disabled: false
							}
						],
						answer: '',
						checked: '正常',
						required: true
					}, {
						name: '排尿状态：',
						key: 'urinat_status',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '通畅',
								disabled: false
							},
							{
								type: 'radio',
								value: '不通畅',
								disabled: false
							}
						],
						answer: '',
						checked: '通畅',
						required: true
					}, {
						name: '漏尿情况：',
						key: 'urine_leakage',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '无',
								disabled: false
							},
							{
								type: 'radio',
								value: '有',
								disabled: false
							}
						],
						answer: '',
						checked: '无',
						required: true
					}, {
						name: '腰背部：',
						key: 'lumbar',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '痛',
								disabled: false
							},
							{
								type: 'radio',
								value: '不痛',
								disabled: false
							}
						],
						answer: '',
						checked: '不痛',
						required: true
					}, {
						name: '骨盆区：',
						key: 'pelvic_area',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '痛',
								disabled: false
							},
							{
								type: 'radio',
								value: '不痛',
								disabled: false
							}
						],
						answer: '',
						checked: '不痛',
						required: true
					}, {
						name: '心情：',
						key: 'mood',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '好',
								disabled: false
							},
							{
								type: 'radio',
								value: '一般',
								disabled: false
							},
							{
								type: 'radio',
								value: '不好',
								disabled: false
							}
						],
						answer: '',
						checked: '好',
						required: true
					}, {
						name: '其它不适应症状：',
						key: 'other_indications',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
							type: 'textarea',
							value: ''
						}],
						answer: '',
						checked: 'other_indications',
						required: true,
						disabled: false
					})
					let arr = [];
					for (let item of this.list) {
						if (this.state == '术后' && item.name == '会阴切口：') {
							item.name = '腹部刀口：'
						}
						if (this.state == '产后' && (this.title == '产后3天' || this.title == '产后7天') && (item.name == '腰背部：' ||
								item.name == '骨盆区：')) {
							arr.push(item)
						}
					}
					for (let i in this.list) {
						for (let j in arr) {
							if (this.list[i].name == arr[j].name) {
								this.list.splice(i, 1);
							}
						}
					}
				} else if (this.tap == 1 && (this.state == '产后' || this.state == '术后')) {
					this.list = [{
							name: '病历号：',
							key: 'patId',
							url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
							answers: [{
								type: 'input',
								value: ''
							}],
							answer: '',
							checked: '',
							required: true,
							disabled: true
						},
						{
							name: '乳房：',
							key: 'Nipple_swelling',
							url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
							answers: [{
									type: 'radio',
									value: '有胀痛',
									disabled: false
								},
								{
									type: 'radio',
									value: '无胀痛',
									disabled: false
								}
							],
							answer: '',
							checked: '无胀痛',
							required: true
						},
						{
							name: '奶量：',
							key: 'Milk_quantity',
							url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
							answers: [{
									type: 'radio',
									value: '充足',
									disabled: false
								},
								{
									type: 'radio',
									value: '不充足',
									disabled: false
								},
								{
									type: 'radio',
									value: '无',
									disabled: false
								}
							],
							answer: '',
							checked: '充足',
							required: true
						},
						{
							name: '大便：',
							key: 'stool_condition',
							url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
							answers: [{
									type: 'radio',
									value: '正常',
									disabled: false
								},
								{
									type: 'radio',
									value: '便秘',
									disabled: false
								},
								{
									type: 'radio',
									value: '腹泻',
									disabled: false
								}
							],
							answer: '',
							checked: '正常',
							required: true
						},
						{
							name: '排尿状态：',
							key: 'urinat_status',
							url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
							answers: [{
									type: 'radio',
									value: '通畅',
									disabled: false
								},
								{
									type: 'radio',
									value: '不通畅',
									disabled: false
								}
							],
							answer: '',
							checked: '通畅',
							required: true
						},
						{
							name: '漏尿情况：',
							key: 'urine_leakage',
							url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
							answers: [{
									type: 'radio',
									value: '无',
									disabled: false
								},
								{
									type: 'radio',
									value: '有',
									disabled: false
								}
							],
							answer: '',
							checked: '无',
							required: true
						},
						{
							name: '腰背部：',
							key: 'lumbar',
							url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
							answers: [{
									type: 'radio',
									value: '痛',
									disabled: false
								},
								{
									type: 'radio',
									value: '不痛',
									disabled: false
								}
							],
							answer: '',
							checked: '不痛',
							required: true
						},
						{
							name: '骨盆区：',
							key: 'pelvic_area',
							url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
							answers: [{
									type: 'radio',
									value: '痛',
									disabled: false
								},
								{
									type: 'radio',
									value: '不痛',
									disabled: false
								}
							],
							answer: '',
							checked: '不痛',
							required: true
						},
						{
							name: '心情：',
							key: 'mood',
							url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
							answers: [{
									type: 'radio',
									value: '好',
									disabled: false
								},
								{
									type: 'radio',
									value: '一般',
									disabled: false
								},
								{
									type: 'radio',
									value: '不好',
									disabled: false
								}
							],
							answer: '',
							checked: '好',
							required: true
						},
						{
							name: '其它不适应症状：',
							key: 'other_indications',
							url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
							answers: [{
								type: 'textarea',
								value: ''
							}],
							answer: '',
							checked: 'other_indications',
							required: true,
							disabled: false
						}
					]
				} else if (this.tap == 0 && this.state == '生后') {
					console.error('errorr0---------------')
					this.list.push({
						name: '就诊卡号：',
						key: 'hosCardNo',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
							type: 'input',
							value: ''
						}],
						answer: '',
						checked: '',
						required: true,
						disabled: false
					}, {
						name: '病历号：',
						key: 'patID',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
							type: 'input',
							value: ''
						}],
						answer: '',
						checked: '',
						required: true,
						disabled: true
					}, {
						name: '体温℃：',
						key: 'temperature',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
							type: 'input',
							value: ''
						}],
						answer: '',
						checked: '',
						required: true,
						disabled: false
					}, {
						name: '黄疸值：',
						key: 'jaundice_value',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '未测量',
								disabled: false
							},
							{
								type: 'input',
								value: '测量数值',
								disabled: false
							}
						],
						answer: '',
						checked: '未测量',
						required: true,
						disabled: false
					}, {
						name: '脐带：',
						key: 'umbilical_cord',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '已脱落',
								disabled: false
							},
							{
								type: 'radio',
								value: '未脱落有异常',
								disabled: false
							},
							{
								type: 'radio',
								value: '未脱落无异常',
								disabled: false
							}
						],
						answer: '',
						checked: '未脱落无异常',
						required: true
					}, {
						name: '喂养：',
						key: 'feed_method',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '母乳喂养',
								disabled: false
							},
							{
								type: 'radio',
								value: '混合喂养',
								disabled: false
							},
							{
								type: 'radio',
								value: '人工喂养',
								disabled: false
							}
						],
						answer: '',
						checked: '母乳喂养',
						required: true
					}, {
						name: '大便24小时次：',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						key: 'hours_stools',
						answers: [{
							type: 'input',
							value: ''
						}],
						answer: '',
						checked: '',
						required: true,
						disabled: false
					}, {
						name: '大便性质：',
						key: 'stool_condition',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '正常',
								disabled: false
							},
							{
								type: 'radio',
								value: '便秘',
								disabled: false
							},
							{
								type: 'radio',
								value: '腹泻',
								disabled: false
							}
						],
						answer: '',
						checked: '正常',
						required: true
					}, {
						name: '小便24小时次数：',
						key: 'hours_urines',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
							type: 'input',
							value: ''
						}],
						answer: '',
						checked: '',
						required: true,
						disabled: false
					}, {
						name: '小便颜色：',
						key: 'urine_condition',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '深黄色',
								disabled: false
							},
							{
								type: 'radio',
								value: '浅黄色',
								disabled: false
							},
							{
								type: 'radio',
								value: '无色',
								disabled: false
							}
						],
						answer: '',
						checked: '无色',
						required: true
					}, {
						name: '臀部皮肤：',
						key: 'buttock_skin',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '好',
								disabled: false
							},
							{
								type: 'radio',
								value: '红臀',
								disabled: false
							}
						],
						answer: '',
						checked: '好',
						required: true
					}, {
						name: '其它部位皮肤：',
						key: 'other_skin',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '正常',
								disabled: false
							},
							{
								type: 'radio',
								value: '新生儿红斑',
								disabled: false
							},
							{
								type: 'radio',
								value: '湿疹',
								disabled: false
							},
							{
								type: 'radio',
								value: '热疹',
								disabled: false
							}
						],
						answer: '',
						checked: '正常',
						required: true
					}, {
						name: '体重：',
						key: 'child_weight',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '未测量',
								disabled: false
							},
							{
								type: 'input',
								value: '测量值',
								disabled: false
							}
						],
						answer: '',
						checked: '未测量',
						required: true
					}, {
						name: '其它症状：',
						key: 'other_condition',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
							type: 'textarea',
							value: ''
						}],
						answer: '',
						checked: 'other_condition',
						required: true,
						disabled: false
					})
					let res = uni.getStorageSync('hoscardno');
					for (let i in this.list) {
						if (res !== '') {
							if (this.list[i].name == '就诊卡号：') {
								this.list[i].answer = res;
								if (this.list[i].answer !== '') {
									this.list[i].checked = this.list[i].answer;
								}
							}
						}
						if (this.title == '生后5天' && this.list[i].name == '体重：') {
							this.list.splice(i, 1)
						}
					}
				} else if (this.tap == 1 && this.state == '生后') {
					this.list.push({
						name: '就诊卡号：',
						key: 'hosCardNo',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
							type: 'input',
							value: ''
						}],
						answer: '',
						checked: '',
						required: true,
						disabled: false
					}, {
						name: '病历号：',
						key: 'patID',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
							type: 'input',
							value: ''
						}],
						answer: '',
						checked: '',
						required: true,
						disabled: true
					}, {
						name: '喂养：',
						key: 'feed_method',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '母乳喂养',
								disabled: false
							},
							{
								type: 'radio',
								value: '混合喂养',
								disabled: false
							},
							{
								type: 'radio',
								value: '人工喂养',
								disabled: false
							}
						],
						answer: '',
						checked: '母乳喂养',
						required: true
					}, {
						name: '大便24小时次：',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						key: 'hours_stools',
						answers: [{
							type: 'input',
							value: ''
						}],
						answer: '',
						checked: '',
						required: true,
						disabled: false
					}, {
						name: '大便性质：',
						key: 'stool_condition',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '正常',
								disabled: false
							},
							{
								type: 'radio',
								value: '便秘',
								disabled: false
							},
							{
								type: 'radio',
								value: '腹泻',
								disabled: false
							}
						],
						answer: '',
						checked: '正常',
						required: true
					}, {
						name: '小便24小时次数：',
						key: 'hours_urines',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
							type: 'input',
							value: ''
						}],
						answer: '',
						checked: '',
						required: true,
						disabled: false
					}, {
						name: '小便颜色：',
						key: 'urine_condition',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '深黄色',
								disabled: false
							},
							{
								type: 'radio',
								value: '浅黄色',
								disabled: false
							},
							{
								type: 'radio',
								value: '无色',
								disabled: false
							}
						],
						answer: '',
						checked: '无色',
						required: true
					}, {
						name: '臀部皮肤：',
						key: 'buttock_skin',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '好',
								disabled: false
							},
							{
								type: 'radio',
								value: '红臀',
								disabled: false
							}
						],
						answer: '',
						checked: '好',
						required: true
					}, {
						name: '其它部位皮肤：',
						key: 'other_skin',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '正常',
								disabled: false
							},
							{
								type: 'radio',
								value: '新生儿红斑',
								disabled: false
							},
							{
								type: 'radio',
								value: '湿疹',
								disabled: false
							},
							{
								type: 'radio',
								value: '热疹',
								disabled: false
							}
						],
						answer: '',
						checked: '正常',
						required: true
					}, {
						name: '体重：',
						key: 'child_weight',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
								type: 'radio',
								value: '未测量',
								disabled: false
							},
							{
								type: 'input',
								value: '测量值',
								disabled: false
							}
						],
						answer: '',
						checked: '未测量',
						required: true
					}, {
						name: '其它症状：',
						key: 'other_condition',
						url: 'https://z3.ax1x.com/2021/08/02/fpyPAI.png',
						answers: [{
							type: 'textarea',
							value: ''
						}],
						answer: '',
						checked: 'other_condition',
						required: true,
						disabled: false
					})
					let res = uni.getStorageSync('hoscardno');
					for (let i in this.list) {
						if (res !== '') {
							if (this.list[i].name == '就诊卡号：') {
								this.list[i].answer = res;
								if (this.list[i].answer !== '') {
									this.list[i].checked = this.list[i].answer;
								}
							}
						}
					}
				}
			},
			// 分发孕妇/新生儿 保存/提交接口
			handleDistributionInterface(sub_status) {
				if (this.state == '产后' || this.state == '术后') {
					this.handleSaveWAnswerSheetSave(sub_status);
				} else {
					this.handleCAnswerSheetSave(sub_status);
				}
			},
			handleChangeInput(item, answer) {
				for (let jtem of this.list) {
					if (jtem.name == item) {
						jtem.checked = answer;
					}
				}
				if (this.state == '生后' && item == '就诊卡号：') {
					this.HCSearchNewborn(answer);
				}
			},
			// 保存/提交孕妇问卷提交
			handleSaveWAnswerSheetSave(sub_status) {
				uni.getStorage({
					key: 'user_login',
					success: res => {
						let data = res.data;
						this.survey_Name = data.P_Name;
						this.survey_id = data.awiId;
						this.PregnantID = data.PregnantID;
						// console.log('awiId-survey_id',this.survey_id);
					}
				})
				setTimeout(() => {
					let params = {
						pre_answerID: this.pre_answerID,
						survey_Name: this.survey_Name,
						survey_id: this.survey_id,
						survey_type: 0,
						fate: this.fate,
						answer_type: this.num ? this.title + '-' + this.num : this.title,
						createTime: util.getFtSystemTime(),
						fillin_Name: this.survey_Name,
						fillin_ID: this.survey_id,
						Review_Date: '',
						Review_Name: '',
						whether_receive: this.whether_receive,
						sub_status: sub_status,
						evaluate: ''
					}
					for (let item of this.list) {
						let patID = uni.getStorageSync('patID');
						if (item.name == '病历号：') {
							item.answer = patID;
							item.checked = patID;
						}
						for (let jtem of item.answers) {
							if (jtem.type == 'radio' && item.checked == jtem.value) {
								params[item.key] = jtem.value;
							}
							if (jtem.type == 'input' || jtem.type == 'textarea') {
								params[item.key] = item.answer;
							}
						}
						if (item.required && !item.checked && item.name !== '其它不适应症状：' && !item.answer) {
							uni.showModal({
								title: '提示',
								content: item.name + '必须输入/选择',
								showCancel: false
							})
							this.evaluate = '';
							return;
						}
					}
					for (let item of this.list) {
						if (item.name == '其它不适应症状：' && item.answer !== '') {
							this.evaluate = '异常';
						} else {
							this.evaluate = '正常';
						}
					}
					// params.evaluate = this.evaluate;
					console.log(params);
					this.$u.post(apiUrl + 'SaveWAnswerSheetSave', params).then(res => {
						console.log(res);
						if (res.code == 200) {
							this.$lz.toast(res.info);
							this.pre_answerID = res.data.pre_answerID;
							if (sub_status == 1) {
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 1500)
							}
							sub_status == 1 ? this.sub_status = 1 : this.sub_status = 0
						} else {
							this.$lz.toast(res.info);
						}
					}).catch(err => {
						this.$lz.toast(err.errMsg);
					})
				}, 200)
			},
			// 新生儿问卷保存/提交接口
			handleCAnswerSheetSave(sub_status) {
				// console.log(this.list)
				uni.getStorage({
					key: 'user_login',
					success: res => {
						let data = res.data;
						let obj = {
							child_answerinfo: {
								child_answerID: this.child_answerID,
								survey_Name: this.child_Name,
								survey_id: this.nbID,
								survey_type: 1,
								answer_type: this.title,
								createTime: util.getFtSystemTime(),
								fillin_Name: data.P_Name,
								fillin_ID: data.awiId,
								Review_Name: '',
								Review_Date: '',
								sub_status: sub_status,
								whether_receive: 0,
								fate: this.fate,
								evaluate: ''
							}
						}
						for (let item of this.list) {
							let res = uni.getStorageSync('hoscardno');
							if (item.name == '就诊卡号：') {
								item.answer = res;
								item.checked = item.answer;
							}
							if (item.required && !item.checked && item.name !== '其它症状：' && !item.answer) {
								uni.showModal({
									title: '提示',
									content: item.name + '必须输入/选择',
									showCancel: false
								})
								return;
							} else if (item.name == '黄疸值：' && item.checked != '未测量' && !item.answer) {
								uni.showModal({
									title: '提示',
									content: item.name + '必须输入/选择',
									showCancel: false
								})
								return;
							} else if (item.name == '体重：' && item.checked != '未测量' && !item.answer) {
								uni.showModal({
									title: '提示',
									content: item.name + '必须输入/选择',
									showCancel: false
								})
								return;
							}
							if (item.name == '其它症状：' && item.answer !== '') { 
								this.evaluate = '异常'
							} else {
								this.evaluate = '正常'
							}
							for (let jtem of item.answers) {
								if (jtem.type == 'input' || jtem.type == 'textarea') {
									if (item.name !== '就诊卡号：') {
										obj.child_answerinfo[item.key] = item.answer;
									}
								}
								if (jtem.type == 'input' && item.name == '就诊卡号：') {
									obj.hosCardNo = item.answer;
								}
								if (jtem.type == 'radio' && item.checked == jtem.value && item.name !=
									'就诊卡号：') {
									obj.child_answerinfo[item.key] = jtem.value;
								}
								if(obj.child_answerinfo.jaundice_value == ''){
									obj.child_answerinfo.jaundice_value = '未测量'
								}
								if(obj.child_answerinfo.child_weight == ''){
									obj.child_answerinfo.child_weight = '未测量'
								}
							}
						}
						obj.child_answerinfo.evaluate = this.evaluate;
						console.log(obj);
						console.log(this.list);
						this.$u.post(apiUrl + 'CAnswerSheetSave', obj).then(res => {
							console.log(res);
							this.$lz.toast(res.info);
							this.child_answerID = res.data.child_answerID;
							console.log(sub_status);
							if (sub_status == 1) {
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 1500)
							}
							sub_status == 1 ? this.sub_status = 1 : this.sub_status = 0
						}).catch(err => {
							console.log(err);
						})
					}
				})
			},
			// 查询孕妇问卷信息
			handleSearchWAnswerSheetInfo(pre_answerID) {
				let obj = {
					pre_answerID: pre_answerID,
					survey_id: this.survey_id,
					answer_type: this.title
				}
				if (getApp().globalData.pageState == 1) {
					obj.survey_id = this.userid;
					getApp().globalData.pageState = 2
				}
				if (this.sub_status == 3 && this.survey_type == '0') {
					console.log(22);
					uni.getStorage({
						key: 'user_login',
						success: res => {
							let data = res.data;
							obj.survey_id = data.awiId;
							console.log(obj);
							this.SearchWAnswerSheetInfo(obj);
						}
					})
				}
				if(this.sub_status !== 3 && this.survey_type == '0'){
					this.SearchWAnswerSheetInfo(obj);
				}
			},
			// 查询孕妇问卷信息
			SearchWAnswerSheetInfo(obj) {
				this.$u.post(apiUrl + 'SearchWAnswerSheetInfo', obj).then(res => {
					console.log(res);
					console.log(this.sub_status);
					if (res.code == 200 && res.data !== null) {
						if (this.sub_status !== 3) {
							for (let item of this.list) {
								if (res.data[item.key] !== null) {
									item.answer = res.data[item.key];
									item.checked = res.data[item.key];
								}
								if (item.key == 'other_indications') {
									item.checked = 'other_indications'
								}
							}
						}
						this.pre_answerID = res.data.pre_answerID;
						this.evaluate = res.data.evaluate;
						this.sub_status = res.data.sub_status;
						for (let i in this.pregnantWoman) {
							this.pregnantWoman[i] = res.data[i]
						}
					}

				}).catch(err => {
					this.$lz.toast(err.errMsg);
				})
			},
			// 新生儿问卷查询接口
			handleCAnswerSheetDetail(child_answerID) {
				let obj = {
					child_answerID: child_answerID,
					survey_id: this.survey_id,
					answer_type: this.title
				}
				console.log(obj);
				if (getApp().globalData.pageState == 1) {
					obj.survey_id = this.nbID;
					getApp().globalData.pageState = 2
				}
				console.log(obj);
				this.$u.post(apiUrl + 'CAnswerSheetDetail', obj).then(res => {
					console.log(res);
					console.log(this.sub_status);
					let data = res.data.userInfo;
					if (res.code == 200 && data !== null) {
						if (data.other_condition == null) {
							data.other_condition = '';
						}
						if (this.sub_status !== 3) {
							for (let item of this.list) {
								if (data[item.key] !== null) {
									if (item.key == 'jaundice_value' || item.key == 'child_weight') {
										for (let jtem of item.answers) {
											if (jtem.type == 'radio') {
												if (data[item.key] == '未测量') {
													item.checked = data[item.key];
												} else {
													item.answer = data[item.key];
													item.checked = data[item.key];
												}
											}
										}
									} else {
										item.answer = data[item.key];
										item.checked = data[item.key];
									}
									if (item.key == 'other_condition') {
										item.checked = 'other_condition'
									}
								}
							}
						}
						this.child_answerID = data.child_answerID;
						this.evaluate = data.evaluate;
						this.sub_status = data.sub_status;

						for (let i in this.infant) {
							this.infant[i] = data[i]
						}
						let delivery_mode = this.infant.delivery_Mode;
						console.log(this.infant);
						// console.log(this.infant);
					}
				}).catch(err => {
					console.log(err);
				})
			},
			// 根据就诊卡号获取病历号
			handleHCSearchNewborn() {
				let hosCardNo = uni.getStorageSync('hoscardno');
				console.log(hosCardNo);
				let cardNo = '';
				for (let item of this.list) {
					if (item.name == '就诊卡号：' && this.survey_type == '1') {
						if (!!hosCardNo) {
							cardNo = item.answer;
						} else {
							cardNo = hosCardNo;
						}
						if (!!hosCardNo) {
							this.HCSearchNewborn(cardNo);
						}
					} else if (this.survey_type == '0' && item.name == '病历号：') {
						console.error('------------------');
						let patID = uni.getStorageSync('patID');
						console.error(patID);
						item.answer = patID;
						item.checked = patID;
					}
				}
			},
			// 根据就诊卡号获取病历号
			HCSearchNewborn(hosCardNo) {
				console.log(this.nbID);
				console.log(hosCardNo);
				this.$u.post(apiUrl + 'HCSearchNewborn', {
					hosCardNo,
					nbID: this.nbID
				}).then(res => {
					// console.log(res);
					this.$lz.toast(res.info);
					if (res.code == 200) {
						for (let item of this.list) {
							if (item.name == '病历号：') {
								item.answer = res.data[0].patid;
								item.checked = item.answer;
							}
						}
					} else {
						for (let item of this.list) {
							if (item.name == '病历号：') {
								item.answer = '';
								item.checked = '';
							}
						}
					}
				}).catch(err => {
					console.log(err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		width: 100%;

		.content {
			display: flex;
			flex-wrap: wrap;

			.category-item {
				display: flex;
				width: 100%;
				padding: 10rpx;
			}
		}
	}
</style>
