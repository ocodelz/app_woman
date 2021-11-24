let common = require("../util.js");
import {
	BTDevice
} from "./BTDevice.js"

import sdkAction from 'mcbluetoothsdk'
let datahelper = require("./ThreeNuoBldSugarDataHelper.js")

class ThreeNuoBldSugarBTDevice extends BTDevice {
	constructor() {
		super();
		this.dataReceiveFinished=false;
	}
	close(callback) {	
		// sdkAction.stopConnectDevice(this.deviceId, function() {		
		// }, true);
		this._closeConnect()
		sdkAction.closeBlueTooth()
	}


	_dispatchConnectState(){		
		let that=this;
	    sdkAction.dispatchConnectState(function(res) {
		let conStatus='未知'
		res.forEach(function(device) {		
			console.log('_dispatchConnectState:'+JSON.stringify(device))
			if (common.trim( that.deviceId)==common.trim( device.deviceId)){
				that.connected=device.connected
				if (that.connected){
					
					that._discoveryStarted=false
					that._stopDiscovery()
					conStatus='已连接'
					
				}else{
					conStatus='未连接'					
				}
			}		
		})
		if (!!that.inicallback){			
			that.inicallback({
				type:'connectstate',
				success: true,
				msg: conStatus,
				data: conStatus
			})
		}	
				
		console.log('当前设备状态', res)
		
	})
	}
    init(){		
		let app= getApp()
		
		app.globalData={
			getModel: function() {
				// 获取手机型号
				return this.sysinfo["model"];
			},
			getWxVersion: function() {
				// 获取微信版本号
				return this.sysinfo["version"];
			},
			getSystem: function() {
				// 获取操作系统版本
				return this.sysinfo["system"];
			},
			getPlatform: function() {
				// 获取客户端平台
				return this.sysinfo["platform"];
			},
			getSDKVersion: function() {
				// 获取客户端基础库
				return this.sysinfo["SDKVersion"];
			},
			sysinfo: null,
			wxAccountInfo: null,
			serverUrl: "https://mc2test.tmqyt.com/",
			wxSdkKey:"165151e4435cc9a7dbf660b08e09f110",// "042fc215252332550f278839dc037cb4",
			appId: "guard.thinksoft",//wxd162b163178687f5
			sdkAccessToken: "",
			currentDeviceId: "",
			bindDeviceList: []
		}
	   //#ifdef MP-WEIXIN
	   let _globalData =app
	   let _module = wx
	   //#endif
	   		
	   //#ifdef APP-PLUS
	   let _globalData = app.globalData
	   let _module = uni
	   //#endif
	   sdkAction.initObjDefault(_globalData, _module, {
	   	'_appId': app.globalData.appId,
	   	'_wxSdkKey': app.globalData.wxSdkKey
	   })
		this._init()		
		console.log('bld init')
		//this._openBlue()
		this._dispatchConnectState()
		console.log('init _dispatchConnectState ')
	}
	conn(jsonParam, callback, interval = 2000) {
		console.log('conn='+JSON.stringify( jsonParam))
		let that = this;		
		this.inicallback=callback	
		that.inijsonParam=jsonParam;
		that.deviceId=jsonParam.deviceId;
		that.deviceName=jsonParam.deviceName	
	    that.serviceId=jsonParam.serviceId
		
		this.startScan(this.inicallback); 
		
	}

	_doConnect(jsonParam, callback) {
		let that = this;
		//that.busying=true;
		super.initBlue(jsonParam, d => {

			if (!d.success) {
				that.busying = false;
				//that._closefinder()
				callback(d)
				return;
			}

			//that.finded = true;			
			//that.busying = false;
			//that._closefinder()
			that._connReceive(callback)

		})
	}
	_connReceive(res) {
		let that = this;		
		sdkAction.doInitMulti(that.deviceId, function() {
				that.inicallback({
					type:'connect',
					success: true,
					msg: '连接初始化成功',
					data: '连接初始化成功'
				})
				sdkAction.startMultiConnectDevice(1002, that.deviceId,
					function(res) {
						console.log('_connReceive', res)
						that._receiveDataCallBack(res)					
					})
			})			
	}
		//)
	//}
	_receiveDataCallBack(data) {
		let that=this;
		let helper = new datahelper.ThreeNuoBldSugarDataHelper()
		let jsonResult = helper.parseData(data);

		if (!!that.inicallback) {
			that.inicallback({
				type:'result',
				success: true,
				msg: '返回数据成功!',
				data: jsonResult
			})
		}		
	}

}
module.exports = { //必须在这里暴露接口，以便被外界访问，不然就不能访问
	ThreeNuoBldSugarBTDevice: ThreeNuoBldSugarBTDevice
}
