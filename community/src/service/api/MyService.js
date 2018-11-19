/**
 * HomeHotService 模块接口列表
 */
import base from './BaseService'; // 导入接口域名列表
import { instanceAxios, originalAxios } from '../HttpService'; // 导入http中创建的axios实例

const MyService = {

	getMyReply (pageNum) {
		let data = {
			page: pageNum
		};
		return instanceAxios.post(base.my.getMyReply, data)
			.then(res => {
				return res;
			})
			.catch(err => {
				return Promise.reject(err);
			});
	},
	getMyLike (pageNum) {
		let data = {
			page: pageNum
		};
		return instanceAxios.post(base.my.getMyLike, data)
			.then(res => {
				return res;
			})
			.catch(err => {
				return Promise.reject(err);
			});
	},
	getMyPost (userId,page) {
		let data = {
			userId: userId,
			page: page
		};
		return instanceAxios.get(base.my.getMyPost, data)
			.then(res => {
				return res;
			})
			.catch(err => {
				return Promise.reject(err);
			});
	},
	getUserInfo () {
		return instanceAxios.post(base.my.getUserInfo)
			.then(res => {
				return res;
			})
			.catch(err => {
				return Promise.reject(err);
			});
	},
	setUserInfo (info) {
		let data = {
			nickname: info.nickname,
			star: info.star,
			signature: info.signature,
			sex: info.sex,
			headImg: info.headImg,
			address: info.address
		};
		return instanceAxios.post(base.my.setUserInfo, data)
			.then(res => {
				return res;
			})
			.catch(err => {
				return Promise.reject(err);
			});
	}
	// 其他接口…………
};

export default MyService;
