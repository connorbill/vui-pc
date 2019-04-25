/**
 * 接口域名的管理
 */

let baseService = {
	// 可以使用多个接口地址
    domainOne: '',
    domainTwo: '',
    domainThree: ''
	// domainOne: 'https://cunapi.qianxiangbank.com',
	// domainTwo 微信app id
	// domainTwo: 'https://cunapi.qianxiangbank.com',
	// 图片上传接口
	// domainThree: 'https://m.qianxiangbank.com',
};
// if (process.env.NODE_ENV === 'development') {
//     baseService.domainOne = '';
// } else {
//     baseService.domainOne = 'https://cunapi.qianxiangbank.com';
// }


let apiPath = {
	common: {
        // 上传图片接口
        upImg: baseService.domainThree + '/wxActivity/uploadActivityPic2.api',
		// 获取微信 appid
		wechatAppId: baseService.domainTwo + '/share/shareSign.api'
	},
	homeHot: {
		// 主页banner图
		getBanner: baseService.domainOne + '/communityQx/getBanner.api',
		// 常见问题
		getNormalQuestion: baseService.domainOne + '/communityQx/getNotice.api',
		// 话题列表
		getCardList: baseService.domainOne + '/communityQx/getIndexCardList.api',
        // getCardList: baseService.domainTwo + '/newAccount/account.api',
		// 大家热议
		getHotTopic: baseService.domainOne + '/communityQx/hotPostListPage.api',
        // 钱香动态 顶部三条帖子
        getDynamicTopThree: baseService.domainOne + '/communityQx/dongTaiNew3.api',
        // 钱香动态-热门推荐
        recommendListPage: baseService.domainOne + '/communityQx/recommendListPage.api'
	},
	detail: {
        // 发帖
        compose: baseService.domainOne + '/communityQx/post.api',
        // 话题详情页
        getTopicDetail: baseService.domainOne + '/communityQx/getPostDetail.api',
        // 获取帖子评论分页
        getPostReplyList: baseService.domainOne + '/communityQx/getPostReplyList.api',
        // 获取帖子评论的回复分页
        getDetailReplyList: baseService.domainOne + '/communityQx/getDetailReplyList.api',
        // 获取帖子热门评论1条
        getPostHotReply: baseService.domainOne + '/communityQx/getPostHotReply.api',
        // 帖子上一篇下一篇
        getPostPreNext: baseService.domainOne + '/communityQx/getPostPreNext.api',
        // 对帖子点赞
        doLikePost: baseService.domainOne + '/communityQx/zanPost.api',
        // 对评论点赞
        doLikeReplay: baseService.domainOne + '/communityQx/zanReply.api',
        // 对帖子回复
        doReplayPost: baseService.domainOne + '/communityQx/replyPost.api',
        // 对评论回复
        doReplayReplay: baseService.domainOne + '/communityQx/replyReply.api'
	},
	topic: {
        // 钱香社区话题子类
        getSubTitle: baseService.domainOne + '/communityQx/getSubTitle.api',
        // 多少人参与本话题
        getNumberByTopic: baseService.domainOne + '/communityQx/getNumberByTopic.api',
        // 话题下置顶帖子
        getTopicTopThree: baseService.domainOne + '/communityQx/getIsTop3.api',
		// 话题列表页面推荐 香粉热议
		getTopicRecomend: baseService.domainOne + '/communityQx/getTopicCardList.api',
        // 热门分类推荐分页-默认排序
        recommendSortNormal: baseService.domainOne + '/communityQx/recommendByTopicSortByNormalListPage.api',
        // 热门分类推荐分页-热门排序
        recommendSortHot: baseService.domainOne + '/communityQx/recommendByTopicSortByHotListPage.api'
	},
	my: {
		// 主页banner图
		getMyReply: baseService.domainOne + '/communityQx/getMessageReplyListPage.api',
		// 主页banner图
		getMyLike: baseService.domainOne + '/communityQx/getMessageZanListPage.api',
		// 我的发帖 传谁的userId就返回谁的发帖
		getMyPost: baseService.domainOne + '/communityQx/getMyPostListPage.api',
		// 查询我的个人信息
		getUserInfo: baseService.domainOne + '/communityQx/getUserInfo.api',
		// 设置我的信息
		setUserInfo: baseService.domainOne + '/communityQx/setUserInfo.api'
	}
};

export default apiPath;
