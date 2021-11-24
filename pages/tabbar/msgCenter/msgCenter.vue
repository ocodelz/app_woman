<template>
	<view>
		<view class="p-2" v-if="list.length">
			<u-notice-bar mode="horizontal" :is-circular="true" :list="notice"></u-notice-bar>
		</view>
		<view v-if="list.length" class="w-100 flex justify-center align-center flex-column">
			<block v-for="(item,index) in list" :key="index">
				<view class="border p-3 mb-2 rounded position-relative" :class="current == index ? 'active' : 'bg-white'" style="width: 96%;"
				 @click="handleTapItem(index)">
					<view class="flex flex-column">
						<text>设备名称: {{item.e_name}}</text>
						<text>设备类型: {{item.e_type}}</text>
						<text>到期时间: {{item.return_time}}</text>
					</view>
				</view>
			</block>
		</view>
		<view v-if="pregrant_answer_info.length || child_answerinfo.length" class="w-100 flex justify-center align-center flex-column mt-2">
			<view v-for="(item,index) in pregrant_answer_info" :key="index" class="flex flex-column border p-3 mb-2 rounded" style="width: 96%;"
			@click="handleTapMsgCell(item)">
				<text>姓名: {{item.fillin_Name}}</text>
				<text>类型: {{item.answer_type}}</text>
			</view>
			<view v-for="(item,index) in child_answerinfo" :key="index" class="flex flex-column border p-3 mb-2 rounded" style="width: 96%;"
			@click="handleTapMsgCell(item)">
				<text>姓名: {{item.fillin_Name}}</text>
				<text>类型: {{item.answer_type}}</text>
			</view>
		</view>
		<view v-if="pregrant_answer_info.length + child_answerinfo.length + list.length == 0">
			<u-empty text="消息列表为空" mode="message" icon-size="80" margin-top="120"></u-empty>
		</view>
	</view>
</template>

<script>
	import tool from '../../../utils/util.js';
	export default {
		data() {
			return {
				notice:['以下设备即将过期，如有需要请及时联系管理员续费！'],
				list: [],
				current: -1,
				pregrant_answer_info: [],
				child_answerinfo: [],
				interval: ''
			}
		},
		onLoad() {
			let res = uni.getStorageSync('aboutToExpire');
			this.list = res;
			let info = uni.getStorageSync('answerSheetList');
			// console.log(info);
			this.pregrant_answer_info = info.pregrant_answer_info;
			this.child_answerinfo = info.child_answerinfo;
		},
		onShow() {
			this.interval = setInterval(() => {
				console.log('msgCenter setInterval');
				setTimeout(() => {
					let res = uni.getStorageSync('aboutToExpire');
					this.list = res;
					let info = uni.getStorageSync('answerSheetList');
					// console.log(info);
					this.pregrant_answer_info = info.pregrant_answer_info;
					console.log(this.pregrant_answer_info);
					this.child_answerinfo = info.child_answerinfo;
					console.log(this.child_answerinfo);
					console.log('msgCenter setTimeout');
				},0)
			},8000)
			uni.$on('spliceList', (data) => {
				console.log(data);
				for(let item of this.pregrant_answer_info){
					if(item.pre_answerID == data.id){
						this.pregrant_answer_info.splice(item, 1)
					}
				}
				for(let item of this.child_answerinfo){
					if(item.child_answerID == data.id){
						this.child_answerinfo.splice(item, 1)
					}
				}
			})
			// console.log(this.pregrant_answer_info.length + this.child_answerinfo.length + this.list.length);
		},
		onHide() {
			console.log('msgCenter onHide');
			clearInterval(this.interval);
		},
		destroyed() {
			uni.$off('spliceList');
			clearInterval(this.interval);
			console.log('msgCenter destroyed');
		},
		methods: {
			handleTapItem(index) {
				this.current = index;
			},
			handleTapMsgCell(item){
				console.error(item);
				let obj = {
					title: item.answer_type,
					tap: 0,
					state: item.type,
					pre_answerID: item.pre_answerID,
					child_answerID: item.child_answerID,
					sub_status: 2,
					survey_type: item.survey_type,
					nbID: item.nbID || ''
				}
				if (obj.title !== '产后42天' && obj.title !== '生后42天' && obj.title !== '术后42天') {
					obj.tap = 0;
				} else {
					obj.tap = 1;
				}
				this.$u.route('/pages/postpartumOrPostoperativeQuestionnaireSurvey/postpartumOrPostoperativeQuestionnaireSurvey?detail='+JSON.stringify(obj));
				if(item.type == '产后' || item.type == '术后'){
					let data = {
						pre_answerID: obj.pre_answerID,
						current_receive: '0',
						update_receive: '1'
					}
					this.$u.post('http://app.jnthinksoft.cn:6060/api/postpartum/WAnswerSheetUpdate',data).then(res => {
						console.log(res);
						if(res.code == 200){
							uni.$emit('spliceList',{
								id: res.data.pre_answerID
							})
						}
					}).catch(err => {
						console.log(err);
					})
				}
				if(item.type == '生后'){
					let data = {
						child_answerID: obj.child_answerID,
						current_receive: '0',
						update_receive: '1'
					}
					console.log(data);
					this.$u.post('http://app.jnthinksoft.cn:6060/api/postpartum/CAnswerSheetUpdate',data).then(res => {
						console.log(res);
						if(res.code == 200){
							uni.$emit('spliceList',{
								id: res.data.child_answerID
							})
						}
					}).catch(err => {
						console.log(err);
					})
				}
			}
		}
	}
</script>

<style scoped>
	.active {
		background-color: #f8f9fa;
	}
</style>
