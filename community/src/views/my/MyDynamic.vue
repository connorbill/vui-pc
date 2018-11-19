<template>
    <div class="my-dynamic">
        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    :offset="300"
                    @load="getMyPost"
                    :immediate-check="immediateCheck"
            >
                <card-list :card-list="cardList" :show-hot-topic="isShowHotDiscussion"
                           :page="this.cardPageNum" v-on:child-by-value="doLikePost"></card-list>
            </van-list>
            <div class="no-msg" v-if="cardList.length < 1  && !isRefresh && !loading">
                <div class="icon-no-msg no-img-box"></div>
                <div class="no-msg-text">暂无信息</div>
            </div>
            <div v-if="noMoreInfo" class="no-more-item flex-align-center">— 我可是有底线的 —</div>
        </van-pull-refresh>
        <!--<div v-if="!isGetCardList && cardList.length < 1 && !isRefresh" class="no-data">暂无数据</div>-->
        <!--<div v-if="cardList.length > 1 &&  finished" class="no-more-item flex-align-center">— 我可是有底线的 —</div>-->
    </div>
</template>

<script>
    import { List, Cell, PullRefresh, Toast } from 'vant';
    import CardList from '../../components/CardWrapComponent';

    export default {
        name: 'MyDynamic',
        components: {
            CardList,
            [List.name]: List,
            [Cell.name]: Cell,
            [PullRefresh.name]: PullRefresh,
            [Toast.name]: Toast
        },
        data () {
            return {
                noMoreInfo: false,
                userId: '',
                id: '',
                showHotTopic: false,
                topicObj: '',
                cardList: [],
                cardPageSize: 10,
                cardPageNum: 0,
                loading: false,
                immediateCheck: false,
                finished: false,
                isRefresh: false,
                isShowHotDiscussion: false,
                topicType: [],
                noCardList: '',
                isGetCardList: true,
                topicId: '',
                topicTopThree: [],
                topicName: '',
                topicJoinNumber: 0,
                topicSort: 0
            };
        },
        created () {
            this.userId = this.$route.params.userId;
            // this.getMyPost();
        },
        methods: {

            onRefresh () {
                // this.finished = false;
                this.getMyPost('refresh');
            },
            changeCardList () {
                this.getMyPost();
            },
            getMyPost (refresh) {
                if (refresh === 'refresh') {
                    // page传值0表示刷新数据
                    this.cardPageNum = 0;
                }
                this.cardPageNum++;
                this.$http.MyService.getMyPost(this.userId, this.cardPageNum)
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
                    })
                    .catch(err => {
                        if (this.cardList.length === 0) {
                            this.isGetCardList = false;
                        }
                        this.finished = true;
                        this.loading = false;
                        this.isRefresh = false;
                    });
            },
            doLikePost (postId, index) {
                this.$http.DetailService.doLikePost(postId)
                    .then(res => {
                        // this.card.isLike = true;
                        // this.card.zanTotal += 1;
                        let zanTo = this.cardList[index].zanTotal + 1;
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
            // isUseCache为false时才重新刷新获取数据
            // 因为对list使用keep-alive来缓存组件，所以默认是会使用缓存数据的
            if (!this.$route.meta.isUseCache) {
                this.cardList = [];
                this.cardPageNum = 0;
                this.loading = true;
                this.changeCardList(); // 这是我们获取数据的函数
            }
            this.$route.meta.isUseCache = false;
        },
        beforeRouteLeave (to, from, next) {
            if (to.name === 'detail' || to.name === 'DyItem' || to.name === 'TopicItem') {
                from.meta.isUseCache = true;
            }
            // from.meta.isUseCache = true;
            next();
        }
    };
</script>

<style scoped>

</style>
