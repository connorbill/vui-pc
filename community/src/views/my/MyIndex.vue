<template>
    <div class="my">
        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
            <div class="main-bg icon-blue-bg">
                <div class="wrap flex-between">
                    <div class="flex-align-center">
                        <!--<img src="../../assets/images/my/default_head.png" class="portrait">-->
                        <img v-if="userInfo.headImg" :src="userInfo.headImg" alt="" class="portrait">
                        <img v-if="!userInfo.headImg" src="../../assets/images/my/default_head.png" alt="" class="portrait">
                        <div>
                            <p class="name">
                                {{userInfo.nickname}}
                                <!--<span class="tag">投资萌新</span>-->
                            </p>
                            <p class="brief">
                                {{userInfo.signature}}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div class="icon-edit" @click="onClickEdit"></div>
                    </div>
                </div>
            </div>
            <van-cell-group class="ul-list">
            <van-cell title="我的动态" icon="" is-link @click="onClickMyDynamic">
                <div class="info-head">
                </div>
                <template slot="icon">
                    <img src="../../assets/images/my/icon_22.png" class="icon">
                </template>
            </van-cell>
            <van-cell title="我的消息" icon="location" :value="userInfo.notReadNum > 0 ? userInfo.notReadNum : '' " is-link class="right-badge"
                      @click="onClickMyMsg">
                <template slot="icon">
                    <img src="../../assets/images/my/icon_21.png" class="icon">
                </template>
            </van-cell>
        </van-cell-group>
        </van-pull-refresh>
    </div>
</template>

<script>
    import { Cell, CellGroup, Toast, PullRefresh } from 'vant';
    // import { commonFunction } from "../../common/CommonFunction";

    export default {
        name: 'MyIndex',
        components: {
            vanCell: Cell,
            vanCellGroup: CellGroup,
            [PullRefresh.name]: PullRefresh
        },
        data () {
            return {
                img_url: '',
                msg_num: '100',
                userInfo: {
                    userId: '',
                    nickname: '',
                    signature: '',
                    mobile: '',
                    address: '',
                    replyNum: '',
                    headImg: '',
                    notReadNum: ''
                },
                isRefresh: false
            };
        },
        created () {
            this.getUserInfo();
        },
        methods: {
            onRefresh () {
                this.getUserInfo();
            },
            onClickEdit () {
                // alert('onClickEdit')
                this.$router.push('/profile');
            },
            onClickMyDynamic () {
                // alert('onClickMyDynamic')
                let userId = this.userInfo.coUserId;
                this.$router.push({ path: `/post/${userId}` });
            },
            onClickMyMsg () {
                // alert('onClickMyMsg')
                this.$router.push('/message/chat');
            },
            getUserInfo () {
                this.$http.MyService.getUserInfo()
                    .then(res => {
                        // console.log(res);
                        this.userInfo.coUserId = res.data[0].coUserId;
                        this.userInfo.nickname = res.data[0].nickname;
                        this.userInfo.headImg = res.data[0].headImg;
                        this.userInfo.signature = res.data[0].signature;
                        this.userInfo.replyNum = res.data[0].replyNum;
                        this.userInfo.notReadNum = res.data[0].notReadNum;
                        this.isRefresh = false;
                    })
                    .catch(err => {
                        this.isRefresh = false;
                        // if (err.code === '000003') {
                        //     commonFunction.toLogin();
                        // }
                        // Toast({
                        //     message: err,
                        //     duration: 3000,
                        //     forbidClick: true
                        // });
                    })
            }
        }
    };
</script>

<style lang="scss">
    @import "../../assets/style/lib/vant-cell.scss";
</style>
<style lang="scss" scoped>
    /deep/ .van-cell .van-cell__right-icon{
        font-size: 0.26rem;
    }
    .main-bg {
        background-repeat: no-repeat;
        background-position: top;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        width: 100%;
        height: 220px;
        font-size: 28px;
        color: #fff;
        text-align: left;
        .wrap {
            margin: 0 25px;
            height: 100%;
        }
        .portrait {
            width: 105px;
            height: 105px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 16px;
            vertical-align: middle;
        }
        .name {
            .tag {
                border-radius: 2PX;
                background-color: #ffa31f;
                font-size: 26px;
                color: #fff;
                margin-left: 13px;
                padding: 0 18px;
            }
        }
        .brief {
            font-size: 24px;
            margin-top: 20px;
            .time {
                margin-left: 20px;
            }
        }
        .icon-edit {
            align-items: flex-start;
            -webkit-background-size: 34px 38px;
            background-size: 34px 38px;
            background-repeat: no-repeat;
            background-position: right top;
            height: 60px;
            width: 60px;
            margin-bottom: 12px;
        }
    }

    /deep/ .ul-list {

        .van-cell__value {
            span {
            }
        }

    }
    /deep/.van-cell:not(:last-child):after {
        content: " ";
        position: absolute;
        pointer-events: none;
        left: .15rem;
        right: 0;
        bottom: 0;
        -webkit-transform: scaleY(.5);
        -ms-transform: scaleY(.5);
        transform: scaleY(.5);
        border-bottom: 1PX solid #eee;
    }
</style>
