<template>
    <div class="card-list-content">
        <div class="hot-item"
             v-for="(item, index) in cardList"
             :key="index">
            <div class="person-info hot-person-info">
                <div class="person-left">
                    <router-link :to="{ name: 'post', params: { userId: item.userInfo.coUserId}}">
                        <div class="info-head">
                            <img v-show="item.userInfo.headImg" :src="item.userInfo.headImg" alt="">
                            <img v-show="!item.userInfo.headImg" src="../assets/images/my/default_head.png" alt="">
                        </div>
                    </router-link>
                    <!--<div class="info-head">-->
                    <!--<img v-if="item.userInfo[0].headImg" :src="item.userInfo[0].headImg" alt="">-->
                    <!--<img v-if="!item.userInfo[0].headImg" src="../assets/images/my/default_head.png" alt="">-->
                    <!--</div>-->
                    <div class="info-simple">
                        <div class="info-name">
                            <router-link :to="{ name: 'post', params: { userId: item.userInfo.coUserId }}">
                                <div class="name-word">
                                    {{item.userInfo.nickname}}
                                </div>
                            </router-link>
                            <!--<div class="name-type">{{item.userInfo.signature}}</div>-->

                        </div>
                        <div class="info-time">{{item.createTime | datafmt('MM-DD HH:mm')}}</div>
                    </div>
                </div>
                <!--<div :class="item.userInfo.isFollow ? 'no-follow' : 'info-follow'" class="follow">-->
                <!--<span class="icon-has-follow has-follow" v-show="item.userInfo.isFollow"></span>-->
                <!--<span>{{item.userInfo.isFollow ? '已关注' : '+关注'}}</span>-->
                <!--</div>-->
            </div>
            <div class="person-con">
                <router-link :to="{ name: 'detail', params: { id: item.id }}">
                    <div class="con-title">{{item.title}}</div>
                </router-link>
                <div class="con-detail overflow-multi-line">
                    <router-link :to="{ name: 'DyItem', params: { id: item.topicId}}" class="topic-link"
                                 v-if="item.topicName && item.topicId < 200">
                        #{{item.topicName}}#
                    </router-link>
                    <router-link :to="{ name: 'TopicItem', params: {topicId: item.topicId}}" class="topic-link"
                                 v-if="item.topicName && item.topicId >= 200">
                        #{{item.topicName}}#
                    </router-link>
                    <router-link :to="{ name: 'detail', params: { id: item.id }}">
                        <span class="con-detail">{{item.content}}</span>
                    </router-link>
                </div>
                <div class="con-img-box">
                    <div class="con-detail-img" ref="imgElememtBox" v-for="(img, indexImg) in item.picArr"
                         :key="indexImg">
                        <div class="m-img-box">
                            <img :src="img"  @click="showBigPicture(item.id)">
                        </div>
                    </div>
                </div>
            </div>
            <div class="person-talk person-talk-box">
                <div class="talk-item">
                    <span class="talk-icon look-normal-icon icon-look-num"></span>
                    <span class="talk-number ">{{item.viewTimes | NumInt}}</span>
                </div>
                <router-link :to="{ name: 'detail', params: { id: item.id }}">
                    <div class="talk-item">
                            <span class="talk-icon  talk-normal-icon icon-talk-num"
                            ></span>
                        <span class="talk-number ">{{item.replyTotal | NumInt}}</span>
                    </div>
                </router-link>
                <div class="talk-item" @click="doLikePost(item.id, index)">
                    <span class="talk-icon like-normal-iocn "
                          :class="item.isLike ? 'icon-like-num-active' : 'icon-like-num' "
                    ></span>
                    <span class="talk-number "
                          :class="item.isLike ? 'active' : '' "
                    >{{item.zanTotal | NumInt}}</span>
                </div>
            </div>
            <div class="show-talk" v-if="item.listCoPostLike">
                <router-link :to="{ name: 'detail', params: { id: item.id }}">
                    <div class="show-three-talk">
                        <div class="show-talk-item" v-if="item.likeText.length > 0">
                            <div class="talk-name">
                                <span
                                        v-for="(like, likeIndex) in item.likeText"
                                        :key="likeIndex"
                                        class="like-text-word"
                                        v-if="likeIndex < 5"
                                >
                                    {{like}}
                                    <span v-if="likeIndex !== item.likeText.length - 1">,</span>
                                </span>
                                <span>等{{item.zanTotal | NumInt}}人点赞</span>
                            </div>
                        </div>
                        <div class="show-talk-item" v-for="(rep, repIndex) in item.listCoPostLike" :key="repIndex"
                             v-show="repIndex < 3">
                            <div class="overflow-hide-word">
                                <span class="talk-name" v-if="rep.nickname">{{rep.nickname}}</span>
                                <!--<span class="talk-word" v-show="rep.nickname2">回复</span>-->
                                <!--<span class="talk-name" v-show="rep.nickname2">{{rep.nickname2}}</span>-->
                                <span class="talk-name" v-if="rep.nickname">：</span>
                                <span class="talk-word">{{rep.content}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="other-talk" v-show="item.replyTotal > 3">
                        <div class="other-talk-info">
                            <span>查看全部{{item.replyTotal | NumInt}}条评论...</span>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="show-hot-topic" v-if="showHotTopic && index === 4">
                <!--&& index === 4-->
                <div class="hot-topics">
                    <div class="flex-between topic-top ">
                        <div class="flex-align-center topic-top-left ">
                            <div class="icon-hot icon-hot-discussion"></div>
                            <div class="icon-text">热门话题</div>
                        </div>
                        <div class="topic-top-right" v-on:click="changeDiscussion">换一批</div>
                    </div>
                    <div class="hot-list">
                        <div class="hot-topic-item flex-between" v-for="(top, topIndex) in hotDiscussion"
                             :key="topIndex">
                            <div class="flex-align-center  hot-title">
                                <div class="icon-hot-con icon-home-hot"></div>
                                <router-link :to="{ name: 'detail', params: { id: top.id }}">
                                    <div class="icon-text">{{top.title}}</div>
                                </router-link>
                            </div>
                            <div class="hot-join-num">{{top.number | NumInt}}人参与</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast, List, ImagePreview } from 'vant';

    export default {
        name: 'CardWrap',
        components: {
            [Toast.name]: Toast,
            [List.name]: List,
            [ImagePreview.name]: ImagePreview
        },
        props: ['cardList', 'showHotTopic', 'page'],
        data () {
            return {
                hotDiscussion: [],
                hotPageNum: 1,
                hasNextDiscussion: true
            };
        },
        created () {
            // if (this.showHotTopic) {
            //     this.getTopicObj();
            // }
        },
        methods: {
            showBigPicture (id) {
                this.$router.push({ name: 'detail', params: { id: id }});
                // 图片放大
                // ImagePreview({
                //     images: imgArr,
                //     startPosition: startNum,
                //     showIndex: true,
                //     showIndicators: false,
                //     onClose () {
                //         // do something
                //     }
                // });
                // ImagePreview(imgArr);
            },
            changeDiscussion () {
                this.hotPageNum += 1;
                this.getTopicObj();
            },
            getTopicObj () {
                if (!this.hasNextDiscussion) {
                    Toast({
                        message: '暂时没有了',
                        duration: 1000,
                        forbidClick: true
                    });
                    return
                }
                this.$http.HomeHotService.getHotTopic(this.hotPageNum, this.hotPageSize)
                    .then(res => {
                        var resArr = res.data.result;
                        if (resArr && resArr.length > 0) {
                            this.hotDiscussion = [];
                            for (let i = 0; i < resArr.length; i++) {
                                let hot = {
                                    id: resArr[i].postId,
                                    title: resArr[i].title,
                                    number: resArr[i].replyTotal
                                };
                                this.hotDiscussion.push(hot);
                            }
                        }
                        if (!res.data.hasNext) {
                            this.hasNextDiscussion = false;
                        }
                    })
                    .catch(err => {
                        // if (this.hotPageNum !== 1) {
                        //     Toast({
                        //         message: '暂时没有了',
                        //         duration: 1000,
                        //         forbidClick: true
                        //     });
                        // }
                    });
            },
            doLikePost (postId, index) {
                this.$emit('child-by-value', postId, index);
            }
        },
        activated () {
            if (this.showHotTopic) {
                this.getTopicObj();
            }
        }
    }
    ;
</script>

<style lang="scss" scoped>
    //
    .con-img-box {
        display: flex;
        flex-wrap: wrap;
        margin-top: 15px;
    }

    .topic-link {
        color: #388efd;
        display: inline-block;
    }

    .show-hot-topic {
        background-color: $body-bg-color;
        padding-top: 20px;
    }
</style>
