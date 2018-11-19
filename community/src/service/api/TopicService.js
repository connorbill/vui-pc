/**
 * HomeHotService 模块接口列表
 */
import base from './BaseService'; // 导入接口域名列表
import { instanceAxios, originalAxios } from '../HttpService'; // 导入http中创建的axios实例

const TopicService = {
    getSubTitle () {
        return instanceAxios.get(base.topic.getSubTitle)
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
	getTopicRecomend (pageNum) {
		let data = {
			page: pageNum
		};
		return instanceAxios.get(base.topic.getTopicRecomend, data)
			.then(res => {
				return res;
			})
			.catch(err => {
				return Promise.reject(err);
			});
    },
    recommendSortNormal (topicId, pageNum) {
        let data = {
            topicId: topicId,
            page: pageNum
        };
        return instanceAxios.get(base.topic.recommendSortNormal, data)
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
    recommendSortHot (topicId, pageNum, pageSize) {
        let data = {
            topicId: topicId,
            page: pageNum,
            pageSize: pageSize
        };
        return instanceAxios.get(base.topic.recommendSortHot, data)
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
    getNumberByTopic (topicId) {
        let data = {
            topicId: topicId
        };
        return instanceAxios.get(base.topic.getNumberByTopic, data)
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
    getTopicTopThree (topicId) {
        let data = {
            topicId: topicId
        };
        return instanceAxios.get(base.topic.getTopicTopThree, data)
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }
    // 其他接口…………
};

export default TopicService;
