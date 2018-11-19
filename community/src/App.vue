<template>
    <div id="app" class="app" >
        <div v-if="!isOldApp">
            <nav-top-bar :nav-title-word="navTitle" :show-top-nav="isShowTop" ></nav-top-bar>
            <div class="app-content">
                <keep-alive>
                    <!--:key="$route.fullPath" 解决跳转路由相同不刷新-->
                    <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"/>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath"/>
            </div>
            <!--<div class="no-msg" v-if="!getNet">-->
            <!--<div class="no-img-box icon-no-net"></div>-->
            <!--<div class="no-msg-text">暂无网络</div>-->
            <!--</div>-->
            <nav-bottom-bar :tabbar="tabbar" :show-bottom-nav="showBottomNav"></nav-bottom-bar>
            <!--<div v-show="isLoading">-->
            <!--<van-loading class="loading-global-request global-request-padding fixed-middle-center" type="spinner" color="white"/>-->
            <!--</div>-->
        </div>
    </div>
</template>
<script>
    import NavBottomBar from './components/NavBottomBarComponent';
    import NavTopBar from './components/NavTopBarComponent';
    import { commonFunction } from './common/CommonFunction';
    import { mapGetters } from 'vuex';
    import weixin from 'weixin-js-sdk'

    export default {
        components: {
            NavTopBar,
            NavBottomBar
        },
        data () {
            return {
                // network: this.networks,
                net: true,
                navTitle: '',
                showBottomNav: this.$route.meta.navBottom,
                showTopNav: this.$route.meta.navTop,
                tabbar: {
                    active: 0,
                    list: []
                },
                isLoading: false,
                appToken: '',
                appInfo: '',
                isShowTop: false,
                isOldApp: false
            };
        },
        created () {
            this.tabbar.active = this.$store.state.bottomNav.active;
            this.tabbar.list = this.$store.state.bottomNav.arr;
            if (commonFunction.appIsOld()) {
                this.isOldApp = false;
                commonFunction.showOldAppTip();
            }
            // this.wechatShare();
        },
        mounted () {
            if (commonFunction.isApp() || commonFunction.isWeChat()) {
                this.isShowTop = false;
            } else {
                this.isShowTop = true;
            }
        },
        methods: {
            wechatShare (url) {
                let configUrl = 'https://m.qianxiangbank.com/community';
                if (url) {
                    configUrl = url;
                }
                this.$http.CommonService.getWechatAppId(configUrl)
                    .then(data => {
                        // console.log(data.data);
                        let shareConfig = data.data;
                        weixin.config({
                            debug: true,
                            appId: shareConfig.appId, // 公众号的唯一标识
                            timestamp: shareConfig.timestamp, // 必填，生成签名的时间戳
                            nonceStr: shareConfig.nonceStr, // 必填，生成签名的随机串
                            signature: shareConfig.signature, // 必填，签名，见附录1
                            // 需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ
                            jsApiList: [
                                'updateTimelineShareData', 'updateAppMessageShareData', 'onMenuShareTimeline',
                                'onMenuShareAppMessage', 'onMenuShareQQ'
                            ]
                        });
                        // 处理验证成功的信息
                        weixin.ready(function () {

                            let share = {
                                title: '钱香社区上线啦，赶紧加入我们吧！',
                                desc: '满满干货、惊喜福利、畅所欲言，正在召唤你~',
                                // imgUrl: baseUrl + '/static/image/icon-home-share.png', // 图片地址
                                imgUrl: 'https://pic.qianxiangbank.com/waps/images/icon-home-share.png',
                                link: encodeURIComponent('https://m.qianxiangbank.com/community')
                            };
                            //              alert(window.location.href.split('#')[0]);
                            let newConfig = {
                                title: share.title, // 分享标题
                                desc: share.desc, // 分享描述
                                link: share.link, // 分享链接
                                imgUrl: share.imgUrl, // 分享图标
                                success: function (res) {
                                    // 用户确认分享后执行的回调函数
                                    console.log("分享给朋友成功返回的信息为:", res);
                                },
                                cancel: function (res) {
                                    // 用户取消分享后执行的回调函数
                                    console.log("取消分享给朋友返回的信息为:", res);
                                }
                            };
                            // 分享到朋友圈
                            // weixin.updateTimelineShareData(newConfig);
                            // // 分
                            // weixin.updateAppMessageShareData(newConfig);
                            weixin.onMenuShareAppMessage(newConfig);
                            weixin.onMenuShareTimeline(newConfig);
                            weixin.onMenuShareQQ(newConfig);
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        computed: {
            ...mapGetters(['getNet'])
        },
        watch: {
            $route: {
                handler: function (newVal, oldVal) {
                    this.navTitle = newVal.meta.navTopTitle || '钱香社区';
                    this.showBottomNav = newVal.meta.navBottom || false;
                    this.showTopNav = newVal.meta.navTop || false;
                    let navActive = this.$route.meta.navBottomActive;
                    if (navActive !== undefined) {
                        this.$store.commit('changeBottomActive', navActive);
                    }
                    this.tabbar.active = this.$store.state.bottomNav.active;
                },
                deep: true
            }
        }

    };
</script>

<style lang="scss">
    .app-content{
        margin-bottom: 1.4rem;
    }
</style>
