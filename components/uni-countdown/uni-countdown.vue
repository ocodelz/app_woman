<template>
	<view class="uni-countdown">
		<text v-if="showDay" :style="{ borderColor: borderColor, color: color, backgroundColor: backgroundColor }" class="uni-countdown__number">{{ d }}</text>
		<text v-if="showDay" :style="{ color: splitorColor }" class="uni-countdown__splitor">天</text>
		<text :style="{ borderColor: borderColor, color: color, backgroundColor: backgroundColor }" class="uni-countdown__number">{{ h }}</text>
		<text :style="{ color: splitorColor }" class="uni-countdown__splitor">{{ showColon ? ':' : '时' }}</text>
		<text :style="{ borderColor: borderColor, color: color, backgroundColor: backgroundColor }" class="uni-countdown__number">{{ i }}</text>
		<text :style="{ color: splitorColor }" class="uni-countdown__splitor">{{ showColon ? ':' : '分' }}</text>
		<text :style="{ borderColor: borderColor, color: color, backgroundColor: backgroundColor }" class="uni-countdown__number">{{ s }}</text>
		<text v-if="!showColon" :style="{ color: splitorColor }" class="uni-countdown__splitor">秒</text>
	</view>
</template>
<script>
	/**
	 * Countdown 倒计时
	 * @description 倒计时组件
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=25
	 * @property {String} backgroundColor 背景色
	 * @property {String} color 文字颜色
	 * @property {Number} day 天数
	 * @property {Number} hour 小时
	 * @property {Number} minute 分钟
	 * @property {Number} second 秒
	 * @property {Boolean} showDay = [true|false] 是否显示天数
	 * @property {Boolean} showColon = [true|false] 是否以冒号为分隔符
	 * @property {String} splitorColor 分割符号颜色
	 * @event {Function} timeup 倒计时时间到触发事件
	 * @example <uni-countdown :day="1" :hour="1" :minute="12" :second="40"></uni-countdown>
	 * @stopChange{function} stopChange 计时停止的回调
	 * @submitChange{function} submitChange 计时超时的回调
	 */
	export default {
		name: 'UniCountdown',
		props: {
			showDay: {
				type: Boolean,
				default: true
			},
			showColon: {
				type: Boolean,
				default: true
			},
			backgroundColor: {
				type: String,
				default: 'rgba(0,0,0,0)'
			},
			borderColor: {
				type: String,
				default: '#000000'
			},
			color: {
				type: String,
				default: '#FFFFFF'
			},
			splitorColor: {
				type: String,
				default: '#FFFFFF'
			},
			day: {
				type: Number,
				default: 0
			},
			hour: {
				type: Number,
				default: 0
			},
			minute: {
				type: Number,
				default: 0
			},
			second: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				timer: null,
				syncFlag: false,
				d: '00',
				h: '00',
				i: '00',
				s: '00',
				leftTime: 0,
				seconds: 0
			}
		},
		created: function(e) {

		},
		beforeDestroy() {
			clearInterval(this.timer)
		},
		methods: {
			toSeconds(day, hours, minutes, seconds) {
				return day * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + seconds
			},
			timeUp() {
				clearInterval(this.timer)
				this.$emit('timeup')
			},
			countDown() {
				let seconds = this.seconds
				let [day, hour, minute, second] = [0, 0, 0, 0]
				if (seconds > 0) {
					day = Math.floor(seconds / (60 * 60 * 24))
					hour = Math.floor(seconds / (60 * 60)) - (day * 24)
					minute = Math.floor(seconds / 60) - (day * 24 * 60) - (hour * 60)
					second = Math.floor(seconds) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
				} else {
					this.timeUp()
				}
				if (day < 10) {
					day = '0' + day
				}
				if (hour < 10) {
					hour = '0' + hour
				}
				if (minute < 10) {
					minute = '0' + minute
				}
				if (second < 10) {
					second = '0' + second
				}
				this.d = day
				this.h = hour
				this.i = minute
				this.s = second
			},
			startData() { 
				this.seconds = this.toSeconds(this.day, this.hour, this.minute, this.second)
				// if (this.seconds <= 0) {
				// 	return
				// }
				this.countDown()

				if (!!this.timer) {
					clearInterval(this.timer) ///
				}
				this.timer = setInterval(() => {
					this.seconds++
					this.$emit('longTime', {
						time: this.h + ':' + this.i + ':' + this.s
					})
					if (Number(this.i) >= 35) {
						this.$emit('submitChange', {
							time: this.h + ':' + this.i + ':' + this.s,
							isStop: true
						})
						clearInterval(this.timer)
						return
					}
					this.countDown()
				}, 1000)
			},
			startTime() {
				this.startData();
			},
			endTime(){
				this.$emit('endTime')
				this.h = "00";
				this.i = "00";
				this.s = "00";
				clearInterval(this.timer)
			},
			stopTime() {
				this.$emit('stopChange', {
					time: this.h + ':' + this.i + ':' + this.s,
					times: Number(this.h) * 60 + Number(this.i),
					h: this.h,
					i:  this.i,
					s: this.s
				})
				clearInterval(this.timer)
			}
		}
	}
</script>
<style scoped>
	.uni-countdown {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding: 4rpx;
	}

	.uni-countdown__splitor {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		font-size: 12px;
		padding-bottom: 4rpx;
	}

	.uni-countdown__number {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		padding: 0 6rpx;
		font-size: 12px;
	}
</style>
