<template>
    <div>
        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
            <div class="swipe-box" v-show="homeSwiperArr.length > 0">
                <van-swipe :autoplay="3000">
                    <van-swipe-item v-for="(item, index) in homeSwiperArr" :key="index">
                        <img class="banner-img" :src="item.img" alt="" @click="toBannerLink(item.link)">
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="normal-question" v-if="noticeArr.length > 0">
                <div class="normal-item normal-item-bottom" v-for="(item, index) of noticeArr" :key="index">
                    <div class="notice-left">
                        【<span class="link">{{item.topicName}}</span>】
                        <!--<a class="overflow-word question-width" :href="item.link">{{item.title}}</a>-->
                        <router-link :to="{ name: 'detail', params: { id: item.id }}">
                            <span class="overflow-word question-width">{{item.title}}</span>
                        </router-link>
                    </div>
                    <span>{{item.createTime | datafmt('MM-DD') }}</span>
                </div>
            </div>
            <div class="hot-list-box">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        :offset="300"
                        @load="getHomeCardList"
                        :immediate-check="immediateCheck"
                >
                    <card-list :card-list="cardList" :show-hot-topic="showHotTopic" :page="cardPageNum"
                               v-on:child-by-value="doLikePost"></card-list>
                </van-list>
                <div class="no-msg" v-if="!loading && cardList.length < 1  && !isRefresh">
                    <div class="icon-no-msg no-img-box"></div>
                    <div class="no-msg-text">暂无信息</div>
                </div>
                <div v-if="noMoreInfo" class="no-more-item flex-align-center">— 我可是有底线的 —</div>
            </div>
            <!--v-on:change-hot-topic="changeTopicObj"
                                   v-on:change-card-list="changeCardList"-->
        </van-pull-refresh>
        <router-link class="post-message-btn icon-post-message compose" to="/compose"></router-link>
        <!--<van-loading  color="white" class="fixed-middle-center demo-loading" v-if="loading"/>-->
    </div>
</template>

<script>
    import { Swipe, SwipeItem, List, Cell, PullRefresh, Toast, Loading } from 'vant';
    import CardList from '../../components/CardWrapComponent';
    import { commonFunction } from '../../common/CommonFunction';

    export default {
        name: 'HomeHot',
        components: {
            CardList,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [List.name]: List,
            [Cell.name]: Cell,
            [PullRefresh.name]: PullRefresh,
            [Toast.name]: Toast,
            [Loading.name]: Loading
        },
        data () {
            return {
                // isLoadingPage: false,
                noMoreInfo: false,
                id: '',
                name: '',
                count: 0,
                activeName: 'first',
                cardList: [],
                topicObj: '',
                showHotTopic: true,
                homeSwiperArr: [],
                noticeArr: [],
                hotPageSize: 3,
                hotPageNum: 1,
                cardPageSize: 10,
                cardPageNum: 0,
                isRefresh: false,
                loading: false,
                immediateCheck: false,
                loadingNextPage: false,
                finished: false,
                list: [],
                isGetCardList: true,
                isUp: true // 是否向上滑
            };
        },
        beforeRouteEnter (to, from, next) {
            next(gui => {
                gui.setData();
            });
        },
        methods: {
            onRefresh () {
                // this.finished = false;
                this.noMoreInfo = false;
                this.getBanner();
                this.getNormalQuestion();
                this.getHomeCardList('refresh');
            },
            setData () {
                // 设置 顶部热门与动态 tab 高亮
                this.$store.commit('changeHomeNav', 0);
            },
            getBanner () {
                this.homeSwiperArr.splice(0);
                this.$http.HomeHotService.getHomeBanner()
                    .then(res => {
                        for (let i = 0; i < res.data.length; i++) {
                            this.homeSwiperArr.push(res.data[i]);
                        }
                    })
                    .catch(err => {
                        this.homeSwiperArr.splice(0);
                    });
            },
            getNormalQuestion () {
                this.$http.HomeHotService.getNormalQuestion()
                    .then(res => {
                        this.noticeArr.splice(0);
                        for (let i = 0; i < res.data.length; i++) {
                            this.noticeArr.push(res.data[i]);
                        }
                    })
                    .catch(err => {
                        this.noticeArr.splice(0);
                    });
            },
            getHomeCardList (refresh) {
                if (refresh === 'refresh') {
                    // isRefresh传值1表示刷新数据
                    this.cardPageNum = 0;
                }
                // if (this.loadingNextPage) return;
                // this.loadingNextPage = true;
                this.cardPageNum++;
                this.$http.HomeHotService.getCardList(this.cardPageNum)
                    .then(res => {
                        if (refresh === 'refresh') {
                            // 传值1表示刷新数据
                            this.cardList.splice(0);
                        }
                        let resArr = res.data.result;
                        if (resArr) {
                            for (let i = 0; i < resArr.length; i++) {
                                let picSplit = [];
                                if (resArr[i].pic) {
                                    picSplit = resArr[i].pic.split(',');
                                }
                                let likeTextArr = [];
                                if (resArr[i].likeText) {
                                    likeTextArr = resArr[i].likeText.split(',');
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
                                    listCoPostLike: resArr[i].listCoPostLike,
                                    isLike: isLike,
                                    likeText: likeTextArr,
                                    userInfo: {
                                        coUserId: resArr[i].userInfo[0].coUserId,
                                        headImg: resArr[i].userInfo[0].headImg,
                                        nickname: resArr[i].userInfo[0].nickname,
                                        signature: resArr[i].userInfo[0].signature
                                    }
                                };
                                this.cardList.push(setOne);
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
                        if (this.cardList.length === 0) {
                            this.isGetCardList = false;
                        }
                        this.loading = false;
                        this.isRefresh = false;
                        // this.loadingNextPage = false;
                    })
                    .catch(err => {
                        if (this.cardList.length === 0) {
                            this.isGetCardList = false;
                        }
                        this.finished = true;
                        this.loading = false;
                        this.isRefresh = false;
                        // this.showHotTopic = false;
                        // this.loadingNextPage = false;
                    });
            },
            doLikePost (postId, index) {
                if (!commonFunction.hasLogin()) {
                    commonFunction.toLogin();
                    return;
                }
                this.$http.DetailService.doLikePost(postId)
                    .then(res => {
                        // this.card.isLike = true;
                        // this.card.zanTotal += 1;
                        // let zanTo = this.cardList[index].zanTotal + 1;
                        this.$set(this.cardList[index], 'isLike', true);
                        this.$set(this.cardList[index], 'zanTotal', res.data);
                    })
                    .catch(err => {
                        if (err.code === '000001') {
                            // this.showTip('已点过赞了');
                            Toast({
                                message: '已点过赞了', duration: 1000, forbidClick: true
                            });
                        }
                    });
            },
            toBannerLink (str) {
                window.location.href = str;
            }
        },
        activated () {
            this.getBanner();
            this.getNormalQuestion();
            // isUseCache为false时才重新刷新获取数据
            // 因为对getCardList使用keep-alive来缓存组件，所以默认是会使用缓存数据的
            if (!this.$route.meta.isUseCache) {
                this.cardPageNum = 0;
                this.cardList = [];
                this.loading = true;
                this.getHomeCardList('refresh');
            }
            this.$route.meta.isUseCache = false;
        },
        beforeRouteLeave (to, from, next) {
            if (to.name === 'detail' || to.name === 'post' || to.name === 'DyItem' || to.name === 'TopicItem') {
                from.meta.isUseCache = true;
            }
            // from.meta.isUseCache = true;
            next();
        }
    };
</script>

<style lang="scss" scoped>
    /deep/ .van-swipe__indicator {
        background-color: #ffffff;
        width: 12px;
        height: 12px;
        border: 1PX solid #97bff9;

        &.van-swipe__indicator--active {
            background-color: #97bff9;
        }
    }

    .notice-left {
        display: flex;
    }
</style>
