/**
 * HomeHotService 模块接口列表
 */
import base from './BaseService'; // 导入接口域名列表
import { instanceAxios, originalAxios } from '../HttpService'; // 导入http中创建的axios实例

const homeHotService = {
	getHomeBanner () {
		return instanceAxios.get(base.homeHot.getBanner)
			.then(res => {
				return res;
			})
			.catch(err => {
				return Promise.reject(err);
			});
	},
	getNormalQuestion () {
		return instanceAxios.get(base.homeHot.getNormalQuestion)
			.then(res => {
				return res;
			})
			.catch(err => {
				return Promise.reject(err);
			});
	},
	// 首页热门推荐
	getCardList (pageNum, ...pageSize) {
		// let pSize = pageSize[0];
		let data = {
			page: pageNum
		};
		return instanceAxios.get(base.homeHot.getCardList, data)
			.then(res => {
				// console.log(res);
				return res;
			})
			.catch(err => {
				return Promise.reject(err);
			});
	},
	getHotTopic (pageNum) {
		let data = {
			page: pageNum
		};
		return instanceAxios.get(base.homeHot.getHotTopic, data)
			.then(res => {
				return res;
			})
			.catch(err => {
				return Promise.reject(err);
			});
	},
    getDynamicTopThree () {
        return instanceAxios.get(base.homeHot.getDynamicTopThree)
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
	// 钱香动态推荐
    recommendListPage (pageNum) {
        let data = {
            page: pageNum
        };
        return instanceAxios.get(base.homeHot.recommendListPage, data)
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
	// 合并请求示例
	getAllDemo () {
		return originalAxios.all([this.getCardList(), this.getHotTopic()])
			.then(originalAxios.spread((res, res2) => {
				console.log(res);
				console.log(res2);
				let allRes = {
					res1: res,
					res2: res2
				};
				// return Promise.resolve(allRes);
				return allRes;
			}))
			.catch(err => {
				console.log(err);
				return Promise.reject(err);
			});
	}
	// 其他接口…………
};

export default homeHotService;
