<template>
    <div class="dynamic-item-one">
        <div>
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                <div class="top-img">
                    <!--小A一天-->
                    <img v-if="topicId == 101" src="../../assets/images/topic/banner_4.png" alt="">
                    <!--香粉零距离-->
                    <img v-if="topicId == 102" src="../../assets/images/topic/banner_5.png" alt="">
                    <!--钱香时间 没有图-->
                    <img v-if="topicId == 103" src="../../assets/images/topic/banner_4.png" alt="">
                    <!--钱香公益-->
                    <img v-if="topicId == 104" src="../../assets/images/topic/banner_2.png" alt="">
                    <!--香粉故事会-->
                    <img v-if="topicId == 105" src="../../assets/images/topic/banner_3.png" alt="">
                    <!--钱香动态-->
                    <img v-if="topicId == 106" src="../../assets/images/topic/banner_1.png" alt="">
                </div>
                <div class="dy-item-list">
                    <div class="tab-group tab-dynamic">
                        <div class="tab-item "  :class="topicSort == 0 ? 'tab-active' : ''">全部</div>
                        <!--<div class="tab-middle-line"></div>-->
                        <!--<div class="tab-item" @click="setTopicType(1)" :class="topicSort == 1 ? 'tab-active' : ''">精华</div>-->
                    </div>
                    <div class="recommend-list ">

                            <van-list
                                    v-model="loading"
                                    :finished="finished"
                                    :offset="300"
                                    @load="recommendSortNormal"
                                    :immediate-check="immediateCheck"
                            >
                                <!--<card-list :card-list="cardList" :show-hot-topic="showHotTopic" :topic-data="topicObj"></card-list>-->
                                <dynamic-card :recommend-list="dynamicList"></dynamic-card>
                            </van-list>
                    </div>
                </div>
                <div class="no-msg" v-if="dynamicList.length < 1  && !isRefresh && !loading">
                    <div class="icon-no-msg no-img-box"></div>
                    <div class="no-msg-text">暂无信息</div>
                </div>
                <div v-if="noMoreInfo" class="no-more-item flex-align-center">— 我可是有底线的 —</div>
            </van-pull-refresh>
        </div>

    </div>
</template>

<script>
    import { Swipe, SwipeItem, List, PullRefresh } from 'vant';
    import DynamicCard from '../../components/DynamicCardComponent';
    import { commonFunction } from "../../common/CommonFunction";

    export default {
        name: 'DynamicItem',
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [List.name]: List,
            [PullRefresh.name]: PullRefresh,
            DynamicCard
        },
        data () {
            return {
                noMoreInfo: false,
                topicSort: 0, // 0全部 1精华
                topicId: 101,
                active: 1,
                homeTopTab: ['热门', '钱香动态'],
                noCardList: '',
                isShowCardList: false,
                cardPageSize: 10,
                cardPageNum: 0,
                loading: false,
                immediateCheck: false,
                finished: false,
                isRefresh: false,
                dynamicList: [],
                dynamicType: [
                    {
                        id: '101',
                        name: '小A动态'
                    },
                    {
                        id: '102',
                        name: '香粉零距离'
                    },
                    {
                        id: '103',
                        name: '钱香时间'
                    },
                    {
                        id: '104',
                        name: '钱香公益'
                    },
                    {
                        id: '105',
                        name: '香粉故事会'
                    },
                    {
                        id: '106',
                        name: '钱香动态'
                    }
                ]
            };
        },
        created () {
            // this.topicId = this.$route.params.id;
            // this.currentTopic();
            // console.log(1)
        },
        methods: {
            currentTopic () {
                for (let i = 0; i < this.dynamicType.length; i++) {
                    if (this.topicId == this.dynamicType[i].id) {
                        commonFunction.setPageTitle(this.dynamicType[i].name);
                    }
                }
            },
            setTopicType (type) {
                // 全部
                this.topicSort = type;
                this.onRefresh();
            },
            onRefresh () {
                // this.finished = false;
                this.noMoreInfo = false;
                this.recommendSortNormal('refresh');
                // if (this.topicSort === 0) {
                //     this.recommendSortNormal();
                // } else {
                //     this.recommendSortHot();
                // }
            },
            recommendSortNormal (refresh) {
                if (refresh === 'refresh') {
                    // isRefresh传值1表示刷新数据
                    this.cardPageNum = 0;
                }
                this.cardPageNum++;
                this.$http.TopicService.recommendSortNormal(this.topicId, this.cardPageNum)
                    .then(res => {
                        if (refresh === 'refresh') {
                            // isRefresh传值1表示刷新数据
                            this.dynamicList.splice(0);
                        }
                        let resArr = res.data.result;
                        if (resArr) {
                            for (let i = 0; i < resArr.length; i++) {
                                let picSplit = [];
                                if (resArr[i].pic) {
                                    picSplit = resArr[i].pic.split(',');
                                }
                                let setOne = {
                                    id: resArr[i].id,
                                    topicId: resArr[i].topicId,
                                    title: resArr[i].title,
                                    topicName: resArr[i].topicName,
                                    content: resArr[i].content,
                                    createTime: resArr[i].createTime,
                                    replyTotal: resArr[i].replyTotal,
                                    viewTimes: resArr[i].viewTimes,
                                    zanTotal: resArr[i].zanTotal,
                                    picArr: picSplit,
                                    // userInfo: {
                                    // 	userId: resArr[i].userInfo[0].coUserId,
                                    // 	headImg: resArr[i].userInfo[0].headImg,
                                    // 	nickname: resArr[i].userInfo[0].nickname,
                                    // 	signature: resArr[i].userInfo[0].signature
                                    // }
                                };
                                this.dynamicList.push(setOne);
                            }
                        }

                        if (!res.data.hasNext) {
                            this.finished = true;
                            if (this.cardPageNum > 1) {
                                this.noMoreInfo = true;
                            }
                        } else {
                            this.finished = false;
                        }
                        if (this.dynamicList.length === 0) {
                            this.isGetCardList = false;
                        }
                        this.loading = false;
                        this.isRefresh = false;
                    })
                    .catch(err => {
                        if (this.dynamicList.length === 0) {
                            this.isGetCardList = false;
                        }
                        this.finished = true;
                        this.loading = false;
                        this.isRefresh = false;
                    });
            },
            recommendSortHot () {
                this.$http.TopicService.recommendSortHot(this.topicId, this.cardPageNum)
                    .then(res => {
                        let resArr = res.data.result;
                        if (resArr) {
                            for (let i = 0; i < resArr.length; i++) {
                                let picSplit = [];
                                if (resArr[0].pic) {
                                    picSplit = resArr[0].pic.split(',');
                                }
                                let setOne = {
                                    id: resArr[i].id,
                                    topicId: resArr[i].topicId,
                                    title: resArr[i].title,
                                    topicName: resArr[i].topicName,
                                    content: resArr[i].content,
                                    createTime: resArr[i].createTime,
                                    replyTotal: resArr[i].replyTotal,
                                    viewTimes: resArr[i].viewTimes,
                                    zanTotal: resArr[i].zanTotal,
                                    picArr: picSplit,
                                    // userInfo: {
                                    // 	userId: resArr[i].userInfo[0].coUserId,
                                    // 	headImg: resArr[i].userInfo[0].headImg,
                                    // 	nickname: resArr[i].userInfo[0].nickname,
                                    // 	signature: resArr[i].userInfo[0].signature
                                    // }
                                };
                                this.dynamicList.push(setOne);
                            }
                        }

                        if (!res.data.hasNext) {
                            this.finished = true;
                        }
                        if (this.dynamicList.length === 0) {
                            this.isGetCardList = false;
                        }
                        this.loading = false;
                        this.isRefresh = false;
                    })
                    .catch(err => {
                        if (this.dynamicList.length === 0) {
                            this.isGetCardList = false;
                        }
                        this.finished = true;
                        this.loading = false;
                        this.isRefresh = false;
                    });
                // .then(res => {
                // 	let resArr = res.data.result;
                // 	if (!resArr) {
                // 		this.finished = true;
                // 		return;
                // 	} else {
                // 		for (let i = 0; i < resArr.length; i++) {
                // 			let setOne = {
                // 				id: resArr[i].id,
                // 				topicId: resArr[i].topicId,
                // 				title: resArr[i].title,
                // 				topicName: resArr[i].topicName,
                // 				content: resArr[i].content,
                // 				createTime: resArr[i].createTime,
                // 				replyTotal: resArr[i].replyTotal,
                // 				viewTimes: resArr[i].viewTimes,
                // 				zanTotal: resArr[i].zanTotal,
                // 				picArr: resArr[i].pic.split(','),
                // 				userInfo: {
                // 					userId: resArr[i].userInfo[0].coUserId,
                // 					headImg: resArr[i].userInfo[0].headImg,
                // 					nickname: resArr[i].userInfo[0].nickname,
                // 					signature: resArr[i].userInfo[0].signature
                // 				}
                // 			};
                // 			this.cardList.push(setOne);
                // 		}
                // 		if (resArr.length < 5) {
                // 			this.finished = true;
                // 		}
                // 	}
                // 	this.loading = false;
                // 	this.isRefresh = false;
                // })
                // .catch(err => {
                // 	if (err.code === '-1') {
                // 		this.loading = false;
                // 		this.isRefresh = false;
                // 		this.finished = true;
                // 		this.noCardList = '暂无数据';
                // 		this.isShowCardList = true;
                // 	}
                // });
            },
            changeCardList () {
                this.cardPageNum += 1;
                if (this.topicSort === 0) {
                    this.recommendSortNormal();
                } else {
                    this.recommendSortHot();
                }
            },
        },
        activated () {
            this.topicId = this.$route.params.id;
            this.currentTopic();
            // isUseCache为false时才重新刷新获取数据
            // 因为对list使用keep-alive来缓存组件，所以默认是会使用缓存数据的
            if (!this.$route.meta.isUseCache) {
                this.cardPageNum = 0;
                this.loading = true;
                this.dynamicList = []; // 清空原有数据
                this.recommendSortNormal(); // 这是我们获取数据的函数
            }
            this.$route.meta.isUseCache = false;
        },
        beforeRouteLeave (to, from, next) {
            if (to.name === 'detail') {
                from.meta.isUseCache = true;
            }
            // from.meta.isUseCache = true;
            next();
        }
    };
</script>

<style lang="scss" scoped>
    .top-img {
        width: 100%;
        height: 280px;
        margin-bottom: 20px;
        img {
            width: 100%;
            height: 100%;
            vertical-align: top;
        }
    }

    .tab-group {
        display: flex;
        align-items: center;
        .tab-middle-line {
            height: 30px;
            width: 1PX;
            background-color: $border;
            margin: 0 25px;
        }

    }

    .tab-dynamic {
        font-size: 30px;
        color: $text666;
        height: 90px;
        padding-left: 30px;
        border-bottom: 1PX solid $border;
        .tab-active {
            color: $main-blue;
        }
    }

    .dy-item-list {
        //padding: 0px 25px;
        //margin-bottom: 20px;
        background-color: #fff;
        .recommend-list {
            .recommend-item {
                padding: 44px 25px;
                border-bottom: 1PX solid $border;
                display: flex;
                justify-content: space-between;
                .item-img {
                    width: 240px;
                    height: 160px;
                    img {
                        width: 100%;
                        height: 100%;
                        vertical-align: top;
                    }
                }
                .item-con {
                    width: 434px;

                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .item-title {
                        line-height: 48px;
                        font-size: 28px;
                        color: $text-main;
                    }
                    .dy-talk-box {
                        .dy-read-info {
                            .talk-item {
                                margin-right: 36px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
