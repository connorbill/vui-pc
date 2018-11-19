<template>
    <div class="content-detail">
        <div v-show="!isLoadingPage">
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
                            <div class="info-time" v-if="card.createTime">{{card.createTime | datafmt('YYYY-MM-DD HH:mm')}}
                            </div>
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
                            <span class="talk-number ">{{card.viewTimes | NumInt}}</span>
                        </div>
                        <div class="talk-item">
                            <span class="talk-icon  talk-normal-icon icon-talk-num"></span>
                            <!--{{card.replyTotal}}-->
                            <span class="talk-number ">{{card.replyTotal | NumInt}}</span>
                        </div>
                        <div class="talk-item" @click="doLikePost(card.id)">
                            <span class="talk-icon like-normal-iocn "
                                  :class="card.isLike ? 'icon-like-num-active' : 'icon-like-num' "
                            ></span>
                            <span class="talk-number "
                                  :class="card.isLike ? 'active' : '' "
                            >
                                {{card.zanTotal | NumInt}}
                            </span>
                        </div>
                    </div>
                    <div class="platform-announcement" v-if="card.topicId > 10">
                        <router-link
                                class="platform-announcement"
                                v-if="card.topicId >= 200"
                                :to="{ name: 'TopicItem', params: {topicId: card.topicId}}">
                            {{card.topicName}}
                        </router-link>
                        <router-link
                                class="platform-announcement"
                                v-if="card.topicId < 200"
                                :to="{ name: 'DyItem', params: {id: card.topicId}}">
                            {{card.topicName}}
                        </router-link>
                    </div>
                </div>
                <div class="article-section">
                    <div class="vhtml-con">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="person-con">
                            <div class="con-detail  content-detail-word">
                                {{item.content}}
                            </div>
                            <div  class="show-three-talk width-all show-all-detail-reply"
                                  v-if="item.replyTotal > 0"
                                  @click="showReplayMore(item.id, item.userInfo.nickname)"
                            >
                                <span class="talk-name">{{item.replyUserName}}</span>
                                <span class="talk-word">等回复了{{item.replyTotal | NumInt}}条评论</span>
                                <div class="other-talk-info">查看全部评论</div>
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
                                        >{{item.replyTotal | NumInt}}</span>
                                    </div>
                                    <div class="talk-item"
                                         @click="doLikeReplay(item.id, index, 1)"
                                    >
                                                <span class="talk-icon like-normal-iocn"
                                                      :class="item.isLike ? 'icon-like-num-active' : 'icon-like-num' "
                                                ></span>
                                        <span class="talk-number "
                                              :class="item.isLike ? 'active' : '' "
                                        >{{item.dianZanTotal | NumInt}}</span>
                                    </div>
                                </div>
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
                            :offset="300"
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
                                    <!--<div class="other-talk" v-if="item.replyTotal > 0">-->
                                        <!--<div class="show-three-talk width-all">-->
                                            <!--<div class="show-talk-item flex-between"-->
                                                 <!--@click="showReplayMore(item.id, item.userInfo.nickname)"-->
                                            <!--&gt;-->
                                                <!--<div class="flex-align-center">-->
                                                    <!--<span class="talk-name hidden-word">{{item.replyUserName}}</span>-->
                                                    <!--<span class="talk-word">等{{item.replyTotal | NumInt}}人回复了评论</span>-->
                                                <!--</div>-->
                                                <!--<div class="other-talk-info">查看全部评论</div>-->
                                            <!--</div>-->
                                        <!--</div>-->
                                    <!--</div>-->

                                    <div  class="show-three-talk width-all show-all-detail-reply"
                                          v-if="item.replyTotal > 0"
                                          @click="showReplayMore(item.id, item.userInfo.nickname)"
                                    >
                                        <span class="talk-name">{{item.replyUserName}}</span>
                                        <span class="talk-word">等回复了{{item.replyTotal | NumInt}}条评论</span>
                                        <div class="other-talk-info">查看全部评论</div>
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
                                                >{{item.replyTotal | NumInt}}</span>
                                            </div>
                                            <div class="talk-item"
                                                 @click="doLikeReplay(item.id, index, 2)"
                                            >
                                                <span class="talk-icon like-normal-iocn"
                                                      :class="item.isLike ? 'icon-like-num-active' : 'icon-like-num' "
                                                ></span>
                                                <span class="talk-number "
                                                      :class="item.isLike ? 'active' : '' "
                                                >{{item.dianZanTotal | NumInt}}</span>
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
            <!--<div class="fixed-compose">-->
            <!--<div class="compost-box">-->
            <!--<div class="compost-show-info" v-if="isReplay">-->
            <!--<div>-->
            <!--<div class="repBox" v-show="replayType === 1 ">-->
            <!--<span>评论作者：</span>-->
            <!--<span class="name-width">{{card.nickname}}</span>-->
            <!--</div>-->
            <!--<div class="repBox" v-show="replayType === 2 ">-->
            <!--<span>回复：</span>-->
            <!--<span class="name-width">{{postReplyUser}}</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div @click="delSelectReplayObj">取消评论</div>-->
            <!--</div>-->
            <!--<div class="compose-detail-box">-->
            <!--<div class="compose-input" id="composeinput">-->
            <!--&lt;!&ndash;<div contenteditable="true" class="test_box"></div>&ndash;&gt;-->
            <!--<textarea class="input-style" type="text" placeholder="发表评论" id="text"-->
            <!--@focus="showReplyInfo"-->
            <!--@input="checkReplyLength"-->
            <!--v-model="replayContent"></textarea>-->
            <!--<div class="input-icon icon-talk-edit"></div>-->
            <!--</div>-->
            <!--<div class="compose-to compost-item">-->
            <!--<div class="icon-talk-my-word talk-my-word"></div>-->
            <!--<div class="compose-text" @click="replyFunction">发布</div>-->
            <!--</div>-->
            <!--&lt;!&ndash;<div class="compose-collect compost-item">&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="icon-collet-article-active collet-article-active"></div>&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="compose-text">收藏</div>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <div class="lite-page-editor">
                <div class="m-box m-box-compose">
                    <div class="box-left m-box-col m-box-center-a"
                         @click="composeComment()"
                    >
                        <!--<div class="compose-detail-box">-->
                            <!--<div class="compose-input" id="composeinput">-->
                                <!--&lt;!&ndash;<div contenteditable="true" class="test_box"></div>&ndash;&gt;-->
                                <!--<textarea class="input-style" type="text" placeholder="发表评论" id="text"-->
                                          <!--&gt;</textarea>-->
                                <!--<div class="input-icon icon-talk-edit"></div>-->
                            <!--</div>-->
                            <!--<div class="compose-to compost-item">-->
                                <!--<div class="icon-talk-my-word talk-my-word"></div>-->
                                <!--<div class="compose-text" >发布</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;<div class="compose-collect compost-item">&ndash;&gt;-->
                            <!--&lt;!&ndash;<div class="icon-collet-article-active collet-article-active"></div>&ndash;&gt;-->
                            <!--&lt;!&ndash;<div class="compose-text">收藏</div>&ndash;&gt;-->
                            <!--&lt;!&ndash;</div>&ndash;&gt;-->
                        <!--</div>-->
                        <div class="compose-box-display">
                            <div class="compose-box-border">
                                <div class="input-icon icon-talk-edit"></div>
                                <div class="to-talk">发表评论</div>
                            </div>
                        </div>
                        <!--<span class="m-box-center-a main-text m-text-cut focus">发表评论</span>-->
                    </div>
                    <div data-v-01f6351b="" class="box-right m-box-center-a">
                        <i class="lite-iconf lite-iconf-like icon-like-num"
                           @click="doLikePost(card.id)"
                           :class="card.isLike ? 'icon-like-num-active' : 'icon-like-num' "
                        ></i>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="showFlag ">
            <!--&& !replayReplyObj.isLoadingPage-->
            <!--<div class="more-bg" v-if="showFlag" @touchmove.prevent></div>-->
            <!--v-if="showFlag"-->
            <div :class="isShowList ? 'other-replay' : 'other-replay-app' ">
                <div>
                    <div class="detail-replay-title" v-if="isShowList">
                        <van-nav-bar
                                :title="replayReplyObj.replyReplyNum"
                                left-arrow
                                @click-left="onClickLeftDetail"
                        ></van-nav-bar>
                    </div>
                    <div class="replay-more-content">
                        <van-pull-refresh v-model="replayReplyObj.isLoading" @refresh="onRefreshSecondReply">
                            <van-list
                                    v-model="replayReplyObj.loading"
                                    :finished="replayReplyObj.finished"
                                    :offset="300"
                                    @load="getReplyReplyList"
                                    :immediate-check="replayReplyObj.immediateCheck"
                            >
                                <div class="all-talk">
                                    <div class="hot-item" v-for="(item, replayIndex) in replayReplyObj.replayReplyList"
                                         :key="replayIndex">
                                        <div class="person-info hot-person-info">
                                            <div class="person-left">
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
                                            <div class="other-talk-time">{{item.createTime | datafmt("YYYY-MM-DD HH:mm")}}
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
                        <div class="reply-bottom-box">
                            <div class="lite-page-editor">
                                <div class="m-box">
                                    <div class="box-left m-box-col m-box-center-a"
                                         @click="selectReplayObj(replayReplyObj.replyReplyId, replayReplyObj.replyReplyUser)"
                                    >
                                        <span class="m-box-center-a main-text m-text-cut focus">回复{{ replayReplyObj.replyReplyUser }}:</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--</transition>-->
                </div>
            </div>
        </div>
        <!--<van-loading type="spinner" color="white" class="fixed-middle-center demo-loading" v-show="isLoadingPage"/>-->
    </div>
</template>

<script>
    // import RouterLink from "vant/es/mixins/router-link";
    import { List, NavBar, PullRefresh, Toast, ImagePreview, Loading } from 'vant';
    import NavTopBar from '../../components/NavTopBarComponent';
    import { commonFunction } from '../../common/CommonFunction';

    export default {
        name: 'TopicDetail',
        components: {
            NavTopBar,
            [List.name]: List,
            [PullRefresh.name]: PullRefresh,
            [Toast.name]: Toast,
            [NavBar.name]: NavBar,
            [Loading.name]: Loading
        },
        data () {
            return {
                isShowList: true,
                isLoadingPage: true,
                replayReplyObj: {
                    replyReplyId: '',
                    replyReplyNum: '回复列表',
                    replyReplyUser: '',
                    replayReplyContent: '',
                    replayReplyList: [], // 评论分页相关
                    page: 0,
                    loading: false,
                    finished: false,
                    isLoading: false,
                    immediateCheck: false,
                    isLoadingPage: false
                },
                observe: {}, // 帖子
                id: '',
                card: {
                    id: '',
                    title: '',
                    content: '',
                    imgArr: [],
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
                list: [],
                instanceImagePreview: {}

            };
        },
        created () {
            if (commonFunction.isApp() || commonFunction.isWeChat()) {
                this.isShowList = false;
            }
            // console.log(this.isShowList)
            this.id = this.$route.params.id;
            if (this.$route.query.cid && this.$route.query.name) {
                this.replayReplyObj.replayReplyList = [];
                this.replayReplyObj.replyReplyId = this.$route.query.cid;
                this.replayReplyObj.replyReplyUser = this.$route.query.name;
                this.showFlag = true;
                this.getReplyReplyList('refresh');
                commonFunction.setPageTitle('回复列表');
            } else {
                this.getTopicDetail();
                this.getPostHotReply();
                this.changeReplyList();
                commonFunction.setPageTitle('内容详情');
            }
            // console.log(this.$route)
        },
        mounted () {
            // let self = this;
            // window.addEventListener("popstate", function (e) {
            //     // console.info(e)
            //     self.showFlag = false;
            //     if (self.$route.query.cid && self.$route.query.name){
            //         self.showFlag = true;
            //     }
            // });
        },
        methods: {
            showBigPicture (imgArr, startNum) {
                // 图片放大
                this.instanceImagePreview = ImagePreview({
                    images: imgArr,
                    startPosition: startNum,
                    showIndex: true,
                    showIndicators: false,
                    onClose () {
                        // do something
                    }
                });
                // if ()
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

                        let isLike = false;
                        if (resArr[0].hasZan === 1) {
                            isLike = true;
                        }
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
                        this.card.isLike = isLike;

                        this.isLoadingPage = false;
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
                            // let hotOne = {
                            //     // 这个评论的id
                            //     id: resData[0].id,
                            //     userInfo: {
                            //         coUserId: resData[0].userInfo[0].coUserId,
                            //         nickname: resData[0].userInfo[0].nickname,
                            //         headImg: resData[0].userInfo[0].headImg
                            //     },
                            //     postId: resData[0].postId,
                            //     replyTotal: resData[0].replyTotal,
                            //     dianZanTotal: resData[0].dianZanTotal,
                            //     postReplyId: resData[0].postReplyId,
                            //     createTime: resData[0].createTime,
                            //     isLike: false
                            // };
                            let isLike = false;
                            if (resData[0].hasZan === 1) {
                                isLike = true;
                            }
                            let hotOne = {
                                // 评论id
                                id: resData[0].id,
                                postId: resData[0].postId,
                                nickname: resData[0].nickname,
                                content: resData[0].content,
                                createTime: resData[0].createTime,
                                replyTotal: resData[0].replyTotal,
                                viewTimes: resData[0].viewTimes,
                                dianZanTotal: resData[0].dianZanTotal, // picArr: picSplit,
                                userInfo: '',
                                isLike: isLike,
                                replyUserName: resData[0].replyUserName
                                // isLike: resData[0].isLike
                            };
                            if (resData[0].userInfo) {
                                hotOne.userInfo = {
                                    // 用户id
                                    coUserId: resData[0].userInfo[0].coUserId,
                                    headImg: resData[0].userInfo[0].headImg,
                                    nickname: resData[0].userInfo[0].nickname,
                                    signature: resData[0].userInfo[0].signature
                                };
                            }
                            this.hotReply.push(hotOne);
                        }
                    })
                    .catch(err => {

                    });
            },
            getPostReplyList () {
                this.loading = true;
                this.$http.DetailService.getPostReplyList(this.id, this.replyPageNum)
                    .then(res => {
                        let resArr = res.data.result;
                        this.totalReply = res.data.totalCount;
                        if (resArr) {
                            for (let i = 0; i < resArr.length; i++) {
                                // let picSplit = [];
                                // if (resArr[0].pic) {
                                // 	picSplit = resArr[0].pic.split(',');
                                // }
                                let isLike = false;
                                if (resArr[i].hasZan === 1) {
                                    isLike = true;
                                }
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
                                    isLike: isLike,
                                    replyUserName: resArr[i].replyUserName
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
                            if (!res.data.hasNext) {
                                this.finished = true;
                            } else {
                                this.finished = false;
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
                if (!commonFunction.hasLogin()) {
                    commonFunction.toLogin();
                    return;
                }
                this.$http.DetailService.doLikePost(postId)
                    .then(res => {
                        this.card.isLike = true;
                        this.card.zanTotal = res.data;
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
                    return;
                }
                this.$http.DetailService.doLikeReplay(postReplyId)
                    .then(res => {
                        // if (res.code === '000000') {
                        //     this.$set(this.allReply[index], 'isLike', true);
                        // }
                        if (type === 1) {
                            // let originZanNum = this.hotReply[index].dianZanTotal;
                            // let zanTo = this.hotReply[index].dianZanTotal + 1;
                            this.$set(this.hotReply[index], 'isLike', true);
                            this.$set(this.hotReply[index], 'dianZanTotal', res.data);
                        } else if (type === 2) {
                            // let zanTo = this.allReply[index].dianZanTotal + 1;
                            this.$set(this.allReply[index], 'isLike', true);
                            this.$set(this.allReply[index], 'dianZanTotal', res.data);
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
                if (!commonFunction.hasLogin()) {
                    commonFunction.toLogin();
                    return;
                }
                this.$http.DetailService.doLikeReplay(postReplyId)
                    .then(res => {
                        // if (res.code === '000000') {
                        //     this.$set(this.allReply[index], 'isLike', true);
                        // }
                        // let zanTo = this.hotReply[index].zanTotal + 1;
                        this.$set(this.hotReply[index], 'isLike', true);
                        this.$set(this.hotReply[index], 'zanTotal', res.data);
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
            // 发表评论
            composeComment () {
                if (!commonFunction.hasLogin()) {
                    commonFunction.toLogin();
                    return;
                }
                this.$router.push({ name: 'ComposeComment', query: { id: this.card.id, title: this.card.title } });
            },
            // 选择回复谁
            selectReplayObj (id, nickname) {
                if (!commonFunction.hasLogin()) {
                    commonFunction.toLogin();
                    return;
                }
                this.$router.push({ name: 'ComposeReply', query: { id: this.card.id, reply: id, content: nickname } });
            },
            onRefreshSecondReply () {
                // this.replayReplyObj.replayReplyList.splice(0);
                // this.replayReplyObj.page = 0;
                this.replayReplyObj.loading = false;
                // this.replayReplyObj.isLoading = false;
                this.replayReplyObj.isLoadingPage = false;
                // this.replayReplyObj.finished = false;
                this.getReplyReplyList('refresh');
            },
            // changeSecondReplyList () {
            //     this.replayReplyObj.page += 1;
            //     this.getReplyReplyList();
            // },
            // 评论 的评论列表
            getReplyReplyList (refresh) {
                if (refresh === 'refresh') {
                    // isRefresh传值1表示刷新数据
                    this.replayReplyObj.page = 0;
                }
                // if (this.replayReplyObj.isLoadingPage) return;
                // this.replayReplyObj.isLoadingPage = true;
                this.replayReplyObj.page++;
                this.$http.DetailService.getDetailReplyList(this.replayReplyObj.replyReplyId, this.replayReplyObj.page)
                    .then(res => {
                        if (refresh === 'refresh') {
                            // 传值1表示刷新数据
                            this.replayReplyObj.replayReplyList.splice(0);
                        }
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
                                    // zanTotal: resArr[i].zanTotal,
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

                        // this.isLoadingPage = false;
                        // console.log(this.replayReplyObj.replayReplyList)
                        if (!res.data.hasNext) {
                            this.replayReplyObj.finished = true;
                            // this.replayReplyObj.isLoadingPage = true;
                        } else {
                            // this.replayReplyObj.isLoadingPage = false;
                            this.replayReplyObj.finished = false;
                        }
                        this.replayReplyObj.loading = false;
                        this.replayReplyObj.isLoading = false;
                        // console.log(this.replayReplyObj.isLoadingPage)
                    })
                    .catch(err => {
                        this.replayReplyObj.finished = true;
                        this.replayReplyObj.loading = false;
                        this.replayReplyObj.isLoading = false;
                        // this.replayReplyObj.isLoadingPage = false;
                    });
            },
            onClickLeftDetail () {
                // this.showFlag = false;
                // this.move();
                if (window.history.length > 1) {
                    // this.showFlag = false;
                    // window.history.replaceState(null, null, this.$route.fullPath);
                    this.$router.go(-1);
                } else {
                    this.$router.push('/');
                }
            },
            showReplayMore (id, name) {
                this.replayReplyObj.replayReplyList = [];
                this.replayReplyObj.replyReplyId = id;
                this.replayReplyObj.replyReplyUser = name;
                // this.showFlag = true;
                // this.replayReplyObj.loading = true;
                this.replayReplyObj.finished = false;
                // this.getReplyReplyList();
                this.$router.push({ name: 'detail', params: { id: this.id }, query: { cid: id, name: name } });
            },
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
                // this.$router.go({
                // 	path: `/community/detail/16`,
                // 	force: true
                // });
                this.$router.push({ name: 'detail', params: { id: id } });
            }
            // refreshPage () {
            //     this.$router.go(0);
            // }
        },
        beforeRouteLeave (to, from, next) {
            if (this.instanceImagePreview.close) {
                this.instanceImagePreview.close();
            }
            next();
        }
        // beforeRouteEnter (to, from, next) {
        //     // 在渲染该组件的对应路由被 confirm 前调用
        //     // 不！能！获取组件实例 `this`
        //     // 因为当守卫执行前，组件实例还没被创建
        //     console.log(to)
        //     next(Vue => {
        //         // if ()
        //         // Vue.$route.meta.navTopTitle = '回复列表';
        //     });
        // },
        // beforeRouteUpdate (to, from, next) {
        //     // 在当前路由改变，但是该组件被复用时调用
        //     // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        //     // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        //     // 可以访问组件实例 `this`
        //     // console.log(to);
        //     // next();
        // }
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/style/home/content-detail.scss";
    @import "../../assets/style/lib/compose.scss";
    .app {
        .app-content{
            margin-bottom: 0;
        }
    }
    .other-replay {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0px;
        width: 100%;
        background: #fff;
        z-index: 10000;
        padding-top: .9rem;
        .replay-more-content {
            top: .9rem;
        }
    }

    .other-replay-app {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0px;
        width: 100%;
        background: #fff;
        z-index: 10000;
        .replay-more-content {
            top: 0;
        }
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
        padding-bottom: 2rem;

        .reply-bottom-box {
            position: fixed;
            width: 100%;
            bottom: 0;
            left: 0;
        }
    }
    .show-all-detail-reply{
        font-size: .3rem;
        word-break: break-all;
        text-align: left;
        padding: 0.2rem .2rem;
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
    .m-box-compose{
        height: .9rem;
    }
    .compose-box-display{    height: 100%;
        display: flex;
        align-items: center;
        .compose-box-border{
            height: 68px;
            display: flex;
            align-items: center;
            outline: none;
            border: 1PX solid $border;
            border-radius: 34px;
            font-size: 26px;
            color: $text-main;
            background-color: #f4f4f4;
            line-height: 1;
            flex: 1;
            .input-icon {
                width: 32px;
                height: 36px;
                margin-left: 23px;
                background-repeat: no-repeat;
                background-position: center;
                background-size: 100% 100%;
            }
            .to-talk{
                margin-left: 23px;
            }
        }
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

</style>
