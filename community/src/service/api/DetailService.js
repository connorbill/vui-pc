/**
 * HomeHotService 模块接口列表
 */
import base from './BaseService'; // 导入接口域名列表
import { instanceAxios, originalAxios } from '../HttpService'; // 导入http中创建的axios实例

const homeHotService = {
    getTopicDetail (id) {
        return instanceAxios.get(base.detail.getTopicDetail, { postId: id })
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
    getPostHotReply (id) {
        return instanceAxios.get(base.detail.getPostHotReply, { postId: id })
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
    getPostPreNext (topicId, postId) {
        let data = {
            topicId: topicId,
            postId: postId
        };
        return instanceAxios.get(base.detail.getPostPreNext, data)
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
    getPostReplyList (postId, page) {
        let data = {
            page: page,
            postId: postId
        };
        return instanceAxios.get(base.detail.getPostReplyList, data)
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
    getDetailReplyList (postReplayId, page) {
        let data = {
            page: page,
            postReplayId: postReplayId
        };
        return instanceAxios.get(base.detail.getDetailReplyList, data)
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
    // 调用这个函数时param 是对象
    goToCompose (param) {
        let data = {
            topicId: param.topicId,
            title: param.title,
            content: param.content,
            pic: param.pic // 用逗号隔开
        };
        return instanceAxios.post(base.detail.compose, data)
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
    doLikePost (postId) {
        return instanceAxios.post(base.detail.doLikePost, { postId: postId })
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
    doLikeReplay (postReplyId) {
        return instanceAxios.post(base.detail.doLikeReplay, { postReplyId: postReplyId })
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
    doReplayPost (info) {
        let data = {
            postId: info.postId,
            content: info.content
        };
        return instanceAxios.post(base.detail.doReplayPost, data)
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
    doReplayReplay (info) {
        let data = {
            postReplyId: info.postReplyId,
            content: info.content
        };
        return instanceAxios.post(base.detail.doReplayReplay, data)
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }
    // 其他接口…………
};

export default homeHotService;
