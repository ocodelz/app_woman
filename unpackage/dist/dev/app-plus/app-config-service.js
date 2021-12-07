
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/tabbar/purchaseOrLease/purchaseOrLease","pages/probeConnection/probeConnection","pages/register/register","pages/changePassword/changePassword","pages/monitoringSettings/monitoringSettings","pages/pregnantWomanInformation/pregnantWomanInformation","pages/instructions/instructions","pages/search/search","pages/equipmentManagement/equipmentManagement","pages/guardianshipRecord/guardianshipRecord","pages/takeBloodPressure/takeBloodPressure","pages/bloodGlucoseTest/bloodGlucoseTest","pages/fetalHeartRateMonitoring/fetalHeartRateMonitoring","pages/custodyOrHelp/custodyOrHelp","pages/tabbar/index/index","pages/productDetail/productDetail","pages/tabbar/pregnancyKnowledge/pregnancyKnowledge","pages/tabbar/user/user","pages/update/index","pages/tabbar/msgCenter/msgCenter","pages/pregnantWomanOrNewbornFollowUpQuestionnaire/pregnantWomanOrNewbornFollowUpQuestionnaire","pages/postpartumOrPostoperativeQuestionnaireSurvey/postpartumOrPostoperativeQuestionnaireSurvey","pages/userAgreement/userAgreement","pages/orderManagement/orderManagement","pages/order/order"],"window":{"navigationBarTitleText":"uni-app","backgroundColor":"#F8F8F8","navigationBarBackgroundColor":"#fc979f","navigationBarTextStyle":"white","bounce":"none"},"tabBar":{"color":"#000","selectedColor":"#fc979f","backgroundColor":"#fff","borderStyle":"black","list":[{"pagePath":"pages/tabbar/index/index","text":"首页","iconPath":"/static/image/tabbar/home.png","selectedIconPath":"/static/image/tabbar/home_active.png"},{"pagePath":"pages/tabbar/purchaseOrLease/purchaseOrLease","text":"商城","iconPath":"/static/image/tabbar/gouwuche.png","selectedIconPath":"/static/image/tabbar/gouwuche_active.png"},{"pagePath":"pages/tabbar/msgCenter/msgCenter","text":"消息","iconPath":"/static/image/tabbar/msg.png","selectedIconPath":"/static/image/tabbar/msg_active.png"},{"pagePath":"pages/tabbar/pregnancyKnowledge/pregnancyKnowledge","text":"孕期知识","iconPath":"/static/image/tabbar/clown.png","selectedIconPath":"/static/image/tabbar/clown_active.png"},{"pagePath":"pages/tabbar/user/user","text":"我的","iconPath":"/static/image/tabbar/wode.png","selectedIconPath":"/static/image/tabbar/wode_active.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"孕婴安_孕妇端","compilerVersion":"3.2.16","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"navigationBarTitleText":"登录","navigationStyle":"custom","navigationBarTextStyle":"white"}},{"path":"/pages/tabbar/purchaseOrLease/purchaseOrLease","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"商城","navigationBarBackgroundColor":"#fc979f","navigationBarTextStyle":"white"}},{"path":"/pages/probeConnection/probeConnection","meta":{},"window":{"navigationBarTitleText":"连接探头","navigationBarBackgroundColor":"#fc979f"}},{"path":"/pages/register/register","meta":{},"window":{"navigationBarTitleText":"孕妇注册"}},{"path":"/pages/changePassword/changePassword","meta":{},"window":{"navigationBarTitleText":"更改密码"}},{"path":"/pages/monitoringSettings/monitoringSettings","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white"}},{"path":"/pages/pregnantWomanInformation/pregnantWomanInformation","meta":{},"window":{"navigationBarTitleText":"个人信息"}},{"path":"/pages/instructions/instructions","meta":{},"window":{"navigationBarTitleText":"使用说明"}},{"path":"/pages/search/search","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/equipmentManagement/equipmentManagement","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white"}},{"path":"/pages/guardianshipRecord/guardianshipRecord","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","onReachBottomDistance":50}},{"path":"/pages/takeBloodPressure/takeBloodPressure","meta":{},"window":{"navigationBarTitleText":"血压测量","navigationStyle":"custom","navigationBarTextStyle":"white"}},{"path":"/pages/bloodGlucoseTest/bloodGlucoseTest","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white"}},{"path":"/pages/fetalHeartRateMonitoring/fetalHeartRateMonitoring","meta":{},"window":{"navigationBarTitleText":"胎心监护"}},{"path":"/pages/custodyOrHelp/custodyOrHelp","meta":{},"window":{"navigationBarTitleText":"监护帮助"}},{"path":"/pages/tabbar/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","navigationStyle":"custom","navigationBarTextStyle":"white"}},{"path":"/pages/productDetail/productDetail","meta":{},"window":{}},{"path":"/pages/tabbar/pregnancyKnowledge/pregnancyKnowledge","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"孕期40周","bounce":"none"}},{"path":"/pages/tabbar/user/user","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/update/index","meta":{},"window":{"navigationBarTitleText":"版本升级"}},{"path":"/pages/tabbar/msgCenter/msgCenter","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"消息中心"}},{"path":"/pages/pregnantWomanOrNewbornFollowUpQuestionnaire/pregnantWomanOrNewbornFollowUpQuestionnaire","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/postpartumOrPostoperativeQuestionnaireSurvey/postpartumOrPostoperativeQuestionnaireSurvey","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/userAgreement/userAgreement","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/orderManagement/orderManagement","meta":{},"window":{"bounce":"none","titleNView":{"buttons":[{"text":"","fontSrc":"/static/iconfont.ttf","float":"right","color":"#FFFFFF"}],"searchInput":{"align":"center","placeholder":"请输入查找订单信息","borderRadius":"30rpx","backgroundColor":"#fff","disabled":true}}}},{"path":"/pages/order/order","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
