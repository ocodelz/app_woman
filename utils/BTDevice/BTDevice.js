let common = require("../util.js");
class BTDevice {
	constructor() {
		this._init();
	}
	_randomn(n) {
	  let res = ''
	  for (; res.length < n; res += Math.random().toString(36).substr(2).toUpperCase()) {}
	  return res.substr(0, n)
	}
	_init() {
		try {
			this.busying = false;
			this.searchDevicing = false;
			this.state = "未连接"
			this.itmer = [];
			this.closed=false
			this.ttmer = [];
			this.finded = false
			
			this.interval = 200
			this.retry = true;
			this.openblue = false;
			this.id=this._randomn(10)
			/////new
			this.isBlueToothOpen=false,
			//this.textLog: "",
			this.devices= [],
			this.connected= false,
			this.currentDeviceType= ""
			this._discoveryStarted=false 
			this.deviceName=''
			this.deviceId=''
			this.inicallback=null;
			this.inijsonParam=null;
		} catch (e) {
			console.log(e.message)

		}
		//this.uicallback=null;
		//this.jsonParam = {};
		//this.callback = null;
	}
	
	_openAdapter(callback) {
		var that = this;
		uni.onBluetoothAdapterStateChange(function(res) {
			var isDvailable = res.available; //蓝牙适配器是否可用	
			if (isDvailable) {
				//that._getAdapterState(callback);
				console.log('_openAdapter ok')
			} else {
				that._stopDiscovery(callback); 				
				that.devices= []
				that.deviceId=''				
				that.isBlueToothOpen= false		
							console.log('_openAdapter fail')
			}
		});
		
		uni.openBluetoothAdapter({
			success: function(res) {				
				that.isBlueToothOpen= true
				if (!!callback){
					callback({
						type: "_openAdapter",
						success: true,
						msg: '打开蓝牙成功',
						data: '打开蓝牙适配器成功'// + that.deviceId
					})
				}
			
				that._getAdapterState(callback);
			},
			fail: function(err) {
				that.isBlueToothOpen= false
				if (!!callback){
					callback({
						type: "_openAdapter",
						success: false,
						msg: '打开蓝牙失败',
						data: '打开蓝牙适配器失败,请确保手机蓝牙已经打开'// + that.deviceId
					})
				}
			}
		});


	}
	
	_getAdapterState(callback) {
		var that = this;
		console.log ('_getAdapterState')
		uni.getBluetoothAdapterState({
			success: function(res) {
				console.log(res)
				var isDiscov = res.discovering; // 是否正在搜索设备	
				var isDvailable = res.available; // 蓝牙适配器是否可用	
				if (isDvailable) {	
					that.isBlueToothOpen= true
					if (!!callback){
						callback({
							type: "_getAdapterState",
							success: true,
							msg: '获取蓝牙状态成功',
							data:  "获取蓝牙状态成功"// + that.deviceId
						})
					}
					that._startDiscovery(callback);					
				}else{
					that.isBlueToothOpen= false
					if (!!callback){
						callback({
							type: "_getAdapterState",
							success: false,
							msg: '蓝牙打开失败,请先打开手机蓝牙功能',
							data:  "蓝牙打开失败,请先打开手机蓝牙功能"// + that.deviceId
						})
					}
					
				}
			}
		});
	}	
	_startDiscovery(callback) {
		var that = this;	
		//console.log(this._discoveryStarted)
		
		if (that._discoveryStarted) {
			callback({
				type: "_startDiscovery",
				success: false,
				msg: '重复查找设备...'+that._discoveryStarted,
				data:  "重复查找设备..."+that._discoveryStarted// + that.deviceId
			})
			return;
		}	
		that._discoveryStarted = true;
		if (that._discoveryStarted) {
			callback({
				type: "_startDiscovery",
				success: false,
				msg: '正在查找设备...'+that._discoveryStarted,
				data:  "正在查找设备..."+that._discoveryStarted// + that.deviceId
			})
			
		}	
		if (!!callback){
			callback({
				type: "_startDiscovery",
				success: true,
				msg: '查找设备...',
				data:  "查找设备,正在扫描.."// + that.deviceId
			})
		}
		console.log ('_startDiscovery')
        that._onFound(callback);
		uni.startBluetoothDevicesDiscovery({
			services: [that.serviceId],
			allowDuplicatesKey: false,	
			success: function(res) {
				if (!!callback){
					callback({
						type: "_startDiscovery",
						success: true,
						msg: '查找设备...',
						data:  "扫描附近的蓝牙外围设备成功，准备监听寻找新设备:" + JSON.stringify(res)// + that.deviceId
					})
				}
			
				 // 监听寻找到新设备的事件
			}
		});
	}
	
	_stopDiscovery(callback) {
		var that = this;
		if (!!callback){
			callback({
				type: "_stopDiscovery",
				success: true,
				msg: '停止搜寻附近的蓝牙外围设备',
				data:  "停止搜寻附近的蓝牙外围设备:"				
				})
		}
		uni.stopBluetoothDevicesDiscovery();
	}
	_closeConnect(callback){//安卓系统调用无返回
		let that=this
		try {
		uni.closeBLEConnection({
			success(res) {
				if (!!callback)
					callback(res)
			},
			fail(res) {
				if (!!callback)
					callback(res)
			},
			complete(res) {
				//console.log('_closeConnect closeBLEConnection '+JSON.stringify(res))
				if (!!callback)
					callback(res)
			},			
			deviceId:that.deviceId,
		})
		}catch(e){
			uni.showModal({
				title:'错误',
				content:e.message
			})

		}
	}
	_onFound(callback) {
		var that = this;
		uni.onBluetoothDeviceFound(function(res) {
			res.devices.forEach(function(device) {
				if (!device.name && !device.localName) {
					return;
				}
				// if (!!callback){					
				// 	callback({
				// 		type: "_onFound",success: true,
				// 		msg: '发现设备ID:'+device.deviceId+", name:"+device.name+","+common.getFtSystemTime(),
				// 		data:  '发现设备ID:'+device.deviceId+", name:"+device.name+","+common.getFtSystemTime()				
				// 	})
				// }
				console.log("device.name="+device.name,"that.deviceName="+that.deviceName)
				
				if (common.trim(device.name)==common.trim( that.deviceName)){					
					that.deviceId=device.deviceId			
					
					if (!!callback){
						callback({
							type: "finded",
							success: true,
							msg: '绑定设备ID:'+that.deviceId+", name:"+that.deviceName,
							data:  '绑定设备ID:'+that.deviceId+", name:"+that.deviceName				
							})
					}
					if (!!that._connReceive){
						that._connReceive(device)						
					}
					return ;
					}
				
			});
		});
	}
	startScan(callback) {
	console.log('startScan')//'
		var that = this;
		that._discoveryStarted = false;
		//console.log('that.isBlueToothOpen', that.isBlueToothOpen)
		if (that.isBlueToothOpen) {
		console.log('that._getAdapterState(callback)')//'
			that._getAdapterState(callback);
		} else {
			console.log('that._openAdapter(callback)')
			that._openAdapter(callback);
		}
	}
	_openBlue() {
		let that = this;
		try {
			uni.openBluetoothAdapter({
				success() {

					that.openblue = true;
					console.log('打开蓝牙适配器成功----')
				},
				fail() {
					that.openblue = false;
					console.log('打开蓝牙适配器失败')

				}
			});
		} catch (e) {
			console.log(e.message)

		}

	}
	_closeBlue() {
		let that = this;
		try {
			uni.closeBluetoothAdapter({
				success() {

					that.openblue = false;
					console.log('关闭蓝牙适配器成功')
				},
				fail() {
					//this.openblue=true;
					console.log('关闭蓝牙适配器失败')
				}
			});

		} catch (e) {
			console.log(e.message)

		}
	}
	initBlue(jsonParam, callback, retry = true) {
		let that = this;
		try {
			//this.uicallback=callback;
			// this.callback=jsonParam.func
			this.deviceId = '';
			this.notifyId = jsonParam.notifyId;
			this.writeId = jsonParam.writeId;
			this.serviceId = jsonParam.serviceId;
			this.callback = jsonParam.callback;
			this.deviceName = jsonParam.deviceName;
			this.state = "未连接"
			//clearInterval(that.itmer);
			this.jsonParam = jsonParam;
			this.callback = callback;
			this.retry = retry;


			//if (!that.openblue) {
			that._openBlue();
			setTimeout(function() {
				if (!that.openblue) {
					if (!!callback) {
						callback({
							type: "initBlue",
							success: false,
							msg: '手机未开启蓝牙，请先开启蓝牙',
							data: ""
						})

					}
				} else {
					if (retry) {
						//console.log('initBlue that.itmer='+that.itmer)
						
							that._closefinder()
							//console.log('initBlue clearInterval')
						
						that.itmer.push( setInterval(that._getDevInfo.bind(that),
							800, that.deviceName, callback))
							console.log('that.itmer.push')
					} else {
						that._closefinder()
						that.ttmer.push(setTimeout(that._getDevInfo.bind(that),
							800, that.deviceName, callback))

					}
				}

			}, 800)
		} catch (e) {
			console.log(e.message)

		}
		//return;
		//}
	}
	close(callback) {
		try {
			let that = this;
            that.closed=true 
			this.isBlueToothOpen=false,
			//this.textLog: "",
			this.devices= [],
			this.connected= false,
			this.currentDeviceType= ""
			this._discoveryStarted=false 
			this.deviceName=''
			this.inicallback=null;
			this.inijsonParam=null;
			that._closeConect(callback);
			that._closeBlue();
		} catch (e) {
			console.log(e.message)

		}
		//console.log('关闭连接')
	}
	_closeConect(callback) {
		let that = this;

	}

	getState() {
		return this.state;

	}
	_closefinder() {
		try {
			
			 for (let var1 of this.itmer) {
				 console.log('var1='+var1)
				 
			 	clearInterval(var1);
			 }
			 this.itmer=[]
			for (let var1 of this.ttmer) {
				clearTimeout(var1);
			}		
							
			 this.ttmer=[]


			this.finded = false
			console.log('_closefinder')
		} catch (e) {
			console.log(e.message)
		}

	}
	/**
	 * 获取设备的完整信息
	 */

	_getDevInfo(deviceName, acallback) {
		let that = this;
		try {
			if (that.searchDevicing) {
				console.log('重复搜索设备...id='+that.id)
				return;

			};
			that.searchDevicing = true;
			//			console.log("0正在打开蓝牙设备发现...");
			uni.closeBluetoothAdapter({
				complete() {
					setTimeout(d => {
						uni.openBluetoothAdapter({
							complete() {
								uni.startBluetoothDevicesDiscovery({
									services: [that.serviceId],
									complete: function(res) {
										setTimeout(function() {
											uni.getBluetoothDevices({
												complete: function(res) {
													let dvx = {
														deviceId: null
													};

													for (let dv of res.devices) {
														if (dv.name == deviceName) {
															dvx = dv
															that.deviceId = dv.deviceId;
															that._closefinder()
															
															break;
														}
													}

													uni.stopBluetoothDevicesDiscovery({
														complete: function(res) {
															//														console.log('1关闭蓝牙设备发现...')
															if (!!dvx.deviceId) {

																acallback({
																	type: "_getDevInfo",
																	success: true,
																	msg: '成功',
																	data: '0已经找到设备...' + dvx.deviceId
																});
																that.searchDevicing = false;
																console.log('0已经找到设备...', dvx.deviceId);
																//															console.log('2.0找到设备停止搜索 返回...');
															} else {

																acallback({
																	type: "_getDevInfo",
																	success: false,
																	msg: '失败',
																	data: '0未找到设备...'
																});
																that.searchDevicing = false;
																console.log('0未找到设备...');
																//															console.log('2.1未找到设备停止搜索 返回...');
															}
														}
													})



												}

											})


										}, 1800)

									},
								});
							},


						})
					}, 1200)
				},
			});

		} catch (e) {
			that.searchDevicing = false;
			acallback({
				type: "_getDevInfo",
				success: false,
				msg: 'Exception',
				data: JSON.stringify(e)
			});
		}
	}
	/**
	 * 获取到设备之后连接蓝牙设备
	 */
	connetBlue(callback) {
		var that = this;
		try {
			//		console.log("4正在连接设备,deviceId=" + that.deviceId)
			that.state = "正在连接设备,deviceId=" + that.deviceId

			uni.createBLEConnection({
				deviceId: that.deviceId, //设备id
				success: function(res) {					
					that.state = "设备连接成功"
					setTimeout(() => {	
						callback({
							type: "connetBlue",
							success: true,
							msg: '连接成功',
							data: '1 连接设备成功...' + that.deviceId
						})
						console.log('1 连接设备成功...', that.deviceId);

					}, 200)

				},
				fail(res) {
					//console.log('5.1 连接设备失败:' + JSON.stringify(res))
					callback({
						type: "connetBlue",
						success: false,
						msg: "连接失败",
						data: '1 连接设备失败...' + that.deviceId
					})
					console.log('1 连接设备失败...', that.deviceId);
				}
			})
		} catch (e) {
			console.log(e.message)

		}
	}

	_getServiceId() {
		var that = this
		try {
			console.log('_getServiceId,deviceid=', that.deviceId)
			setTimeout(function() {
				uni.getBLEDeviceServices({

					deviceId: that.deviceId,
					complete(d) {
						// console.log('_getServiceId complete:'
						// ,JSON.stringify(d)
						// )
					},
					fail(d) {
						console.log('_getServiceId fail:', JSON.stringify(d))
					},
					success: function(res) {
						res.services.forEach(element => {
							console.log('service=', JSON.stringify(element))
							setTimeout(function() {
								uni.getBLEDeviceCharacteristics({
									deviceId: that.deviceId,
									serviceId: element.uuid,
									success: function(res) {
										//that.startNotice(that.notifyId) //7.0
										console.log(element.uuid, 'getBLEDeviceCharacteristics', JSON.stringify(res))
									}
								})
							}, 1000)


						});
						// if (!!that.serviceId) {
						// 	that.getCharacteId()
						// }

					}
				})


			}, 1000)
		} catch (e) {
			console.log(e.message)

		}
	}
	_getCharacteId() {
		var that = this
		try {
			uni.getBLEDeviceCharacteristics({
				deviceId: that.deviceId,
				serviceId: that.serviceId,
				success: function(res) {
					that.startNotice(that.notifyId) //7.0
				}
			})
		} catch (e) {
			console.log(e.message)

		}
	}
	startReceive(readyReadcallback, readyWriteCallback = null) {
		let that = this;
		try {
			//		console.log('startreceive', that.deviceId, that.serviceId, that.notifyId)
			setTimeout(function() {

				uni.notifyBLECharacteristicValueChange({

					state: true,
					deviceId: that.deviceId,
					serviceId: that.serviceId,
					characteristicId: that.notifyId,

					success: function(res) {
						that.state = "设备连接成功,等待接收数据"
						setTimeout(function() {
							uni.onBLECharacteristicValueChange(function(res) {

								let hexstr = common.ab2hex(res.value)
								console.log('300 接收到数据...' + hexstr);

								if (!!readyReadcallback) {
									readyReadcallback({
										type: "startReceive",
										success: true,
										msg: JSON.stringify(res),
										data: res.value
									})
								}

							});
							if (!!readyWriteCallback) {
								console.log('readyWriteCallback 成功:');

								readyWriteCallback({

									type: "readyWrite",
									success: true,
									msg: "写数据准备好",
									data: '2 注册数据事件成功...' +
										",deviceId=" + that.deviceId +
										",serviceId=" + that.serviceId +
										",characteristicId=" + that.notifyId
								})
							}


							//console.log('notifyBLECharacteristicValueChange 成功:' + JSON.stringify(res));
							console.log('2 注册数据事件成功...', "deviceId=" + that.deviceId, "serviceId=" + that.serviceId,
								"characteristicId=" +
								that.notifyId
							);
						}, 200)


					},
					fail: function(res) {
						console.log()
						if (!!readyReadcallback) {
							readyReadcallback({
								type: "startReceive",
								success: false,
								msg: JSON.stringify(res),
								data: ""
							})
						}

						if (!!readyWriteCallback) {
							readyWriteCallback({
								type: "readyWrite",
								success: false,
								msg: "准备写数据失败",
								data: '2 注册数据事件失败...' +
									",deviceId=" + that.deviceId +
									",serviceId=" + that.serviceId +
									",characteristicId=" + that.notifyId
							})
						}
						console.log('2 注册数据事件失败...', "deviceId=" + that.deviceId, "serviceId=" + that.serviceId,
							"characteristicId=" +
							that.notifyId
						);
					}
				});

			}, 1500)

		} catch (e) {
			console.log(e.message)

		}
	}
	sendCmd(hexstr, callback) {
		var that = this
		try {
			//		console.log('sendCmd=', hexstr, that.deviceId, that.serviceId, that.writeId)
			setTimeout(function() {
				let buffer;
				buffer = common.string2buffer(hexstr);
				let devmsgInfo = "deviceId=" + that.deviceId +
					"serviceId=" + that.deviceId +
					"characteristicId=" + that.writeId;

				uni.writeBLECharacteristicValue({
					deviceId: that.deviceId,
					serviceId: that.serviceId,
					characteristicId: that.writeId,
					value: buffer,
					success: function(res) {
						console.log("sendCmd 写入成功 数据:" + hexstr + ",返回:" + JSON.stringify(res))
						if (!!callback) {
							callback({
								type: "sendCmd",
								success: true,
								msg: "sendCmd 写入成功 数据:" + hexstr,
								data: JSON.stringify(res)
							})
						}
					},
					fail: function(e) {
						console.log(JSON.stringify(e))
						if (!!callback) {
							callback({
								type: "sendCmd",
								success: false,
								msg: "sendCmd 写入失败 数据:" + hexstr,
								data: JSON.stringify(e)
							})
						}
						console.log("sendCmd 写入失败 数据:" + hexstr + ",返回:" + JSON.stringify(e))
					},
					complete: function(e) {
						//				console.log("调用结束");
						// if (!!callback) {
						// 	callback({
						// 		type: "sendCmd",
						// 		success: false,
						// 		msg: "complete " + devmsgInfo,
						// 		data: JSON.stringify(e)
						// 	})
						// }
					}
				})
			}, 200)


		
	} catch (e) {
		console.log(e.message)

	}}
}
module.exports = {
	BTDevice: BTDevice
}
