<template>
    <div class="post-message">
        <div class="select-class">选择分类</div>
        <div class="class-list">
            <div class="project-group topic-list">
                <div class="project-item topic-item "
                     @click="selectType(item.id)"
                     v-for="(item, index) in topicType"
                     :key="index"
                     :class="item.id == activeTopic ? 'topic-active' : '' "
                     v-if="item.canPost == 1"
                >
                    <div class="select-btn">{{item.name}}</div>
                </div>
            </div>
        </div>
        <div class="compose-word">
            <textarea class="input-pop" name="" cols="30" rows="10" placeholder="想和大家分享点什么~（500字以内）"
                      v-model="content"
                      @input="checkWordNum"
            ></textarea>
            <div class="word-num-box">{{wordNum}}/500</div>
        </div>
        <div class="file-box project-group">
            <div class="file-item project-item">
                <span class="icon-add-file icon-add"></span>
                <!--<input class="add-input" type="file" id="txtLogin">-->

                <input id="file" name="file" type="file" class="add-input file" accept="image/png,image/jpeg"
                       :disabled="isDisabled"
                       @change="imgPreview"/>

                <!--<div>-->
                <!--<van-uploader :after-read="onRead">-->
                <!--<van-icon name="photograph" />-->
                <!--</van-uploader>-->
                <!--</div>-->
            </div>
            <div class="file-item project-item" v-for="(item, index) in imgDataArr" :key="index">
                <img :src="item" alt="">
                <span class="delete-style icon-delete" @click="deleteImgData(index)"></span>
            </div>
            <div class="file-item project-item" v-if="isDisabled">
                <van-loading/>
            </div>
        </div>
        <div class="title-box">
            <input type="text" class="input-title" placeholder="请输入30字以内的标题"
                   v-model="title"
                   @input="checkTitleNum">
            <div class="word-num-box">{{titleNum}}/30</div>
        </div>
        <!--<div class="friend-box">-->
        <!--<div class="add-item">-->
        <!--<div class="icon-phiz phiz"></div>-->
        <!--<div class="add-item-text">表情</div>-->
        <!--</div>-->
        <!--<div class="add-item">-->
        <!--<div class="icon-add-friend add-friend phiz"></div>-->
        <!--<div class="add-item-text">好友</div>-->
        <!--</div>-->
        <!--</div>-->
        <div class="compose-btn" @click="toCompost" :class="isComposing ? 'click-forbid' : '' ">发布</div>
        <van-loading color="white" class="fixed-middle-center demo-loading" v-show="isComposing"/>
    </div>
</template>

<script>
    import { Toast, Loading } from 'vant';
    import { commonFunction } from '../../common/CommonFunction';

    export default {
        name: 'ComposeTopic',
        components: {
            [Toast.name]: Toast,
            [Loading.name]: Loading
        },
        data () {
            return {
                topicType: [],
                activeTopic: '',
                content: '',
                title: '',
                pic: '',
                wordNum: 0,
                titleNum: 0,
                imgDataArr: [],
                imgStrArr: [],
                isDisabled: false,
                isComposing: false,
                isComposingNum: false
            };
        },
        created () {
            // this.open_soft_keyboard({
            // 	input: "#txtLogin"
            // });
            this.testUserInfo();
            this.getSubTitle();
            commonFunction.isRefreshAppPage();
        },
        methods: {
            testUserInfo () {
                this.$http.MyService.getUserInfo()
                    .then()
                    .catch(err => {
                        commonFunction.toLogin();
                    });
            },
            toCompost () {
                let trimTitle = commonFunction.trim(this.title);
                let tittleLength = commonFunction.checkLength(trimTitle);
                let trimContent = commonFunction.trim(this.content);
                let conLength = commonFunction.checkLength(trimContent);
                if (tittleLength === 0) {
                    Toast({
                        message: '标题不能为空',
                        duration: 1000,
                        forbidClick: true
                    });
                    return;
                }
                if (conLength === 0) {
                    Toast({
                        message: '分享内容不能为空',
                        duration: 1000,
                        forbidClick: true
                    });
                    return;
                }
                if (this.isComposing) return;
                this.isComposing = true;
                let picStr = '';
                for (let i = 0; i < this.imgStrArr.length; i++) {
                    if (i === this.imgStrArr.length - 1) {
                        picStr += this.imgStrArr[i];
                    } else {
                        picStr += this.imgStrArr[i] + ',';
                    }
                }
                let sendData = {
                    topicId: this.activeTopic,
                    title: this.title,
                    content: this.content,
                    pic: picStr // 用逗号隔开
                };
                this.$http.DetailService.goToCompose(sendData)
                    .then(res => {
                        this.isComposing = false;
                        this.imgDataArr = [];
                        this.imgStrArr = [];
                        this.title = '';
                        this.content = '';
                        this.titleNum = 0;
                        this.wordNum = 0;
                        Toast({
                            message: res.message,
                            duration: 1000,
                            forbidClick: true
                        });
                        setTimeout(function () {
                            commonFunction.goBack();
                        }, 1000);
                    })
                    .catch(err => {
                        if (err.code === '000003') {
                            commonFunction.toLogin();
                        }
                        if (err.code === '000001') {
                            this.isComposing = false;
                            Toast({
                                message: err.message,
                                duration: 1000,
                                forbidClick: true
                            });
                        } else {
                            this.isComposing = false;
                            Toast({
                                message: err.message,
                                duration: 1000,
                                forbidClick: true
                            });
                        }
                    });
            },
            deleteImgData (index) {
                this.imgDataArr.splice(index, 1);
                this.imgStrArr.splice(index, 1);
            },
            upImgFront (imgdata) {
                // var self = this;
                // originalAxios({
                //     method: 'post',
                //     url: '/index/uploadActivityPic.api',
                //
                //     data: self.$qs.stringify({
                //         base64Data: imgdata
                //     }),
                //     headers: {
                //         'Content-Type': 'application/x-www-form-urlencoded'
                //     }
                // })
                this.$http.CommonService.upImg(imgdata)
                    .then((res) => {
                        this.isDisabled = false;
                        this.imgDataArr.push(imgdata);
                        this.imgStrArr.push(res.data.url);
                        // console.log(this.imgStrArr)
                        document.getElementById('file').value = '';
                    })
                    .catch((err) => {
                        this.isDisabled = false;
                        document.getElementById('file').value = '';
                        Toast({
                            message: '上传失败',
                            duration: 1000,
                            forbidClick: true
                        });
                    });
            },
            imgPreview (event) {
                this.isDisabled = true;
                let self = this;
                // 创建一个reader
                // console.log(event);
                let reader = new FileReader();
                // 将图片2将转成 base64 格式
                reader.readAsDataURL(event.target.files[0]);
                // console.log(event.target.files[0].size);
                // 读取成功后的回调
                reader.onload = function (e) {
                    // let result = this.result;
                    let result = e.target.result;
                    let img = new Image();
                    img.src = result;
                    if (event.target.files[0].size > 20000000) {
                        Toast({
                            message: '请上传不大于20M的图片',
                            duration: 1000,
                            forbidClick: true
                        });
                        this.isDisabled = false;
                        return;
                    } else {
                        // console.log(3)
                        img.onload = function () {
                            let src = commonFunction.compressImgTwo(img);
                            self.upImgFront(src);
                        };
                    }
                }
            },
            getSubTitle () {
                this.$http.TopicService.getSubTitle()
                    .then(res => {
                        let resData = res.data;
                        this.activeTopic = resData[0].id;
                        for (let i = 0; i < resData.length; i++) {
                            if (resData[i].canPost === 1) {
                                let type = {
                                    id: resData[i].id,
                                    icon: resData[i].icon,
                                    name: resData[i].name,
                                    postNum: resData[i].postNum,
                                    joinNum: resData[i].joinNum,
                                    canPost: resData[i].canPost
                                };
                                this.topicType.push(type);
                            }
                        }
                        this.activeTopic = this.topicType[0].id;
                    })
                    .catch(err => {
                    });
            },
            selectType (id) {
                this.activeTopic = id;
            },
            checkWordNum () {
                let con = commonFunction.trim(this.content);
                let number = commonFunction.checkLength(con);
                if (number > 500) {
                    this.content = con.substr(0, 500);
                }
                let delNum = commonFunction.checkLength(commonFunction.trim(this.content));
                this.wordNum = delNum;
            },
            checkTitleNum () {
                let con = commonFunction.trim(this.title);
                let number = commonFunction.checkLength(con);
                if (number > 30) {
                    this.title = con.substr(0, 30);
                }
                let delNum = commonFunction.checkLength(commonFunction.trim(this.title));
                this.titleNum = delNum;
            }
        }
    };
</script>
<style lang="scss" scoped>
    // vant 样式修改
    /deep/ .project-item {
        .van-loading {
            width: 0.6rem;
            height: 0.6rem;
        }
    }
</style>
<style lang="scss" scoped>
    .word-num-box {
        font-size: 0.26rem;
        color: #999999;
        margin-left: 0.12rem;
    }

    .post-message {
        min-height: 100%;
        background-color: #fff;
        padding-bottom: 80px;
    }

    .select-class {
        padding: 36px 0 47px 25px;
        font-size: 26px;
        color: $text666;
    }

    .project-group {
        display: flex;
        flex-wrap: wrap;

        .project-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;

            .delete-style {
                position: absolute;
                right: -20px;
                top: -20px;
                width: 40px;
                height: 40px;
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
        }
    }

    .class-list {
        padding-bottom: 25px;
    }

    .topic-list {
        padding: 0 25px 6px;
        background-color: #fff;
        /*margin-bottom: 20px;*/

        .topic-item {
            margin-bottom: 32px;
            width: 25%;

            .select-btn {
                /*height: 54px;*/
                padding: 14px 0;
                line-height: 1;
                width: 150px;
                /*line-height: 54px;*/
                text-align: center;
                font-size: 24px;
                color: $main-blue;
                border: 2PX solid $main-blue;
                border-radius: 27px;
            }

            &.topic-active {
                .select-btn {
                    background-color: $main-blue;
                    color: #fff;
                }
            }
        }
    }

    .compose-word {
        padding: 0 25px;

        .input-pop {
            resize: none;
            outline: none;
            border: 1PX solid $border;
            padding: 20px;
            border-radius: 6px;
            width: 100%;
            font-size: 26px;
            color: $text-main;
            background-color: #f6f6f6;
        }
    }

    .title-box {
        padding: 0 25px;

        .input-title {
            outline: none;
            border: 1PX solid $border;
            border-radius: 6px;
            font-size: 26px;
            color: $text-main;
            background-color: #f6f6f6;
            width: 100%;
            height: 100px;
            padding-left: 20px;
        }
    }

    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color: $text999;
        font-size: 26px;
    }

    input:-moz-placeholder, textarea:-moz-placeholder {
        color: $text999;
        font-size: 26px;
    }

    input::-moz-placeholder, textarea::-moz-placeholder {
        color: $text999;
        font-size: 26px;
    }

    input:-ms-input-placeholder, textarea:-ms-input-placeholder {
        color: $text999;
        font-size: 26px;
    }

    .file-box {
        padding: 60px 25px 34px;

        .file-item {
            width: 120px;
            height: 120px;
            background-color: #f6f6f6;
            position: relative;
            margin: 0 20px 20px 0;

            .add-input {
                opacity: 0;
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
            }

            .icon-add {
                display: inline-block;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 40px;
                height: 40px;
                background-repeat: no-repeat;
                background-position: center;
                background-size: 100% 100%;
            }

            img {
                width: 100%;
                height: 100%;
                vertical-align: top;
            }
        }
    }

    .friend-box {
        display: flex;
        padding: 35px 25px 68px;

        .add-item {
            display: flex;
            align-items: center;
            margin-right: 52px;

            .phiz {
                height: 36px;
                width: 36px;
                background-repeat: no-repeat;
                background-position: center;
                background-size: 100% 100%;
            }

            .add-item-text {
                font-size: 26px;
                color: $text999;
                margin-left: 12px;
            }
        }
    }

    .up-img-style {
        font-size: 26px;
        color: $text999;
        margin-left: 12px;
    }

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
    }

</style>
