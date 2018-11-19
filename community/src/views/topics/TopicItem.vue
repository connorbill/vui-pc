<template>
    <div class="topic-item">
        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
            <div class="topic-item-banner icon-blue-bg">
                <div class="item-name">{{topicName}}</div>
                <div class="item-num">{{topicJoinNumber}}人参与</div>
            </div>
            <div class="stick-list" v-if="topicTopThree.length > 0">
                <div class="stick-item" v-for="(item, index) in topicTopThree" :key="index">
                    <div class="stick-btn">置顶</div>
                    <router-link :to="{ name: 'detail', params: { id: item.id }}">
                        <div class="stick-content overflow-word">{{item.title}}</div>
                    </router-link>
                </div>
            </div>
            <div class="select-sort-box  tab-group">
                <div @click="getTopicType(0)" :class="topicSort == 0 ? 'active' : ''" class="select-sort-item">全部</div>
                <div class="tab-middle-line"></div>
                <div @click="getTopicType(1)" :class="topicSort == 1 ? 'active' : ''" class="select-sort-item">精华</div>
            </div>
            <div class="hot-list-box">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        :offset="300"
                        @load="moreCardList"
                        :immediate-check="immediateCheck"
                >
                    <card-list :card-list="cardList" :show-hot-topic="isShowHotDiscussion" :page="this.cardPageNum"
                               v-on:child-by-value="doLikePost"></card-list>
                </van-list>
                <div class="no-msg" v-if="cardList.length < 1  && !loading && !isRefresh">
                    <div class="icon-no-msg no-img-box"></div>
                    <div class="no-msg-text">暂无信息</div>
                </div>
                <div v-if="noMoreInfo" class="no-more-item flex-align-center">— 我可是有底线的 —</div>
            </div>

        </van-pull-refresh>
        <router-link class="post-message-btn icon-post-message" to="/compose"></router-link>
    </div>
</template>

<script>
    import CardList from '../../components/CardWrapComponent';
    import { List, PullRefresh, Toast } from 'vant';
    import { commonFunction } from '../../common/CommonFunction';

    export default {
        name: 'TopicItemDetail',
        components: {
            CardList,
            [List.name]: List,
            [PullRefresh.name]: PullRefresh,
            [Toast.name]: Toast
        },
        data () {
            return {
                noMoreInfo: false,
                cardArr: [],
                topicObj: {
                    show: false
                },
                showHotTopic: false,
                topicType: [],
                noCardList: '',
                isShowCardList: false,
                cardPageSize: 10,
                cardPageNum: 0,
                topicId: '',
                topicTopThree: [],
                topicName: '',
                topicJoinNumber: 0,
                topicSort: 0,
                cardList: [],
                immediateCheck: false,
                loading: false,
                loadingNextPage: true,
                finished: false,
                isRefresh: false,
                isShowHotDiscussion: false,
                isGetCardList: true
            };
        },
        created () {
            this.topicId = this.$route.params.topicId;
        },
        methods: {
            onRefresh () {
                // this.cardList = [];
                // this.isShowCardList = false;
                // this.loading = true;
                // this.cardPageNum = 0;
                // this.finished = false;
                this.noMoreInfo = false;
                this.getSubTitle();
                this.getNumberByTopic();
                this.getTopicTopThree();
                this.moreCardList('refresh');
            },
            getTopicType (type) {
                this.topicSort = type;
                this.cardPageNum = 0;
                this.loading = true;
                this.cardList = [];
                this.onRefresh();
            },
            getSubTitle () {
                this.$http.TopicService.getSubTitle()
                    .then(res => {
                        let resData = res.data;
                        for (let i = 0; i < resData.length; i++) {
                            if (resData[i].id == this.topicId) {
                                this.topicName = resData[i].name;
                                commonFunction.setPageTitle(resData[i].name);
                            }
                        }
                    })
                    .catch(err => {
                        // this.noticeArr = [];
                    });
            },
            getNumberByTopic () {
                this.$http.TopicService.getNumberByTopic(this.topicId)
                    .then(res => {
                        this.topicJoinNumber = res.data;
                    })
                    .catch(err => {
                        // this.noticeArr = [];
                    });
            },
            getTopicTopThree () {
                this.$http.TopicService.getTopicTopThree(this.topicId)
                    .then(res => {
                        this.topicTopThree.splice(0);
                        let resData = res.data;
                        for (let i = 0; i < resData.length; i++) {
                            let top = {
                                id: resData[i].id,
                                title: resData[i].title,
                                topicName: resData[i].topicName,
                                topicId: resData[i].topicId
                            };
                            this.topicTopThree.push(top);
                        }
                    })
                    .catch(err => {
                        // this.noticeArr = [];
                    });
            },
            recommendSortNormal (refresh) {
                if (refresh === 'refresh') {
                    // page传值0表示刷新数据
                    this.cardPageNum = 0;
                }
                this.cardPageNum++;
                if (!this.loadingNextPage) return;
                this.loadingNextPage = false;
                this.$http.TopicService.recommendSortNormal(this.topicId, this.cardPageNum)
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
                        this.loadingNextPage = true;
                        this.isRefresh = false;
                    })
                    .catch(err => {
                        if (this.cardList.length === 0) {
                            this.isGetCardList = false;
                        }
                        this.finished = true;
                        this.loading = false;
                        this.loadingNextPage = true;
                        this.isRefresh = false;
                    });
            },
            recommendSortHot (refresh) {
                if (refresh === 'refresh') {
                    // page传值0表示刷新数据
                    this.cardPageNum = 0;
                }
                this.cardPageNum++;
                this.$http.TopicService.recommendSortHot(this.topicId, this.cardPageNum)
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
                        this.loadingNextPage = true;
                    })
                    .catch(err => {
                        if (this.cardList.length === 0) {
                            this.isGetCardList = false;
                        }
                        this.finished = true;
                        this.loading = false;
                        this.isRefresh = false;
                        this.loadingNextPage = true;
                    });
            },
            moreCardList (refresh) {
                // refresh 实现的效果是列表不为空，等加载完之后更新列表数据
                // this.cardPageNum = 0;this.loading = true; 实现的效果是列表加载第一页，并显示loading圈
                if (this.topicSort === 0) {
                    this.recommendSortNormal(refresh);
                } else {
                    this.recommendSortHot(refresh);
                }
            },
            doLikePost (postId, index) {
                if (!localStorage.getItem('token')) {
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
            }
        },
        activated () {
            this.getSubTitle();
            this.getNumberByTopic();
            this.getTopicTopThree();
            // isUseCache为false时才重新刷新获取数据
            // 因为对list使用keep-alive来缓存组件，所以默认是会使用缓存数据的
            if (!this.$route.meta.isUseCache) {
                this.topicSort = 0;
                this.cardList = [];
                this.cardPageNum = 0;
                this.loading = true;
                this.moreCardList();
            }
            this.$route.meta.isUseCache = false;
        },
        beforeRouteLeave (to, from, next) {
            if (to.name === 'detail' || to.name === 'post') {
                from.meta.isUseCache = true;
            }
            if (to.name === 'topics') {
                commonFunction.setPageTitle(to.meta.navTopTitle);
            }
            // from.meta.isUseCache = true;
            next();
        }
    };
</script>

<style lang="scss" scoped>
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

    .topic-item-banner {
        width: 100%;
        height: 220px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        color: #fff;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 20px;

        .item-name {
            font-size: 50px;
            font-weight: 600;
        }

        .item-num {
            font-size: 28px;
            margin-top: 30px;
        }
    }

    .stick-list {
        padding: 33px 25px;
        background-color: #fff;
        margin-bottom: 20px;

        .stick-item {
            margin-bottom: 28px;
            display: flex;
            align-items: center;
            &:last-child {
                margin-bottom: 0;
            }

            .stick-btn {
                padding: 10px 15px;
                /*min-height: 40px;*/
                /*width: 70px;*/
                /*line-height: 40px;*/
                color: $main-blue;
                border: 1PX solid $main-blue;
                font-size: 20px;
                text-align: center;
                border-radius: 3px;
            }

            .stick-content {
                font-size: 26px;
                margin-left: 27px;
                max-width: 600px;
                color: #333;
            }
        }
    }

    .select-sort-box {
        display: flex;
        /*margin-bottom: .1rem;*/
        padding: .3rem;
        font-size: .34rem;
        background-color: #ffffff;
        border-bottom: 1PX solid #e0e0e0;
        .select-sort-item {
            /*margin-right: .3rem;*/
            &.active {
                color: $main-blue;
            }
        }

    }
</style>
