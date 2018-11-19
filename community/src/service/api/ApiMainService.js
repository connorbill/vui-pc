/**
 * api接口的统一出口
 */
// 文章模块接口
import HomeHotService from './HomeHotService';
import MyService from './MyService.js';
import TopicService from './TopicService.js';
import DetailService from './DetailService.js';
import CommonService from './CommonService.js';
// 其他模块的接口……

// 导出接口
export default {
    CommonService: CommonService,
    HomeHotService: HomeHotService,
	MyService: MyService,
    TopicService: TopicService,
    DetailService: DetailService
    // ……
};
