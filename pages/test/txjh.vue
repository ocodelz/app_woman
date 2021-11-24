	<template>
	<view>
		<!-- <button type="primary" @click="testAsyncFunc">testAsyncFunc</button>
		<button type="primary" @click="testSyncFunc">testSyncFunc</button>
		<button type="primary" @click="gotoNativePage">跳转原生Activity</button> -->
		<button type="primary" @click="start">启动监听</button>
		<button type="primary" @click="probe1audio">切换探头1胎音xx</button>
		<button type="primary" @click="probe2audio">切换探头2胎音xx</button>
		
		<button type="primary" @click="jsontest">测试json</button>
		
		
			<button type="primary" @click="getWifiName">获取wifi名字</button>	
		
		<button type="primary" @click="setWifi">配置探头为局域网wifi</button>
		
		<button type="primary" @click="clearTocoVal">宫缩清零</button>
		
		<button type="primary" @click="clostoco">关闭toco</button>
		<button type="primary" @click="stop">关闭监听</button>
		<button type="primary" @click="clearResult">清空返回结果</button>
		<view>返回结果:{{ retData }}</view>
	</view>
</template>

<script>
// 获取 module
//var testModule = uni.requireNativePlugin("Libangfts6api")

var Fts6MgrModule = uni.requireNativePlugin('Fts6MgrPlugin-Fts6MgrModule');
//var Fts6MgrModule1 = uni.requireNativePlugin("Fts6MgrPlugin-Fts6MgrModule")

//const modal = uni.requireNativePlugin('modal');
export default {
	data() {
		return {
			retData: '',
			onProbe1Audio: false
		};
	},
	onLoad() {
		// plus.globalEvent.addEventListener('TestEvent', function(e){
		// 	modal.toast({
		// 		message: "TestEvent收到："+e.msg,
		// 		duration: 1.5
		// 	});
		// });
	},
	methods: {
		jsontest(){
			
			let str='{"type":data,"data":{ "time":"2020-11-08 13:07:08" , "probe1":"us1" ,"batterylevel1":"5" ,"signallevel1":"3","ussignallevel1":"2","isvalids1":"1" ,"heartrate1":"255","movementcount1":"0"  ,"probe2":"us2" ,"batterylevel2":"-1" ,"signallevel2":"0","ussignallevel2":"1","isvalids2":"1" ,"heartrate2":"-255","movementcount2":"0",     "probetoco":"toco" ,"batteryleveltoco":"-1"   ,"signalleveltoco":"0","isvalidstoco":"1" ,"contractions":"-255"},"success":1}'
	       let json=		JSON.parse(str)
		},
		clearTocoVal(){
			
			Fts6MgrModule.clearTocoVal();
			},
		setWifi(){
		Fts6MgrModule.configWifiInfo({
			ssname:'HUAWEI-JFM5AX_HiLink',
			sspw:'a123456789'			
		});
			
		},
		getWifiName(){
			let name=Fts6MgrModule.getCurrentWifiName();
			uni.showToast({
				title:name,
				 duration:3000
			})			
		},
		clearResult() {
			this.retData = '';
		},
		start() {
			let that = this;
			this.onProbe1Audio = false;
			Fts6MgrModule.start({}, ret => {
				console.log(ret);
				that.retData += (new Date()).toLocaleString() + ':' + ret + '<br>';
			});
		},
		probe1audio() {
			this.onProbe1Audio = !this.onProbe1Audio;
			Fts6MgrModule.setProbeAudio({ probe: 1, on: this.onProbe1Audio });
		},
		probe2audio() {
			//this.onProbe1Audio = !this.onProbe1Audio;
			Fts6MgrModule.setProbeAudio({ probe: 2, on: true });
		},
		stop() {
			let ret = Fts6MgrModule.stop();
			console.log('ret=' + ret);
		},
		clostoco() {
			let ret = Fts6MgrModule.closeProbe({ probe: 3 });
			console.log('ret=' + ret);
		},
		// testAsyncFunc() {
		// 	// 调用异步方法
		// 	testModule.testAsyncFunc({
		// 			'name': 'unimp',
		// 			'age': 1
		// 		},
		// 		(ret) => {
		// 			modal.toast({
		// 				message: ret,
		// 				duration: 1.5
		// 			});
		// 		})
		// },
		// testSyncFunc() {
		// 	// 调用同步方法
		// 	var ret = testModule.testSyncFunc({
		// 		'name': 'unimp',
		// 		'age': 1
		// 	})
		// 	modal.toast({
		// 		message: ret,
		// 		duration: 1.5
		// 	});
		// },
		gotoNativePage() {
			testModule.gotoNativePage();
		}
	}
};
</script>
