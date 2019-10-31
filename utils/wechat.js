export function wxIosInputHack(){
	//判断设备型号
	const judgeDeviceType = (function() {
		const ua = window.navigator.userAgent.toLocaleLowerCase();
		const isIOS = /iphone|ipad|ipod/.test(ua);
		const isAndroid = /android/.test(ua);
		console.error('ios:'+isIOS);
		console.error('Android:'+isAndroid);
		return {
			isIOS,
			isAndroid,
		};
	}());
	console.error('navigator:'+JSON.stringify(window.navigator.userAgent));
//	if(!judgeDeviceType.isIOS) return;
	const wechatInfo = window.navigator.userAgent.match(/MicroMessenger\/([\d.]+)/i);
	console.error('wechat:'+wechatInfo)
	if(!wechatInfo) return;
	console.error('wechat:'+wechatInfo)
	const wechatVersion = wechatInfo[1];
	const version = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
	//针对ios微信特定版本处理视图被顶上去的问题
	if(+wechatVersion.replace(/\./g, '') >= 674 && +version[1] >= 10) {
		window.scroll(0, Math.max(document.body.clientHeight, document.documentElement.clientHeight));
	}
}

export function getBirthdayByIdcarad(idcard){
	let birthday="";
	if(idcard!==null&&idcard!==""){
		if(idcard.length===15){
			birthday=`19${idcard.substr(6,6)}`;
		}else if(idcard.length===18){
			birthday=idcard.substr(6,8);
		}
		birthday=birthday.replace(/(.{4})(.{2})/,'$1-$2-');
	}
	return birthday;
}
export default{
	wxIosInputHack,
}
