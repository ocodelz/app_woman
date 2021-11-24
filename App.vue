<script>
	import {
		autoUpdate,
		checkUpdaterForIos
	} from '@/common/updater/checkUpdater.js';
	import too from 'utils/util.js';
	export default {
		data() {
			return {
				taixinId: '',
			}
		},
		globalData: {
			timer: '',
			timers: '',
			pageState: 0,
			pageStatus: 0
		},
		onLaunch: function() {
			let that = this;
			console.log('App Launch')
			uni.getStorage({
				key: 'xt_info',
				success: (res) => {},
				fail: () => {
					uni.setStorage({
						key: 'xt_info',
						data: []
					})
				}
			})
			let taixinId = uni.getStorageSync('taixinId')
			that.taixinId = taixinId;
			let currentid = 0;
			if (this.$current != null && this.$current.id != null) {
				currentid = this.$current.id;
			}
			autoUpdate(currentid);
			var args = plus.runtime.arguments;
			if (args) {
				console.log(args);
				let info = {
					title: this.getQueryString(args, 'template_Name'),
					Delivery_Mode: this.getQueryString(args, 'Delivery_Mode'),
					userType: this.getQueryString(args, 'userType'),
					telephone: this.getQueryString(args, 'telephone'),
					password: this.getQueryString(args, 'password'),
					tap: 0
				}
				if(this.getQueryString(args, 'userType') == 0){
					info.userid = this.getQueryString(args, 'userid')
				}
				if(this.getQueryString(args, 'userType') == 1){
					info.nbID = this.getQueryString(args, 'userid')
				}
				
				let data = {
					account: info.telephone,
					password: info.password,
					type: 2,
					type1: 0
				}
				console.log(data);
				info.state = info.title.substring(0, 2);
				if (info.title !== '产后42天' && info.title !== '生后42天' && info.title !== '术后42天') {
					info.tap = 0;
				} else {
					info.tap = 1;
				}
				console.log(info.title);
				if (info.title) {
					this.$u.post('/AfterLogin', data).then(res => {
						console.log(res);
						if (res.code == 200) {
							uni.setStorage({
								key: 'user_login',
								data: res.data
							})
							info.survey_Name = res.data.P_Name;
							uni.reLaunch({
								url: '/pages/tabbar/index/index?detail=' + JSON.stringify(info)
							})
						}
					})
				}
			}
		},
		methods: {
			getQueryString(str, key) {
				if (str) {
					var queryString = str.split('?')[1] || '';
					var arr = queryString.split('&') || [];
					for (var i = 0; i < arr.length; i++) {
						var keyString = decodeURIComponent(arr[i].split('=')[0]);
						var valueString = decodeURIComponent(arr[i].split('=')[1]);
						if (key === keyString) {
							return valueString;
						}
					}
					return;
				} else {
					return;
				}
			},
		},
		onShow: function() {
			console.log('App Show')
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "./common/free-icon";
	@import "uview-ui/index.scss";
	@import "./common/free.css";
</style>
