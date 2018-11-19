<template>
    <div class="topic-main">
        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
            <div class="project-group topic-list" v-if="topicType.length > 0">
                <div class="project-item topic-item"
                     :to="{ name: 'TopicItem', params: {topicId: item.id}}"
                     v-for="(item, index) in topicType"
                     :key="index"
                     @click="toTopicItem(item.id, item.name)"
                >
                    <div class="icon icon-middle topic-item-img-box">
                        <img class="topic-link-img" :src="item.icon" alt="">
                    </div>
                    <div class="icon-text">{{item.name}}</div>
                </div>
                <!--<router-link class="project-item topic-item"-->
                             <!--:to="{ name: 'TopicItem', params: {topicId: item.id}}"-->
                             <!--v-for="(item, index) in topicType"-->
                             <!--:key="index">-->
                    <!--<div class="icon icon-middle topic-item-img-box">-->
                        <!--<img class="topic-link-img" :src="item.icon" alt="">-->
                    <!--</div>-->
                    <!--<div class="icon-text">{{item.name}}</div>-->
                <!--</router-link>-->
            </div>
            <div class="topic-main-hot">
                <div class="flex-between topic-top ">
                    <div class="flex-align-center topic-top-left ">
                        <div class="icon-hot icon-topic-xiangfen"></div>
                        <div class="icon-text">香粉热议</div>
                    </div>
                    <!--<div class="topic-top-right">换一批</div>-->
                </div>
            </div>
            <!--<div class="hot-list-box">-->
            <!--<card-list :card-data="cardArr" :show-hot-topic="showHotTopic"></card-list>-->
            <!--</div>-->
            <div class="hot-list-box">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        :offset="300"
                        @load="getCardList"
                        :immediate-check="immediateCheck"
                >
                    <card-list
                            :card-list="cardList"
                            :show-hot-topic="isShowHotDiscussion"
                            :page="this.cardPageNum"
                            v-on:child-by-value="doLikePost"
                    ></card-list>
                </van-list>
                <div class="no-msg" v-if="cardList.length < 1  && !loading && !isRefresh">
                    <div class="icon-no-msg no-img-box"></div>
                    <div class="no-msg-text">暂无信息</div>
                </div>
                <div v-if="noMoreInfo" class="no-more-item flex-align-center">— 我可是有底线的 —</div>
                <!--<div v-if="!isGetCardList && cardList.length < 1  && !isRefresh" class="no-data">暂无数据</div>-->
                <!--<div v-if="cardList.length > 1 &&  finished" class="no-more-item flex-align-center">— 我可是有底线的 —</div>-->
            </div>
        </van-pull-refresh>
        <router-link class="post-message-btn icon-post-message" to="/compose" v-show="isUp"></router-link>
    </div>
</template>

<script>
	import CardList from '../../components/CardWrapComponent';
	import { List, PullRefresh, Toast } from 'vant';
	import { commonFunction } from '../../common/CommonFunction';

	export default {
		name: 'TopicList',
		components: {
			CardList,
			[List.name]: List,
			[PullRefresh.name]: PullRefresh,
            [Toast.name]: Toast
		},
		data () {
			return {
                noMoreInfo: false,
				loading: false,
                isLoadingNextPage: false,
                immediateCheck: false,
				finished: false,
				isRefresh: false,
				isShowHotDiscussion: false,
				isGetCardList: true,
				cardList: [],
				topicType: [],
				noCardList: '',
				cardPageSize: 10,
				cardPageNum: 0,
				topicId: '',
				topicTopThree: [],
				topicName: '',
				topicJoinNumber: 0,
				topicSort: 0,
                isUp: true // 是否向上滑
			};
		},
        mounted () {
            // this.isScroll();
            // commonFunction.removeHandler('.compose')
            // commonFunction.isScrollUp('.compose');
        },
		methods: {
            toTopicItem (id, topicName) {
                commonFunction.setPageTitle(topicName);
                this.$router.push({ name: 'TopicItem', params: { topicId: id } });
            },
            isScroll () {
                let self = this;
                let scrollFunc = function (e) {
                    e = e || window.event;
                    if (e.wheelDelta) {
                        // 第一步：先判断浏览器IE，谷歌滑轮事件
                        if (e.wheelDelta > 0) {
                            // 当滑轮向上滚动时
                            self.isUp = true;
                        }
                        if (e.wheelDelta < 0) {
                            // 当滑轮向下滚动时
                            self.isUp = false;
                        }
                    } else if (e.detail) {
                        // Firefox滑轮事件
                        if (e.detail > 0) {
                            // 当滑轮向上滚动时
                            self.isUp = true;
                        }
                        if (e.detail < 0) {
                            // 当滑轮向下滚动时
                            self.isUp = false;
                        }
                    }
                }
                // 给页面绑定滑轮滚动事件
                if (document.addEventListener) {
                    // firefox
                    document.addEventListener('DOMMouseScroll', scrollFunc, false);
                }
                // 滚动滑轮触发scrollFunc方法  //ie 谷歌
                window.onmousewheel = document.onmousewheel = scrollFunc;
            },
			onRefresh () {
				// this.finished = false;
                this.noMoreInfo = false;
				this.getCardList('refresh');
			},
			getCardList (refresh) {
                if (refresh === 'refresh') {
                    // page传值0表示刷新数据
                    this.cardPageNum = 0;
                }
                if (this.isLoadingNextPage) return;
                this.isLoadingNextPage = true;
                this.cardPageNum++;
				this.$http.TopicService.getTopicRecomend(this.cardPageNum)
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
								// if (i === 0) {
                                //     this.cardList.push(setOne);
                                // }
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
                        this.isLoadingNextPage = false;
					})
					.catch(err => {
						if (this.cardList.length === 0) {
							this.isGetCardList = false;
						}
						this.finished = true;
						this.loading = false;
						this.isRefresh = false;
                        this.isLoadingNextPage = false;
					});
			},
			changeCardList () {
				this.cardPageNum += 1;
				this.getCardList();
			},
			getSubTitle () {
				this.$http.TopicService.getSubTitle()
					.then(res => {
                        this.topicType.splice(0);
						let resData = res.data;
						for (let i = 0; i < resData.length; i++) {
							let type = {
								id: resData[i].id,
								icon: resData[i].icon,
								name: resData[i].name,
								postNum: resData[i].postNum,
								joinNum: resData[i].joinNum
							};
							this.topicType.push(type);
						}
					})
					.catch(err => {
						this.noticeArr = [];
					});
			},

            doLikePost (postId, index) {
                if (!localStorage.getItem('token')) {
                    commonFunction.toLogin();
                    return
                }
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
            this.getSubTitle();
            // isUseCache为false时才重新刷新获取数据
            // 因为对list使用keep-alive来缓存组件，所以默认是会使用缓存数据的
            if (!this.$route.meta.isUseCache) {
                this.cardList = []; // 清空原有数据
                this.cardPageNum = 0;
                this.loading = true;
                this.getCardList(); // 这是我们获取数据的函数
            }
            this.$route.meta.isUseCache = false;
        },
        beforeRouteLeave (to, from, next) {
            if (to.name === 'detail' || to.name === 'TopicItem' || to.name === 'post') {
                from.meta.isUseCache = true;
            }
            // from.meta.isUseCache = true;
            next();
        }
	};
</script>

<style lang="scss" scoped>

    .project-group {
        display: flex;
        flex-wrap: wrap;
        .project-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }

    .topic-list {
        padding: 60px 25px 6px;
        background-color: #fff;
        margin-bottom: 20px;
        .topic-item {
            margin-bottom: 60px;
            width: 25%;
            .icon {
                width: 80px;
                height: 80px;
                background-repeat: no-repeat;
                background-position: center;
                background-size: 100% 100%;
                .topic-link-img {
                    width: 100%;
                    height: 100%;
                    vertical-align: top;
                }
            }
            .icon-text {
                font-size: 24px;
                margin-top: 20px;
                color: $text-main;
            }
            .topic-item-img-box {
                border-radius: 50%;
                overflow: hidden;
            }
        }
    }

    .topic-main {
        .topic-main-hot {
            margin-bottom: 0px;
            background-color: #fff;
            .topic-top {
                height: 80px;
                padding: 0 24px 0 30px;
                border-bottom: 1PX solid $border;
                .icon-hot {
                    width: 24px;
                    height: 28px;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: 100% 100%;
                }
                .topic-top-left {
                }
                .topic-top-right {

                    width: 130px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    background-color: #edf6ff;
                    font-size: 24px;
                    color: $main-blue;
                }
            }
            .icon-text {
                color: $text-main;
                font-size: 30px;
                margin-left: 10px;
                font-weight: 600;
            }

        }

    }

</style>
