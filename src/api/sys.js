import http from './../utils/request' 
const apiService = {
	 /**
	  * 登录
	  */
	login(params) {
		return http.post('/sys/mLogin',params)	
	},
	/**
	  * 手机号码登录
	  */
	phoneNoLogin(params) {
		return http.post('/sys/phoneLogin',params);
	},
	/**
	  * 退出
	  */
	logout(params) {
		return http.post('/sys/logout',params);
	},
	/**
	 * 获取文件访问路径
	 * @param avatar
	 * @param subStr
	 * @returns {*}
	 */
	getFileAccessHttpUrl(avatar,subStr){
	    if(!subStr) subStr = 'http'
	    if(avatar && avatar.startsWith(subStr)){
	        return avatar;
	    }else{
	        return configService.staticDomainURL + "/" + avatar;
	    }
	}
};
export const login=(params)=>{
  return http.post('/sys/mLogin',params)	
}
