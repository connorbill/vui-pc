<template>
    <div class="scroll-message">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    :offset="300"
                    @load="changeCardList"
            >
                <div class="hot-item " v-for="(item, index) in cardList" :key="index">
                    <div class="person-info hot-person-info">
                        <div class="person-left">
                            <router-link :to="{ name: 'post', params: { userId: item.userInfo.userId}}">
                                <div class="info-head">
                                    <img v-if="item.userInfo.headImg" :src="item.userInfo.headImg" alt="">
                                    <img v-if="!item.userInfo.headImg" src="../../assets/images/my/default_head.png" alt="">
                                </div>
                            </router-link>
                            <div class="info-simple">
                                <div class="info-name">
                                    <router-link :to="{ name: 'post', params: { userId: item.userInfo.userId }}">
                                        <div class="name-word">
                                            {{item.userInfo.nickname}}
                                        </div>
                                    </router-link>
                                </div>
                                <div class="info-time">{{item.createTime | datafmt('YYYY-MM-DD HH:mm')}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="person-con">
                        <div class="con-detail m-text-to-me">
                            赞了我的{{item.postReplyId > 0 ? '评论' : '帖子'}}
                        </div>
                    </div>
                    <div class="show-talk">
                        <div class="show-three-talk">
                            <!--<router-link :to="{ name: 'detail', params: { id: item.postId }}">-->
                                <div class="show-talk-item">
                                    <div v-if="item.postReplyId < 1" class="talk-word overflow-word">{{item.title}}</div>
                                    <div v-if="item.postReplyId > 0" class="talk-word overflow-word">{{item.content}}</div>
                                </div>
                            <!--</router-link>-->
                        </div>
                    </div>
                </div>
            </van-list>
            <div class="no-msg" v-if="cardList.length < 1  && !isLoading && !loading">
                <div class="icon-no-msg no-img-box"></div>
                <div class="no-msg-text">暂无信息</div>
            </div>
            <div v-if="noMoreInfo" class="no-more-item flex-align-center">— 我可是有底线的 —</div>
        </van-pull-refresh>
    </div>
</template>

<script>
    import { List, PullRefresh } from 'vant';

    export default {
        name: 'NotificationLike',
        components: {
            [List.name]: List,
            [PullRefresh.name]: PullRefresh
        },
        data () {
            return {
                noMoreInfo: false,
                active: 0,
                homeTopTab: ['评论', '点赞'],
                replayPage: 0,
                loading: false,
                finished: false,
                isLoading: true,
                isGetCardList: true,
                cardList: [],
                cardPageNum: 0
            };
        },
        methods: {
            onRefresh () {
                this.cardList = [];
                this.cardPageNum = 1;
                // this.finished = false;
                this.loading = false;
                this.getCardList();
            },
            changeCardList () {
                this.cardPageNum += 1;
                this.getCardList();
            },
            getCardList () {
                this.$http.MyService.getMyLike(this.cardPageNum)
                    .then(res => {
                        let resArr = res.data.result;
                        if (resArr) {
                            for (let i = 0; i < resArr.length; i++) {
                                // let picSplit = [];
                                // if (resArr[i].pic) {
                                //     picSplit = resArr[i].pic.split(',');
                                // }
                                let setOne = {
                                    id: resArr[i].id,
                                    postId: resArr[i].postId,
                                    title: resArr[i].title,
                                    topicName: resArr[i].topicName,
                                    content: resArr[i].content,
                                    content2: resArr[i].content2,
                                    createTime: resArr[i].createTime,
                                    // replyTotal: resArr[i].replyTotal,
                                    // viewTimes: resArr[i].viewTimes,
                                    // zanTotal: resArr[i].zanTotal,
                                    // picArr: picSplit,
                                    // replayReply: false,
                                    postReplyId: resArr[i].postReplyId,
                                    userInfo: {
                                        userId: resArr[i].userInfo[0].id,
                                        headImg: resArr[i].userInfo[0].headImg,
                                        nickname: resArr[i].userInfo[0].nickname
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
                        }
                        if (this.cardList.length === 0) {
                            this.isGetCardList = false;
                        }
                        this.loading = false;
                        this.isLoading = false;
                    })
                    .catch(err => {
                        if (this.cardList.length === 0) {
                            this.isGetCardList = false;
                        }
                        this.finished = true;
                        this.loading = false;
                        this.isLoading = false;
                    });
            }
        }
    };
</script>

<style lang="scss" scope>
    .scroll-message {
        .mt-20 {
            margin-top: 20px;
        }

        .hot-item {
            padding-bottom: 25px;


        }

        .person-con .m-text-to-me {
            color: $text-main;
            font-size: 30px;
        }

        .show-talk {
            margin-top: 25px;

            .talk-word {
                flex: 1;
            }
        }

        .chat-to {
            border-radius: 2PX;
            border: 1PX solid $border;
            font-size: 26px;
            color: $text666;
            width: 108px;
            height: 44px;
            line-height: 42px;
            text-align: center;
        }

        /deep/ .van-tabs--line .van-tabs__wrap {
            border-bottom: 0;

        }

    }
</style>
