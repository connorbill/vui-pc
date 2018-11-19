<template>
    <div>
        <div class="dynamic-scroll">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                <div v-if="topThree.length > 0">
                    <van-swipe :autoplay="3000">
                        <van-swipe-item v-for="(item, index) in topThree" :key="index">
                            <!--<img class="banner-img" :src="item.img" alt="" @click="bannerLink(item.link)">-->
                            <div class="dynamic-top">
                                <div class="dy-top-left">

                                    <router-link :to="{ name: 'detail', params: { id: item.id }}">
                                        <div class="top-hot-word">{{item.title}}</div>
                                    </router-link>
                                    <!--<div class="top-hot-word">{{item.title}}</div>-->
                                    <!--<div class="top-hot-word">欢迎香粉前来了解选投</div>-->
                                    <div class="person-box flex-align-center">

                                        <router-link :to="{ name: 'post', params: { userId: item.userInfo.userId}}">
                                            <div class="person-head">
                                                <img v-if="item.userInfo.headImg" :src="item.userInfo.headImg" alt="">
                                                <img v-if="!item.userInfo.headImg"
                                                     src="../../assets/images/my/default_head.png" alt="">
                                            </div>
                                        </router-link>
                                        <router-link :to="{ name: 'post', params: { userId: item.userInfo.userId}}">
                                            <div class="person-name">{{item.userInfo.nickname}}</div>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="dy-top-right">
                                    <router-link :to="{ name: 'detail', params: { id: item.id }}">
                                        <img v-if="item.picArr.length > 0" :src="item.picArr[0]" alt="">
                                    </router-link>
                                </div>
                            </div>
                        </van-swipe-item>
                    </van-swipe>
                </div>
                <div class="dynamic-menu">
                    <div class="dynamic-list flex-between">
                        <router-link class="dy-item" :to="{ name: 'DyItem', params: { id: dynamicType[0].id}}">
                            <div class="menu-icon icon-home-a-day"></div>
                            <div class="menu-text">小A动态</div>
                        </router-link>
                        <router-link class="dy-item" :to="{ name: 'DyItem', params: { id: dynamicType[1].id}}">
                            <div class="dy-item">
                                <div class="menu-icon icon-home-zero-distance"></div>
                                <div class="menu-text">香粉零距离</div>
                            </div>
                        </router-link>
                        <a class="dy-item" href="https://m.qianxiangbank.com/qianXiangH5Ctrl/qxTimeList">
                            <div class="dy-item">
                                <div class="menu-icon icon-home-qx-time"></div>
                                <div class="menu-text">钱香时间</div>
                            </div>
                        </a>
                        <router-link class="dy-item" :to="{ name: 'DyItem', params: { id: dynamicType[3].id}}">
                            <div class="dy-item">
                                <div class="menu-icon icon-home-public-benefit"></div>
                                <div class="menu-text">钱香公益</div>
                            </div>
                        </router-link>
                        <!--<div class="dy-item">-->
                        <!--<div class="menu-icon icon-home-qx-time"></div>-->
                        <!--<div class="menu-text">钱香时间</div>-->
                        <!--</div>-->
                        <!--<div class="dy-item">-->
                        <!--<div class="menu-icon icon-home-public-benefit"></div>-->
                        <!--<div class="menu-text">钱香公益</div>-->
                        <!--</div>-->
                    </div>
                    <div class="dynamic-main flex-between">
                        <router-link class="dy-item" :to="{ name: 'DyItem', params: { id: dynamicType[4].id}}">
                            <div class="main-item">
                                <img src="../../assets/images/topic/banner_0.png" alt="">
                            </div>
                        </router-link>
                        <router-link class="dy-item" :to="{ name: 'DyItem', params: { id: dynamicType[5].id}}">
                            <div class="main-item">
                                <img src="../../assets/images/topic/icon_rect_big.png" alt="">
                            </div>
                        </router-link>
                        <!--<div class="main-item">-->
                        <!--<img src="../../assets/images/topic/banner_0.png" alt="">-->
                        <!--</div>-->
                        <!--<div class="main-item">-->
                        <!--<img src="../../assets/images/topic/icon_rect_big.png" alt="">-->
                        <!--</div>-->
                    </div>
                </div>
                <div class="hot-recommend">
                    <div class="hot-topics">
                        <div class="flex-between topic-top ">
                            <div class="flex-align-center topic-top-left ">
                                <div class="icon-hot icon-dynamic-recommend"></div>
                                <div class="icon-text">热门推荐</div>
                            </div>
                            <!--<div class="topic-top-right">换一批</div>-->
                        </div>
                    </div>
                    <div class="">
                        <van-list
                                v-model="loading"
                                :finished="finished"
                                :offset="300"
                                @load="recommendListPage"
                                :immediate-check="immediateCheck"
                        >
                            <!--<card-list :card-list="cardList" :show-hot-topic="showHotTopic" :topic-data="topicObj"></card-list>-->
                            <dynamic-card :recommend-list="dynamicList"></dynamic-card>
                        </van-list>
                        <div class="no-msg" v-if="!loading && dynamicList.length < 1  && !isRefresh">
                            <div class="icon-no-msg no-img-box"></div>
                            <div class="no-msg-text">暂无信息</div>
                        </div>
                        <div v-if="noMoreInfo" class="no-more-item flex-align-center">— 我可是有底线的 —</div>
                        <!--<div v-if="dynamicList.length < 1  && !loading" class="no-data">暂无数据</div>-->
                        <!--<div v-if="isShowCardList" class="no-data">{{noCardList}}</div>-->
                    </div>
                </div>
            </van-pull-refresh>
            <!--<div class="no-more-item flex-align-center">-->
            <!--— 我可是有底线的 —-->
            <!--</div>-->
        </div>


    </div>
</template>

<script>
    import { Swipe, SwipeItem, List, PullRefresh } from 'vant';
    import DynamicCard from '../../components/DynamicCardComponent';

    export default {
        name: 'DynamicList',
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
                active: 1,
                homeTopTab: ['热门', '钱香动态'],
                list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                topThree: [],
                noCardList: '',
                isShowCardList: false,
                cardPageSize: 10,
                cardPageNum: 0,
                // loading: false,
                // finished: false,
                // isRefresh: true,
                isRefresh: false,
                loading: false,
                immediateCheck: false,
                finished: false,
                dynamicList: [],
                isGetCardList: true,
                dynamicType: [
                    {
                        id: '101',
                        name: '小A一天'
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
        beforeRouteEnter (to, from, next) {
            next(gui => {
                gui.setTabStyle();
            });
        },
        methods: {
            setTabStyle () {
                // 钱香动态 tab设置高亮
                this.$store.commit('changeHomeNav', 1);
            },
            onRefresh () {
                // this.finished = false;
                this.noMoreInfo = false;
                this.getDynamicTopThree();
                this.recommendListPage('refresh');
            },
            changeTab: function (item, index) {
                // console.log(this.$route.path);
                if (item === 0) {
                    // if (this.$store.state.isBack) {
                    //     this.$router.replace(this.$route.path);
                    // } else {
                    //     this.$router.push('/home');
                    // }
                    this.$router.replace('/home');
                    this.$store.commit('changeBottomNav', '/home');
                } else {
                    // if (this.$store.state.isBack) {
                    //     this.$router.replace(this.$route.path);
                    // } else {
                    //     this.$router.push('/home');
                    // }
                    this.$router.replace('/home/dynamic');
                    this.$store.commit('changeBottomNav', '/home/dynamic');
                }
            },
            getDynamicTopThree () {
                this.topThree.splice(0);
                this.$http.HomeHotService.getDynamicTopThree()
                    .then(res => {
                        let resArr = res.data;
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
                                userInfo: {
                                    userId: resArr[i].userInfo[0].coUserId,
                                    headImg: resArr[i].userInfo[0].headImg,
                                    nickname: resArr[i].userInfo[0].nickname,
                                    signature: resArr[i].userInfo[0].signature
                                }
                            };
                            this.topThree.push(setOne);
                        }
                        // if (this.cardPageSize > 13){
                        //     this.topThree.length = 2;
                        // }
                    })
                    .catch(err => {
                        this.topThree = [];
                    });
            },
            recommendListPage (refresh) {
                if (refresh === 'refresh') {
                    // efresh传值1表示刷新数据
                    this.cardPageNum = 0;
                }
                this.cardPageNum++;
                this.$http.HomeHotService.recommendListPage(this.cardPageNum)
                    .then(res => {
                        if (refresh === 'refresh') {
                            this.dynamicList.splice(0);
                        }
                        let resArr = res.data.result;
                        if (resArr) {
                            for (let i = 0; i < resArr.length; i++) {
                                let picSplit = [];
                                if (resArr[i].pic) {
                                    picSplit = resArr[i].pic.split(',');
                                }
                                let isLike = false;
                                if (resArr[i].hasZan === 1) {
                                    isLike = true;
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
                                    isLike: isLike
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
            changeRecommendList (refresh) {
                this.recommendListPage(refresh);
            }
        },
        activated () {
            this.getDynamicTopThree();
            // isUseCache为false时才重新刷新获取数据
            // 因为对list使用keep-alive来缓存组件，所以默认是会使用缓存数据的
            if (!this.$route.meta.isUseCache) {
                this.dynamicList = [];
                this.loading = true;
                this.changeRecommendList('refresh');
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
    @import "../../assets/style/home/dynamic.scss";

    /deep/ .dynamic-scroll .van-swipe__indicators {
        right: 0.3rem;
        bottom: .5rem;
        left: auto;
    }

    /deep/ .van-swipe__indicator {
        background-color: #ffffff;
        width: 12px;
        height: 12px;
        border: 1PX solid #97bff9;

        &.van-swipe__indicator--active {
            background-color: #97bff9;
        }
    }
</style>
