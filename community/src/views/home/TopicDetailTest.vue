<template>
    <div class="content-detail">
        <div>
            <div class="article-top">
                <div class="person-info article-person-info">
                    <div class="person-left">
                        <router-link :to="{ name: 'post', params: { userId: card.coUserId }}">
                            <div class="info-head">
                                <img v-if="card.headImg" :src="card.headImg" alt="">
                                <img v-if="!card.headImg" src="../../assets/images/my/default_head.png" alt="">
                            </div>
                        </router-link>
                        <div class="info-simple">
                            <div class="info-name">
                                <router-link :to="{ name: 'post', params: { userId: card.coUserId }}">
                                    <div class="name-word">
                                        {{card.nickname}}
                                    </div>
                                </router-link>
                                <!--<div class="name-word">{{card.nickname}}</div>-->
                                <!--<div class="name-type">{{card.signature}}</div>-->
                            </div>
                            <div class="info-time">{{card.createTime | datafmt('YYYY-MM-DD HH:mm:ss')}}</div>
                        </div>
                    </div>
                    <!--<div class="info-follow">-->
                    <!--+关注-->
                    <!--</div>-->
                </div>
            </div>
            <div class="article-center">
                <div class="article-title">{{card.title}}</div>
                <div class="flex-between article-talk-box">
                    <div class="person-talk article-read-info">
                        <div class="talk-item">
                            <span class="talk-icon look-normal-icon icon-look-num"></span>
                            <span class="talk-number ">{{card.viewTimes}}</span>
                        </div>
                        <div class="talk-item">
                            <span class="talk-icon  talk-normal-icon icon-talk-num"></span>
                            <!--{{card.replyTotal}}-->
                            <span class="talk-number ">{{card.replyTotal}}</span>
                        </div>
                        <div class="talk-item" @click="doLikePost(card.id)">
                            <span class="talk-icon like-normal-iocn "
                                  :class="card.isLike ? 'icon-like-num-active' : 'icon-like-num' "
                            ></span>
                            <span class="talk-number "
                                  :class="card.isLike ? 'active' : '' "
                            >
                                {{card.zanTotal}}
                            </span>
                        </div>
                    </div>
                    <div class="platform-announcement" v-if="card.topicId > 10">
                        <router-link :to="{ name: 'TopicItem', params: {topicId: card.topicId}}">{{card.topicName}}
                        </router-link>
                    </div>
                </div>
                <div class="article-section">
                    <div  class="vhtml-con">
                        <!---->
                        <div v-html="card.content"></div>
                    </div>
                    <div class="person-con" v-if="card.picArr.length > 0">
                        <div class="con-img-box topic-detail-box">
                            <div class="con-detail-img" v-for="(img, index) in card.picArr"
                                 :key="index">
                                <div class="m-img-box">
                                    <img :src="img" alt="" @click="showBigPicture(card.picArr, index)">
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="other-article" v-show="preNextTopic.pre.length !== 0 || preNextTopic.next.length !== 0">
                <div class="pre-article article-other-item" v-if="preNextTopic.pre.length > 0">
                    <span class="article-left">上一篇：</span>
                    <!--<router-link :to="{ name: 'detail', params: { id: preNextTopic.pre[0].id }}">-->
                    <!--<span class="article-right">{{preNextTopic.pre[0].title}}</span>-->
                    <!--</router-link>-->
                    <span class="article-right"
                          @click="goOtherDetail(preNextTopic.pre[0].id)">{{preNextTopic.pre[0].title}}</span>
                </div>
                <div class="next-article article-other-item" v-if="preNextTopic.next.length > 0">
                    <span class="article-left">下一篇：</span>
                    <span class="article-right" @click="goOtherDetail(preNextTopic.next[0].id)">{{preNextTopic.next[0].title}}</span>
                    <!--<router-link :to="{ name: 'detail', params: { id: preNextTopic.next[0].id }}">-->
                    <!--<span class="article-right" @click="goOtherDetail(preNextTopic.next[0].id)">{{preNextTopic.next[0].title}}</span>-->
                    <!--</router-link>-->
                </div>
            </div>

            <div class="topic-main-hot" v-if="hotReply.length > 0">
                <div class="flex-between topic-top ">
                    <div class="flex-align-center topic-top-left ">
                        <div class="icon-hot icon-gread-replay"></div>
                        <div class="icon-text">精彩评论</div>
                    </div>
                </div>
                <div class="splendid">
                    <div class="hot-item" v-for="(item, index) in hotReply" :key="index">
                        <div class="person-info hot-person-info">
                            <div class="person-left">
                                <!--<div class="info-head">-->
                                <!--<img src="../../assets/logo.png" alt="">-->
                                <!--</div>-->
                                <router-link :to="{ name: 'post', params: { userId: item.userInfo.coUserId }}">
                                    <div class="info-head">
                                        <img v-if="item.userInfo.headImg" :src="item.userInfo.headImg" alt="">
                                        <img v-if="!item.userInfo.headImg" src="../../assets/images/my/default_head.png"
                                             alt="">
                                    </div>
                                </router-link>
                                <div class="info-simple flex-align-center">
                                    <div class="info-name">
                                        <!--<div class="name-word">喝咯</div>-->
                                        <router-link :to="{ name: 'post', params: { userId: item.userInfo.coUserId }}">
                                            <div class="name-word">
                                                {{item.userInfo.nickname}}
                                            </div>
                                        </router-link>
                                        <!--<div class="name-type">湘妹子</div>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="person-con">
                            <div class="con-detail  content-detail-word"
                                 @click="selectReplayObj(item.id, item.userInfo.nickname)"
                            >
                                {{item.content}}
                            </div>
                        </div>
                        <div class="talk-and-admire flex-between">
                            <div class="other-talk-time">{{item.createTime | datafmt('YYYY-MM-DD HH:mm')}}</div>
                            <div class="other-talk-num">
                                <div class=" person-talk">
                                    <div class="talk-item"
                                         @click="selectReplayObj(item.id, item.userInfo.nickname)"
                                    >
                                        <span class="talk-icon  talk-normal-icon icon-talk-num"></span>
                                        <span class="talk-number "
                                        >{{item.replyTotal}}</span>
                                    </div>
                                    <div class="talk-item"
                                         @click="doLikeReplay(item.id, index, 1)"
                                    >
                                            <span class="talk-icon like-normal-iocn"
                                                  :class="item.isLike ? 'icon-like-num-active' : 'icon-like-num' "
                                            ></span>
                                        <span class="talk-number "
                                        >{{item.dianZanTotal | NumInt}}</span>
                                    </div>
                                </div>
                                <!--<div class=" person-talk">-->
                                <!--<div class="talk-item">-->
                                <!--<span class="talk-icon  talk-normal-icon icon-talk-num"></span>-->
                                <!--<span class="talk-number ">{{item.replyTotal}}</span>-->
                                <!--</div>-->
                                <!--<div class="talk-item">-->
                                <!--<span class="talk-icon like-normal-iocn icon-like-num"></span>-->
                                <!--<span class="talk-number ">{{item.dianZanTotal}}</span>-->
                                <!--</div>-->
                                <!--</div>-->
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="topic-main-hot">
                <div class="flex-between topic-top ">
                    <div class="flex-align-center topic-top-left ">
                        <div class="icon-hot icon-all-replay"></div>
                        <div class="icon-text">全部评论{{totalReply}}</div>
                    </div>
                </div>
                <div class="all-talk">
                    <van-list
                            v-model="loading"
                            :finished="finished"
                            :offset="500"
                            @load="changeReplyList"
                    >
                        <div v-if="allReply.length > 0">
                            <div class="hot-item" v-for="(item, index) in allReply" :key="index">
                                <div class="person-info hot-person-info">
                                    <div class="person-left">
                                        <!--<div class="info-head">-->
                                        <!--<img src="../../assets/logo.png" alt="">-->
                                        <!--</div>-->
                                        <router-link :to="{ name: 'post', params: { userId: item.userInfo.coUserId }}">
                                            <div class="info-head">
                                                <img v-if="item.userInfo.headImg" :src="item.userInfo.headImg" alt="">
                                                <img v-if="!item.userInfo.headImg"
                                                     src="../../assets/images/my/default_head.png"
                                                     alt="">
                                            </div>
                                        </router-link>
                                        <div class="info-simple flex-align-center">
                                            <div class="info-name">
                                                <router-link
                                                        :to="{ name: 'post', params: { userId: item.userInfo.coUserId }}">
                                                    <div class="name-word">
                                                        {{item.userInfo.nickname}}
                                                    </div>
                                                </router-link>
                                                <!--<div class="name-word">喝咯</div>-->
                                                <!--<div class="name-type">湘妹子</div>-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="person-con">
                                    <div class="con-detail  content-detail-word"
                                    >
                                        {{item.content}}
                                    </div>
                                    <!--<div class="show-three-talk" v-if="item.replyTotal > 0">-->
                                    <!--<div class="show-talk-item">-->
                                    <!--<div class="talk-word overflow-word"-->
                                    <!--@click="showReplayMore(item.id, item.userInfo.nickname)"-->
                                    <!--&gt;查看{{item.replyTotal}}条回复</div>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <div class="other-talk" v-if="item.replyTotal > 0">
                                        <div class="other-talk-info"
                                             @click="showReplayMore(item.id, item.userInfo.nickname)"
                                        >查看{{item.replyTotal}}条回复
                                        </div>
                                    </div>
                                </div>
                                <div class="talk-and-admire flex-between">
                                    <div class="other-talk-time">{{item.createTime | datafmt('YYYY-MM-DD HH:mm')}}</div>
                                    <div class="other-talk-num">
                                        <div class=" person-talk">
                                            <div class="talk-item"
                                                 @click="selectReplayObj(item.id, item.userInfo.nickname)"
                                            >
                                                <span class="talk-icon  talk-normal-icon icon-talk-num"></span>
                                                <span class="talk-number "
                                                >{{item.replyTotal}}</span>
                                            </div>
                                            <div class="talk-item"
                                                 @click="doLikeReplay(item.id, index, 2)"
                                            >
                                                <span class="talk-icon like-normal-iocn"
                                                      :class="item.isLike ? 'icon-like-num-active' : 'icon-like-num' "
                                                ></span>
                                                <span class="talk-number "
                                                      :class="item.isLike ? 'active' : '' "
                                                >{{item.dianZanTotal}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-list>
                    <!--<van-pull-refresh v-model="isLoading" @refresh="onRefresh">-->
                    <!--&lt;!&ndash;<div class="no-data" style="padding-bottom: 3rem;" v-if="allReply.length == 0 ">暂无评论</div>&ndash;&gt;-->
                    <!--</van-pull-refresh>-->
                </div>
                <div class="nullhtml"></div>
            </div>
            <!--<div class="back-color" v-if="showBackColor" @touchmove.prevent></div>-->
            <div class="fixed-compose">
                <div class="compost-box">
                    <div class="compost-show-info" v-if="isReplay">
                        <div>
                            <div class="repBox" v-show="replayType === 1 ">
                                <span>评论作者：</span>
                                <span class="name-width">{{card.nickname}}</span>
                            </div>
                            <div class="repBox" v-show="replayType === 2 ">
                                <span>回复：</span>
                                <span class="name-width">{{postReplyUser}}</span>
                            </div>
                        </div>
                        <div @click="delSelectReplayObj">取消评论</div>
                    </div>
                    <div class="compose-detail-box">
                        <div class="compose-input" id="composeinput">
                            <!--<div contenteditable="true" class="test_box"></div>-->
                            <textarea class="input-style" type="text" placeholder="发表评论" id="text"
                                      @focus="showReplyInfo"
                                      @input="checkReplyLength"
                                      v-model="replayContent"></textarea>
                            <div class="input-icon icon-talk-edit"></div>
                        </div>
                        <div class="compose-to compost-item">
                            <div class="icon-talk-my-word talk-my-word"></div>
                            <div class="compose-text" @click="replyFunction">发布</div>
                        </div>
                        <!--<div class="compose-collect compost-item">-->
                        <!--<div class="icon-collet-article-active collet-article-active"></div>-->
                        <!--<div class="compose-text">收藏</div>-->
                        <!--</div>-->
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showFlag">
            <!--<div class="more-bg" v-if="showFlag" @touchmove.prevent></div>-->
            <div class="other-replay" v-if="showFlag">
                <div class="detail-replay-title">
                    <van-nav-bar
                            :title="replayReplyObj.replyReplyNum"
                            left-arrow
                            @click-left="onClickLeft"
                    ></van-nav-bar>
                </div>
                <!--<transition name="move">-->
                <div class="replay-more-content">
                    <!--<nav-top-bar :nav-title-word="replayReplyObj.replyReplyNum"></nav-top-bar>-->

                    <van-pull-refresh v-model="replayReplyObj.isLoading" @refresh="onRefreshSecondReply">
                        <van-list
                                v-model="replayReplyObj.loading"
                                :finished="replayReplyObj.finished"
                                :offset="10"
                                @load="changeSecondReplyList"
                        >
                            <div class="all-talk">
                                <div class="hot-item" v-for="(item, replayIndex) in replayReplyObj.replayReplyList"
                                     :key="replayIndex">
                                    <div class="person-info hot-person-info">
                                        <div class="person-left">
                                            <!--<div class="info-head">-->
                                            <!--<img src="../../assets/logo.png" alt="">-->
                                            <!--</div>-->
                                            <router-link
                                                    :to="{ name: 'post', params: { userId: item.userInfo.coUserId }}">
                                                <div class="info-head">
                                                    <img v-if="item.userInfo.headImg" :src="item.userInfo.headImg"
                                                         alt="">
                                                    <img v-if="!item.userInfo.headImg"
                                                         src="../../assets/images/my/default_head.png"
                                                         alt="">
                                                </div>
                                            </router-link>
                                            <div class="info-simple flex-align-center">
                                                <div class="info-name">
                                                    <router-link
                                                            :to="{ name: 'post', params: { userId: item.userInfo.coUserId }}">
                                                        <div class="name-word">
                                                            {{item.userInfo.nickname}}
                                                        </div>
                                                    </router-link>
                                                    <!--<div class="name-word">@{{item.nickname}}</div>-->
                                                    <!--<div class="name-type">湘妹子</div>-->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="person-con">
                                        <div class="con-detail  content-detail-word"
                                        >
                                            {{item.content}}
                                        </div>
                                    </div>
                                    <div class="talk-and-admire flex-between">
                                        <div class="other-talk-time">{{item.createTime | datafmt('YYYY-MM-DD HH:mm')}}
                                        </div>
                                        <div class="other-talk-num">
                                            <div class=" person-talk">
                                                <!--<div class="talk-item">-->
                                                <!--<span class="talk-icon  talk-normal-icon icon-talk-num"></span>-->
                                                <!--<span class="talk-number active">{{item.replyTotal}}</span>-->
                                                <!--</div>-->
                                                <!--<div class="talk-item" @click="doLikeReplay(item.id)">-->
                                                <!--<span class="talk-icon like-normal-iocn icon-like-num"></span>-->
                                                <!--<span class="talk-number active">{{item.dianZanTotal}}</span>-->
                                                <!--</div>-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </van-list>
                    </van-pull-refresh>
                </div>
                <!--</transition>-->
            </div>
        </div>
    </div>
</template>

<script>
    // import RouterLink from "vant/es/mixins/router-link";
    import { List, NavBar, PullRefresh, Toast, ImagePreview } from 'vant';
    import NavTopBar from '../../components/NavTopBarComponent';
    import { commonFunction } from '../../common/CommonFunction';

    export default {
        name: 'TopicDetail',
        components: {
            NavTopBar,
            [List.name]: List,
            [PullRefresh.name]: PullRefresh,
            [Toast.name]: Toast,
            [NavBar.name]: NavBar
        },
        data () {
            return {
                replayReplyObj: {
                    replyReplyId: '',
                    replyReplyNum: '回复列表',
                    replyReplyUser: '',
                    replayReplyContent: '',
                    replayReplyList: [], // 评论分页相关
                    page: 0,
                    loading: true,
                    finished: false,
                    isLoading: true
                },
                observe: {}, // 帖子
                id: '',
                card: {
                    id: '',
                    title: '',
                    content: '',
                    imgArr: ['http://www.qqzhi.com/uploadpic/2014-12-07/165956548.jpg', 'http://uploads.5068.com/allimg/120112/10341JT1-3.jpg', 'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/0b55b319ebc4b745551b5d46c7fc1e178b8215d6.jpg', 'http://s.wasu.tv/mrms/manage/images/201504/15/552e2a34b9261.jpg'],
                    createTime: '',
                    topicId: '',
                    topicName: '',
                    viewTimes: '',
                    zanTotal: '',
                    picArr: [],
                    userId: '',
                    headImg: '',
                    nickname: '',
                    signature: '',
                    replyTotal: '',
                    isLike: false
                },
                loading: false,
                finished: false,
                isLoading: true, // 所有评论
                allReply: [], // 对帖子评论数量
                totalReply: 0,
                replyPageNum: 0,
                replayContent: '',
                replayType: 1, // 1是对帖子回复， 2 对评论进行回复
                postReplyId: '',
                postReplyUser: '', // 点击回复时背景图
                isReplay: false,
                showFlag: false,
                showBackColor: false, // 精彩评论
                hotReply: [],
                preNextTopic: {
                    next: [],
                    pre: []
                },
                isPull: false,
                list: []

            };
        },
        created () {
            this.id = this.$route.params.id;
            this.getTopicDetail();
            this.getPostHotReply();
        },
        mounted () {
            // this.resizeText();
        },
        watch: {
            '$route': 'refreshPage'
        },
        methods: {

            stop () {
                let mo = function (e) {
                    e.preventDefault();
                };
                document.body.style.overflow = 'hidden';
                document.addEventListener("touchmove", mo, false);// 禁止页面滑动
            },
            move () {
                let mo = function (e) {
                    e.preventDefault();
                };
                document.body.style.overflow = '';// 出现滚动条
                document.removeEventListener("touchmove", mo, false);
            },
            hideBackColor () {
                this.showBackColor = false;
            },
            showBigPicture (imgArr, startNum) {
                // 图片放大
                ImagePreview({
                    images: imgArr,
                    startPosition: startNum,
                    showIndex: true,
                    showIndicators: false,
                    onClose () {
                        // do something
                    }
                });
                // ImagePreview(imgArr);
            },
            onRefresh () {
                this.allReply = [];
                this.replyPageNum = 1;
                this.finished = false;
                this.loading = true;
                this.getPostReplyList();
            },
            changeReplyList () {
                this.replyPageNum += 1;
                this.getPostReplyList();
            },
            getTopicDetail () {
                this.$http.DetailService.getTopicDetail(this.id)
                    .then(res => {
                        let resArr = res.data;
                        let picSplit = [];
                        if (resArr[0].pic) {
                            picSplit = resArr[0].pic.split(',');
                        }
                        //  帖子ID
                        this.card.id = resArr[0].id;
                        this.card.title = resArr[0].title;
                        this.card.content = resArr[0].content;
                        this.card.topicId = resArr[0].topicId;
                        this.card.topicName = resArr[0].topicName;
                        this.card.createTime = resArr[0].createTime;
                        this.card.replyTotal = !resArr[0].replyTotal ? 0 : resArr[0].replyTotal;
                        this.card.viewTimes = !resArr[0].viewTimes ? 0 : resArr[0].viewTimes;
                        this.card.zanTotal = !resArr[0].zanTotal ? 0 : resArr[0].zanTotal;
                        this.card.picArr = picSplit;
                        // 发贴人用户信息
                        this.card.coUserId = resArr[0].userInfo[0].coUserId;
                        this.card.headImg = resArr[0].userInfo[0].headImg;
                        this.card.nickname = resArr[0].userInfo[0].nickname;
                        this.card.signature = resArr[0].userInfo[0].signature;
                        // this.card.isLike = resArr[0].isLike;

                        // 获取上下篇
                        this.getPostPreNext();
                    })
                    .catch(err => {

                    });
            },
            getPostPreNext () {
                this.$http.DetailService.getPostPreNext(this.card.topicId, this.id)
                    .then(res => {
                        this.preNextTopic.next = [];
                        this.preNextTopic.pre = [];
                        let resData = res.data;
                        if (resData.next.length > 0) {
                            let next = {
                                // 帖子id
                                id: resData.next[0].id,
                                topicId: resData.next[0].topicId,
                                title: resData.next[0].title,
                                createTime: resData.next[0].createTime
                            };
                            this.preNextTopic.next.push(next);
                        }
                        if (resData.pre.length > 0) {
                            let pre = {
                                id: resData.pre[0].id,
                                topicId: resData.pre[0].topicId,
                                title: resData.pre[0].title,
                                createTime: resData.pre[0].createTime
                            };
                            this.preNextTopic.pre.push(pre);
                        }

                    })
                    .catch(err => {

                    });
            },
            getPostHotReply () {
                this.$http.DetailService.getPostHotReply(this.id)
                    .then(res => {
                        this.hotReply = [];
                        let resData = res.data;
                        if (res.data.length > 0) {
                            let hotOne = {
                                // 这个评论的id
                                id: resData[0].id,
                                userInfo: {
                                    coUserId: resData[0].userInfo[0].coUserId,
                                    nickname: resData[0].userInfo[0].nickname,
                                    headImg: resData[0].userInfo[0].headImg
                                },
                                postId: resData[0].postId,
                                replyTotal: resData[0].replyTotal,
                                dianZanTotal: resData[0].dianZanTotal,
                                postReplyId: resData[0].postReplyId,
                                createTime: resData[0].createTime,
                                isLike: false
                            };
                            this.hotReply.push(hotOne);
                        }
                    })
                    .catch(err => {

                    });
            },
            getPostReplyList () {
                this.$http.DetailService.getPostReplyList(this.id, this.replyPageNum)
                    .then(res => {
                        let resArr = res.data.result;
                        this.totalReply = res.data.totalCount;
                        if (resArr.length === 0) {
                            this.finished = true;
                            return;
                        } else {
                            for (let i = 0; i < resArr.length; i++) {
                                // let picSplit = [];
                                // if (resArr[0].pic) {
                                // 	picSplit = resArr[0].pic.split(',');
                                // }
                                let userReplay = {
                                    // 评论id
                                    id: resArr[i].id,
                                    postId: resArr[i].postId,
                                    nickname: resArr[i].nickname,
                                    content: resArr[i].content,
                                    createTime: resArr[i].createTime,
                                    replyTotal: resArr[i].replyTotal,
                                    viewTimes: resArr[i].viewTimes,
                                    dianZanTotal: resArr[i].dianZanTotal, // picArr: picSplit,
                                    userInfo: '',
                                    isLike: false
                                    // isLike: resArr[i].isLike
                                };
                                if (resArr[i].userInfo) {
                                    userReplay.userInfo = {
                                        // 用户id
                                        coUserId: resArr[i].userInfo[0].coUserId,
                                        headImg: resArr[i].userInfo[0].headImg,
                                        nickname: resArr[i].userInfo[0].nickname,
                                        signature: resArr[i].userInfo[0].signature
                                    };
                                }
                                this.allReply.push(userReplay);
                            }
                            if (resArr.length < 5) {
                                this.finished = true;
                            }
                        }
                        this.loading = false;
                        this.isLoading = false;
                    })
                    .catch(err => {
                        this.loading = false;
                        this.isLoading = false;
                        this.finished = true;
                    });
            },
            // 对帖子 点赞
            doLikePost (postId) {
                if (!localStorage.getItem('token')) {
                    commonFunction.toLogin();
                    return
                }
                this.$http.DetailService.doLikePost(postId)
                    .then(res => {
                        this.card.isLike = true;
                        this.card.zanTotal += 1;
                    })
                    .catch(err => {
                        if (err.code === '000001') {
                            this.showTip('已点过赞了');
                        }
                    });
            },
            // 对 评论 点赞
            doLikeReplay (postReplyId, index, type) {
                // type=1 对精彩评论点赞 2对全部评论点赞
                if (!commonFunction.hasLogin()) {
                    commonFunction.toLogin();
                    return
                }
                this.$http.DetailService.doLikeReplay(postReplyId)
                    .then(res => {
                        // if (res.code === '000000') {
                        //     this.$set(this.allReply[index], 'isLike', true);
                        // }
                        if (type === 1) {
                            // let originZanNum = this.hotReply[index].dianZanTotal;
                            let zanTo = this.hotReply[index].dianZanTotal + 1;
                            this.$set(this.hotReply[index], 'isLike', true);
                            this.$set(this.hotReply[index], 'dianZanTotal', zanTo);
                        } else if (type === 2) {
                            let zanTo = this.allReply[index].dianZanTotal + 1;
                            this.$set(this.allReply[index], 'isLike', true);
                            this.$set(this.allReply[index], 'dianZanTotal', zanTo);
                        }
                    })
                    .catch(err => {
                        if (err.code === '000001') {
                            this.showTip('已点过赞了');
                        }
                        // this.$set(this.allReply[index], 'isLike', true);
                        // if (err.code == '-1') {
                        //     this.showTip('已点过赞了');
                        // }
                    });
            },
            // 对精彩评论点赞
            doLikeHotReplay (postReplyId, index) {
                this.$http.DetailService.doLikeReplay(postReplyId)
                    .then(res => {
                        // if (res.code === '000000') {
                        //     this.$set(this.allReply[index], 'isLike', true);
                        // }
                        let zanTo = this.hotReply[index].zanTotal + 1;
                        this.$set(this.hotReply[index], 'isLike', true);
                        this.$set(this.hotReply[index], 'zanTotal', zanTo);
                    })
                    .catch(err => {
                        if (err.code === '000001') {
                            this.showTip('已点过赞了');
                        }
                        // this.$set(this.allReply[index], 'isLike', true);
                        // if (err.code == '-1') {
                        //     this.showTip('已点过赞了');
                        // }
                    });
            },
            // 发表回复
            replyFunction () {
                if (this.replayType === 1) {
                    this.postTopicReplay();
                } else {
                    this.postUserReplay();
                }
                // this.postUserReplay();
            },
            // 回复完了之后 再次点击输入，默认回复帖子
            // defaultReplayAuthor () {
            //     this.replayType = 1;
            // },
            // 取消回复 恢复默认为帖子
            delSelectReplayObj () {
                this.replayType = 1;
                this.isReplay = false;
                this.showBackColor = false;
                // this.defaultReplayAuthor();
            },
            // 选择回复谁
            selectReplayObj (id, nickname) {
                if (!localStorage.getItem('token')) {
                    this.showTip('请登录后评论');
                    return
                }
                // 显示背景
                this.showBackColor = true;
                // 回复 id
                this.postReplyId = id;
                // 是回复 评论
                this.replayType = 2;
                // 回复人昵称
                this.postReplyUser = nickname;
                // 正在回复
                this.isReplay = true;
            },
            // 显示回复谁
            showReplyInfo () {
                if (!localStorage.getItem('token')) {
                    this.showTip('请登录后评论');
                    return
                }
                this.showBackColor = true;
                // 正在回复中
                this.isReplay = true;
            },
            // 回复字数限制
            checkReplyLength () {
                let trimWord = commonFunction.trim(this.replayContent);
                let wordLength = commonFunction.checkLength(trimWord);
                if (wordLength > 300) {
                    this.showTip('评论字数不能超过300字');
                    this.replayContent = trimWord.substr(0, 300);
                }
                // let delNum = commonFunction.checkLength(commonFunction.trim(this.replayContent));
                // this.replayContent = delNum;
            },
            // 回复帖子接口
            postTopicReplay () {
                if (!localStorage.getItem('token')) {
                    commonFunction.toLogin();
                    return
                }
                let trimWord = commonFunction.trim(this.replayContent);
                let wordLength = commonFunction.checkLength(trimWord);
                if (wordLength === 0) {
                    this.showTip('评论内容不能为空');
                    return;
                } else if (wordLength > 300) {
                    this.showTip('评论字数不能超过300字');
                    return
                }
                this.delSelectReplayObj();
                let sendData = {
                    postId: this.card.id, content: trimWord
                };
                this.$http.DetailService.doReplayPost(sendData)
                    .then(res => {
                        this.replayContent = '';
                        this.showTip('评论成功');
                        this.onRefresh();
                    })
                    .catch(err => {
                        this.showTip(err.message);
                    });
            },
            // 对评论 回复
            postUserReplay () {
                if (!localStorage.getItem('token')) {
                    commonFunction.toLogin();
                    return
                }
                let trimWord = commonFunction.trim(this.replayContent);
                let wordLength = commonFunction.checkLength(trimWord);
                if (wordLength === 0) {
                    this.showTip('评论内容不能为空');
                    return;
                } else if (wordLength > 300) {
                    this.showTip('评论字数不能超过300字');
                    return
                }
                this.delSelectReplayObj();
                let sendData = {
                    postReplyId: this.postReplyId, content: trimWord
                };
                this.$http.DetailService.doReplayReplay(sendData)
                    .then(res => {
                        this.replayContent = '';
                        this.showTip('评论成功');
                    })
                    .catch(err => {
                        this.showTip(err.message);
                    });
            },

            onRefreshSecondReply () {
                this.replayReplyObj.replayReplyList.splice(0);
                this.replayReplyObj.page = 0;
                this.replayReplyObj.finished = false;
                this.replayReplyObj.loading = true;
                this.replayReplyObj.isLoading = true;
                this.changeSecondReplyList();
                // replayReplyObj: {
                //     replyReplyId: '',
                //         replyReplyNum: '回复列表',
                //         replyReplyUser: '',
                //         replayReplyContent: '',
                //         replayReplyList: [],
                //         // 评论分页相关
                //         page: 0,
                //         loading: false,
                //         finished: false,
                //         isLoading: true,
                // },
            },
            changeSecondReplyList () {
                this.replayReplyObj.page += 1;
                this.getReplyReplyList();
            },
            // 评论 的评论列表
            getReplyReplyList (postReplayId) {

                // replayReplyObj: {
                //     replyReplyId: '',
                //         replyReplyNum: '回复列表',
                //         replyReplyUser: '',
                //         replayReplyContent: ''
                // },
                // let postReplayPage = 1;
                this.$http.DetailService.getDetailReplyList(this.replayReplyObj.replyReplyId, this.replayReplyObj.page)
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
                                    content: resArr[i].content,
                                    nickname: resArr[i].nickname,
                                    createTime: resArr[i].createTime,
                                    nickname2: resArr[i].nickname2,
                                    // topicId: resArr[i].topicId,
                                    // title: resArr[i].title,
                                    // topicName: resArr[i].topicName,
                                    // content: resArr[i].content,
                                    // replyTotal: resArr[i].replyTotal,
                                    // viewTimes: resArr[i].viewTimes,
                                    zanTotal: resArr[i].zanTotal,
                                    // picArr: picSplit,
                                    userInfo: {
                                        coUserId: resArr[i].userInfo[0].coUserId,
                                        headImg: resArr[i].userInfo[0].headImg,
                                        nickname: resArr[i].userInfo[0].nickname,
                                        signature: resArr[i].userInfo[0].signature
                                    }
                                };
                                this.replayReplyObj.replayReplyList.push(setOne);
                            }
                        }

                        if (!res.data.hasNext) {
                            this.replayReplyObj.finished = true;
                        }
                        if (this.replayReplyObj.replayReplyList.length === 0) {
                            // this.isGetCardList = false;
                        }
                        this.replayReplyObj.loading = false;
                        this.replayReplyObj.isLoading = false;
                    })
                    .catch(err => {
                        if (this.replayReplyObj.replayReplyList.length === 0) {
                            // this.isGetCardList = false;
                        }
                        this.replayReplyObj.finished = true;
                        this.replayReplyObj.loading = false;
                        this.replayReplyObj.isLoading = false;
                    });
            },
            onClickLeft () {
                this.showFlag = false;
                this.move();
            },
            showReplayMore (id, name) {
                // var thisId = this.id;
                // this.$router.push({ name: 'detail', params: { thisId }, query: { cid: id } });
                // this.$router.push('');
                // this.stop();
                this.replayReplyObj.replayReplyList = [];
                this.showFlag = true;
                this.replayReplyObj.replyReplyId = id;
                this.replayReplyObj.replyReplyUser = '回复' + name;
                this.getReplyReplyList(id);
            },
            // d对评论 进行回复
            replyReplyFunction (id) {
                let sendData = {
                    postReplyId: this.replayReplyObj.replyReplyId, content: this.replayReplyObj.replayContent
                };
                this.$http.DetailService.doReplayReplay(sendData)
                    .then(res => {
                        this.showTip('评论成功');
                        // this.allReply = [];
                        // this.getPostReplyList();
                        // this.onRefresh();
                    })
                    .catch(err => {
                        this.showTip(err);
                    });
            }, // 显示提示
            showTip (msg) {
                Toast({
                    message: msg, duration: 1000, forbidClick: true
                });
            },
            goOtherDetail (id) {
                // console.log(id);
                // this.$router.replace({
                // 	path: '/_empty'
                // });
                this.$router.push({name: 'detail', params: {id}});
                // this.$router.go({
                // 	path: `/community/detail/16`,
                // 	force: true
                // });
            },
            refreshPage () {
                this.$router.go(0);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/style/home/content-detail.scss";

    .other-replay {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0px;
        width: 100%;
        background: #fff;
        z-index: 10000;
        padding-top: .9rem;
    }

    .more-bg {
        width: 100%;
        height: 100%;
        z-index: 9999;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }


    /deep/ .detail-replay-title {
        height: .9rem;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: #fff;
        z-index: 999999 !important;

        .van-nav-bar__title {
            font-size: 36px;
        }
    }

    /deep/ .van-nav-bar .van-icon {
        color: #333333;
        vertical-align: middle;
        font-size: 0.32rem;
    }

    /deep/ .van-nav-bar__left {
        left: .34rem;
    }

    .other-replay .move-enter-active, .food .move-leave-active {
        transition: all 0.5s linear;
        transform: translate3d(0, 0, 0);
    }

    .other-replay .move-enter, .food .move-leave {
        transform: translate3d(100%, 0, 0);
    }

    .replay-more-content {
        position: fixed;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        top: .9rem;
    }

    .back-color {
        background-color: rgba(0, 0, 0, 0.7);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }

    .test_box {
        width: 400px;
        min-height: 60px;
        max-height: 300px;
        _height: 60px;
        margin-left: auto;
        margin-right: auto;
        padding: 3px;
        outline: 0;
        border: 1px solid #a0b3d6;
        font-size: 12px;
        word-wrap: break-word;
        overflow-x: hidden;
        overflow-y: auto;
        _overflow-y: visible;
        outline: none;
    }

    .compost-box {
        position: relative;

        .compost-show-info {
            position: absolute;
            top: -.6rem;
            width: 100%;
            height: 0.6rem;
            padding: 10px 40px;
            font-size: 26px;
            color: #999999;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #fff;
        }
    }

    .nullhtml {
        max-height: 500px;
    }

    .content-detail {
        padding-bottom: 100px;
        margin-bottom: 100px;
    }

    .topic-detail-box {
        display: flex;
        flex-wrap: wrap;
    }

    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color: $text999;
        font-size: 26px;
        line-height: normal;
        /*display: flex;*/
        /*align-items: center;*/
    }

    input:-moz-placeholder, textarea:-moz-placeholder {
        color: $text999;
        font-size: 26px;
        line-height: normal;
        /*line-height: 1;*/
    }

    input::-moz-placeholder, textarea::-moz-placeholder {
        color: $text999;
        font-size: 26px;
        line-height: normal;
        /*line-height: 1;*/
    }

    input:-ms-input-placeholder, textarea:-ms-input-placeholder {
        color: $text999;
        font-size: 26px;
        line-height: normal;
        /*line-height: 1;*/
    }

    .fixed-compose {
        position: fixed;
        bottom: 0;
        width: 100%;
        border-top: 1PX solid $border;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
        z-index: 1000;

        .name-width {
            width: 400px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .repBox {
            display: flex;
        }

        .compose-detail-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 14px 40px 14px 25px;
        }

        .compose-input {
            position: relative;
            /*height: 68px;*/
            /*width: 465px;*/
            max-height: 500px;
            flex: 1;
            margin-right: 0.3rem;
            min-height: 0.68rem;

            .input-icon {
                position: absolute;
                left: 23px;
                top: 50%;
                transform: translateY(-50%);
                width: 32px;
                height: 36px;
                background-repeat: no-repeat;
                background-position: center;
                background-size: 100% 100%;
            }

            .input-style {
                position: absolute;
                left: 0;
                top: 0;
                /*display: flex;*/
                width: 100%;
                height: 100%;
                outline: none;
                border: 1PX solid $border;
                border-radius: 34px;
                font-size: 26px;
                color: $text-main;
                background-color: #f4f4f4;
                line-height: 1;
                padding: 10px 10px 10px 66px;
                text-align: justify;
                resize: none;
                min-height: 0.68rem;
            }
        }

        .compost-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: .68rem;
        }

        .talk-my-word {
            width: 50px;
            height: 38px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
        }

        .collet-article-active {
            width: 50px;
            height: 45px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
        }

        .compose-text {
            font-size: 22px;
            color: $text999;
            margin-top: 10px;
        }
    }

    .fixed-compose-two {
        position: fixed;
        bottom: 0;
        width: 100%;
        border-top: 1PX solid $border;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
        z-index: 9000;

        .name-width {
            width: 400px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .repBox {
            display: flex;
        }

        .compose-detail-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 14px 40px 14px 25px;
        }

        .compose-input {
            position: relative;
            /*height: 68px;*/
            /*width: 465px;*/
            max-height: 500px;
            flex: 1;
            margin-right: 0.3rem;
            min-height: 0.68rem;

            .input-icon {
                position: absolute;
                left: 23px;
                top: 50%;
                transform: translateY(-50%);
                width: 32px;
                height: 36px;
                background-repeat: no-repeat;
                background-position: center;
                background-size: 100% 100%;
            }

            .input-style {
                position: absolute;
                left: 0;
                top: 0;
                /*display: flex;*/
                width: 100%;
                height: 100%;
                outline: none;
                border: 1PX solid $border;
                border-radius: 34px;
                font-size: 26px;
                color: $text-main;
                background-color: #f4f4f4;
                line-height: 1;
                padding: 10px 10px 10px 66px;
                text-align: justify;
                resize: none;
                min-height: 0.68rem;
            }
        }

        .compost-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: .68rem;
        }

        .talk-my-word {
            width: 50px;
            height: 38px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
        }

        .collet-article-active {
            width: 50px;
            height: 45px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
        }

        .compose-text {
            font-size: 22px;
            color: $text999;
            margin-top: 10px;
        }
    }

    .mask {
        position: fixed;
        top: 2.75rem;
        right: 0;
        bottom: -10rem;
        left: 0;
        background-color: #f2f2f2;
        z-index: 9;
    }
    .main-pos {
        position: fixed !important;
    }
</style>
