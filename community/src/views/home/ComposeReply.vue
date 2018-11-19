<template>
    <div class="m-main m-pos-f m-box-model">
        <header :class="{'m-con-top': !isApp}">
            <!--<div class="detail-replay-title">-->
                <!--<van-nav-bar-->
                        <!--:title="navTitle"-->
                        <!--:right-text="rightText"-->
                        <!--left-arrow-->
                        <!--@click-left="onClickLeft"-->
                        <!--@click-right="onClickRight"-->
                <!--&gt;</van-nav-bar>-->
            <!--</div>-->
        </header>

        <main class="m-reles-con m-lim-width m-box-model m-flex-shrink1 m-flex-grow1 ">
            <div class="m-box-model m-pos-r" draggable="true">
                <div class="m-box-model m-fd-row m-reles-nr">
                    <div class="textarea-wrapper">
                        <div
                                id="contentEditable"
                                class="content-editable"
                                contenteditable="true"></div>
                        <span class="m-wz-def">
                            <textarea :placeholder="replyPerson"
                                      v-model="replyContent"
                                      @input="checkWordNum"
                                      id="textarea"
                                      class="field-textarea"
                            ></textarea>
                        </span>
                    </div>
                </div>
            </div>
            <van-loading color="white" class="fixed-middle-center demo-loading" v-show="isSending"/>
        </main>
        <footer class="m-box-model m-lim-width" style="overflow: hidden;">
            <div class="composer-footer m-fd-row">
                <div class="composer-footer-box m-ctrl-box m-box-center-a">
                    <div style="flex: 1 1 0%;"></div>
                    <span class="m-reles-fnum m-wz-def">{{ replyNum }}/300</span>
                </div>
            </div>
            <div>
                <div class="compose-btn mb-30" @click="onClickRight" :class="isSending ? 'click-forbid' : '' ">发布</div>
            </div>
        </footer>
    </div>
</template>

<script>
    import { NavBar, Toast, Loading } from 'vant';
    import { commonFunction } from '../../common/CommonFunction';

    export default {
        name: 'ComposeReply',
        components: {
            [NavBar.name]: NavBar,
            [Toast.name]: Toast,
            [Loading.name]: Loading
        },
        data () {
            return {
                postId: '',
                rightText: '发送',
                replyId: '',
                navTitle: '回复评论',
                replyPerson: '',
                replyContent: '',
                replyNum: 0,
                isSending: false,
                isApp: false
            }
        },
        mounted () {
            this.postId = this.$route.query.id;
            this.replyId = this.$route.query.reply;
            let replyPerson = this.$route.query.content;
            if (replyPerson && replyPerson != ''){
                this.replyPerson = '回复' + replyPerson + ':';
            } else {
                this.replyPerson = '回复评论'
            }
            if (commonFunction.isApp()){
                this.isApp = true;
            }
            // let text = document.getElementById("textarea");
            // commonFunction.autoTextarea(text, 3, 500);
            let elemTextarea = document.getElementById('textarea')
            let elemContentEditable = document.getElementById('contentEditable')
            let adjustHeight = function () {
                elemContentEditable.innerText = this.value
            }
            elemTextarea.addEventListener('input', adjustHeight, false)
        },
        methods: {
            onClickLeft () {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
            },
            onClickRight () {
                // 回复帖子接口
                let trimWord = commonFunction.trim(this.replyContent);
                let wordLength = commonFunction.checkLength(trimWord);
                if (wordLength === 0) {
                    this.showTip('评论内容不能为空');
                    return;
                } else if (wordLength > 300) {
                    this.showTip('评论字数不能超过300字');
                    return;
                }
                if (!this.isSending) {
                    this.isSending = true;
                    let sendData = {
                        postReplyId: this.replyId, content: trimWord
                    };
                    this.$http.DetailService.doReplayReplay(sendData)
                        .then(res => {
                            this.replyContent = '';
                            this.isSending = false;
                            this.showTip('评论成功');
                            setTimeout(function () {
                                commonFunction.goBack();
                            }, 1000);
                        })
                        .catch(err => {
                            this.isSending = false;
                            this.showTip(err.message);
                        });
                }
            },
            checkWordNum () {
                let con = commonFunction.trim(this.replyContent);
                let number = commonFunction.checkLength(con);
                if (number > 300) {
                    this.replyContent = con.substr(0, 300);
                }
                let delNum = commonFunction.checkLength(commonFunction.trim(this.replyContent));
                this.replyNum = delNum;
            },
            showTip (msg) {
                Toast({
                    message: msg, duration: 1000, forbidClick: true
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/style/lib/compose.scss";

    .compose-btn {
        width: 600px;
        height: 90px;
        margin: auto;
        border-radius: 45px;
        background-color: $main-blue;
        color: #fff;
        font-size: 34px;
        line-height: 90px;
        text-align: center;
        &.click-forbid {
            background-color: #999999;
        }
        &.mb-30{
            margin-bottom: .3rem;
        }
    }
    .nav-height {
        height: .9rem;
    }

    .m-con-top {
        margin-top: .9rem;
    }
</style>
