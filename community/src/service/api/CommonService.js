/**
 * HomeHotService 模块接口列表
 */
import base from './BaseService'; // 导入接口域名列表
import { originalAxios } from '../HttpService'; // 导入http中创建的axios实例

const CommonService = {
    upImg (base64Data) {
        // let self = this;
        let data = {
            base64Data: base64Data
        };
        return originalAxios.post(base.common.upImg, data)
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
    getWechatAppId (url) {
        let data = {
            url: url
        };
        return originalAxios.get(base.common.wechatAppId, data)
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }
    // 其他接口…………
};

export default CommonService;
