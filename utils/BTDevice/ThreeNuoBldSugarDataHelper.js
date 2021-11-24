let tool = require("../util.js");
class ThreeNuoBldSugarDataHelper {
	constructor(data) {	
	}	
	parseData(data="") {		
		let jsonResult = {
			som: "",			
			protocol:"",
			upload_log:"",
			data_size:1,
			datas:[]
		};	
		console.log('血糖值:'+data.GLU)
		let item={
			datetime:tool.getFtSystemTime(),
			value:data.GLU,
			flag :0,
			result:""
		 };
		 jsonResult.datas.push(item)
				
		return  jsonResult;
	}


}
module.exports = { //必须在这里暴露接口，以便被外界访问，不然就不能访问
	ThreeNuoBldSugarDataHelper: ThreeNuoBldSugarDataHelper
}
